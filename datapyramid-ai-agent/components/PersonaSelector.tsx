import React from 'react';
import { Persona } from '../types';
import { PERSONA_DETAILS } from '../constants';

interface PersonaSelectorProps {
  activePersona: Persona;
  setActivePersona: (persona: Persona) => void;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ activePersona, setActivePersona }) => {
  const personas = Object.values(PERSONA_DETAILS);

  const activeColorMap: { [key in Persona]: string } = {
    [Persona.ISIS]: 'bg-amber-100 border-amber-500 glowing-shadow-amber',
    [Persona.NOAH]: 'bg-cyan-100 border-cyan-500 glowing-shadow-cyan',
    [Persona.HORUS]: 'bg-indigo-100 border-indigo-500 glowing-shadow-indigo',
  };

  const hoverColorMap: { [key in Persona]: string } = {
    [Persona.ISIS]: 'hover:border-amber-400 hover:bg-amber-500/20',
    [Persona.NOAH]: 'hover:border-cyan-400 hover:bg-cyan-500/20',
    [Persona.HORUS]: 'hover:border-indigo-400 hover:bg-indigo-500/20',
  };

  return (
    <div className="bg-slate-50/50 backdrop-blur-sm rounded-lg p-4 border border-slate-300">
      <h2 className="font-cinzel text-lg mb-4 text-amber-600">Choose Your Guide</h2>
      <div className="space-y-3">
        {personas.map((persona) => {
          const Icon = persona.icon;
          return (
            <button
              key={persona.name}
              onClick={() => setActivePersona(persona.name)}
              className={`w-full flex items-center p-3 rounded-lg border-2 transition-all duration-300 ${
                activePersona === persona.name
                  ? `${activeColorMap[persona.name]}`
                  : `border-slate-400 ${hoverColorMap[persona.name]}`
              }`}
            >
              <Icon className={`w-8 h-8 mr-4 text-${persona.color}-600`} />
              <div>
                <h3 className={`font-bold text-lg text-${persona.color}-700`}>{persona.name}</h3>
                <p className="text-xs text-slate-600">{persona.title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PersonaSelector;