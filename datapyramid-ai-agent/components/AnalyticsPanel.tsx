
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_ANALYTICS_DATA } from '../constants';

const AnalyticsPanel: React.FC = () => {
  return (
    <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-4 border border-slate-300 shadow-sm h-full flex flex-col">
      <h2 className="font-cinzel text-lg mb-4 text-amber-600">Performance Analytics</h2>
      <div className="flex-grow text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MOCK_ANALYTICS_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
            <XAxis dataKey="name" stroke="#475569" />
            <YAxis stroke="#475569" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(241, 245, 249, 0.9)',
                borderColor: '#cbd5e1',
                borderRadius: '0.5rem',
              }}
              cursor={{ fill: 'rgba(251, 191, 36, 0.1)' }}
            />
            <Legend wrapperStyle={{fontSize: "0.75rem"}}/>
            <Bar dataKey="Clicks" fill="#f59e0b" />
            <Bar dataKey="Spend" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPanel;