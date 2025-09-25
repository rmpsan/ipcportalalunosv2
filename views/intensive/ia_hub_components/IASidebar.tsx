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
        <aside className="bg-gray-800 text-gray-300 p-4 flex flex-col" style={{ width: '220px', minWidth: '220px', maxWidth: '220px' }}>
            <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-between text-left p-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors text-sm"
            >
                <span>Novo Chat</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            </button>
            
            <div className="mt-4 flex-grow space-y-1 overflow-y-auto">
                <p className="px-2 text-xs font-semibold text-gray-500 uppercase">Conversas Anteriores</p>
                {['Ideias de Roteiro', 'Técnicas de Iluminação', 'Análise de Filme Noir'].map(chat => (
                    <a href="#" key={chat} className="block p-2 rounded-lg hover:bg-gray-700 truncate text-xs transition-colors">{chat}</a>
                ))}
            </div>

            <div className="mt-auto pt-3 border-t border-gray-700 space-y-1">
                 <button
                    onClick={() => setActiveSubView(IAHubSubView.PLAYGROUND)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${activeSubView === IAHubSubView.PLAYGROUND ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    Playground LLMs
                </button>
                 <button
                    onClick={() => setActiveSubView(IAHubSubView.VIDEO_AI)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${activeSubView === IAHubSubView.VIDEO_AI ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    IA para Vídeo
                </button>
                 <button
                    onClick={() => setActiveSubView(IAHubSubView.TEMPLATES)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${activeSubView === IAHubSubView.TEMPLATES ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Templates & Prompts
                </button>
                 <button
                    onClick={() => setActiveSubView(IAHubSubView.TRILHA)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${activeSubView === IAHubSubView.TRILHA ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h12a2 2 0 012 2v2m-6 0h.01M9 16h.01" /></svg>
                    Minha Trilha
                </button>
                 <button
                    onClick={() => setActiveSubView(IAHubSubView.RECURSOS)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${activeSubView === IAHubSubView.RECURSOS ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Recursos
                </button>
            </div>
        </aside>
    );
};

export default IASidebar;
