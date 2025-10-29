import React, { useState, useRef, useEffect } from 'react';
import { Persona, Message } from '../types';
import { PERSONA_DETAILS } from '../constants';

interface ChatInterfaceProps {
  activePersona: Persona;
  messages: Message[];
  isLoading: boolean;
  handleSendMessage: (input: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ activePersona, messages, isLoading, handleSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onSend = () => {
    handleSendMessage(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  const personaColorMap: { [key in Persona]: { bg: string; text: string; shadow: string, border: string, ring: string } } = {
    [Persona.ISIS]: { bg: 'bg-amber-100/50', text: 'text-amber-700', shadow: 'shadow-amber-500/30', border: 'border-amber-300/80', ring: 'ring-amber-500' },
    [Persona.NOAH]: { bg: 'bg-cyan-100/50', text: 'text-cyan-700', shadow: 'shadow-cyan-500/30', border: 'border-cyan-300/80', ring: 'ring-cyan-500' },
    [Persona.HORUS]: { bg: 'bg-indigo-100/50', text: 'text-indigo-700', shadow: 'shadow-indigo-500/30', border: 'border-indigo-300/80', ring: 'ring-indigo-500' },
  };

  const activePersonaDetails = PERSONA_DETAILS[activePersona];
  const ActivePersonaIcon = activePersonaDetails.icon;

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className={`p-4 border-b ${personaColorMap[activePersona].border} flex items-center space-x-3 flex-shrink-0`}>
        <ActivePersonaIcon className={`w-8 h-8 ${personaColorMap[activePersona].text}`} />
        <div>
            <h2 className={`font-cinzel text-xl font-bold ${personaColorMap[activePersona].text}`}>{activePersonaDetails.name}</h2>
            <p className="text-xs text-slate-600">{activePersonaDetails.title}</p>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const Icon = PERSONA_DETAILS[msg.persona].icon;
          return (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender !== 'user' && (
              <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center border ${personaColorMap[msg.persona].border} ${personaColorMap[msg.persona].bg}`}>
                <Icon className={`w-5 h-5 ${personaColorMap[msg.persona].text}`} />
              </div>
            )}
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-lg text-sm ${
                msg.sender === 'user'
                  ? 'bg-slate-300 text-slate-900'
                  : `${personaColorMap[msg.persona].bg} ${personaColorMap[msg.persona].text} border ${personaColorMap[msg.persona].border}`
              }`}
            >
              {msg.text}
            </div>
          </div>
          );
        })}
        {isLoading && (
            <div className="flex items-start gap-3 justify-start">
                 <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center border ${personaColorMap[activePersona].border} ${personaColorMap[activePersona].bg}`}>
                    <ActivePersonaIcon className={`w-5 h-5 ${personaColorMap[activePersona].text}`} />
                </div>
                <div className="max-w-xs md:max-w-md p-3 rounded-lg text-sm flex space-x-1 items-center bg-slate-300">
                    <span className="w-2 h-2 bg-slate-600 rounded-full animate-pulse delay-0"></span>
                    <span className="w-2 h-2 bg-slate-600 rounded-full animate-pulse delay-200"></span>
                    <span className="w-2 h-2 bg-slate-600 rounded-full animate-pulse delay-400"></span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className={`p-4 border-t ${personaColorMap[activePersona].border} flex-shrink-0`}>
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${activePersona}...`}
            disabled={isLoading}
            className={`w-full bg-white border ${personaColorMap[activePersona].border} rounded-lg py-2 pl-4 pr-12 text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:${personaColorMap[activePersona].ring} transition-all`}
          />
          <button
            onClick={onSend}
            disabled={isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${personaColorMap[activePersona].text.replace('text-','bg-')} bg-opacity-80 hover:bg-opacity-100 disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-900" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;