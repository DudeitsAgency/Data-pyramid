import React from 'react';
import { DocumentArrowDownIcon, ShareIcon } from '@heroicons/react/24/outline';

const mockReports = [
  { id: 'R01', name: 'Q4 2023 Performance Summary', date: '2024-01-05', type: 'Quarterly' },
  { id: 'R02', name: 'Anubis Campaign Deep Dive', date: '2023-12-20', type: 'Campaign' },
  { id: 'R03', name: 'November 2023 Channel Spend', date: '2023-12-01', type: 'Monthly' },
  { id: 'R04', name: 'Competitor SOV Analysis', date: '2023-11-15', type: 'Analysis' },
];

const ReportsPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto">
      <h1 className="text-3xl font-cinzel font-bold text-amber-600 tracking-wider mb-6">Reports</h1>
      
      <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-4 border border-slate-300 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="text-xs text-amber-700 uppercase bg-slate-200/50 font-cinzel">
              <tr>
                <th scope="col" className="px-6 py-3">Report Name</th>
                <th scope="col" className="px-6 py-3">Date Generated</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map(report => (
                <tr key={report.id} className="border-b border-slate-300 hover:bg-slate-200/50">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-slate-900">{report.name}</th>
                  <td className="px-6 py-4">{report.date}</td>
                  <td className="px-6 py-4">{report.type}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                        <button className="text-slate-600 hover:text-amber-600" title="Share Report">
                            <ShareIcon className="w-5 h-5"/>
                        </button>
                        <button className="text-slate-600 hover:text-amber-600" title="Download PDF">PDF</button>
                        <button className="text-slate-600 hover:text-amber-600" title="Download CSV">CSV</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;