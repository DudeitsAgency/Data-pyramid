import React from 'react';
import { PERSONA_DETAILS } from '../constants';
import { Persona, Page } from '../types';

const personaShadowMap: { [key in Persona]: string } = {
    [Persona.ISIS]: 'hover:glowing-shadow-amber',
    [Persona.NOAH]: 'hover:glowing-shadow-cyan',
    [Persona.HORUS]: 'hover:glowing-shadow-indigo',
  };

interface AgentsPageProps {
    setActivePersona: (persona: Persona) => void;
    setIsAIPanelOpen: (isOpen: boolean) => void;
}

const AgentsPage: React.FC<AgentsPageProps> = ({ setActivePersona, setIsAIPanelOpen }) => {
    const personas = Object.values(PERSONA_DETAILS);

    const handleSummon = (persona: Persona) => {
        setActivePersona(persona);
        setIsAIPanelOpen(true);
    };

    return (
        <div className="p-4 sm:p-6 h-full overflow-y-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-cinzel font-bold text-amber-600 tracking-wider">Meet The Gods</h1>
                <p className="mt-2 max-w-2xl mx-auto text-slate-700">
                    Three divine intelligences power your marketing empire. Understand their roles to command them effectively.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {personas.map(persona => {
                    const Icon = persona.icon;
                    return (
                        <div 
                            key={persona.name}
                            className={`bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm transition-all duration-300 ${personaShadowMap[persona.name]}`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className={`mb-4 p-4 rounded-full bg-${persona.color}-100`}>
                                    <Icon className={`w-16 h-16 text-${persona.color}-600`} />
                                </div>
                                <h2 className={`text-2xl font-cinzel font-bold text-${persona.color}-700`}>{persona.name}</h2>
                                <p className="text-sm font-semibold text-slate-800 mt-1">{persona.title}</p>
                                <p className="text-sm text-slate-600 mt-4 h-16">{persona.description}</p>
                                
                                <div className="w-full border-t border-slate-300 my-4"></div>

                                <p className="text-sm italic text-slate-600 h-20">"{persona.dialogue}"</p>

                                <button 
                                    onClick={() => handleSummon(persona.name)}
                                    className={`mt-4 w-full bg-${persona.color}-500 hover:bg-${persona.color}-600 text-slate-900 font-bold py-2 rounded-lg transition-colors`}>
                                    Summon {persona.name}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AgentsPage;