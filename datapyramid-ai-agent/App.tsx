import React, { useState, useEffect } from 'react';
import { Page, Persona, Message } from './types';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import CampaignsPage from './pages/CampaignsPage';
import WalletPage from './pages/WalletPage';
import InsightsPage from './pages/InsightsPage';
import AgentsPage from './pages/AgentsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import AIAgentPanel from './components/AIAgentPanel';
import { getAIResponse } from './services/geminiService';
import { PERSONA_DETAILS } from './constants';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [activePersona, setActivePersona] = useState<Persona>(Persona.ISIS);

  // State lifted for global Copilot functionality
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Effect to LOAD messages from localStorage when panel opens or persona changes
  useEffect(() => {
    if (isAIPanelOpen) {
      try {
        const storedMessages = localStorage.getItem(`datapyramid-ui-history-${activePersona}`);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        } else {
          // If no history, set the initial message
          const initialMessage = {
            id: Date.now(),
            text: PERSONA_DETAILS[activePersona].dialogue,
            sender: activePersona,
            persona: activePersona,
          };
          setMessages([initialMessage]);
        }
      } catch (error) {
        console.error("Failed to load messages from localStorage", error);
        // Fallback to initial message on error
        const initialMessage = {
          id: Date.now(),
          text: PERSONA_DETAILS[activePersona].dialogue,
          sender: activePersona,
          persona: activePersona,
        };
        setMessages([initialMessage]);
      }
    }
  }, [activePersona, isAIPanelOpen]);

  // Effect to SAVE messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0 && isAIPanelOpen) {
      try {
        localStorage.setItem(`datapyramid-ui-history-${activePersona}`, JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save messages to localStorage", error);
      }
    }
  }, [messages, activePersona, isAIPanelOpen]);


  const handleSendMessage = async (input: string) => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      persona: activePersona,
    };
    
    const newMessagesWithUser = [...messages, userMessage];
    setMessages(newMessagesWithUser);
    setIsLoading(true);

    const aiResponseText = await getAIResponse(input, activePersona, currentPage, newMessagesWithUser);
    
    const aiMessage: Message = {
      id: Date.now() + 1,
      text: aiResponseText,
      sender: activePersona,
      persona: activePersona,
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <HomePage setCurrentPage={setCurrentPage} />;
      case Page.AGENTS:
        return <AgentsPage 
                  setActivePersona={setActivePersona}
                  setIsAIPanelOpen={setIsAIPanelOpen}
                />;
      case Page.CAMPAIGNS:
        return <CampaignsPage />;
      case Page.WALLET:
        return <WalletPage />;
      case Page.INSIGHTS:
        return <InsightsPage />;
      case Page.REPORTS:
        return <ReportsPage />;
      case Page.SETTINGS:
        return <SettingsPage />;
      case Page.HELP:
        return <HelpPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </MainLayout>
      <AIAgentPanel
        isOpen={isAIPanelOpen}
        setIsOpen={setIsAIPanelOpen}
        activePersona={activePersona}
        setActivePersona={setActivePersona}
        messages={messages}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;