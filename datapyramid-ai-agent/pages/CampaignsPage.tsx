import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { supabase } from '../lib/supabaseClient';

// Type definition for a campaign object
interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Completed' | 'Draft';
  spend: number;
  cpa: number;
  channel: 'Google' | 'Meta' | 'TikTok';
  start: number;
  duration: number;
}

const statusStyles: { [key: string]: string } = {
    'Active': 'bg-green-100 text-green-800',
    'Paused': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'Draft': 'bg-slate-200 text-slate-800'
}

const channelColors: { [key: string]: string } = {
    'Google': 'bg-red-500',
    'Meta': 'bg-blue-500',
    'TikTok': 'bg-cyan-400'
}

const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('campaigns')
          .select('*');
        
        if (error) throw error;

        // Ensure data matches the Campaign type structure.
        // Supabase might return different column names (e.g., snake_case).
        // For this example, we assume they match.
        setCampaigns(data as Campaign[]);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-cinzel font-bold text-amber-600 tracking-wider">Campaigns</h1>
        <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors glowing-shadow-amber">
          <PlusIcon className="w-5 h-5" />
          Create Campaign
        </button>
      </div>

      <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-4 border border-slate-300 shadow-sm mb-6">
        <div className="overflow-x-auto">
            {loading ? (
              <p className="text-center p-8 text-slate-600">Loading campaigns from the archives...</p>
            ) : error ? (
              <p className="text-center p-8 text-red-600">Error: {error}</p>
            ) : (
              <table className="w-full text-sm text-left text-slate-700">
                  <thead className="text-xs text-amber-700 uppercase bg-slate-200/50 font-cinzel">
                      <tr>
                          <th scope="col" className="px-6 py-3">Campaign Name</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                          <th scope="col" className="px-6 py-3">Channel</th>
                          <th scope="col" className="px-6 py-3 text-right">Spend</th>
                          <th scope="col" className="px-6 py-3 text-right">CPA</th>
                      </tr>
                  </thead>
                  <tbody>
                      {campaigns.map(campaign => (
                          <tr key={campaign.id} className="border-b border-slate-300 hover:bg-slate-200/50">
                              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-slate-900">{campaign.name}</th>
                              <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[campaign.status]}`}>{campaign.status}</span>
                              </td>
                              <td className="px-6 py-4">{campaign.channel}</td>
                              <td className="px-6 py-4 text-right font-mono">${campaign.spend.toLocaleString()}</td>
                              <td className="px-6 py-4 text-right font-mono">${campaign.cpa.toFixed(2)}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            )}
        </div>
      </div>
      
      <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-4 border border-slate-300 shadow-sm">
        <h2 className="font-cinzel text-xl text-amber-600 mb-4">Campaign Timeline</h2>
        <div className="relative space-y-3">
          {/* Timeline background */}
          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-30 gap-px">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className={`h-full ${i % 7 === 0 ? 'bg-slate-300/50' : 'bg-slate-300/20'}`}></div>
            ))}
          </div>
          {campaigns.filter(c => c.status !== 'Draft').map((campaign, index) => (
            <div key={campaign.id} className="relative h-10 flex items-center">
              <div 
                className={`absolute h-8 rounded-md ${channelColors[campaign.channel]} opacity-80 flex items-center px-2`}
                style={{
                  left: `calc(${(campaign.start / 30) * 100}%)`,
                  width: `calc(${(campaign.duration / 30) * 100}%)`,
                }}
              >
                <span className="text-xs font-bold text-white truncate">{campaign.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;