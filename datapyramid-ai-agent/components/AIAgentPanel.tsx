import React from 'react';
import { Persona, Message } from '../types';
import ChatInterface from './ChatInterface';
import PersonaSelector from './PersonaSelector';
import { PERSONA_DETAILS } from '../constants';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface AIAgentPanelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activePersona: Persona;
  setActivePersona: (persona: Persona) => void;
  messages: Message[];
  isLoading: boolean;
  handleSendMessage: (input: string) => void;
}

const AIAgentPanel: React.FC<AIAgentPanelProps> = ({
  isOpen,
  setIsOpen,
  activePersona,
  setActivePersona,
  messages,
  isLoading,
  handleSendMessage,
}) => {
  const personaDetails = PERSONA_DETAILS[activePersona];
  const color = personaDetails.color;

  const personaGlowShadow: {[key in Persona]: string} = {
    [Persona.ISIS]: 'glowing-shadow-amber',
    [Persona.NOAH]: 'glowing-shadow-cyan',
    [Persona.HORUS]: 'glowing-shadow-indigo',
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-${color}-500 hover:bg-${color}-600 text-slate-900 flex items-center justify-center transition-all ${personaGlowShadow[activePersona]}`}
        aria-label="Summon AI Agent"
      >
        <ChatBubbleLeftRightIcon className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-0 right-0 md:bottom-6 md:right-6 z-40 w-full h-full md:w-[90vw] md:max-w-lg md:h-[70vh] md:max-h-[600px] bg-slate-50/90 backdrop-blur-xl rounded-none md:rounded-lg border border-${color}-500/30 shadow-2xl shadow-slate-400/50 flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center justify-between p-3 border-b border-slate-300 flex-shrink-0">
            <h2 className="font-cinzel text-lg text-amber-600">AI Agent Command</h2>
            <button onClick={() => setIsOpen(false)} className="p-1 text-slate-600 hover:text-slate-900">
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
            <div className="w-full lg:w-[45%] p-3 border-b lg:border-b-0 lg:border-r border-slate-300 overflow-y-auto">
                <PersonaSelector activePersona={activePersona} setActivePersona={setActivePersona} />
            </div>
            <div className="w-full lg:w-[55%] flex flex-col bg-slate-200/50">
                <ChatInterface 
                    activePersona={activePersona}
                    messages={messages}
                    isLoading={isLoading}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    </div>
  );
};

export default AIAgentPanel;