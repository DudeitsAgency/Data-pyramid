import React from 'react';
import { Persona, Page } from '../types';
import { ArrowRightIcon, CpuChipIcon, LightBulbIcon, UserGroupIcon } from '@heroicons/react/24/solid';

interface HomePageProps {
    setCurrentPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  
  const actionCards = [
    { title: 'Launch Campaign', description: 'Let Isis guide you in creating a new campaign from scratch.', icon: CpuChipIcon, page: Page.CAMPAIGNS, color: 'amber' },
    { title: 'Explore Insights', description: 'Consult Horus to analyze performance and uncover strategic opportunities.', icon: LightBulbIcon, page: Page.INSIGHTS, color: 'indigo' },
    { title: 'Meet the Gods', description: 'Learn more about the AI agents at your command.', icon: UserGroupIcon, page: Page.AGENTS, color: 'cyan' },
  ];

  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto">
      {/* Hero Section */}
      <div className="text-center py-10 px-4 rounded-lg bg-slate-50/80 backdrop-blur-md border border-slate-300 shadow-sm mb-6">
        <h1 className="text-4xl lg:text-5xl font-cinzel font-bold tracking-wider bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
          Enter the Temple of Marketing Intelligence
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-slate-700">
          Welcome, Strategist. The divine marketing AIs—Isis, Noah, and Horus—await your command. Summon them anytime to launch campaigns and uncover insights to build your empire.
        </p>
      </div>

      {/* Main Content - Action Cards */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-cinzel text-amber-600 text-center mb-6">What is your command?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actionCards.map(card => (
            <button
              key={card.title}
              onClick={() => setCurrentPage(card.page)}
              className={`w-full bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm hover:border-${card.color}-400 transition-colors text-left group flex flex-col items-center text-center h-full`}
            >
              <card.icon className={`w-10 h-10 mb-4 text-${card.color}-500`} />
              <h3 className={`font-bold text-lg text-${card.color}-600`}>{card.title}</h3>
              <p className="text-xs text-slate-600 mt-2 flex-grow">{card.description}</p>
              <ArrowRightIcon className="w-5 h-5 text-slate-500 group-hover:text-slate-800 transition-colors mt-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;