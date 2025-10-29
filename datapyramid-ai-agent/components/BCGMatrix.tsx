
import React from 'react';
// FIX: BCGQuadrant is a type and should be imported from types.ts
import { MOCK_BCG_ITEMS } from '../constants';
import { BCGQuadrant } from '../types';
import { StarIcon, QuestionMarkCircleIcon, CurrencyDollarIcon, XCircleIcon } from '@heroicons/react/24/solid';

const quadrantConfig = {
    [BCGQuadrant.STAR]: { icon: StarIcon, color: 'text-yellow-600', label: 'Stars' },
    [BCGQuadrant.QUESTION_MARK]: { icon: QuestionMarkCircleIcon, color: 'text-blue-600', label: 'Question Marks' },
    [BCGQuadrant.CASH_COW]: { icon: CurrencyDollarIcon, color: 'text-green-600', label: 'Cash Cows' },
    [BCGQuadrant.DOG]: { icon: XCircleIcon, color: 'text-red-600', label: 'Dogs' },
};

const BCGMatrix: React.FC = () => {
  return (
    <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-4 border border-slate-300 shadow-sm h-full flex flex-col">
      <h2 className="font-cinzel text-lg mb-4 text-amber-600">Portfolio Matrix</h2>
      <div className="flex-grow grid grid-cols-2 grid-rows-2 gap-2 relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 text-xs text-slate-600 font-bold tracking-wider">MARKET GROWTH</div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-slate-600 font-bold tracking-wider">MARKET SHARE</div>
        
        {/* FIX: Cast Object.values(BCGQuadrant) to ensure 'quadrant' has the correct type for indexing and key props. */}
        {(Object.values(BCGQuadrant) as BCGQuadrant[]).map((quadrant) => {
          const config = quadrantConfig[quadrant];
          const Icon = config.icon;
          const items = MOCK_BCG_ITEMS.filter(item => item.quadrant === quadrant);
          
          let positionClass = '';
          if (quadrant === BCGQuadrant.STAR) positionClass = 'col-start-2 row-start-1';
          if (quadrant === BCGQuadrant.QUESTION_MARK) positionClass = 'col-start-1 row-start-1';
          if (quadrant === BCGQuadrant.CASH_COW) positionClass = 'col-start-2 row-start-2';
          if (quadrant === BCGQuadrant.DOG) positionClass = 'col-start-1 row-start-2';

          return (
            <div key={quadrant} className={`${positionClass} bg-slate-200/50 rounded-md p-2 border border-slate-300 flex flex-col`}>
              <div className="flex items-center space-x-2">
                <Icon className={`w-5 h-5 ${config.color}`} />
                <h3 className={`font-bold text-sm ${config.color}`}>{config.label}</h3>
              </div>
              <div className="mt-2 space-y-1 text-xs">
                {items.map(item => (
                    <div key={item.id} className="bg-slate-300/50 p-1 rounded-sm truncate text-slate-800">{item.name}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BCGMatrix;