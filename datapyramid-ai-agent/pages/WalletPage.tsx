import React, { useState, useEffect } from 'react';
import { CreditCardIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, PresentationChartLineIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const mockTransactions = [
  { id: 'T01', type: 'Deposit', amount: 5000, date: '2023-10-26', description: 'Monthly Budget Top-up' },
  { id: 'T02', type: 'Spend', amount: -1200, date: '2023-10-25', description: 'Google Ads - Anubis Campaign' },
  { id: 'T03', type: 'Spend', amount: -850, date: '2023-10-25', description: 'Meta Ads - Nile Sale' },
  { id: 'T04', type: 'Spend', amount: -400, date: '2023-10-24', description: 'TikTok Ads - Sphinx Challenge' },
  { id: 'T05', type: 'Deposit', amount: 2500, date: '2023-10-22', description: 'Performance Bonus Funding' },
];

const WalletPage: React.FC = () => {
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [balance, setBalance] = useState<number | null>(10482.50);

  const handleProceedToStripe = () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    const mockStripeUrl = 'https://buy.stripe.com/test_14k2a5a8A3e2b1i7ss'; 
    window.open(mockStripeUrl, '_blank');
    
    setIsFundModalOpen(false);
    setFundAmount('');
  };

  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto">
      <h1 className="text-3xl font-cinzel font-bold text-amber-600 tracking-wider mb-6">Campaign Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm">
            <p className="text-sm text-slate-600">Current Balance</p>
            <p className="text-4xl font-bold text-green-600 mt-2">
                {balance === null ? 'Loading...' : `$${balance.toLocaleString()}`}
            </p>
        </div>
        <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm">
            <p className="text-sm text-slate-600">Monthly Spend</p>
            <p className="text-4xl font-bold text-red-600 mt-2">$4,517.50</p>
        </div>
        <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Overall ROI</p>
                <PresentationChartLineIcon className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-4xl font-bold text-cyan-600 mt-2">350%</p>
        </div>
        <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm flex flex-col justify-center items-center">
             <button 
                onClick={() => setIsFundModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-lg transition-colors glowing-shadow-amber">
                <CreditCardIcon className="w-6 h-6" />
                Fund Wallet
            </button>
        </div>
      </div>

      <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-4 border border-slate-300 shadow-sm">
        <h2 className="font-cinzel text-xl text-amber-600 mb-4">Transaction History</h2>
        <ul className="space-y-3">
          {mockTransactions.map(tx => (
            <li key={tx.id} className="flex items-center justify-between p-3 bg-slate-200/80 rounded-lg">
              <div className="flex items-center gap-4">
                {tx.type === 'Deposit' ? (
                   <ArrowUpTrayIcon className="w-6 h-6 text-green-500" />
                ) : (
                    <ArrowDownTrayIcon className="w-6 h-6 text-red-500" />
                )}
                <div>
                  <p className="font-semibold text-slate-800">{tx.description}</p>
                  <p className="text-xs text-slate-600">{tx.date}</p>
                </div>
              </div>
              <p className={`font-mono font-bold text-lg ${tx.type === 'Deposit' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.type === 'Deposit' ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {isFundModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-50 rounded-lg p-6 border border-amber-500 glowing-shadow-amber w-full max-w-sm">
            <h2 className="font-cinzel text-xl text-amber-600 mb-4">Fund Your Wallet</h2>
            <p className="text-slate-600 mb-4 text-sm">Enter the amount to deposit. You will be redirected to Stripe for secure payment processing.</p>
            <div>
              <label htmlFor="amount" className="text-sm text-slate-600">Amount (USD)</label>
              <input
                id="amount"
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder="e.g., 500"
                className="w-full mt-1 bg-white border border-slate-400 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
            </div>
             <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>Powered by Stripe</span>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsFundModalOpen(false)}
                className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToStripe}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Proceed to Stripe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;