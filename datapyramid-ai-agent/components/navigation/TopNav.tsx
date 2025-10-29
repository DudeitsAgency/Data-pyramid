import React from 'react';
import { Page } from '../../types';
import { 
  HomeIcon, 
  UserGroupIcon,
  CpuChipIcon, 
  CreditCardIcon, 
  LightBulbIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

interface TopNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const navItems = [
  { page: Page.HOME, icon: HomeIcon },
  { page: Page.AGENTS, icon: UserGroupIcon },
  { page: Page.CAMPAIGNS, icon: CpuChipIcon },
  { page: Page.WALLET, icon: CreditCardIcon },
  { page: Page.INSIGHTS, icon: LightBulbIcon },
  { page: Page.REPORTS, icon: DocumentTextIcon },
];

const secondaryNavItems = [
    { page: Page.SETTINGS, icon: Cog6ToothIcon },
    { page: Page.HELP, icon: QuestionMarkCircleIcon },
]

const TopNav: React.FC<TopNavProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="w-full h-20 bg-slate-50/80 backdrop-blur-md border-b border-slate-300 flex items-center justify-between px-4 sm:px-6 z-20">
      {/* Left side: Logo */}
      <div className="flex items-center">
        <h1 className="text-lg font-cinzel font-bold tracking-widest text-slate-900">
          DATA PYRAMID
        </h1>
      </div>

      {/* Center: Main Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        {navItems.map(({ page, icon: Icon }) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              title={page}
              className={`px-4 py-2 rounded-lg transition-all duration-300 relative group flex items-center gap-2 text-sm ${
                isActive
                  ? 'bg-amber-100 text-amber-600'
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{page}</span>
            </button>
          );
        })}
      </nav>
      
      {/* Right side: Secondary Navigation */}
       <div className="flex items-center gap-2">
        {secondaryNavItems.map(({ page, icon: Icon }) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              title={page}
              className={`p-3 rounded-lg transition-all duration-300 relative group ${
                isActive
                  ? 'bg-amber-100 text-amber-600 glowing-shadow-amber'
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-bold text-slate-900 bg-amber-400 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {page}
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default TopNav;