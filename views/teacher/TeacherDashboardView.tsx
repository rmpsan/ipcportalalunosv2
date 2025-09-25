import React from 'react';
import { 
    Users, 
    BookOpen, 
    ClipboardCheck, 
    TrendingUp, 
    Calendar,
    MessageCircle,
    Award,
    Clock,
    Target,
    BarChart3,
    Activity,
    CheckCircle,
    FileText,
    Star,
    HelpCircle,
    Video
} from 'lucide-react';

const TeacherDashboardView: React.FC = () => {
    const stats = [
        {
            title: 'Total de Alunos',
            value: '65',
            icon: Users,
            color: 'bg-blue-500',
            change: '+5 este mês',
            changeType: 'increase'
        },
        {
            title: 'Projetos Ativos',
            value: '12',
            icon: BookOpen,
            color: 'bg-green-500',
            change: '+2 esta semana',
            changeType: 'increase'
        },
        {
            title: 'Avaliações Pendentes',
            value: '8',
            icon: ClipboardCheck,
            color: 'bg-yellow-500',
            change: '-3 desde ontem',
            changeType: 'decrease'
        },
        {
            title: 'Taxa de Aprovação',
            value: '94%',
            icon: Award,
            color: 'bg-purple-500',
            change: '+2% este semestre',
            changeType: 'increase'
        }
    ];

    const quickActions = [
        {
            title: 'Avaliar Projetos',
            description: 'Corrigir trabalhos pendentes',
            icon: ClipboardCheck,
            color: 'bg-blue-500'
        },
        {
            title: 'Criar Conteúdo',
            description: 'Adicionar novo material',
            icon: BookOpen,
            color: 'bg-green-500'
        },
        {
            title: 'Agendar Aula',
            description: 'Marcar nova sessão',
            icon: Calendar,
            color: 'bg-purple-500'
        },
        {
            title: 'Ver Relatórios',
            description: 'Analisar desempenho',
            icon: BarChart3,
            color: 'bg-orange-500'
        },
        {
            title: 'Mensagens',
            description: 'Comunicar com alunos',
            icon: MessageCircle,
            color: 'bg-pink-500'
        },
        {
            title: 'Equipamentos',
            description: 'Gerenciar solicitações',
            icon: Video,
            color: 'bg-indigo-500'
        }
    ];

    const recentActivities = [
        {
            title: 'Projeto Final Entregue',
            description: 'Ana Silva enviou o curta-metragem',
            time: '2 horas atrás',
            icon: FileText,
            color: 'bg-blue-500'
        },
        {
            title: 'Avaliação Concluída',
            description: 'Carlos Santos - Nota: 9.2',
            time: '4 horas atrás',
            icon: Star,
            color: 'bg-green-500'
        },
        {
            title: 'Nova Dúvida',
            description: 'Marina Costa sobre color grading',
            time: '6 horas atrás',
            icon: HelpCircle,
            color: 'bg-yellow-500'
        },
        {
            title: 'Equipamento Aprovado',
            description: 'Câmera Sony FX3 para João',
            time: '1 dia atrás',
            icon: Video,
            color: 'bg-purple-500'
        }
    ];

    const upcomingClasses = [
        {
            title: 'Turma IA Audiovisual',
            time: '14:00',
            date: 'Hoje',
            students: 28
        },
        {
            title: 'Produção Avançada',
            time: '09:00',
            date: 'Amanhã',
            students: 15
        },
        {
            title: 'Workshop Motion Graphics',
            time: '16:00',
            date: 'Sexta',
            students: 22
        }
    ];

    return (
        <div className="teacher-container p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div className="teacher-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard do Professor</h1>
                    <p className="text-gray-600 mt-1">Bem-vindo de volta! Aqui está um resumo das suas atividades.</p>
                </div>
                <div className="teacher-actions flex flex-col sm:flex-row gap-2">
                    <button className="teacher-button flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Aula
                    </button>
                    <button className="teacher-button flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Nova Mensagem
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="teacher-stats-grid">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} className="teacher-stat-card teacher-dashboard-card">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                    <div className="teacher-progress-bar mt-3">
                                        <div 
                                            className="teacher-progress-fill" 
                                            style={{ width: `${Math.min(100, (parseInt(stat.value.replace(/\D/g, '')) / 100) * 100)}%` }}
                                        ></div>
                                    </div>
                                    <p className={`text-xs flex items-center gap-1 mt-2 ${
                                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        <TrendingUp className="w-3 h-3" />
                                        {stat.change}
                                    </p>
                                </div>
                                <div className="text-purple-600 opacity-80 ml-4">
                                    <IconComponent className="w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="teacher-dashboard-card">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
                <div className="teacher-quick-actions">
                    {quickActions.map((action, index) => {
                        const IconComponent = action.icon;
                        return (
                            <button key={index} className="teacher-quick-action-card">
                                <IconComponent className="w-6 h-6 mb-2 mx-auto" />
                                <h3 className="font-medium text-sm mb-1">{action.title}</h3>
                                <p className="text-xs opacity-90">{action.description}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="teacher-dashboard-card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Atividades Recentes</h2>
                        <button className="teacher-icon-button text-purple-600 hover:text-purple-700">
                            <Activity className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {recentActivities.map((activity, index) => {
                            const IconComponent = activity.icon;
                            return (
                                <div key={index} className="teacher-activity-card">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <IconComponent className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900 text-sm">{activity.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Upcoming Classes */}
                <div className="teacher-dashboard-card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Próximas Aulas</h2>
                        <button className="teacher-icon-button text-purple-600 hover:text-purple-700">
                            <Calendar className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {upcomingClasses.map((classItem, index) => (
                            <div key={index} className="teacher-activity-card">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 text-sm">{classItem.title}</h3>
                                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                            <Users className="w-3 h-3" />
                                            {classItem.students} alunos
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{classItem.time}</p>
                                        <p className="text-xs text-gray-500">{classItem.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboardView;