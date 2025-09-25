
import React from 'react';
import { ICONS, SIDEBAR_LINKS } from '../constants';
import { IntensiveView } from '../types';

interface SidebarProps {
  activeView: IntensiveView;
  setActiveView: (view: IntensiveView) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout }) => {
  // Agrupar links por categoria
  const essentialLinks = SIDEBAR_LINKS.filter(link => link.category === 'essential');
  const productionLinks = SIDEBAR_LINKS.filter(link => link.category === 'production');
  const developmentLinks = SIDEBAR_LINKS.filter(link => link.category === 'development');
  const adminLinks = SIDEBAR_LINKS.filter(link => link.category === 'admin');

  const renderMenuSection = (title: string, links: any[], accentColor: string) => (
    <div className="mb-4">
      <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${accentColor}`}>
        {title}
      </h3>
      <div className="space-y-1">
        {links.map(({ id, label, icon }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveView(id);
            }}
            className={`group flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 ${
              activeView === id 
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25 transform translate-x-1' 
                : 'hover:bg-gray-700/50 hover:text-white hover:translate-x-0.5'
            }`}
          >
            <span className={`transition-transform duration-300 text-sm ${
              activeView === id ? 'scale-110' : 'group-hover:scale-105'
            }`}>
              {icon}
            </span>
            <span className="font-medium text-sm">{label}</span>
            {activeView === id && (
              <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            )}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 p-4 hidden lg:flex flex-col min-h-screen shadow-2xl" style={{ width: '220px', minWidth: '220px', maxWidth: '220px' }}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-bold text-lg text-white mb-1">Portal do Aluno</h2>
        <p className="text-xs text-gray-400">IPC São Paulo</p>
        <div className="w-full h-px bg-gradient-to-r from-teal-500 to-transparent mt-3"></div>
      </div>

      {/* Menu Sections */}
      <nav className="flex-grow overflow-y-auto">
        {renderMenuSection('Essenciais', essentialLinks, 'text-teal-400')}
        {renderMenuSection('Produção', productionLinks, 'text-blue-400')}
        {renderMenuSection('Desenvolvimento', developmentLinks, 'text-purple-400')}
        {adminLinks.length > 0 && renderMenuSection('Administrativo', adminLinks, 'text-red-400')}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-700">
        <a
          href="#logout"
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
          className="group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
        >
          <span className="transition-transform duration-300 group-hover:scale-105">
            {ICONS.logout}
          </span>
          <span className="font-medium">Sair</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
