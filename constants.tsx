import React from 'react';
import { IntensiveView, EadView, LlmProvider } from './types';

export const ICONS: { [key: string]: JSX.Element } = {
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
  'ia-hub': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>,
  producao: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>,
  formacao: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>,
  carreira: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>,
  opportunities: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
  stock: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>,
  admin: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5.026a12.005 12.005 0 01-1.262 8.354.83.83 0 00.27 1.121l.732.556A12.03 12.03 0 0110 18.25a12.03 12.03 0 018.144-3.193l.732-.556a.83.83 0 00.27-1.121 12.005 12.005 0 01-1.262-8.354A11.954 11.954 0 0110 1.944zM9 13a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  logout: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>,
  send: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>,
  financeiro: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.158-.103.346-.195.574-.277a6.99 6.99 0 011.586 0c.228.082.416.174.574.277a1 1 0 01.14 1.45l-.001.002l-.002.003l-.005.007l-.014.019l-.04.056l-.094.13l-.16.22l-.253.34l-.384.503a7.02 7.02 0 01-2.484 0l-.383-.504l-.254-.34l-.16-.22l-.094-.13l-.04-.056l-.014-.019l-.005-.007l-.002-.003l-.001-.002a1 1 0 01.14-1.45zM10 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 3zM3.05 8.25a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5h-1.5zM15.45 8.25a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5h-1.5zM5.373 16.627a1 1 0 01-1.414-1.414l-1.06-1.061a.75.75 0 011.06-1.06l1.06 1.06a1 1 0 01-1.413 1.415zM17.12 14.152a1 1 0 01-1.414 1.414l-1.06-1.06a.75.75 0 011.06-1.06l1.06 1.06a1 1 0 01.354 1.06zM10 15.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" /><path d="M10 6a4 4 0 100 8a4 4 0 000-8zM7 10a3 3 0 116 0a3 3 0 01-6 0z" /></svg>,
};

export const SIDEBAR_LINKS = [
    { id: IntensiveView.DASHBOARD, label: 'Dashboard', icon: ICONS.dashboard },
    { id: IntensiveView.FINANCEIRO, label: 'Financeiro', icon: ICONS.financeiro },
    { id: IntensiveView.IA_HUB, label: 'IA Hub & Inovação', icon: ICONS['ia-hub'] },
    { id: IntensiveView.OPPORTUNITIES, label: 'Oportunidades', icon: ICONS.opportunities },
    { id: IntensiveView.PRODUCAO, label: 'Produção e Recursos', icon: ICONS.producao },
    { id: IntensiveView.FORMACAO, label: 'Formação e Currículo', icon: ICONS.formacao },
    { id: IntensiveView.CARREIRA, label: 'Carreira', icon: ICONS.carreira },
    { id: IntensiveView.STOCK, label: 'Stock Footage', icon: ICONS.stock },
    { id: IntensiveView.CATALOG, label: 'Catálogo EAD', icon: ICONS.formacao },
    { id: IntensiveView.ADMIN, label: 'Admin', icon: ICONS.admin },
];

export const EAD_SIDEBAR_LINKS = [
    { id: EadView.CATALOG, label: 'Catálogo de Cursos', icon: ICONS.formacao },
    { id: EadView.TOOLS_CAREER, label: 'IA Tools & Carreira', icon: ICONS.carreira },
];


export const LLM_CONFIG = {
    [LlmProvider.GEMINI]: {
        name: 'Gemini',
        avatarColor: 'bg-teal-500',
        initialMessage: 'Olá! Sou a IA Gemini do Instituto. Como posso te ajudar a criar hoje?',
        logo: (props: any) => (
            <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        ),
        welcomePrompts: [
            "Me dê ideias para um curta-metragem sobre amizade",
            "Como posso melhorar a iluminação de uma cena noturna?",
            "Crie um diálogo entre um robô e seu criador",
            "Qual a melhor lente para retratos em close-up?",
        ]
    },
    [LlmProvider.CLAUDE]: {
        name: 'Claude',
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
        name: 'ChatGPT',
        avatarColor: 'bg-blue-500',
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
    }
}