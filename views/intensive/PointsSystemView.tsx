import React, { useState } from 'react';

interface PointSource {
    id: string;
    name: string;
    description: string;
    points: number;
    icon: string;
    category: 'academic' | 'interaction' | 'production' | 'evaluation';
}

interface LevelBenefit {
    id: string;
    name: string;
    description: string;
    minLevel: number;
    icon: string;
    type: 'equipment' | 'project' | 'event' | 'priority';
}

const PointsSystemView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'benefits'>('overview');

    // Dados mockados do sistema de pontos
    const currentLevel = 7;
    const currentPoints = 2850;
    const nextLevelPoints = 3200;
    const totalPoints = 8450;
    const progressPercentage = ((currentPoints - (currentLevel - 1) * 400) / 400) * 100;

    const pointSources: PointSource[] = [
        {
            id: '1',
            name: 'Presença em Aulas',
            description: 'Pontos por participação ativa em aulas presenciais',
            points: 15,
            icon: '🎓',
            category: 'academic'
        },
        {
            id: '2',
            name: 'Conclusão de Cursos EAD',
            description: 'Pontos por completar módulos do catálogo online',
            points: 50,
            icon: '💻',
            category: 'academic'
        },
        {
            id: '3',
            name: 'Desafios de Conteúdo',
            description: 'Pontos extras por participar de desafios criativos',
            points: 100,
            icon: '🏆',
            category: 'production'
        },
        {
            id: '4',
            name: 'Interações no Portal',
            description: 'Pontos por engajamento e uso ativo da plataforma',
            points: 5,
            icon: '🔄',
            category: 'interaction'
        },
        {
            id: '5',
            name: 'Produções Comerciais',
            description: 'Pontos por participação em projetos do instituto',
            points: 200,
            icon: '🎬',
            category: 'production'
        },
        {
            id: '6',
            name: 'Avaliações de Mentores',
            description: 'Pontos baseados em feedback de professores e tutores',
            points: 75,
            icon: '⭐',
            category: 'evaluation'
        },
        {
            id: '7',
            name: 'Participação em Editais',
            description: 'Pontos por inscrição e participação em editais',
            points: 150,
            icon: '📋',
            category: 'production'
        },
        {
            id: '8',
            name: 'Avaliações de Clientes',
            description: 'Pontos por feedback positivo em projetos comerciais',
            points: 120,
            icon: '👥',
            category: 'evaluation'
        }
    ];

    const levelBenefits: LevelBenefit[] = [
        {
            id: '1',
            name: 'Equipamentos Básicos',
            description: 'Acesso a câmeras DSLR e equipamentos de áudio básicos',
            minLevel: 1,
            icon: '📷',
            type: 'equipment'
        },
        {
            id: '2',
            name: 'Projetos Iniciantes',
            description: 'Participação em projetos de baixa complexidade',
            minLevel: 2,
            icon: '🎯',
            type: 'project'
        },
        {
            id: '3',
            name: 'Equipamentos Intermediários',
            description: 'Acesso a equipamentos profissionais e tempo estendido',
            minLevel: 4,
            icon: '🎥',
            type: 'equipment'
        },
        {
            id: '4',
            name: 'Saídas Supervisionadas',
            description: 'Participação em gravações externas com supervisão',
            minLevel: 5,
            icon: '🚶',
            type: 'project'
        },
        {
            id: '5',
            name: 'Prioridade na Locação',
            description: 'Prioridade no agendamento de equipamentos',
            minLevel: 6,
            icon: '⚡',
            type: 'priority'
        },
        {
            id: '6',
            name: 'Equipamentos Avançados',
            description: 'Acesso a equipamentos profissionais de alta qualidade',
            minLevel: 7,
            icon: '🎬',
            type: 'equipment'
        },
        {
            id: '7',
            name: 'Projetos Comerciais',
            description: 'Participação em projetos remunerados do instituto',
            minLevel: 8,
            icon: '💼',
            type: 'project'
        },
        {
            id: '8',
            name: 'Saídas Independentes',
            description: 'Autorização para saídas com equipamentos sem supervisão',
            minLevel: 9,
            icon: '🔓',
            type: 'project'
        },
        {
            id: '9',
            name: 'Eventos Exclusivos',
            description: 'Acesso a workshops, palestras e eventos especiais',
            minLevel: 10,
            icon: '🎪',
            type: 'event'
        }
    ];

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'academic': return 'bg-blue-100 text-blue-800';
            case 'interaction': return 'bg-green-100 text-green-800';
            case 'production': return 'bg-purple-100 text-purple-800';
            case 'evaluation': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getBenefitTypeColor = (type: string) => {
        switch (type) {
            case 'equipment': return 'bg-indigo-100 text-indigo-800';
            case 'project': return 'bg-emerald-100 text-emerald-800';
            case 'event': return 'bg-pink-100 text-pink-800';
            case 'priority': return 'bg-amber-100 text-amber-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderOverview = () => (
        <div className="space-y-8">
            {/* Dashboard Principal */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Nível {currentLevel}</h2>
                        <p className="text-indigo-100 mb-6">Parabéns! Você está evoluindo constantemente</p>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Progresso para o Nível {currentLevel + 1}</span>
                                <span className="text-sm font-medium">{currentPoints}/{nextLevelPoints} pts</span>
                            </div>
                            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                                <div 
                                    className="bg-white rounded-full h-3 transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-indigo-100">
                                Faltam apenas {nextLevelPoints - currentPoints} pontos para o próximo nível!
                            </p>
                        </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                        <div className="inline-block bg-white bg-opacity-20 rounded-2xl p-6">
                            <div className="text-4xl font-bold mb-2">{totalPoints.toLocaleString()}</div>
                            <div className="text-indigo-100">Pontos Totais</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards Explicativos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Como Funciona</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Nosso sistema é baseado em mérito e desempenho. Cada atividade, interação e conquista 
                        gera pontos que determinam seu nível e os benefícios disponíveis.
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Gamificação</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Transformamos seu aprendizado em uma jornada envolvente. Quanto mais você se dedica, 
                        mais benefícios e oportunidades exclusivas você desbloqueia.
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-3 rounded-full mr-4">
                            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Benefícios Reais</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Cada nível conquistado oferece vantagens práticas: acesso a equipamentos melhores, 
                        projetos remunerados, prioridades e oportunidades exclusivas.
                    </p>
                </div>
            </div>
        </div>
    );

    const renderSources = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Fontes de Pontuação</h2>
                <p className="text-gray-600">Descubra todas as formas de ganhar pontos no sistema</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pointSources.map((source) => (
                    <div key={source.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">{source.icon}</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{source.name}</h3>
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getCategoryColor(source.category)}`}>
                                        {source.category === 'academic' && 'Acadêmico'}
                                        {source.category === 'interaction' && 'Interação'}
                                        {source.category === 'production' && 'Produção'}
                                        {source.category === 'evaluation' && 'Avaliação'}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-indigo-600">+{source.points}</div>
                                <div className="text-xs text-gray-500">pontos</div>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">{source.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderBenefits = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Benefícios por Nível</h2>
                <p className="text-gray-600">Veja o que você pode desbloquear conforme evolui</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levelBenefits.map((benefit) => (
                    <div 
                        key={benefit.id} 
                        className={`bg-white rounded-xl p-6 shadow-lg border transition-all ${
                            currentLevel >= benefit.minLevel 
                                ? 'border-green-200 bg-green-50' 
                                : 'border-gray-100'
                        }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl">{benefit.icon}</span>
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-500 mr-2">Nível {benefit.minLevel}</span>
                                {currentLevel >= benefit.minLevel ? (
                                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                        Desbloqueado
                                    </div>
                                ) : (
                                    <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                                        Bloqueado
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-2">{benefit.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
                        
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getBenefitTypeColor(benefit.type)}`}>
                            {benefit.type === 'equipment' && 'Equipamento'}
                            {benefit.type === 'project' && 'Projeto'}
                            {benefit.type === 'event' && 'Evento'}
                            {benefit.type === 'priority' && 'Prioridade'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="animate-[fadeInUp_0.5s_ease-out]">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Sistema de Pontos</h1>
                <p className="text-gray-600">Acompanhe sua evolução e descubra os benefícios do nosso sistema gamificado</p>
            </div>

            {/* Navegação por Tabs */}
            <div className="flex flex-wrap border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-3 px-6 font-semibold transition-colors ${
                        activeTab === 'overview'
                            ? 'border-b-2 border-indigo-500 text-indigo-600'
                            : 'text-gray-600 hover:text-indigo-600'
                    }`}
                >
                    Visão Geral
                </button>
                <button
                    onClick={() => setActiveTab('sources')}
                    className={`py-3 px-6 font-semibold transition-colors ${
                        activeTab === 'sources'
                            ? 'border-b-2 border-indigo-500 text-indigo-600'
                            : 'text-gray-600 hover:text-indigo-600'
                    }`}
                >
                    Fontes de Pontos
                </button>
                <button
                    onClick={() => setActiveTab('benefits')}
                    className={`py-3 px-6 font-semibold transition-colors ${
                        activeTab === 'benefits'
                            ? 'border-b-2 border-indigo-500 text-indigo-600'
                            : 'text-gray-600 hover:text-indigo-600'
                    }`}
                >
                    Benefícios
                </button>
            </div>

            {/* Conteúdo das Tabs */}
            <div className="min-h-screen">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'sources' && renderSources()}
                {activeTab === 'benefits' && renderBenefits()}
            </div>
        </div>
    );
};

export default PointsSystemView;