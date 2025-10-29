
import React from 'react';

const WalletWidget: React.FC = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
      <h2 className="font-cinzel text-lg mb-4 text-amber-300">Campaign Wallet</h2>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-slate-400">Current Balance</p>
          <p className="text-2xl font-bold text-green-400">$10,482.50</p>
        </div>
        <div>
          <p className="text-sm text-slate-400">Monthly Spend</p>
          <p className="text-xl font-medium text-red-400">$4,517.50</p>
        </div>
        <button className="w-full bg-amber-600 hover:bg-amber-500 text-slate-900 font-bold py-2 rounded-lg transition-colors">
          Fund Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletWidget;
