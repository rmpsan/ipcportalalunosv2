import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, LlmProvider, IAHubSubView } from '../../types';
import { LLM_CONFIG } from '../../constants';

import IASidebar from './ia_hub_components/IASidebar';
import LLMSelector from './ia_hub_components/LLMSelector';
import ChatWelcome from './ia_hub_components/ChatWelcome';
import ChatMessageBubble from './ia_hub_components/ChatMessage';
import WelcomePopup from './ia_hub_components/WelcomePopup';

const IAHubView: React.FC = () => {
    const [activeLlm, setActiveLlm] = useState<LlmProvider>(LlmProvider.CLAUDE);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeSubView, setActiveSubView] = useState<IAHubSubView>(IAHubSubView.PLAYGROUND);
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);

    const chatHistoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Mostrar popup sempre que acessar o Hub de IA
        setShowWelcomePopup(true);
    }, []);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);
    
    const startNewChat = () => {
        setMessages([]);
    }

    const handleSendMessage = async (prompt: string) => {
        const messageText = prompt.trim();
        if (!messageText || isLoading) return;

        setInputValue('');
        setIsLoading(true);

        const userMessage: ChatMessage = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage, { sender: 'ai', text: 'Esta funcionalidade está temporariamente desabilitada. Por favor, tente novamente mais tarde.', provider: activeLlm }]);

        setIsLoading(false);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputValue);
    };

    const MainContent = () => (
        <div className="flex-1 flex flex-col h-full bg-gray-100 relative">
            <header className="absolute top-0 left-0 right-0 p-4 flex justify-center z-10">
                <LLMSelector activeLlm={activeLlm} setActiveLlm={setActiveLlm} />
            </header>
            
            <div ref={chatHistoryRef} className="flex-1 overflow-y-auto p-6 pt-20 pb-28 custom-scrollbar">
                {messages.length === 0 ? (
                    <ChatWelcome llm={activeLlm} onPromptClick={handleSendMessage} />
                ) : (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map((msg, index) => (
                            <ChatMessageBubble key={index} message={msg} />
                        ))}
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 via-gray-100/90 to-transparent p-6">
                 <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={`Converse com ${LLM_CONFIG[activeLlm].name}...`}
                            className="flex-grow bg-transparent text-gray-800 focus:outline-none text-lg"
                            disabled={isLoading}
                        />
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Anexar arquivo"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            </button>
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isLoading}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-lg transition-all disabled:cursor-not-allowed shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-3 gap-4 text-xs text-gray-500">
                        <span>💡 Dica: Use prompts específicos para melhores resultados</span>
                        <span>•</span>
                        <span>🎓 Acesso educacional gratuito</span>
                    </div>
                 </form>
            </div>
        </div>
    );

     const SubViewContent = () => {
        switch(activeSubView) {
            case IAHubSubView.VIDEO_AI:
                return <div className="p-8 animate-[fadeInUp_0.4s_ease-out] space-y-6">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold mb-4 text-gray-900">🎬 IA para Vídeo - Playground dos Sonhos</h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Acesso gratuito às principais ferramentas de IA para vídeo do mercado. Transforme suas ideias em realidade visual!</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Runway ML */}
                        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold">Runway ML</h4>
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                                </div>
                            </div>
                            <p className="text-purple-100 mb-4">Geração de vídeo a partir de texto e imagens. Edição avançada com IA.</p>
                            <div className="flex items-center justify-between">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">GRATUITO</span>
                                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">Usar Agora</button>
                            </div>
                        </div>

                        {/* Pika Labs */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold">Pika Labs</h4>
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                                </div>
                            </div>
                            <p className="text-blue-100 mb-4">Criação de vídeos cinematográficos com prompts simples.</p>
                            <div className="flex items-center justify-between">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">GRATUITO</span>
                                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">Usar Agora</button>
                            </div>
                        </div>

                        {/* OpenAI Sora */}
                        <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold">OpenAI Sora</h4>
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                </div>
                            </div>
                            <p className="text-green-100 mb-4">Vídeos ultra-realistas de até 60 segundos com qualidade profissional.</p>
                            <div className="flex items-center justify-between">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">GRATUITO</span>
                                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">Usar Agora</button>
                            </div>
                        </div>

                        {/* Stable Video Diffusion */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold">Stable Video</h4>
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                </div>
                            </div>
                            <p className="text-orange-100 mb-4">Transforme imagens estáticas em vídeos dinâmicos.</p>
                            <div className="flex items-center justify-between">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">GRATUITO</span>
                                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">Usar Agora</button>
                            </div>
                        </div>

                        {/* LumaAI Dream Machine */}
                        <div className="bg-gradient-to-br from-pink-500 to-pink-700 p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold">Luma Dream</h4>
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                                </div>
                            </div>
                            <p className="text-pink-100 mb-4">Geração de vídeos 3D realistas com física avançada.</p>
                            <div className="flex items-center justify-between">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">GRATUITO</span>
                                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">Usar Agora</button>
                            </div>
                        </div>

                        {/* Synthesia */}
                        <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-6 rounded-xl text-white hover:scale-105 transition-transform cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold">Synthesia</h4>
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                </div>
                            </div>
                            <p className="text-teal-100 mb-4">Avatares IA realistas para apresentações e conteúdo educacional.</p>
                            <div className="flex items-center justify-between">
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">GRATUITO</span>
                                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">Usar Agora</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl mt-8">
                        <h4 className="text-xl font-bold text-gray-800 mb-3">🚀 Playground Exclusivo IPC</h4>
                        <p className="text-gray-700 mb-4">Como aluno do Instituto Paulista de Cinema, você tem acesso gratuito e ilimitado a todas essas ferramentas premium através de nossas APIs educacionais.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">✨ Sem limites de uso</span>
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">🎓 Suporte educacional</span>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">💰 100% gratuito</span>
                        </div>
                    </div>
                </div>;
            case IAHubSubView.TEMPLATES:
                return <div className="p-8 animate-[fadeInUp_0.4s_ease-out] space-y-6">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold mb-4 text-gray-900">📝 Templates & Prompts Profissionais</h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Prompts testados e otimizados para maximizar o potencial das IAs em projetos audiovisuais.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Roteiro */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="text-2xl">🎬</span> Roteiro & Storytelling
                            </h4>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Estrutura de Três Atos</p>
                                    <p className="text-xs text-gray-600">Template completo para desenvolver roteiros cinematográficos</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Desenvolvimento de Personagens</p>
                                    <p className="text-xs text-gray-600">Crie personagens complexos e memoráveis</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Diálogos Naturais</p>
                                    <p className="text-xs text-gray-600">Técnicas para escrever diálogos autênticos</p>
                                </div>
                            </div>
                        </div>

                        {/* Produção */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="text-2xl">🎥</span> Produção & Direção
                            </h4>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Plano de Filmagem</p>
                                    <p className="text-xs text-gray-600">Organize suas filmagens de forma eficiente</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Direção de Arte</p>
                                    <p className="text-xs text-gray-600">Desenvolva a identidade visual do seu projeto</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Casting & Direção de Atores</p>
                                    <p className="text-xs text-gray-600">Encontre e dirija o elenco perfeito</p>
                                </div>
                            </div>
                        </div>

                        {/* Pós-Produção */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="text-2xl">✂️</span> Pós-Produção
                            </h4>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Edição Narrativa</p>
                                    <p className="text-xs text-gray-600">Técnicas de montagem para diferentes gêneros</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Color Grading</p>
                                    <p className="text-xs text-gray-600">Paletas de cores e atmosferas visuais</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Sound Design</p>
                                    <p className="text-xs text-gray-600">Crie paisagens sonoras imersivas</p>
                                </div>
                            </div>
                        </div>

                        {/* Marketing */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="text-2xl">📈</span> Marketing & Distribuição
                            </h4>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Estratégia de Lançamento</p>
                                    <p className="text-xs text-gray-600">Planeje o lançamento do seu projeto</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Redes Sociais</p>
                                    <p className="text-xs text-gray-600">Conteúdo para divulgação digital</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <p className="font-semibold text-sm text-gray-800">Pitch Deck</p>
                                    <p className="text-xs text-gray-600">Apresente seu projeto para investidores</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
            case IAHubSubView.TRILHA:
                return <div className="p-8 animate-[fadeInUp_0.4s_ease-out] space-y-4">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Trilha de IA Audiovisual</h3>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between"><div><b>Módulo 1:</b> Fundamentos de IA Generativa</div><div className="text-sm font-bold text-green-600">Concluído</div></div>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between"><div><b>Módulo 2:</b> IA para Roteiro e Storytelling</div><div className="text-sm font-bold text-blue-600">Em Andamento</div></div>
                    </div>
                </div>;
            case IAHubSubView.RECURSOS:
                return <div className="p-8 animate-[fadeInUp_0.4s_ease-out] space-y-4">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Recursos de Inovação</h3>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"><b>Workshop:</b> Criando Efeitos Visuais com IA</div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"><b>Tutorial:</b> Storytelling para Realidade Virtual</div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"><b>Laboratório:</b> Animações 2D/3D e Motion Graphics</div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer col-span-1 md:col-span-2">
                            <h4 className="font-bold mb-2">Case de Sucesso: "O Fantástico Laboratório"</h4>
                            <p className="text-sm text-gray-600">Veja como aplicamos IA em nosso filme financiado com R$ 2 milhões pela FSA/ANCINE, que serve como laboratório para as tecnologias de ponta que você aprende aqui.</p>
                        </div>
                     </div>
                </div>;
            case IAHubSubView.PLAYGROUND:
            default:
                return <MainContent />;
        }
    }


    return (
        <div className="flex h-[calc(100vh-80px)] bg-gray-100 animate-[fadeInUp_0.5s_ease-out] -m-6 md:-m-10">
            <IASidebar activeSubView={activeSubView} setActiveSubView={setActiveSubView} onNewChat={startNewChat} />
            <div className="flex-1 flex flex-col h-full">
                {SubViewContent()}
            </div>
            <WelcomePopup 
                isOpen={showWelcomePopup} 
                onClose={() => setShowWelcomePopup(false)} 
            />
        </div>
    );
};

export default IAHubView;
