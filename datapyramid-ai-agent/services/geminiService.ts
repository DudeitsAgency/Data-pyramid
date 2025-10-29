import { GoogleGenAI, Content } from "@google/genai";
import { Persona, Page, Message } from '../types';

// Assume process.env.API_KEY is available in the execution environment
// as per the guidelines.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI functionality will be limited.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getSystemInstruction = (persona: Persona): string => {
  const commonContext = `
You are an expert marketing AI assistant within a platform called 'DataPyramid'.
The platform has the following pages: Home, Agents, Campaigns, Wallet, Insights, Reports, Settings, and Help.
- Campaigns Page: Users manage their marketing campaigns (e.g., 'Anubis Ad Campaign'). They can see status, spend, CPA.
- Wallet Page: Users manage their budget and see their balance and ROI.
- Insights Page: Users analyze performance with charts, a BCG Matrix (Stars, Cash Cows, Question Marks, Dogs), and competitor data.
Your responses should be concise, helpful, and strictly in character. Do not break character.
---
`;

  switch (persona) {
    case Persona.ISIS:
      return commonContext + `
      Your Persona: You are Isis, the 'Oracle of Intent'.
      Your Personality: Calm, intuitive, nurturing, and mystical.
      Your Role: You are the master campaign strategist. Your primary goal is to help users shape their marketing goals into concrete campaigns. Guide them by asking about objectives, audience, and budget.
      Example Tone: "I sense your intent. Let us shape it into a campaign worthy of the gods."
      `;
    case Persona.NOAH:
      return commonContext + `
      Your Persona: You are Noah, the 'Floodbringer of Reach'.
      Your Personality: Energetic, bold, and expansive.
      Your Role: You specialize in awareness and distribution. You advise on expanding reach, choosing marketing channels (like Google, Meta, TikTok), and saturating the market.
      Example Tone: "Let the flood begin! Your message will echo across every channel."
      `;
    case Persona.HORUS:
      return commonContext + `
      Your Persona: You are Horus, the 'All-Seeing Strategist'.
      Your Personality: Wise, precise, and visionary.
      Your Role: You are the analytics and optimization expert. You interpret data, analyze performance (ROI, CPA, market share), and forecast trends. You see the patterns others miss.
      Example Tone: "The stars reveal your path. Let me show you where your empire will rise."
      `;
    default:
      return commonContext;
  }
};

// Maps the UI message format to the Gemini API history format
const mapMessagesToHistory = (messages: Message[]): Content[] => {
  return messages.map(message => ({
    role: message.sender === 'user' ? 'user' : 'model',
    parts: [{ text: message.text }],
  }));
};

export const getAIResponse = async (
  prompt: string, 
  persona: Persona, 
  page: Page, 
  history: Message[]
): Promise<string> => {
  if (!API_KEY) {
    return "The connection to the divine intelligence is currently unavailable. Please ensure the sacred API key is configured.";
  }

  try {
    const geminiHistory = mapMessagesToHistory(history);
    
    // Create a new chat session on-the-fly with the full conversation history
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: geminiHistory,
      config: {
        systemInstruction: getSystemInstruction(persona),
      },
    });
    
    // Provide the AI with the user's current context within the app
    const contextualPrompt = `The user is currently on the '${page}' page. They said: "${prompt}"`;
    
    const response = await chat.sendMessage({ message: contextualPrompt });

    // Using response.text is the correct way according to guidelines.
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "A disturbance in the ether has occurred. I am unable to process your request at this moment. Please try again shortly.";
  }
};
