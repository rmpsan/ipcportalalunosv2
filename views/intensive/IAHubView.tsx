import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { createChatSession, sendMessageStream } from '../../services/geminiService';
import { ChatMessage, LlmProvider, IAHubSubView } from '../../types';
import { LLM_CONFIG } from '../../constants';

import IASidebar from './ia_hub_components/IASidebar';
import LLMSelector from './ia_hub_components/LLMSelector';
import ChatWelcome from './ia_hub_components/ChatWelcome';
import ChatMessageBubble from './ia_hub_components/ChatMessage';

const IAHubView: React.FC = () => {
    const [activeLlm, setActiveLlm] = useState<LlmProvider>(LlmProvider.GEMINI);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeSubView, setActiveSubView] = useState<IAHubSubView>(IAHubSubView.PLAYGROUND);

    const chatRef = useRef<Chat | null>(null);
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize the chat session
        try {
            chatRef.current = createChatSession();
        } catch (error) {
            console.error("Failed to initialize Gemini chat:", error);
            setMessages([{ sender: 'ai', text: 'Error: Could not connect to the AI service. Please check your API key configuration.', provider: activeLlm }]);
        }
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
        if (!messageText || isLoading || !chatRef.current) return;

        setInputValue('');
        setIsLoading(true);

        const userMessage: ChatMessage = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage, { sender: 'ai', text: '', provider: activeLlm }]);

        try {
            const stream = await sendMessageStream(chatRef.current, messageText);
            let firstChunk = true;
            for await (const chunk of stream) {
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage.sender === 'ai') {
                         if (firstChunk) {
                            lastMessage.text = chunk.text;
                            firstChunk = false;
                        } else {
                            lastMessage.text += chunk.text;
                        }
                        return [...prev.slice(0, -1), lastMessage];
                    }
                    return prev;
                });
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage.sender === 'ai') {
                    lastMessage.text = 'An error occurred while processing your request. Please try again.';
                    return [...prev.slice(0, -1), lastMessage];
                }
                return prev;
            });
        } finally {
            setIsLoading(false);
        }
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

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 to-transparent p-6">
                 <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto flex items-center gap-3 bg-white p-3 rounded-xl shadow-lg border border-gray-200">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Converse com ${LLM_CONFIG[activeLlm].name}...`}
                        className="flex-grow bg-transparent text-gray-800 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button type="submit" className="bg-gray-800 text-white rounded-lg p-2 disabled:bg-gray-400 transition-colors" disabled={isLoading || !inputValue}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                    </button>
                </form>
            </div>
        </div>
    );

     const SubViewContent = () => {
        switch(activeSubView) {
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
        </div>
    );
};

export default IAHubView;
