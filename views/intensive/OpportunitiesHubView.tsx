import React, { useState } from 'react';
import { Opportunity, CommercialProject, InternalCall } from '../../types';

const commercialProjects: CommercialProject[] = [
    { id: 1, type: 'commercial', client: 'TechCorp', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=TC', image: 'https://picsum.photos/seed/techcorp-proj/800/500', title: 'Vídeo de Lançamento de Produto', description: 'Produção completa do vídeo de lançamento para o novo gadget da TechCorp. Buscamos diretores de fotografia e editores.', roles: ['Diretor de Fotografia', 'Editor', 'Técnico de Som'], deadline: '30/08/2024', budget: 'R$ 15.000' },
    { id: 2, type: 'commercial', client: 'Varejo Total', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=VT', image: 'https://picsum.photos/seed/varejo-proj/800/500', title: 'Campanha de Mídias Sociais', description: 'Criação de 5 vídeos curtos para Instagram e TikTok. Foco em criatividade e engajamento rápido.', roles: ['Roteirista', 'Editor de Vídeo', 'Motion Designer'], deadline: '15/09/2024', budget: 'R$ 8.000' },
    { id: 5, type: 'commercial', client: 'Creative Minds Agency', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=CM', image: 'https://picsum.photos/seed/creative-proj/800/500', title: 'Documentário de Marca', description: 'Contar a história de uma marca de moda sustentável através de um documentário de 10 minutos.', roles: ['Diretor', 'Roteirista', 'Diretor de Fotografia'], deadline: '25/09/2024', budget: 'R$ 20.000' },
    { id: 6, type: 'commercial', client: 'SoundWave Studios', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=SW', image: 'https://picsum.photos/seed/sound-proj/800/500', title: 'Pós-Produção de Áudio para Podcast', description: 'Edição, mixagem e masterização de uma temporada de podcast de 8 episódios.', roles: ['Editor de Áudio', 'Sound Designer'], deadline: '18/08/2024', budget: 'R$ 6.000' },
];

const internalCalls: InternalCall[] = [
    { id: 3, type: 'internal', title: 'Mostra de Curtas IPC 2024', image: 'https://picsum.photos/seed/mostra-curtas/800/500', description: 'Inscrições abertas para a nossa mostra anual de curtas-metragens. Os melhores filmes serão exibidos em um evento especial.', submissionCriteria: ['Curta de até 15 min', 'Produzido por alunos', 'Tema livre'], prizes: ['Troféu Melhor Curta', 'Bolsa de Estudos para Workshop Avançado'], deadline: '01/10/2024' },
    { id: 4, type: 'internal', title: 'Edital de Roteiros Originais', image: 'https://picsum.photos/seed/edital-roteiro/800/500', description: 'Apresente seu roteiro de longa-metragem e concorra a um prêmio de desenvolvimento e mentoria com profissionais do mercado.', submissionCriteria: ['Roteiro de longa (+70 pgs)', 'Logline e Sinopse'], prizes: ['Prêmio de R$ 5.000', 'Mentoria de 3 meses'], deadline: '20/09/2024' },
    { id: 7, type: 'internal', title: 'Festival de Fotografia IPC', image: 'https://picsum.photos/seed/festival-foto/800/500', description: 'Exponha seu olhar único em nosso festival de fotografia. O tema deste ano é "Metrópole em Contraste".', submissionCriteria: ['Série de 5 a 10 fotos', 'Fotografias em alta resolução'], prizes: ['Exposição individual', 'Câmera Mirrorless'], deadline: '10/10/2024' },
    { id: 8, type: 'internal', title: 'Concurso de Videoclipes', image: 'https://picsum.photos/seed/concurso-clipe/800/500', description: 'Crie um videoclipe para uma das bandas parceiras do instituto. O clipe vencedor será produzido oficialmente.', submissionCriteria: ['Proposta de direção', 'Plano de produção'], prizes: ['Produção do videoclipe', 'Direção remunerada'], deadline: '30/10/2024' },
];

interface OpportunitiesHubViewProps {
    onSelectOpportunity: (opportunity: Opportunity) => void;
}

const CommercialProjectCard: React.FC<{ project: CommercialProject, onSelect: () => void }> = ({ project, onSelect }) => (
    <div onClick={onSelect} className="bg-gray-800 rounded-xl overflow-hidden group border border-gray-700 hover:border-teal-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
        <div className="h-48 overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
                <img src={project.clientLogo} alt={project.client} className="h-10 w-10 rounded-full bg-gray-600 flex-shrink-0" />
                <div>
                    <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
                    <p className="text-sm text-gray-400">Cliente: {project.client}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                {project.roles.map(role => <span key={role} className="text-xs bg-gray-700 text-teal-300 font-semibold px-2 py-1 rounded-full">{role}</span>)}
            </div>
        </div>
        <div className="bg-gray-700/50 px-6 py-3 flex justify-between items-center text-sm">
            <p className="text-gray-400">Prazo: <span className="font-bold text-white">{project.deadline}</span></p>
            <p className="text-gray-400">Orçamento: <span className="font-bold text-white">{project.budget}</span></p>
        </div>
    </div>
);

const InternalCallCard: React.FC<{ call: InternalCall, onSelect: () => void }> = ({ call, onSelect }) => (
    <div onClick={onSelect} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
        <div className="h-48 overflow-hidden relative">
            <img src={call.image} alt={call.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h3 className="absolute bottom-0 left-0 p-4 text-2xl font-bold text-white leading-tight">{call.title}</h3>
        </div>
        <div className="p-6">
            <p className="text-gray-600 mt-2 text-sm h-16">{call.description}</p>
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
                 <p className="text-sm text-gray-500">Inscrições até: <span className="font-bold text-red-600">{call.deadline}</span></p>
                 <span className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg group-hover:bg-cyan-600 transition-colors">
                    Saber Mais
                </span>
            </div>
        </div>
    </div>
);

const OpportunitiesHubView: React.FC<OpportunitiesHubViewProps> = ({ onSelectOpportunity }) => {
    const [activeTab, setActiveTab] = useState<'commercial' | 'internal'>('commercial');

    return (
        <div className="animate-[fadeInUp_0.5s_ease-out] space-y-8">
            <div className="text-center">
                 <h1 className="text-4xl font-extrabold text-gray-900">Portal de Oportunidades</h1>
                <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">Conecte seu talento a projetos reais e editais exclusivos que irão lançar sua carreira.</p>
            </div>

            <div className="flex justify-center border-b border-gray-200">
                <button 
                    onClick={() => setActiveTab('commercial')}
                    className={`py-4 px-8 font-semibold text-lg transition-all duration-300 relative ${activeTab === 'commercial' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    Projetos Comerciais
                    {activeTab === 'commercial' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></span>}
                </button>
                 <button 
                    onClick={() => setActiveTab('internal')}
                    className={`py-4 px-8 font-semibold text-lg transition-all duration-300 relative ${activeTab === 'internal' ? 'text-cyan-600' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    Mostras & Editais
                    {activeTab === 'internal' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-600"></span>}
                </button>
            </div>

            <div>
                {activeTab === 'commercial' && (
                    <div className="bg-gray-900 text-white -mx-6 md:-mx-10 p-6 md:p-10 rounded-2xl shadow-2xl animate-[fadeInUp_0.3s_ease-out]">
                         <h2 className="text-3xl font-bold text-center mb-8">Jobs Exclusivos para Alunos IPC</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {commercialProjects.map(p => <CommercialProjectCard key={p.id} project={p} onSelect={() => onSelectOpportunity(p)} />)}
                        </div>
                    </div>
                )}

                {activeTab === 'internal' && (
                    <div className="animate-[fadeInUp_0.3s_ease-out]">
                         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Mostras, Festivais e Editais Internos</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {internalCalls.map(c => <InternalCallCard key={c.id} call={c} onSelect={() => onSelectOpportunity(c)} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OpportunitiesHubView;
