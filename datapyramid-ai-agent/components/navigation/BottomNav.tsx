import React from 'react';
import { Page } from '../../types';
import { 
  HomeIcon, 
  CpuChipIcon, 
  LightBulbIcon,
  CreditCardIcon, 
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const navItems = [
  { page: Page.HOME, icon: HomeIcon },
  { page: Page.CAMPAIGNS, icon: CpuChipIcon },
  { page: Page.INSIGHTS, icon: LightBulbIcon },
  { page: Page.WALLET, icon: CreditCardIcon },
  { page: Page.REPORTS, icon: DocumentTextIcon },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-slate-50/80 backdrop-blur-md border-t border-slate-300 flex items-center justify-around z-30">
      {navItems.map(({ page, icon: Icon }) => {
        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors duration-200 ${
              isActive ? 'text-amber-600' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{page}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;