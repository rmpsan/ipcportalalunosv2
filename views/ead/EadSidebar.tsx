import React from 'react';
import { ICONS, EAD_SIDEBAR_LINKS } from '../../constants';
import { EadView } from '../../types';

interface EadSidebarProps {
  activeView: EadView;
  setActiveView: (view: EadView) => void;
  onLogout: () => void;
}

const EadSidebar: React.FC<EadSidebarProps> = ({ activeView, setActiveView, onLogout }) => {
  return (
    <aside className="w-64 bg-gray-800 text-gray-300 p-6 hidden md:flex flex-col min-h-screen">
      <h2 className="font-bold text-xl mb-8 text-white">Portal EAD Brasil</h2>
      <nav className="space-y-2 flex-grow">
        {EAD_SIDEBAR_LINKS.map(({ id, label, icon }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveView(id);
            }}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg transition-all duration-200 ${
              activeView === id ? 'bg-cyan-500 text-white translate-x-1' : 'hover:bg-gray-700 hover:text-white'
            }`}
          >
            {icon}
            {label}
          </a>
        ))}
      </nav>
      <div className="mt-auto">
        <a
          href="#logout"
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
          className="flex items-center gap-3 py-2 px-4 rounded-lg transition-colors hover:bg-gray-700 hover:text-white"
        >
          {ICONS.logout}
          Sair
        </a>
      </div>
    </aside>
  );
};

export default EadSidebar;
