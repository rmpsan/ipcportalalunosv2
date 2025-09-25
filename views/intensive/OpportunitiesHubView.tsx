import React, { useState } from 'react';
import { Trophy, Star, Target, Award, TrendingUp, Calendar, Users, BookOpen, Zap, Medal, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { Opportunity } from '../../types';

interface CommercialProject extends Opportunity {
    client: string;
    clientLogo: string;
    image: string;
    roles: string[];
    budget: string;
    requiredLevel: number;
    requiredPoints: number;
}

interface InternalCall extends Opportunity {
    image?: string;
    submissionCriteria: string[];
    prizes: string[];
    requiredLevel: number;
    requiredPoints: number;
}

// Sistema de Gamificação Expandido
interface UserStats {
    totalPoints: number;
    level: number;
    coursesCompleted: number;
    projectsCompleted: number;
    averageGrade: number;
    attendanceRate: number;
    badges: Badge[];
    achievements: Achievement[];
    streak: number; // dias consecutivos de atividade
    totalHoursStudied: number;
    nextLevelPoints: number;
}

interface Badge {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    earned: boolean;
    earnedDate?: string;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    progress: number;
    maxProgress: number;
    reward: number; // pontos ganhos
    category: 'academic' | 'project' | 'social' | 'technical';
}

const userStats: UserStats = {
    totalPoints: 2850,
    level: 7,
    coursesCompleted: 12,
    projectsCompleted: 8,
    averageGrade: 8.7,
    attendanceRate: 92,
    streak: 23,
    totalHoursStudied: 156,
    nextLevelPoints: 3200,
    badges: [
        { id: 'first_course', name: 'Primeiro Curso', description: 'Completou seu primeiro curso EAD', icon: <BookOpen className="w-6 h-6" />, rarity: 'common', earned: true, earnedDate: '2024-01-15' },
        { id: 'editor_pro', name: 'Editor Profissional', description: 'Completou 5 projetos de edição', icon: <Target className="w-6 h-6" />, rarity: 'rare', earned: true, earnedDate: '2024-02-20' },
        { id: 'team_player', name: 'Jogador de Equipe', description: 'Participou de 3 projetos colaborativos', icon: <Users className="w-6 h-6" />, rarity: 'epic', earned: true, earnedDate: '2024-03-10' },
        { id: 'knowledge_seeker', name: 'Buscador de Conhecimento', description: 'Assistiu 50 horas de conteúdo EAD', icon: <BookOpen className="w-6 h-6" />, rarity: 'rare', earned: true, earnedDate: '2024-03-25' },
        { id: 'creative_mind', name: 'Mente Criativa', description: 'Criou 10 projetos originais', icon: <Zap className="w-6 h-6" />, rarity: 'legendary', earned: false },
        { id: 'mentor', name: 'Mentor', description: 'Ajudou 5 colegas em projetos', icon: <Award className="w-6 h-6" />, rarity: 'epic', earned: false }
    ],
    achievements: [
        { id: '1', title: 'Maratonista EAD', description: 'Complete 15 cursos online', progress: 12, maxProgress: 15, reward: 500, category: 'academic' },
        { id: '2', title: 'Diretor Iniciante', description: 'Dirija 10 projetos', progress: 8, maxProgress: 10, reward: 300, category: 'project' },
        { id: '3', title: 'Networking Pro', description: 'Conecte-se com 20 colegas', progress: 15, maxProgress: 20, reward: 200, category: 'social' },
        { id: '4', title: 'Tech Savvy', description: 'Domine 3 softwares diferentes', progress: 2, maxProgress: 3, reward: 400, category: 'technical' }
    ]
};

// Função expandida para calcular bonificação baseada no desempenho
const calculateOpportunityBonus = (basePoints: number, userLevel: number, coursesCompleted: number, averageGrade: number = 0, attendanceRate: number = 0, streak: number = 0): number => {
    let bonus = 1;
    
    // Bônus por nível (5% por nível)
    bonus += (userLevel - 1) * 0.05;
    
    // Bônus por cursos completados (2% por curso, máximo 50%)
    bonus += Math.min(coursesCompleted * 0.02, 0.5);
    
    // Bônus por desempenho acadêmico
    if (averageGrade >= 9.0) bonus += 0.25;
    else if (averageGrade >= 8.0) bonus += 0.15;
    else if (averageGrade >= 7.0) bonus += 0.10;
    
    // Bônus por frequência
    if (attendanceRate >= 95) bonus += 0.20;
    else if (attendanceRate >= 90) bonus += 0.15;
    else if (attendanceRate >= 85) bonus += 0.10;
    
    // Bônus por streak de atividade
    if (streak >= 30) bonus += 0.30;
    else if (streak >= 14) bonus += 0.20;
    else if (streak >= 7) bonus += 0.10;
    
    return Math.round(basePoints * bonus);
};

const GameficationPanel: React.FC = () => {
    const progressPercentage = ((userStats.totalPoints % 400) / 400) * 100;
    const totalBonus = Math.round((calculateOpportunityBonus(100, userStats.level, userStats.coursesCompleted, userStats.averageGrade, userStats.attendanceRate, userStats.streak) - 100));
    
    const getBadgeColor = (rarity: string) => {
        switch (rarity) {
            case 'legendary': return 'border-yellow-400 bg-yellow-400/20';
            case 'epic': return 'border-purple-400 bg-purple-400/20';
            case 'rare': return 'border-blue-400 bg-blue-400/20';
            default: return 'border-gray-400 bg-gray-400/20';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'academic': return 'bg-blue-500';
            case 'project': return 'bg-green-500';
            case 'social': return 'bg-pink-500';
            case 'technical': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };
    
    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-2xl mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Perfil e Nível */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Nível {userStats.level}</h3>
                            <p className="text-white/80 text-sm">{userStats.totalPoints} / {userStats.nextLevelPoints} XP</p>
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <div className="w-full bg-white/20 rounded-full h-3">
                            <div 
                                className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                            <div className="font-bold">{userStats.coursesCompleted}</div>
                            <div className="text-white/80">Cursos</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                            <div className="font-bold">{userStats.projectsCompleted}</div>
                            <div className="text-white/80">Projetos</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                            <div className="font-bold">{userStats.averageGrade}</div>
                            <div className="text-white/80">Média</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                            <div className="font-bold">{userStats.attendanceRate}%</div>
                            <div className="text-white/80">Presença</div>
                        </div>
                    </div>
                </div>

                {/* Conquistas e Badges */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="font-bold mb-3 flex items-center">
                        <Trophy className="w-5 h-5 mr-2" />
                        Badges Conquistadas
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {userStats.badges.filter(b => b.earned).slice(0, 4).map(badge => (
                            <div key={badge.id} className={`${getBadgeColor(badge.rarity)} border rounded-lg p-2 text-center`} title={badge.description}>
                                <div className="text-lg mb-1">{badge.icon}</div>
                                <div className="text-xs mt-1">{badge.name.split(' ')[0]}</div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <div className="text-2xl font-bold flex items-center justify-center">
                            {userStats.streak} <Zap className="w-6 h-6 ml-2" />
                        </div>
                        <div className="text-white/80 text-sm">dias consecutivos</div>
                        <div className="text-xs text-yellow-300 mt-1">Em chamas!</div>
                    </div>
                </div>

                {/* Progresso de Conquistas */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="font-bold mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Progresso de Conquistas
                    </h4>
                    
                    <div className="space-y-3">
                        {userStats.achievements.slice(0, 3).map(achievement => (
                            <div key={achievement.id} className="bg-white/10 rounded-lg p-3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-sm">{achievement.title}</span>
                                    <span className={`w-2 h-2 rounded-full ${getCategoryColor(achievement.category)}`}></span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2 mb-1">
                                    <div 
                                        className="bg-yellow-300 h-2 rounded-full transition-all duration-500" 
                                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-white/70">
                                    {achievement.progress}/{achievement.maxProgress} • +{achievement.reward} pts
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Bônus Ativo Expandido */}
            <div className="mt-6 p-4 bg-white/10 rounded-xl">
                <div className="text-center mb-3">
                    <div className="text-2xl font-bold text-yellow-300">+{totalBonus}%</div>
                    <div className="text-sm font-semibold">🎯 Bônus Total em Oportunidades</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                        <div className="font-semibold">Nível {userStats.level}</div>
                        <div className="text-white/70">+{(userStats.level - 1) * 5}%</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold">Média {userStats.averageGrade}</div>
                        <div className="text-white/70">+{userStats.averageGrade >= 9 ? 25 : userStats.averageGrade >= 8 ? 15 : userStats.averageGrade >= 7 ? 10 : 0}%</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold">{userStats.attendanceRate}% Presença</div>
                        <div className="text-white/70">+{userStats.attendanceRate >= 95 ? 20 : userStats.attendanceRate >= 90 ? 15 : userStats.attendanceRate >= 85 ? 10 : 0}%</div>
                    </div>
                    <div className="text-center">
                        <div className="font-semibold">{userStats.streak} dias</div>
                        <div className="text-white/70">+{userStats.streak >= 30 ? 30 : userStats.streak >= 14 ? 20 : userStats.streak >= 7 ? 10 : 0}%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const commercialProjects: CommercialProject[] = [
    { id: 1, type: 'commercial', client: 'TechCorp', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=TC', image: 'https://picsum.photos/seed/techcorp-proj/800/500', title: 'Vídeo de Lançamento de Produto', description: 'Produção completa do vídeo de lançamento para o novo gadget da TechCorp. Buscamos diretores de fotografia e editores.', roles: ['Diretor de Fotografia', 'Editor', 'Técnico de Som'], deadline: '30/08/2024', budget: 'R$ 15.000', requiredLevel: 9, requiredPoints: 3500 },
    { id: 2, type: 'commercial', client: 'Varejo Total', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=VT', image: 'https://picsum.photos/seed/varejo-proj/800/500', title: 'Campanha de Mídias Sociais', description: 'Criação de 5 vídeos curtos para Instagram e TikTok. Foco em criatividade e engajamento rápido.', roles: ['Roteirista', 'Editor de Vídeo', 'Motion Designer'], deadline: '15/09/2024', budget: 'R$ 8.000', requiredLevel: 9, requiredPoints: 3500 },
    { id: 5, type: 'commercial', client: 'Creative Minds Agency', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=CM', image: 'https://picsum.photos/seed/creative-proj/800/500', title: 'Documentário de Marca', description: 'Contar a história de uma marca de moda sustentável através de um documentário de 10 minutos.', roles: ['Diretor', 'Roteirista', 'Diretor de Fotografia'], deadline: '25/09/2024', budget: 'R$ 20.000', requiredLevel: 9, requiredPoints: 3500 },
    { id: 6, type: 'commercial', client: 'SoundWave Studios', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=SW', image: 'https://picsum.photos/seed/sound-proj/800/500', title: 'Pós-Produção de Áudio para Podcast', description: 'Edição, mixagem e masterização de uma temporada de podcast de 8 episódios.', roles: ['Editor de Áudio', 'Sound Designer'], deadline: '18/08/2024', budget: 'R$ 6.000', requiredLevel: 9, requiredPoints: 3500 },
    // Novas oportunidades para cargos de assistência - níveis mais baixos
    { id: 9, type: 'commercial', client: 'Produtora Audiovisual SP', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=PA', image: 'https://picsum.photos/seed/assist-prod/800/500', title: 'Assistente de Produção - Série Web', description: 'Oportunidade para assistente de produção em série web de 6 episódios. Experiência inicial em audiovisual.', roles: ['Assistente de Produção', 'Assistente de Direção'], deadline: '20/08/2024', budget: 'R$ 3.500', requiredLevel: 3, requiredPoints: 800 },
    { id: 10, type: 'commercial', client: 'Estúdio Criativo RJ', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=EC', image: 'https://picsum.photos/seed/assist-edit/800/500', title: 'Assistente de Edição - Documentário', description: 'Vaga para assistente de edição em documentário sobre cultura brasileira. Ótima oportunidade de aprendizado.', roles: ['Assistente de Edição', 'Organizador de Material'], deadline: '25/08/2024', budget: 'R$ 2.800', requiredLevel: 2, requiredPoints: 500 },
    { id: 11, type: 'commercial', client: 'Agência Digital Plus', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=AD', image: 'https://picsum.photos/seed/assist-social/800/500', title: 'Assistente de Conteúdo Digital', description: 'Assistente para criação de conteúdo para redes sociais de grandes marcas. Foco em vídeos curtos e criativos.', roles: ['Assistente de Conteúdo', 'Assistente de Social Media'], deadline: '30/08/2024', budget: 'R$ 4.200', requiredLevel: 4, requiredPoints: 1200 },
    { id: 12, type: 'commercial', client: 'Produtora Independente', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=PI', image: 'https://picsum.photos/seed/assist-camera/800/500', title: 'Assistente de Câmera - Curta-metragem', description: 'Assistente de câmera para produção de curta-metragem autoral. Experiência prática com equipamentos profissionais.', roles: ['Assistente de Câmera', 'Operador de Equipamentos'], deadline: '15/09/2024', budget: 'R$ 3.000', requiredLevel: 3, requiredPoints: 700 },
    { id: 13, type: 'commercial', client: 'Estúdio de Áudio Pro', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=EA', image: 'https://picsum.photos/seed/assist-audio/800/500', title: 'Assistente de Áudio - Gravação Musical', description: 'Assistente para sessões de gravação musical. Aprenda técnicas profissionais de captação e mixagem.', roles: ['Assistente de Áudio', 'Técnico de Gravação Jr.'], deadline: '10/09/2024', budget: 'R$ 3.800', requiredLevel: 4, requiredPoints: 1000 },
    { id: 14, type: 'commercial', client: 'Produtora Eventos Live', clientLogo: 'https://placehold.co/40x40/94A3B8/1E293B?text=PE', image: 'https://picsum.photos/seed/assist-live/800/500', title: 'Assistente de Transmissão ao Vivo', description: 'Assistente para eventos de transmissão ao vivo. Trabalhe com streaming profissional e tecnologia de ponta.', roles: ['Assistente de Transmissão', 'Operador de Streaming'], deadline: '05/09/2024', budget: 'R$ 4.500', requiredLevel: 5, requiredPoints: 1400 }
];

const internalCalls: InternalCall[] = [
    { id: 3, type: 'internal', title: 'Mostra de Curtas IPC 2024', image: 'https://picsum.photos/seed/mostra-curtas/800/500', description: 'Inscrições abertas para a nossa mostra anual de curtas-metragens. Os melhores filmes serão exibidos em um evento especial.', submissionCriteria: ['Curta de até 15 min', 'Produzido por alunos', 'Tema livre'], prizes: ['Troféu Melhor Curta', 'Bolsa de Estudos para Workshop Avançado'], deadline: '01/10/2024', requiredLevel: 9, requiredPoints: 3500 },
    { id: 4, type: 'internal', title: 'Edital de Roteiros Originais', image: 'https://picsum.photos/seed/edital-roteiro/800/500', description: 'Apresente seu roteiro de longa-metragem e concorra a um prêmio de desenvolvimento e mentoria com profissionais do mercado.', submissionCriteria: ['Roteiro de longa (+70 pgs)', 'Logline e Sinopse'], prizes: ['Prêmio de R$ 5.000', 'Mentoria de 3 meses'], deadline: '20/09/2024', requiredLevel: 9, requiredPoints: 3500 },
    { id: 7, type: 'internal', title: 'Festival de Fotografia IPC', image: 'https://picsum.photos/seed/festival-foto/800/500', description: 'Exponha seu olhar único em nosso festival de fotografia. O tema deste ano é "Metrópole em Contraste".', submissionCriteria: ['Série de 5 a 10 fotos', 'Fotografias em alta resolução'], prizes: ['Exposição individual', 'Câmera Mirrorless'], deadline: '10/10/2024', requiredLevel: 9, requiredPoints: 3500 },
    { id: 8, type: 'internal', title: 'Concurso de Videoclipes', image: 'https://picsum.photos/seed/concurso-clipe/800/500', description: 'Crie um videoclipe para uma das bandas parceiras do instituto. O clipe vencedor será produzido oficialmente.', submissionCriteria: ['Proposta de direção', 'Plano de produção'], prizes: ['Produção do videoclipe', 'Direção remunerada'], deadline: '30/10/2024', requiredLevel: 9, requiredPoints: 3500 },
];

interface OpportunitiesHubViewProps {
    onSelectOpportunity: (opportunity: Opportunity) => void;
}

const CommercialProjectCard: React.FC<{ 
    project: CommercialProject, 
    onSelect: () => void,
    isUnlocked: boolean,
    requirementMessage: string
}> = ({ project, onSelect, isUnlocked, requirementMessage }) => (
    <div 
        onClick={onSelect} 
        className={`bg-gray-800 rounded-xl overflow-hidden group border transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${
            isUnlocked 
                ? 'border-green-500/50 hover:border-teal-500' 
                : 'border-orange-500/50'
        }`}
    >
        <div className="h-48 overflow-hidden relative">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                isUnlocked 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
            }`}>
                {isUnlocked ? '✓ Disponível' : '⏳ Em Breve'}
            </div>
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
            {!isUnlocked && (
                <div className="mt-4 p-3 bg-orange-900/30 border border-orange-500/30 rounded-lg">
                    <p className="text-xs text-orange-300 font-medium">{requirementMessage}</p>
                </div>
            )}
        </div>
        <div className="bg-gray-700/50 px-6 py-3 flex justify-between items-center text-sm">
            <p className="text-gray-400">Prazo: <span className="font-bold text-white">{project.deadline}</span></p>
            <p className="text-gray-400">Orçamento: <span className="font-bold text-white">{project.budget}</span></p>
        </div>
    </div>
);

const InternalCallCard: React.FC<{ 
    call: InternalCall, 
    onSelect: () => void,
    isUnlocked: boolean,
    requirementMessage: string
}> = ({ call, onSelect, isUnlocked, requirementMessage }) => (
    <div 
        onClick={onSelect} 
        className={`bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 cursor-pointer border-2 ${
            isUnlocked 
                ? 'border-green-200 hover:border-green-300 hover:shadow-2xl hover:-translate-y-2' 
                : 'border-orange-200 hover:border-orange-300'
        }`}
    >
        <div className="h-48 overflow-hidden relative">
            <img src={call.image} alt={call.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                isUnlocked 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
            }`}>
                {isUnlocked ? '✓ Disponível' : '⏳ Em Breve'}
            </div>
            <h3 className="absolute bottom-0 left-0 p-4 text-2xl font-bold text-white leading-tight">{call.title}</h3>
        </div>
        <div className="p-6">
            <p className="text-gray-600 mt-2 text-sm h-16">{call.description}</p>
            {!isUnlocked && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-xs text-orange-700 font-medium">{requirementMessage}</p>
                </div>
            )}
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
                 <p className="text-sm text-gray-500">Inscrições até: <span className="font-bold text-red-600">{call.deadline}</span></p>
                 <span className={`font-bold py-2 px-4 rounded-lg transition-colors ${
                     isUnlocked 
                         ? 'bg-gray-800 text-white group-hover:bg-cyan-600' 
                         : 'bg-orange-100 text-orange-700'
                 }`}>
                    {isUnlocked ? 'Saber Mais' : 'Em Breve'}
                </span>
            </div>
        </div>
    </div>
);

const OpportunitiesHubView: React.FC<OpportunitiesHubViewProps> = ({ onSelectOpportunity }) => {
    // Função para verificar se uma oportunidade está desbloqueada
    const isOpportunityUnlocked = (opportunity: CommercialProject | InternalCall): boolean => {
        if (opportunity.type === 'commercial') {
            const project = opportunity as CommercialProject;
            return userStats.level >= project.requiredLevel && userStats.totalPoints >= project.requiredPoints;
        } else {
            const call = opportunity as InternalCall;
            return userStats.level >= call.requiredLevel && userStats.totalPoints >= call.requiredPoints;
        }
    };

    // Função para obter mensagem de requisitos
    const getRequirementMessage = (opportunity: CommercialProject | InternalCall): string => {
        if (opportunity.type === 'commercial') {
            const project = opportunity as CommercialProject;
            return `Requer Nível ${project.requiredLevel} e ${project.requiredPoints} pontos`;
        } else {
            const call = opportunity as InternalCall;
            return `Requer Nível ${call.requiredLevel} e ${call.requiredPoints} pontos`;
        }
    };

    // Função para filtrar oportunidades baseado no filtro selecionado
    const getFilteredOpportunities = (opportunities: (CommercialProject | InternalCall)[]): (CommercialProject | InternalCall)[] => {
        if (opportunityFilter === 'available') {
            return opportunities.filter(opp => isOpportunityUnlocked(opp));
        } else if (opportunityFilter === 'locked') {
            return opportunities.filter(opp => !isOpportunityUnlocked(opp));
        }
        return opportunities; // 'all'
    };

    const [activeTab, setActiveTab] = useState<'commercial' | 'internal'>('commercial');
    const [opportunityFilter, setOpportunityFilter] = useState<'all' | 'available' | 'locked'>('all');

    return (
        <div className="animate-[fadeInUp_0.5s_ease-out] space-y-8">
            <div className="text-center">
                 <h1 className="text-4xl font-extrabold text-gray-900">Portal de Oportunidades</h1>
                <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">Conecte seu talento a projetos reais e editais exclusivos que irão lançar sua carreira.</p>
            </div>

            {/* Painel de Gamificação Integrado */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <Trophy className="w-8 h-8 text-teal-600" />
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Seu Progresso Acadêmico</h3>
                            <p className="text-sm text-gray-600">Desbloqueie mais oportunidades conforme avança</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-teal-600">Nível {userStats.level}</div>
                        <div className="text-sm text-gray-600">{userStats.totalPoints} pontos</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-gray-700">Cursos</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{userStats.coursesCompleted}</div>
                        <div className="text-sm text-gray-500">Concluídos</div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            <span className="font-semibold text-gray-700">Projetos</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">{userStats.projectsCompleted}</div>
                        <div className="text-sm text-gray-500">Finalizados</div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <Zap className="w-5 h-5 text-orange-600" />
                            <span className="font-semibold text-gray-700">Sequência</span>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">{userStats.streak}</div>
                        <div className="text-sm text-gray-500">Dias ativos</div>
                    </div>
                </div>

                {/* Filtros de Oportunidades */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setOpportunityFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            opportunityFilter === 'all'
                                ? 'bg-teal-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                    >
                        Todas as Oportunidades
                    </button>
                    <button
                        onClick={() => setOpportunityFilter('available')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                            opportunityFilter === 'available'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                    >
                        <CheckCircle className="w-4 h-4" />
                        <span>Disponíveis para Você</span>
                    </button>
                    <button
                        onClick={() => setOpportunityFilter('locked')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                            opportunityFilter === 'locked'
                                ? 'bg-orange-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                    >
                        <Lock className="w-4 h-4" />
                        <span>Bloqueadas</span>
                    </button>
                </div>
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
                            {getFilteredOpportunities(commercialProjects).map(p => (
                                <CommercialProjectCard 
                                    key={p.id} 
                                    project={p} 
                                    onSelect={() => onSelectOpportunity(p)}
                                    isUnlocked={isOpportunityUnlocked(p)}
                                    requirementMessage={getRequirementMessage(p)}
                                />
                            ))}
                        </div>
                        {getFilteredOpportunities(commercialProjects).length === 0 && (
                            <div className="text-center py-12">
                                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                    {opportunityFilter === 'available' ? 'Nenhuma oportunidade disponível' : 'Nenhuma oportunidade bloqueada'}
                                </h3>
                                <p className="text-gray-400">
                                    {opportunityFilter === 'available' 
                                        ? 'Continue estudando para desbloquear mais oportunidades!'
                                        : 'Todas as oportunidades estão disponíveis para você!'
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'internal' && (
                    <div className="animate-[fadeInUp_0.3s_ease-out]">
                         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Mostras, Festivais e Editais Internos</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {getFilteredOpportunities(internalCalls).map(c => (
                                <InternalCallCard 
                                    key={c.id} 
                                    call={c} 
                                    onSelect={() => onSelectOpportunity(c)}
                                    isUnlocked={isOpportunityUnlocked(c)}
                                    requirementMessage={getRequirementMessage(c)}
                                />
                            ))}
                        </div>
                        {getFilteredOpportunities(internalCalls).length === 0 && (
                            <div className="text-center py-12">
                                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    {opportunityFilter === 'available' ? 'Nenhuma oportunidade disponível' : 'Nenhuma oportunidade bloqueada'}
                                </h3>
                                <p className="text-gray-500">
                                    {opportunityFilter === 'available' 
                                        ? 'Continue estudando para desbloquear mais oportunidades!'
                                        : 'Todas as oportunidades estão disponíveis para você!'
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                )}  
            </div>
        </div>
    );
};

export default OpportunitiesHubView;
