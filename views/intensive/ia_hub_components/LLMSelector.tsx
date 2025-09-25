import React, { useState, useRef, useEffect } from 'react';
import { LlmProvider } from '../../../types';
import { LLM_CONFIG } from '../../../constants';

interface LLMSelectorProps {
    activeLlm: LlmProvider;
    setActiveLlm: (llm: LlmProvider) => void;
}

const LLMSelector: React.FC<LLMSelectorProps> = ({ activeLlm, setActiveLlm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const activeConfig = LLM_CONFIG[activeLlm];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (llm: LlmProvider) => {
        setActiveLlm(llm);
        setIsOpen(false);
    }

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow border border-gray-200 hover:bg-gray-50 transition-colors"
            >
                <activeConfig.logo className="h-5 w-5" />
                <span>{activeConfig.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20 animate-[fadeInUp_0.2s_ease-out]">
                    {Object.values(LlmProvider).map(provider => {
                        const config = LLM_CONFIG[provider];
                        return (
                             <button
                                key={provider}
                                onClick={() => handleSelect(provider)}
                                className={`w-full text-left flex items-center gap-3 p-3 text-sm font-semibold hover:bg-gray-100 transition-colors ${activeLlm === provider ? 'text-teal-600' : 'text-gray-700'}`}
                             >
                                <config.logo className="h-5 w-5" />
                                <span>{config.name}</span>
                                {activeLlm === provider && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-teal-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                             </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LLMSelector;
