import React from 'react';
import { ChatMessage, LlmProvider } from '../../../types';
import { LLM_CONFIG } from '../../../constants';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
    const { sender, text, provider } = message;
    const isUser = sender === 'user';
    const config = LLM_CONFIG[provider || LlmProvider.GEMINI];
    const LogoComponent = config.logo;

    return (
        <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
             {!isUser && (
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${config.avatarColor} flex items-center justify-center`}>
                    <LogoComponent className="w-6 h-6 text-white" />
                </div>
            )}
            <div
                className={`max-w-xl p-4 rounded-xl break-words ${
                    isUser ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border border-gray-200'
                }`}
            >
                {text || <span className="inline-block w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>}
            </div>
             {isUser && (
                 <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-300 text-gray-800 flex items-center justify-center font-bold">A</div>
            )}
        </div>
    );
};

export default ChatMessageBubble;
