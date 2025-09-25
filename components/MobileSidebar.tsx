import React, { useState, useEffect } from 'react';
import { ICONS, SIDEBAR_LINKS } from '../constants';
import { IntensiveView } from '../types';

interface MobileSidebarProps {
  activeView: IntensiveView;
  setActiveView: (view: IntensiveView) => void;
  onLogout: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ activeView, setActiveView, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Fechar sidebar quando mudar de view
  useEffect(() => {
    setIsOpen(false);
  }, [activeView]);

  // Prevenir scroll do body quando sidebar estiver aberta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Agrupar links por categoria
  const essentialLinks = SIDEBAR_LINKS.filter(link => link.category === 'essential');
  const productionLinks = SIDEBAR_LINKS.filter(link => link.category === 'production');
  const developmentLinks = SIDEBAR_LINKS.filter(link => link.category === 'development');
  const adminLinks = SIDEBAR_LINKS.filter(link => link.category === 'admin');

  const renderMenuSection = (title: string, links: any[], accentColor: string) => (
    <div className="mb-6">
      <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${accentColor} px-4`}>
        {title}
      </h3>
      <div className="space-y-1">
        {links.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveView(id);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 py-4 px-4 transition-all duration-300 touch-manipulation ${
              activeView === id 
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg' 
                : 'hover:bg-gray-700/50 hover:text-white active:bg-gray-600/50'
            }`}
          >
            <span className={`text-lg ${
              activeView === id ? 'scale-110' : ''
            }`}>
              {icon}
            </span>
            <span className="font-medium text-base">{label}</span>
            {activeView === id && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Botão do Menu Hambúrguer */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg touch-manipulation"
        aria-label="Menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${
            isOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}></span>
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Mobile */}
      <aside className={`md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 z-50 transform transition-transform duration-300 ease-in-out safe-area-inset ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="font-bold text-xl text-white mb-1">Portal do Aluno</h2>
            <p className="text-sm text-gray-400">IPC São Paulo</p>
            <div className="w-full h-px bg-gradient-to-r from-teal-500 to-transparent mt-3"></div>
          </div>

          {/* Menu Sections */}
          <nav className="flex-grow overflow-y-auto scroll-smooth-mobile py-4">
            {renderMenuSection('Essenciais', essentialLinks, 'text-teal-400')}
            {renderMenuSection('Produção', productionLinks, 'text-blue-400')}
            {renderMenuSection('Desenvolvimento', developmentLinks, 'text-purple-400')}
            {adminLinks.length > 0 && renderMenuSection('Administrativo', adminLinks, 'text-red-400')}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 py-4 px-4 rounded-xl transition-all duration-300 hover:bg-red-500/10 hover:text-red-400 active:bg-red-500/20 touch-manipulation"
            >
              <span className="text-lg">
                {ICONS.logout}
              </span>
              <span className="font-medium text-base">Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;