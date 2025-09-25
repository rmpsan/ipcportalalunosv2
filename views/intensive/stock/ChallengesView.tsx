import React, { useState } from 'react';

interface Challenge {
    id: string;
    title: string;
    description: string;
    points: number;
    difficulty: 'Fácil' | 'Médio' | 'Difícil';
    deadline: string;
    requirements: string[];
    rewards: string[];
    status: 'available' | 'in_progress' | 'completed';
    category: string;
}

const ChallengesView: React.FC = () => {
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

    const challenges: Challenge[] = [
        {
            id: '1',
            title: 'São Paulo Autêntica: Vida Cotidiana',
            description: 'Capture a essência do dia a dia paulistano em diferentes bairros da cidade',
            points: 150,
            difficulty: 'Médio',
            deadline: '15 dias',
            requirements: [
                'Mínimo 10 fotos ou 3 vídeos',
                'Pelo menos 3 bairros diferentes',
                'Foco em pessoas reais em situações cotidianas',
                'Qualidade profissional (mínimo Full HD)'
            ],
            rewards: [
                '+150 pontos de experiência',
                'Acesso antecipado a equipamentos premium',
                'Badge "Explorador Urbano"',
                'Material exclusivo sobre fotografia de rua'
            ],
            status: 'available',
            category: 'Fotografia de Rua'
        },
        {
            id: '2',
            title: 'Arquitetura Paulistana: Passado e Presente',
            description: 'Documente o contraste arquitetônico entre o histórico e o moderno em São Paulo',
            points: 200,
            difficulty: 'Difícil',
            deadline: '20 dias',
            requirements: [
                'Mínimo 15 fotos de alta resolução',
                'Incluir pelo menos 5 marcos históricos',
                'Contrastar com arquitetura moderna',
                'Técnicas avançadas de composição'
            ],
            rewards: [
                '+200 pontos de experiência',
                'Upgrade de nível automático',
                'Acesso a workshop exclusivo de arquitetura',
                'Mentoria individual com fotógrafo profissional'
            ],
            status: 'available',
            category: 'Arquitetura'
        },
        {
            id: '3',
            title: 'Gastronomia de Rua: Sabores de SP',
            description: 'Registre a diversidade gastronômica das ruas paulistanas',
            points: 120,
            difficulty: 'Fácil',
            deadline: '10 dias',
            requirements: [
                'Mínimo 8 fotos ou 2 vídeos',
                'Diferentes tipos de comida de rua',
                'Interação com vendedores (com permissão)',
                'Foco na preparação e apresentação'
            ],
            rewards: [
                '+120 pontos de experiência',
                'Badge "Foodie Explorer"',
                'Acesso a curso de fotografia gastronômica',
                'Kit de iluminação portátil'
            ],
            status: 'available',
            category: 'Gastronomia'
        }
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Fácil': return 'text-green-600 bg-green-100';
            case 'Médio': return 'text-yellow-600 bg-yellow-100';
            case 'Difícil': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return 'text-blue-600 bg-blue-100';
            case 'in_progress': return 'text-orange-600 bg-orange-100';
            case 'completed': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'available': return 'Disponível';
            case 'in_progress': return 'Em Andamento';
            case 'completed': return 'Concluído';
            default: return 'Desconhecido';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-3 rounded-full mr-4">
                            <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Desafios de Conteúdo</h1>
                            <p className="text-gray-600 mt-1">Acelere sua pontuação e desbloqueie benefícios exclusivos</p>
                        </div>
                    </div>

                    {/* Sistema de Pontos */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-100">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">Pontos Extras</h3>
                                <p className="text-sm text-gray-600">Acelere sua progressão</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">Troca de Nível</h3>
                                <p className="text-sm text-gray-600">Acesso mais rápido</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">Conteúdo Exclusivo</h3>
                                <p className="text-sm text-gray-600">Materiais premium</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de Desafios */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {challenges.map((challenge) => (
                        <div key={challenge.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl">
                            <div className="p-6">
                                {/* Header do Card */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                                        {challenge.difficulty}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                                        {getStatusText(challenge.status)}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium text-purple-600 bg-purple-100">
                                        {challenge.category}
                                    </span>
                                </div>

                                {/* Pontos e Prazo */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-bold text-yellow-600">{challenge.points} pontos</span>
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">{challenge.deadline}</span>
                                    </div>
                                </div>

                                {/* Botão de Ação */}
                                <button
                                    onClick={() => setSelectedChallenge(challenge)}
                                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
                                >
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal de Detalhes */}
                {selectedChallenge && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                {/* Header do Modal */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedChallenge.title}</h2>
                                        <p className="text-gray-600">{selectedChallenge.description}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedChallenge(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Requisitos */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">📋 Requisitos</h3>
                                    <ul className="space-y-2">
                                        {selectedChallenge.requirements.map((req, index) => (
                                            <li key={index} className="flex items-center text-gray-600">
                                                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Recompensas */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🎁 Recompensas</h3>
                                    <ul className="space-y-2">
                                        {selectedChallenge.rewards.map((reward, index) => (
                                            <li key={index} className="flex items-center text-gray-600">
                                                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                                                {reward}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Botões de Ação */}
                                <div className="flex gap-4">
                                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-300">
                                        Aceitar Desafio
                                    </button>
                                    <button
                                        onClick={() => setSelectedChallenge(null)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengesView;