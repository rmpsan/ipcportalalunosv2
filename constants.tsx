import React from 'react';
import { IntensiveView, EadView, LlmProvider } from './types';

export const ICONS: { [key: string]: JSX.Element } = {
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
  'ia-hub': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  producao: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>,
  formacao: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" /></svg>,
  carreira: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" /></svg>,
  opportunities: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
  stock: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>,
  admin: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>,
  logout: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>,
  send: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>,
  financeiro: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V9zm-4 4a2 2 0 11-4 0 2 2 0 014 0zm-2-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>,
  'grades-feedback': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>,
  networking: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>,
  points: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
};

// Organização por prioridade de acesso do estudante
export const SIDEBAR_LINKS = [
    // ESSENCIAIS - Acesso diário
    { id: IntensiveView.DASHBOARD, label: 'Dashboard', icon: ICONS.dashboard, category: 'essential' },
    { id: IntensiveView.OPPORTUNITIES, label: 'Oportunidades', icon: ICONS.opportunities, category: 'essential' },
    { id: IntensiveView.FINANCEIRO, label: 'Financeiro', icon: ICONS.financeiro, category: 'essential' },
    
    // PRODUÇÃO - Ferramentas de trabalho
    { id: IntensiveView.IA_HUB, label: 'IA Hub & Inovação', icon: ICONS['ia-hub'], category: 'production' },
    { id: IntensiveView.PRODUCAO, label: 'Produção e Recursos', icon: ICONS.producao, category: 'production' },
    { id: IntensiveView.STOCK, label: 'Stock Footage', icon: ICONS.stock, category: 'production' },
    
    // DESENVOLVIMENTO - Crescimento profissional
    { id: IntensiveView.FORMACAO, label: 'Formação e Currículo', icon: ICONS.formacao, category: 'development' },
    { id: IntensiveView.CARREIRA, label: 'Carreira', icon: ICONS.carreira, category: 'development' },
    { id: IntensiveView.CATALOG, label: 'Catálogo EAD', icon: ICONS.formacao, category: 'development' },
    { id: IntensiveView.GRADES_FEEDBACK, label: 'Notas e Feedback', icon: ICONS['grades-feedback'], category: 'development' },
    { id: IntensiveView.NETWORKING, label: 'Networking', icon: ICONS.networking, category: 'development' },
    { id: IntensiveView.POINTS, label: 'Sistema de Pontos', icon: ICONS.points, category: 'development' },
    
    // ADMINISTRATIVO - Acesso restrito
    { id: IntensiveView.ADMIN, label: 'Admin', icon: ICONS.admin, category: 'admin' },
];

export const EAD_SIDEBAR_LINKS = [
    { id: EadView.CATALOG, label: 'Catálogo de Cursos', icon: ICONS.formacao },
    { id: EadView.TOOLS_CAREER, label: 'IA Tools & Carreira', icon: ICONS.carreira },
];


export const LLM_CONFIG = {
    [LlmProvider.CLAUDE]: {
        name: 'Claude 3.5 Sonnet',
        avatarColor: 'bg-orange-500',
        initialMessage: 'Olá! Sou Claude. Estou aqui para ajudar com suas ideias e projetos. O que vamos criar?',
        logo: (props: any) => (
             <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M19.99 1.01A1 1 0 0019 0H5a1 1 0 00-1 1v22a1 1 0 001 1h14a1 1 0 001-1V1.01zM8 4h8v2H8V4zm8 16H8v-2h8v2zm-1-4H9v-2h6v2z"/></svg>
        ),
        welcomePrompts: [
            "Escreva o primeiro ato de um roteiro de comédia romântica",
            "Qual a estrutura de uma jornada do herói?",
            "Me ajude a desenvolver um personagem complexo",
            "Liste 5 técnicas de edição para criar suspense",
        ]
    },
    [LlmProvider.CHATGPT]: {
        name: 'ChatGPT 4o',
        avatarColor: 'bg-green-500',
        initialMessage: 'Oi, eu sou o ChatGPT. Pronto para começar a desenvolver seu próximo projeto? Me diga o que você precisa.',
        logo: (props: any) => (
            <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 5.5C20.5 4.67 20.17 4 19.5 3.5S18.33 3 17.5 3h-11C5.67 3 5 3.17 4.5 3.5S3.5 4.67 3.5 5.5v13c0 .83.33 1.5.5 2s1.17 1 2 1h11c.83 0 1.5-.33 2-.5s.5-1.17.5-2v-13zM12 14H8v-2h4v2zm4-4H8V8h8v2z"/></svg>
        ),
        welcomePrompts: [
            "Gere uma sinopse para um filme de terror psicológico",
            "Como faço color grading para um visual de filme noir?",
            "Crie uma lista de planos para uma cena de perseguição",
            "Explique a regra dos terços na composição de imagem",
        ]
    },
    [LlmProvider.GEMINI]: {
        name: 'Gemini Pro',
        avatarColor: 'bg-blue-500',
        initialMessage: 'Olá! Sou o Gemini. Vamos explorar suas ideias criativas e transformá-las em realidade!',
        logo: (props: any) => (
            <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        ),
        welcomePrompts: [
            "Analise este conceito visual para meu filme",
            "Crie um storyboard detalhado para uma cena",
            "Sugira paletas de cores para diferentes gêneros",
            "Como posso melhorar a narrativa visual?",
        ]
    },
    [LlmProvider.LLAMA]: {
        name: 'Llama 3.1',
        avatarColor: 'bg-purple-500',
        initialMessage: 'Sou o Llama! Especialista em código e desenvolvimento. Como posso ajudar seu projeto?',
        logo: (props: any) => (
            <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        ),
        welcomePrompts: [
            "Gere código Python para automação de edição",
            "Crie um script para organizar arquivos de mídia",
            "Como integrar APIs de IA no meu workflow?",
            "Desenvolva uma ferramenta de análise de vídeo",
        ]
    },
    [LlmProvider.MISTRAL]: {
        name: 'Mistral Large',
        avatarColor: 'bg-red-500',
        initialMessage: 'Bonjour! Sou o Mistral. Especialista em análise e estratégia criativa. Em que posso ajudar?',
        logo: (props: any) => (
            <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        ),
        welcomePrompts: [
            "Analise a viabilidade comercial desta ideia",
            "Crie uma estratégia de distribuição para meu filme",
            "Como posicionar meu projeto no mercado?",
            "Desenvolva um pitch deck convincente",
        ]
    },
    [LlmProvider.PERPLEXITY]: {
        name: 'Perplexity Pro',
        avatarColor: 'bg-teal-500',
        initialMessage: 'Olá! Sou o Perplexity. Especialista em pesquisa e informações atualizadas. O que você quer descobrir?',
        logo: (props: any) => (
            <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
        ),
        welcomePrompts: [
            "Pesquise tendências atuais no cinema",
            "Quais são as últimas inovações em IA para vídeo?",
            "Encontre referências visuais para meu projeto",
            "Analise o mercado audiovisual brasileiro atual",
        ]
    }
}