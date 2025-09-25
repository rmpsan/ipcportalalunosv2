import React from 'react';
import { LlmProvider } from '../../../types';
import { LLM_CONFIG } from '../../../constants';

interface ChatWelcomeProps {
    llm: LlmProvider;
    onPromptClick: (prompt: string) => void;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({ llm, onPromptClick }) => {
    const config = LLM_CONFIG[llm];
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <config.logo className={`h-16 w-16 mb-4 text-gray-400`} />
            <h2 className="text-2xl font-bold text-gray-800">Como posso ajudar hoje?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl w-full">
                {config.welcomePrompts.map((prompt, index) => (
                    <button
                        key={index}
                        onClick={() => onPromptClick(prompt)}
                        className="bg-white p-4 rounded-lg shadow border border-gray-200 text-left hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                        <p className="font-semibold text-gray-700">{prompt}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatWelcome;
