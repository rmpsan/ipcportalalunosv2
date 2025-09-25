import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    Trophy, 
    Star, 
    Award, 
    Target, 
    TrendingUp,
    Gift,
    Crown,
    Medal,
    Zap,
    Calendar,
    Users,
    BookOpen,
    CheckCircle,
    Plus,
    Search,
    Filter,
    Settings,
    ArrowUp,
    ArrowDown,
    Clock,
    Coins
} from 'lucide-react';

interface TeacherPointsViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para pontos e conquistas
const userStats = {
    totalPoints: 2450,
    monthlyPoints: 380,
    rank: 12,
    level: 'Educador Expert',
    nextLevel: 'Mestre Educador',
    pointsToNextLevel: 550,
    streak: 15
};

const achievements = [
    {
        id: 1,
        title: 'Mentor Dedicado',
        description: 'Orientou mais de 50 alunos com sucesso',
        points: 500,
        icon: Users,
        earned: true,
        earnedDate: '2024-01-15',
        rarity: 'Raro'
    },
    {
        id: 2,
        title: 'Inovador Digital',
        description: 'Implementou 10 tecnologias educacionais',
        points: 300,
        icon: Zap,
        earned: true,
        earnedDate: '2024-01-20',
        rarity: 'Comum'
    },
    {
        id: 3,
        title: 'Pesquisador Ativo',
        description: 'Publicou 5 artigos científicos',
        points: 750,
        icon: BookOpen,
        earned: false,
        progress: 60,
        rarity: 'Épico'
    },
    {
        id: 4,
        title: 'Colaborador Exemplar',
        description: 'Participou de 20 projetos colaborativos',
        points: 400,
        icon: Users,
        earned: false,
        progress: 85,
        rarity: 'Raro'
    }
];

const leaderboard = [
    {
        id: 1,
        rank: 1,
        name: 'Dra. Maria Eduarda',
        points: 3250,
        change: 'up',
        avatar: '/api/placeholder/40/40',
        level: 'Mestre Educador'
    },
    {
        id: 2,
        rank: 2,
        name: 'Prof. João Silva',
        points: 3100,
        change: 'down',
        avatar: '/api/placeholder/40/40',
        level: 'Educador Expert'
    },
    {
        id: 3,
        rank: 3,
        name: 'Dra. Ana Costa',
        points: 2980,
        change: 'up',
        avatar: '/api/placeholder/40/40',
        level: 'Educador Expert'
    },
    {
        id: 4,
        rank: 4,
        name: 'Prof. Carlos Santos',
        points: 2750,
        change: 'same',
        avatar: '/api/placeholder/40/40',
        level: 'Educador Avançado'
    },
    {
        id: 5,
        rank: 5,
        name: 'Você',
        points: 2450,
        change: 'up',
        avatar: '/api/placeholder/40/40',
        level: 'Educador Expert',
        isCurrentUser: true
    }
];

const recentActivities = [
    {
        id: 1,
        action: 'Completou curso "Metodologias Ativas"',
        points: 150,
        date: '2024-02-07',
        type: 'course'
    },
    {
        id: 2,
        action: 'Avaliou 25 trabalhos de alunos',
        points: 50,
        date: '2024-02-06',
        type: 'evaluation'
    },
    {
        id: 3,
        action: 'Participou do workshop "EdTech 2024"',
        points: 100,
        date: '2024-02-05',
        type: 'event'
    },
    {
        id: 4,
        action: 'Publicou artigo científico',
        points: 200,
        date: '2024-02-03',
        type: 'research'
    }
];

const rewards = [
    {
        id: 1,
        title: 'Certificado de Excelência',
        description: 'Certificado digital personalizado',
        cost: 500,
        type: 'certificate',
        available: true
    },
    {
        id: 2,
        title: 'Acesso Premium - 1 Mês',
        description: 'Recursos avançados da plataforma',
        cost: 800,
        type: 'premium',
        available: true
    },
    {
        id: 3,
        title: 'Mentoria Personalizada',
        description: '2 horas de mentoria com especialista',
        cost: 1200,
        type: 'mentoring',
        available: false
    },
    {
        id: 4,
        title: 'Curso Especialização',
        description: 'Acesso gratuito a curso de especialização',
        cost: 1500,
        type: 'course',
        available: true
    }
];

const TeacherPointsView: React.FC<TeacherPointsViewProps> = ({ setActiveView }) => {
    const [selectedTab, setSelectedTab] = useState('visao-geral');

    const tabs = [
        { id: 'visao-geral', label: 'Visão Geral', icon: Trophy },
        { id: 'conquistas', label: 'Conquistas', icon: Award },
        { id: 'ranking', label: 'Ranking', icon: Crown },
        { id: 'recompensas', label: 'Recompensas', icon: Gift }
    ];

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'Comum': return 'text-gray-600 bg-gray-100';
            case 'Raro': return 'text-blue-600 bg-blue-100';
            case 'Épico': return 'text-purple-600 bg-purple-100';
            case 'Lendário': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getChangeIcon = (change: string) => {
        switch (change) {
            case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
            case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
            default: return <div className="w-4 h-4" />;
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'course': return BookOpen;
            case 'evaluation': return CheckCircle;
            case 'event': return Calendar;
            case 'research': return Star;
            default: return Trophy;
        }
    };

    return (
        <div className="teacher-container">
            {/* Header */}
            <div className="teacher-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sistema de Pontos</h1>
                    <p className="text-gray-600 mt-1">Acompanhe seu progresso e conquistas</p>
                </div>
                <div className="teacher-actions">
                    <button className="teacher-button">
                        <Target className="w-4 h-4" />
                        Definir Meta
                    </button>
                    <button className="teacher-icon-button">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="teacher-stats-grid grid-cols-1 md:grid-cols-4 mb-6">
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pontos Totais</p>
                            <p className="text-2xl font-bold text-gray-900">{userStats.totalPoints.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Coins className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Ranking</p>
                            <p className="text-2xl font-bold text-gray-900">#{userStats.rank}</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Crown className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Nível Atual</p>
                            <p className="text-lg font-bold text-gray-900">{userStats.level}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Medal className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Sequência</p>
                            <p className="text-2xl font-bold text-gray-900">{userStats.streak} dias</p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Zap className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                    {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    selectedTab === tab.id
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <IconComponent className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Content based on selected tab */}
            {selectedTab === 'visao-geral' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Progress to Next Level */}
                    <div className="lg:col-span-2">
                        <div className="teacher-card mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Progresso para o Próximo Nível</h2>
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>{userStats.level}</span>
                                    <span>{userStats.nextLevel}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${(userStats.totalPoints / (userStats.totalPoints + userStats.pointsToNextLevel)) * 100}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Faltam {userStats.pointsToNextLevel} pontos para o próximo nível
                                </p>
                            </div>
                        </div>

                        {/* Recent Activities */}
                        <div className="teacher-card">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h2>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => {
                                    const IconComponent = getActivityIcon(activity.type);
                                    return (
                                        <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <IconComponent className="w-4 h-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                    <p className="text-xs text-gray-500">{activity.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                                                <Plus className="w-3 h-3" />
                                                <span>{activity.points}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Monthly Progress */}
                    <div className="space-y-6">
                        <div className="teacher-card">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progresso Mensal</h3>
                            <div className="text-center">
                                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                                    <svg className="w-24 h-24 transform -rotate-90">
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-gray-200"
                                        />
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={`${2 * Math.PI * 40}`}
                                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.76)}`}
                                            className="text-purple-500"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-lg font-bold text-gray-900">76%</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{userStats.monthlyPoints} pontos este mês</p>
                                <p className="text-xs text-gray-500">Meta: 500 pontos</p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="teacher-card">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas Rápidas</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Conquistas Desbloqueadas</span>
                                    <span className="text-sm font-medium text-gray-900">12/20</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Posição no Ranking</span>
                                    <span className="text-sm font-medium text-gray-900">#{userStats.rank}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Pontos Disponíveis</span>
                                    <span className="text-sm font-medium text-green-600">{userStats.totalPoints}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'conquistas' && (
                <div className="teacher-card-grid">
                    {achievements.map((achievement) => {
                        const IconComponent = achievement.icon;
                        return (
                            <div key={achievement.id} className={`teacher-card ${achievement.earned ? 'border-green-200 bg-green-50' : ''}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${achievement.earned ? 'bg-green-100' : 'bg-gray-100'}`}>
                                        <IconComponent className={`w-6 h-6 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                                            {achievement.rarity}
                                        </span>
                                        {achievement.earned && (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        )}
                                    </div>
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>

                                {!achievement.earned && achievement.progress && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Progresso</span>
                                            <span>{achievement.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${achievement.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-sm font-medium text-yellow-600">
                                        <Star className="w-4 h-4" />
                                        <span>{achievement.points} pontos</span>
                                    </div>
                                    {achievement.earned && (
                                        <span className="text-xs text-gray-500">
                                            Conquistado em {achievement.earnedDate}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {selectedTab === 'ranking' && (
                <div className="teacher-card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Ranking Geral</h2>
                    <div className="space-y-4">
                        {leaderboard.map((user) => (
                            <div
                                key={user.id}
                                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                                    user.isCurrentUser 
                                        ? 'bg-purple-50 border border-purple-200' 
                                        : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                                        user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                                        user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                                        user.rank === 3 ? 'bg-orange-100 text-orange-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                        {user.rank}
                                    </div>
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h4 className={`font-medium ${user.isCurrentUser ? 'text-purple-900' : 'text-gray-900'}`}>
                                            {user.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">{user.level}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">{user.points.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">pontos</p>
                                    </div>
                                    {getChangeIcon(user.change)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedTab === 'recompensas' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Suas Recompensas</h2>
                            <div className="flex items-center gap-2 text-lg font-bold text-purple-600">
                                <Coins className="w-5 h-5" />
                                <span>{userStats.totalPoints}</span>
                            </div>
                        </div>
                    </div>

                    <div className="teacher-card-grid">
                        {rewards.map((reward) => (
                            <div key={reward.id} className={`teacher-card ${!reward.available ? 'opacity-50' : ''}`}>
                                <div className="mb-4">
                                    <div className="p-3 bg-purple-100 rounded-lg w-fit mb-3">
                                        <Gift className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{reward.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-lg font-bold text-purple-600">
                                        <Coins className="w-4 h-4" />
                                        <span>{reward.cost}</span>
                                    </div>
                                    <button
                                        className={`teacher-button text-sm ${
                                            !reward.available || userStats.totalPoints < reward.cost
                                                ? 'opacity-50 cursor-not-allowed'
                                                : ''
                                        }`}
                                        disabled={!reward.available || userStats.totalPoints < reward.cost}
                                    >
                                        {userStats.totalPoints >= reward.cost ? 'Resgatar' : 'Insuficiente'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherPointsView;