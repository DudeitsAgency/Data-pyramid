
import React from 'react';
import { MOCK_COMPETITOR_DATA } from '../constants';

const CompetitorPanel: React.FC = () => {
  const totalSpend = MOCK_COMPETITOR_DATA.reduce((acc, curr) => acc + curr.spend, 0);

  return (
    <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-4 border border-slate-300 shadow-sm flex-grow">
      <h2 className="font-cinzel text-lg mb-4 text-amber-600">Competitor Intel</h2>
      <div className="space-y-3">
        <p className="text-sm text-slate-600">Share of Voice</p>
        <div className="w-full flex h-6 rounded-full overflow-hidden bg-slate-300">
          {MOCK_COMPETITOR_DATA.map((competitor) => (
            <div
              key={competitor.name}
              className="flex items-center justify-center text-xs font-bold text-slate-900"
              style={{ width: `${competitor.voiceShare}%`, backgroundColor: competitor.color }}
              title={`${competitor.name}: ${competitor.voiceShare}%`}
            >
            </div>
          ))}
        </div>
        <ul className="text-xs space-y-1 pt-2">
            {MOCK_COMPETITOR_DATA.map((competitor) => (
                <li key={competitor.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: competitor.color}}></span>
                        <span className="text-slate-800">{competitor.name}</span>
                    </div>
                    <span className="font-mono text-slate-700">{competitor.voiceShare}%</span>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CompetitorPanel;