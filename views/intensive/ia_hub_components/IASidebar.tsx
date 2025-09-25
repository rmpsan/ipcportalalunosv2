import React from 'react';
import { IAHubSubView } from '../../../types';

interface IASidebarProps {
    activeSubView: IAHubSubView;
    setActiveSubView: (view: IAHubSubView) => void;
    onNewChat: () => void;
}

const IASidebar: React.FC<IASidebarProps> = ({ activeSubView, setActiveSubView, onNewChat }) => {

    const handleNewChat = () => {
        setActiveSubView(IAHubSubView.PLAYGROUND);
        onNewChat();
    }

    return (
        <aside className="w-72 bg-gray-800 text-gray-300 p-4 flex flex-col">
            <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-between text-left p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
            >
                <span>Novo Chat</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            </button>
            
            <div className="mt-6 flex-grow space-y-2 overflow-y-auto">
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase">Conversas Anteriores</p>
                {['Ideias de Roteiro', 'Técnicas de Iluminação', 'Análise de Filme Noir'].map(chat => (
                    <a href="#" key={chat} className="block p-3 rounded-lg hover:bg-gray-700 truncate text-sm transition-colors">{chat}</a>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-700 space-y-1">
                 <button
                    onClick={() => setActiveSubView(IAHubSubView.TRILHA)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors flex items-center gap-3 ${activeSubView === IAHubSubView.TRILHA ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    Minha Trilha
                </button>
                 <button
                    onClick={() => setActiveSubView(IAHubSubView.RECURSOS)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors flex items-center gap-3 ${activeSubView === IAHubSubView.RECURSOS ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Recursos
                </button>
            </div>
        </aside>
    );
};

export default IASidebar;
