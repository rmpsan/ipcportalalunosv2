import React from 'react';
import { 
    TrendingUp, 
    Video, 
    FileText, 
    Users, 
    Briefcase, 
    Star,
    Calendar,
    DollarSign,
    BarChart3,
    Clock,
    CheckCircle,
    AlertCircle,
    FolderPlus
} from 'lucide-react';
import { CompanyView } from '../../types';

interface CompanyDashboardViewProps {
    onViewChange: (view: CompanyView) => void;
}

const CompanyDashboardView: React.FC<CompanyDashboardViewProps> = ({ onViewChange }) => {
    const stats = [
        {
            title: 'Stock Footage Comprado',
            value: '127',
            change: '+12%',
            changeType: 'positive' as const,
            icon: Video,
            color: 'blue'
        },
        {
            title: 'Projetos em Andamento',
            value: '8',
            change: '+2',
            changeType: 'positive' as const,
            icon: FileText,
            color: 'purple'
        },
        {
            title: 'Vagas Ativas',
            value: '5',
            change: '0',
            changeType: 'neutral' as const,
            icon: Briefcase,
            color: 'green'
        },
        {
            title: 'Talentos Contratados',
            value: '23',
            change: '+5',
            changeType: 'positive' as const,
            icon: Users,
            color: 'orange'
        }
    ];

    const recentProjects = [
        {
            id: 1,
            title: 'Campanha Institucional Q4',
            status: 'in_progress',
            progress: 75,
            deadline: '2024-02-15',
            budget: 'R$ 45.000'
        },
        {
            id: 2,
            title: 'Vídeo Produto Lançamento',
            status: 'pending',
            progress: 0,
            deadline: '2024-02-28',
            budget: 'R$ 28.000'
        },
        {
            id: 3,
            title: 'Documentário Corporativo',
            status: 'completed',
            progress: 100,
            deadline: '2024-01-30',
            budget: 'R$ 65.000'
        }
    ];

    const recentHires = [
        {
            id: 1,
            name: 'Ana Silva',
            position: 'Editor de Vídeo',
            hiredDate: '2024-01-15',
            rating: 4.8,
            status: 'active'
        },
        {
            id: 2,
            name: 'Carlos Santos',
            position: 'Cinegrafista',
            hiredDate: '2024-01-10',
            rating: 4.9,
            status: 'active'
        },
        {
            id: 3,
            name: 'Marina Costa',
            position: 'Motion Designer',
            hiredDate: '2024-01-05',
            rating: 4.7,
            status: 'active'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-100';
            case 'in_progress': return 'text-blue-600 bg-blue-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Concluído';
            case 'in_progress': return 'Em Andamento';
            case 'pending': return 'Pendente';
            default: return 'Desconhecido';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Empresarial</h1>
                <p className="text-gray-600">Visão geral das suas atividades no Instituto Paulista de Cinema</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                                </div>
                                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                    stat.changeType === 'positive' 
                                        ? 'text-green-700 bg-green-100' 
                                        : stat.changeType === 'negative'
                                        ? 'text-red-700 bg-red-100'
                                        : 'text-gray-700 bg-gray-100'
                                }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Projects */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Projetos Recentes</h2>
                            <button 
                                onClick={() => onViewChange(CompanyView.VIEW_PROJECTS)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                Ver todos
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{project.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{project.budget}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                            {getStatusText(project.status)}
                                        </span>
                                    </div>
                                    
                                    {project.status !== 'pending' && (
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                                <span>Progresso</span>
                                                <span>{project.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span>Prazo: {new Date(project.deadline).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Hires */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Contratações Recentes</h2>
                            <button 
                                onClick={() => onViewChange(CompanyView.VIEW_JOBS)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                Ver vagas
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentHires.map((hire) => (
                                <div key={hire.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        {hire.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{hire.name}</h3>
                                        <p className="text-sm text-gray-600">{hire.position}</p>
                                        <div className="flex items-center mt-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm text-gray-600 ml-1">{hire.rating}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">
                                            {new Date(hire.hiredDate).toLocaleDateString('pt-BR')}
                                        </p>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-700 bg-green-100 mt-1">
                                            Ativo
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button 
                        onClick={() => onViewChange(CompanyView.STOCK_FOOTAGE)}
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Video className="w-8 h-8 text-blue-600 mr-3" />
                        <div className="text-left">
                            <p className="font-medium text-gray-900">Comprar Stock</p>
                            <p className="text-sm text-gray-600">Explorar catálogo</p>
                        </div>
                    </button>
                    
                    <button 
                        onClick={() => onViewChange(CompanyView.NEW_PRODUCTION_REQUEST)}
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <FileText className="w-8 h-8 text-purple-600 mr-3" />
                        <div className="text-left">
                            <p className="font-medium text-gray-900">Nova Solicitação</p>
                            <p className="text-sm text-gray-600">Orçamento de produção</p>
                        </div>
                    </button>
                    
                    <button 
                        onClick={() => onViewChange(CompanyView.POST_JOB)}
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Briefcase className="w-8 h-8 text-green-600 mr-3" />
                        <div className="text-left">
                            <p className="font-medium text-gray-900">Publicar Vaga</p>
                            <p className="text-sm text-gray-600">Encontrar talentos</p>
                        </div>
                    </button>
                    
                    <button 
                        onClick={() => onViewChange(CompanyView.NEW_PROJECT)}
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <FolderPlus className="w-8 h-8 text-orange-600 mr-3" />
                        <div className="text-left">
                            <p className="font-medium text-gray-900">Novo Projeto</p>
                            <p className="text-sm text-gray-600">Criar projeto personalizado</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboardView;