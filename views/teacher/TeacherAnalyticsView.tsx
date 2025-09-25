import React, { useState } from 'react';
import { 
    BarChart3, 
    TrendingUp, 
    TrendingDown,
    Users, 
    BookOpen, 
    Clock, 
    Target,
    Calendar,
    Filter,
    Download,
    Eye,
    Activity,
    Award,
    CheckCircle,
    AlertCircle,
    User
} from 'lucide-react';
import { TeacherView } from '../../types';

interface TeacherAnalyticsViewProps {
    setActiveView: (view: TeacherView) => void;
}

const TeacherAnalyticsView: React.FC<TeacherAnalyticsViewProps> = ({ setActiveView }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    const overviewStats = [
        {
            title: 'Total de Alunos',
            value: '156',
            change: '+12%',
            changeType: 'increase',
            icon: Users,
            color: 'bg-blue-500'
        },
        {
            title: 'Taxa de Conclusão',
            value: '78%',
            change: '+5%',
            changeType: 'increase',
            icon: CheckCircle,
            color: 'bg-green-500'
        },
        {
            title: 'Nota Média',
            value: '8.2',
            change: '+0.3',
            changeType: 'increase',
            icon: Award,
            color: 'bg-purple-500'
        },
        {
            title: 'Horas de Ensino',
            value: '2,340',
            change: '+8%',
            changeType: 'increase',
            icon: Clock,
            color: 'bg-orange-500'
        }
    ];

    const topStudents = [
        { name: 'Ana Silva', class: 'IA Audiovisual', score: '9.5', progress: 95 },
        { name: 'Carlos Santos', class: 'Produção Avançada', score: '9.2', progress: 92 },
        { name: 'Marina Costa', class: 'Motion Graphics', score: '8.8', progress: 88 },
        { name: 'João Oliveira', class: 'IA Audiovisual', score: '8.5', progress: 85 },
        { name: 'Beatriz Lima', class: 'Produção Avançada', score: '8.3', progress: 83 }
    ];

    const coursePerformance = [
        { name: 'IA Audiovisual 2024.1', completion: 85, students: 28, avgGrade: '8.5' },
        { name: 'Produção Avançada', completion: 90, students: 15, avgGrade: '8.8' },
        { name: 'Motion Graphics', completion: 68, students: 22, avgGrade: '7.9' },
        { name: 'Edição Profissional', completion: 75, students: 18, avgGrade: '8.1' }
    ];

    const recentActivity = [
        {
            title: 'Nova avaliação criada',
            description: 'Prova Final - IA Audiovisual',
            time: '2 horas atrás',
            icon: CheckCircle,
            color: 'bg-green-500'
        },
        {
            title: 'Aluno enviou projeto',
            description: 'Ana Silva - Projeto Final',
            time: '4 horas atrás',
            icon: BookOpen,
            color: 'bg-blue-500'
        },
        {
            title: 'Feedback enviado',
            description: 'Correções para 5 alunos',
            time: '6 horas atrás',
            icon: Activity,
            color: 'bg-purple-500'
        },
        {
            title: 'Novo conteúdo publicado',
            description: 'Aula sobre Composição',
            time: '1 dia atrás',
            icon: Award,
            color: 'bg-orange-500'
        }
    ];

    return (
        <div className="teacher-container p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div className="teacher-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Analytics & Relatórios</h1>
                    <p className="text-gray-600 mt-1">Acompanhe o desempenho e progresso das suas turmas</p>
                </div>
                <div className="teacher-actions flex flex-col sm:flex-row gap-2">
                    <button className="teacher-button flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Relatório
                    </button>
                    <button className="teacher-button flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Calendar className="w-4 h-4 mr-2" />
                        Período Personalizado
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="teacher-stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {overviewStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} className="teacher-stat-card teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="stat-value text-xl lg:text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    {stat.change && (
                                        <div className="flex items-center mt-2">
                                            {stat.changeType === 'increase' ? (
                                                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                                            )}
                                            <span className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                                {stat.change}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Chart */}
                <div className="teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Desempenho por Turma</h2>
                        <button className="teacher-button teacher-icon-button text-purple-600 hover:text-purple-700">
                            <BarChart3 className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="teacher-chart-container h-64 lg:h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Gráfico de Desempenho</p>
                        </div>
                    </div>
                </div>

                {/* Progress Chart */}
                <div className="teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Progresso Mensal</h2>
                        <button className="teacher-button teacher-icon-button text-purple-600 hover:text-purple-700">
                            <TrendingUp className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="teacher-chart-container h-64 lg:h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Gráfico de Progresso</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Students */}
                <div className="teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Top Alunos</h2>
                        <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="space-y-3">
                        {topStudents.map((student, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{student.name}</p>
                                        <p className="text-sm text-gray-600">{student.class}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-green-600">{student.score}</p>
                                    <p className="text-xs text-gray-500">{student.progress}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Performance */}
                <div className="teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Desempenho por Curso</h2>
                        <BookOpen className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="space-y-3">
                        {coursePerformance.map((course, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-900">{course.name}</span>
                                    <span className="text-sm text-gray-600">{course.completion}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full" 
                                        style={{ width: `${course.completion}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{course.students} alunos</span>
                                    <span>Média: {course.avgGrade}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Atividade Recente</h2>
                        <Activity className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="space-y-3">
                        {recentActivity.map((activity, index) => {
                            const IconComponent = activity.icon;
                            return (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                        <IconComponent className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                                        <p className="text-sm text-gray-600">{activity.description}</p>
                                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherAnalyticsView;