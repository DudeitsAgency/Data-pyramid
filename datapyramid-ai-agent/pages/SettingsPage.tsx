import React, { useState } from 'react';
import { UserCircleIcon, BellIcon, LinkIcon } from '@heroicons/react/24/outline';

const SettingsPage: React.FC = () => {
  const [userEmail] = useState('demo@datapyramid.com');

  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto">
      <h1 className="text-3xl font-cinzel font-bold text-amber-600 tracking-wider mb-6">Settings</h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Settings */}
        <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <UserCircleIcon className="w-8 h-8 text-amber-600"/>
            <h2 className="font-cinzel text-xl text-amber-600">Profile</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label className="text-sm text-slate-600">Full Name</label>
                <input type="text" defaultValue="Akhenaten" className="w-full mt-1 bg-white border border-slate-400 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
            </div>
            <div>
                <label className="text-sm text-slate-600">Email Address</label>
                <input type="email" value={userEmail} disabled className="w-full mt-1 bg-slate-200 border border-slate-400 rounded-lg py-2 px-3 text-slate-700 cursor-not-allowed"/>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <BellIcon className="w-8 h-8 text-amber-600"/>
            <h2 className="font-cinzel text-xl text-amber-600">Notifications</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p>Weekly Performance Summaries</p>
                <input type="checkbox" className="toggle-checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
                <p>Campaign Completion Alerts</p>
                <input type="checkbox" className="toggle-checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
                <p>Low Balance Warnings</p>
                <input type="checkbox" className="toggle-checkbox" />
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <LinkIcon className="w-8 h-8 text-amber-600"/>
            <h2 className="font-cinzel text-xl text-amber-600">Connected Ad Accounts</h2>
          </div>
           <p className="text-sm text-slate-600">Connect your ad platforms to allow the AI to manage campaigns directly.</p>
           <div className="mt-4 flex gap-4">
                <button className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-lg">Connect Google Ads</button>
                <button className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-lg">Connect Meta</button>
           </div>
        </div>
      </div>
       <style>{`
        .toggle-checkbox {
            appearance: none;
            width: 3.5rem;
            height: 1.75rem;
            border-radius: 9999px;
            background-color: #94a3b8;
            position: relative;
            transition: background-color 0.2s ease-in-out;
            cursor: pointer;
        }
        .toggle-checkbox:checked {
            background-color: #f59e0b;
        }
        .toggle-checkbox::before {
            content: '';
            position: absolute;
            top: 0.25rem;
            left: 0.25rem;
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 9999px;
            background-color: white;
            transition: transform 0.2s ease-in-out;
        }
        .toggle-checkbox:checked::before {
            transform: translateX(1.75rem);
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;