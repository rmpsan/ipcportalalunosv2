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
    <aside className="bg-gray-800 text-gray-300 p-4 hidden md:flex flex-col min-h-screen" style={{ width: '200px', minWidth: '200px', maxWidth: '200px' }}>
      <h2 className="font-bold text-lg mb-6 text-white">Portal EAD Brasil</h2>
      <nav className="space-y-1 flex-grow">
        {EAD_SIDEBAR_LINKS.map(({ id, label, icon }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveView(id);
            }}
            className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 text-sm ${
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
          className="flex items-center gap-2 py-2 px-3 rounded-lg transition-colors hover:bg-gray-700 hover:text-white text-sm"
        >
          {ICONS.logout}
          Sair
        </a>
      </div>
    </aside>
  );
};

export default EadSidebar;
