import React, { useState } from 'react';
import HeroBanner from './components/HeroBanner';
import ContentRow from './components/ContentRow';

const contentData = {
    'vanguarda': [
        { id: 1, title: 'Trilha Completa de IA Audiovisual', instructor: 'Equipe de Inovação IPC', img: 'https://picsum.photos/seed/ai-main/400/250', progress: 0 },
        { id: 2, title: 'Inovação com Realidade Virtual', instructor: 'Dr. Ana Oliveira', img: 'https://picsum.photos/seed/vr/400/250', progress: 0 },
        { id: 3, title: 'Case: "O Fantástico Laboratório"', instructor: 'Raphael Martinez', img: 'https://picsum.photos/seed/filme-case/400/250', progress: 50 },
        { id: 4, title: 'Animação 2D e Motion Graphics', instructor: 'Carlos Andrade', img: 'https://picsum.photos/seed/motion/400/250', progress: 0 },
    ],
    'fundamentos': [
        { id: 5, title: 'Introdução à Produção Executiva', instructor: 'Dr. Fernando Guimarães (USP)', img: 'https://picsum.photos/seed/intro-prod/400/250', progress: 90 },
        { id: 6, title: 'Técnicas de Roteiro para Cinema', instructor: 'Dr. Lúcia Borges (USP)', img: 'https://picsum.photos/seed/intro-roteiro/400/250', progress: 100 },
        { id: 7, title: 'Tutorial: Operação de Câmeras 4K', instructor: 'Equipe Técnica', img: 'https://picsum.photos/seed/camera-4k/400/250', progress: 0 },
        { id: 8, title: 'A Linguagem do Cinema', instructor: 'Dr. Fernando Guimarães (USP)', img: 'https://picsum.photos/seed/linguagem/400/250', progress: 20 },
    ],
    'workshops': [
        { id: 9, title: 'Workshop: Produção Rápida para Clientes', instructor: 'Supervisores de Mercado', img: 'https://picsum.photos/seed/workshop-prod/400/250', progress: 0 },
        { id: 10, title: 'Oficina de Comunicação Interna e EAD', instructor: 'Facilitador Convidado', img: 'https://picsum.photos/seed/workshop-ead/400/250', progress: 0 },
        { id: 11, title: 'Palestra: O Futuro é Remoto?', instructor: 'Especialista em Inovação', img: 'https://picsum.photos/seed/palestra-futuro/400/250', progress: 10 },
        { id: 12, title: 'Técnicas de Pitching para Projetos', instructor: 'Supervisores de Mercado', img: 'https://picsum.photos/seed/workshop-pitch/400/250', progress: 0 },
    ],
    'mentoria': [
        { id: 13, title: 'Sessão de Carreira com Dream Team', instructor: 'Vários Supervisores', img: 'https://picsum.photos/seed/mentoria-carreira/400/250', progress: 0 },
        { id: 14, title: 'A História que Inspira: Raphael Martinez', instructor: 'Documentário', img: 'https://gov.institutopaulistadecinema.com.br/images/raphael_bio.png', progress: 0 },
        { id: 15, title: 'Webinar: Construindo seu Portfólio', instructor: 'Equipe de Carreira', img: 'https://picsum.photos/seed/mentoria-portfolio/400/250', progress: 75 },
        { id: 16, title: 'ESG e o Impacto Social no Audiovisual', instructor: 'Facilitador Convidado', img: 'https://picsum.photos/seed/mentoria-esg/400/250', progress: 0 },
    ]
};

const trilhas = ['Produção', 'Roteiro', 'Direção', 'IA Audiovisual', 'Pós-produção', 'Áudio'];
const tipos = ['Cursos', 'Workshops', 'Palestras'];

interface CatalogViewProps {
    onSelectCourse: (course: { title: string, instructor: string }) => void;
}

const CatalogView: React.FC<CatalogViewProps> = ({ onSelectCourse }) => {
    const [activeTrilha, setActiveTrilha] = useState('IA Audiovisual');
    const [activeTipo, setActiveTipo] = useState('Cursos');

    return (
        <div className="animate-[fadeInUp_0.5s_ease-out] -m-6 md:-m-10 bg-gray-900 text-white min-h-screen">
            <HeroBanner onSelectCourse={onSelectCourse} />

            <div className="px-6 md:px-10 py-6 space-y-8">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex flex-wrap items-center gap-2">
                        {trilhas.map(trilha => (
                             <button key={trilha} onClick={() => setActiveTrilha(trilha)} className={`py-2 px-4 rounded-md text-sm font-semibold transition-colors ${activeTrilha === trilha ? 'bg-white text-gray-900' : 'bg-transparent hover:bg-white/10'}`}>{trilha}</button>
                        ))}
                         <span className="border-l border-gray-600 h-6 mx-2"></span>
                         {tipos.map(tipo => (
                             <button key={tipo} onClick={() => setActiveTipo(tipo)} className={`py-2 px-4 rounded-md text-sm font-semibold transition-colors ${activeTipo === tipo ? 'text-white' : 'text-gray-400 hover:text-white'}`}>{tipo}</button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-auto">
                        <input type="text" placeholder="Buscar por tema, instrutor..." className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-md py-2 px-4 w-full md:w-64 focus:ring-2 focus:ring-teal-500 focus:outline-none"/>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                    </div>
                </div>

                {/* Content Rows */}
                <div className="space-y-10">
                    <ContentRow title="Vanguarda Tecnológica (IA, RV/RA)" items={contentData.vanguarda} onSelectCourse={onSelectCourse} />
                    <ContentRow title="Fundamentos Essenciais" items={contentData.fundamentos} onSelectCourse={onSelectCourse} />
                    <ContentRow title="Workshops Práticos e Disruptivos" items={contentData.workshops} onSelectCourse={onSelectCourse} />
                    <ContentRow title="Mentoria e Inspiração" items={contentData.mentoria} onSelectCourse={onSelectCourse} />
                </div>
            </div>
        </div>
    );
};

export default CatalogView;