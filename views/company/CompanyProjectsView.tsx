import React, { useState } from 'react';
import { 
    Plus, 
    Search, 
    Filter, 
    Calendar, 
    Clock, 
    DollarSign, 
    Users, 
    FileText, 
    CheckCircle, 
    AlertCircle, 
    XCircle,
    Play,
    Pause,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    MessageSquare,
    Paperclip,
    TrendingUp,
    BarChart3
} from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    status: 'planning' | 'in_progress' | 'review' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    budget: number;
    spent: number;
    startDate: string;
    deadline: string;
    progress: number;
    team: {
        id: string;
        name: string;
        role: string;
        avatar?: string;
    }[];
    client: string;
    category: string;
    attachments: number;
    comments: number;
    lastUpdate: string;
}

const CompanyProjectsView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Mock data
    const projects: Project[] = [
        {
            id: '1',
            title: 'Campanha Publicitária - Verão 2024',
            description: 'Produção de vídeos promocionais para campanha de verão da marca XYZ',
            status: 'in_progress',
            priority: 'high',
            budget: 50000,
            spent: 32000,
            startDate: '2024-01-15',
            deadline: '2024-03-15',
            progress: 65,
            team: [
                { id: '1', name: 'João Silva', role: 'Diretor', avatar: '/avatar1.jpg' },
                { id: '2', name: 'Maria Santos', role: 'Editora', avatar: '/avatar2.jpg' },
                { id: '3', name: 'Pedro Costa', role: 'Cinegrafista', avatar: '/avatar3.jpg' }
            ],
            client: 'Empresa XYZ',
            category: 'Publicidade',
            attachments: 12,
            comments: 8,
            lastUpdate: '2024-01-20'
        },
        {
            id: '2',
            title: 'Documentário Corporativo',
            description: 'Documentário sobre a história e valores da empresa ABC',
            status: 'planning',
            priority: 'medium',
            budget: 30000,
            spent: 5000,
            startDate: '2024-02-01',
            deadline: '2024-04-30',
            progress: 15,
            team: [
                { id: '4', name: 'Ana Lima', role: 'Produtora', avatar: '/avatar4.jpg' },
                { id: '5', name: 'Carlos Oliveira', role: 'Roteirista', avatar: '/avatar5.jpg' }
            ],
            client: 'Empresa ABC',
            category: 'Corporativo',
            attachments: 5,
            comments: 3,
            lastUpdate: '2024-01-18'
        },
        {
            id: '3',
            title: 'Cobertura de Evento',
            description: 'Cobertura completa do evento anual da empresa DEF',
            status: 'completed',
            priority: 'urgent',
            budget: 15000,
            spent: 14500,
            startDate: '2023-12-01',
            deadline: '2023-12-15',
            progress: 100,
            team: [
                { id: '6', name: 'Lucia Ferreira', role: 'Cinegrafista', avatar: '/avatar6.jpg' },
                { id: '7', name: 'Roberto Silva', role: 'Editor', avatar: '/avatar7.jpg' }
            ],
            client: 'Empresa DEF',
            category: 'Evento',
            attachments: 25,
            comments: 15,
            lastUpdate: '2023-12-16'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'planning': return 'bg-yellow-100 text-yellow-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'review': return 'bg-purple-100 text-purple-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'planning': return <Clock className="w-4 h-4" />;
            case 'in_progress': return <Play className="w-4 h-4" />;
            case 'review': return <Eye className="w-4 h-4" />;
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'low': return 'bg-gray-100 text-gray-600';
            case 'medium': return 'bg-yellow-100 text-yellow-600';
            case 'high': return 'bg-orange-100 text-orange-600';
            case 'urgent': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'planning': return 'Planejamento';
            case 'in_progress': return 'Em Andamento';
            case 'review': return 'Em Revisão';
            case 'completed': return 'Concluído';
            case 'cancelled': return 'Cancelado';
            default: return status;
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'low': return 'Baixa';
            case 'medium': return 'Média';
            case 'high': return 'Alta';
            case 'urgent': return 'Urgente';
            default: return priority;
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
        
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const getProgressColor = (progress: number) => {
        if (progress < 30) return 'bg-red-500';
        if (progress < 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const getDaysUntilDeadline = (deadline: string) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
                    <p className="text-gray-600">Gerencie e acompanhe todos os seus projetos</p>
                </div>
                
                <button
                    onClick={() => setShowNewProjectModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Novo Projeto
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total de Projetos</p>
                            <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Em Andamento</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {projects.filter(p => p.status === 'in_progress').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Play className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Concluídos</p>
                            <p className="text-2xl font-bold text-green-600">
                                {projects.filter(p => p.status === 'completed').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Orçamento Total</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(projects.reduce((sum, p) => sum + p.budget, 0))}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar projetos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Todos os Status</option>
                        <option value="planning">Planejamento</option>
                        <option value="in_progress">Em Andamento</option>
                        <option value="review">Em Revisão</option>
                        <option value="completed">Concluído</option>
                        <option value="cancelled">Cancelado</option>
                    </select>

                    {/* Priority Filter */}
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Todas as Prioridades</option>
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                        <option value="urgent">Urgente</option>
                    </select>
                </div>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {filteredProjects.map(project => (
                    <div key={project.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            {/* Project Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {project.description}
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                            {getStatusIcon(project.status)}
                                            {getStatusLabel(project.status)}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                                            {getPriorityLabel(project.priority)}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                        <span>Progresso</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Cliente</p>
                                        <p className="font-medium text-gray-900">{project.client}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Categoria</p>
                                        <p className="font-medium text-gray-900">{project.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Orçamento</p>
                                        <p className="font-medium text-gray-900">{formatCurrency(project.budget)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Prazo</p>
                                        <p className="font-medium text-gray-900">{formatDate(project.deadline)}</p>
                                        {getDaysUntilDeadline(project.deadline) > 0 && (
                                            <p className="text-xs text-orange-600">
                                                {getDaysUntilDeadline(project.deadline)} dias restantes
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Team */}
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-2">Equipe</p>
                                    <div className="flex items-center gap-2">
                                        {project.team.slice(0, 3).map(member => (
                                            <div key={member.id} className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-xs font-medium text-blue-600">
                                                        {member.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-700">{member.name}</span>
                                                <span className="text-xs text-gray-500">({member.role})</span>
                                            </div>
                                        ))}
                                        {project.team.length > 3 && (
                                            <span className="text-sm text-gray-500">+{project.team.length - 3} mais</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Paperclip className="w-4 h-4" />
                                        {project.attachments}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="w-4 h-4" />
                                        {project.comments}
                                    </div>
                                </div>
                                
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhum projeto encontrado
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Tente ajustar os filtros ou crie um novo projeto
                    </p>
                    <button
                        onClick={() => setShowNewProjectModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Criar Primeiro Projeto
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompanyProjectsView;