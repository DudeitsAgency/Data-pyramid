import React from 'react';
import AnalyticsPanel from '../components/AnalyticsPanel';
import BCGMatrix from '../components/BCGMatrix';
import CompetitorPanel from '../components/CompetitorPanel';
import { MOCK_ANALYTICS_DATA, MOCK_BCG_ITEMS, MOCK_COMPETITOR_DATA } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PresentationChartLineIcon, ChartPieIcon, StarIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { BCGQuadrant } from '../types';

const InsightsPage: React.FC = () => {
    const topCampaign = MOCK_BCG_ITEMS.find(item => item.quadrant === BCGQuadrant.STAR)?.name || 'N/A';
    const yourShareOfVoice = MOCK_COMPETITOR_DATA.find(c => c.name === 'You')?.voiceShare || 0;

    const kpiCards = [
        { title: 'Overall ROI', value: '350%', icon: PresentationChartLineIcon, color: 'text-cyan-600' },
        { title: 'Market Share', value: '20%', icon: ChartPieIcon, color: 'text-green-600' },
        { title: 'Top Campaign', value: topCampaign, icon: StarIcon, color: 'text-yellow-600' },
        { title: 'Share of Voice', value: `${yourShareOfVoice}%`, icon: MegaphoneIcon, color: 'text-indigo-600' },
    ];

    return (
        <div className="p-4 sm:p-6 h-full overflow-y-auto">
            <h1 className="text-3xl font-cinzel font-bold text-amber-600 tracking-wider mb-6">Strategic Insights</h1>
            
            {/* Topside KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {kpiCards.map(card => {
                    const Icon = card.icon;
                    return (
                        <div key={card.title} className="bg-slate-50/80 backdrop-blur-md rounded-lg p-5 border border-slate-300 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-600">{card.title}</p>
                                <Icon className={`w-6 h-6 text-slate-500`} />
                            </div>
                            <p className={`text-3xl font-bold ${card.color} mt-2 truncate`} title={card.value}>{card.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                 <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-4 border border-slate-300 shadow-sm h-96">
                    <h2 className="font-cinzel text-lg mb-4 text-amber-600">Spend & Clicks Over Time</h2>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={MOCK_ANALYTICS_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
                            <XAxis dataKey="name" stroke="#475569" />
                            <YAxis stroke="#475569" />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(241, 245, 249, 0.9)', borderColor: '#cbd5e1', borderRadius: '0.5rem' }} />
                            <Legend />
                            <Line type="monotone" dataKey="Clicks" stroke="#f59e0b" strokeWidth={2} />
                            <Line type="monotone" dataKey="Spend" stroke="#0ea5e9" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="h-96">
                    <AnalyticsPanel />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-96">
                    <BCGMatrix />
                </div>
                <div className="h-96">
                    <CompetitorPanel />
                </div>
            </div>
        </div>
    );
}

export default InsightsPage;