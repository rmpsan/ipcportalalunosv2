
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="https://institutopaulistadecinema.com.br/" target="_blank" rel="noopener noreferrer">
            <img src="https://gov.institutopaulistadecinema.com.br/images/logo_para_menu.png" alt="Instituto Paulista de Cinema Logo" className="h-10" />
        </a>
        
        <div className="flex items-center gap-6">
          {/* Link para Home do Instituto */}
          <a 
            href="https://institutopaulistadecinema.com.br/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-teal-400 transition-colors font-medium hidden sm:inline-block"
          >
            Home do Instituto
          </a>
          
          {user && (
            <div className="flex items-center gap-4 text-white">
              <span className="font-semibold hidden sm:inline">{user.name}</span>
              <img src={`https://i.pravatar.cc/40?u=${user.name}`} alt="User Avatar" className="rounded-full h-10 w-10 border-2 border-teal-500" />
              <button onClick={onLogout} className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
