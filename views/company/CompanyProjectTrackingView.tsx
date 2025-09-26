import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Calendar, 
    Clock, 
    User, 
    BarChart3, 
    TrendingUp, 
    AlertTriangle, 
    CheckCircle, 
    Play, 
    Pause, 
    MoreHorizontal,
    FileText,
    MessageSquare,
    DollarSign,
    Target,
    Users,
    Activity,
    Eye,
    Edit
} from 'lucide-react';

interface ProjectTask {
    id: string;
    name: string;
    status: 'pending' | 'in_progress' | 'completed' | 'blocked';
    assignee: string;
    dueDate: string;
    progress: number;
}

interface ProjectMilestone {
    id: string;
    name: string;
    date: string;
    status: 'upcoming' | 'current' | 'completed' | 'delayed';
    description: string;
}

interface Project {
    id: string;
    name: string;
    client: string;
    status: 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold';
    priority: 'low' | 'medium' | 'high' | 'critical';
    progress: number;
    budget: number;
    spent: number;
    startDate: string;
    endDate: string;
    team: string[];
    manager: string;
    description: string;
    tasks: ProjectTask[];
    milestones: ProjectMilestone[];
    lastUpdate: string;
    health: 'good' | 'warning' | 'critical';
}

const CompanyProjectTrackingView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

    // Mock data
    const mockProjects: Project[] = [
        {
            id: '1',
            name: 'Campanha Digital Q1 2024',
            client: 'TechCorp Solutions',
            status: 'in_progress',
            priority: 'high',
            progress: 65,
            budget: 50000,
            spent: 32500,
            startDate: '2024-01-15',
            endDate: '2024-03-15',
            team: ['Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Costa'],
            manager: 'Pedro Almeida',
            description: 'Desenvolvimento de campanha digital completa incluindo vídeos, posts e landing pages.',
            lastUpdate: '2024-01-20',
            health: 'good',
            tasks: [
                { id: '1', name: 'Criação do roteiro', status: 'completed', assignee: 'Ana Silva', dueDate: '2024-01-20', progress: 100 },
                { id: '2', name: 'Produção de vídeos', status: 'in_progress', assignee: 'Carlos Santos', dueDate: '2024-02-05', progress: 70 },
                { id: '3', name: 'Design das landing pages', status: 'in_progress', assignee: 'Maria Oliveira', dueDate: '2024-02-10', progress: 45 },
                { id: '4', name: 'Configuração de analytics', status: 'pending', assignee: 'João Costa', dueDate: '2024-02-15', progress: 0 }
            ],
            milestones: [
                { id: '1', name: 'Aprovação do conceito', date: '2024-01-25', status: 'completed', description: 'Conceito criativo aprovado pelo cliente' },
                { id: '2', name: 'Entrega dos vídeos', date: '2024-02-10', status: 'current', description: 'Finalização e entrega dos vídeos principais' },
                { id: '3', name: 'Launch da campanha', date: '2024-02-20', status: 'upcoming', description: 'Lançamento oficial da campanha' }
            ]
        },
        {
            id: '2',
            name: 'Rebranding Empresa ABC',
            client: 'ABC Industries',
            status: 'review',
            priority: 'medium',
            progress: 85,
            budget: 35000,
            spent: 29750,
            startDate: '2023-12-01',
            endDate: '2024-02-01',
            team: ['Lucia Ferreira', 'Roberto Lima', 'Carla Mendes'],
            manager: 'Fernanda Costa',
            description: 'Renovação completa da identidade visual e materiais de comunicação.',
            lastUpdate: '2024-01-18',
            health: 'warning',
            tasks: [
                { id: '1', name: 'Pesquisa de mercado', status: 'completed', assignee: 'Lucia Ferreira', dueDate: '2023-12-15', progress: 100 },
                { id: '2', name: 'Desenvolvimento da logo', status: 'completed', assignee: 'Roberto Lima', dueDate: '2024-01-10', progress: 100 },
                { id: '3', name: 'Manual de identidade', status: 'in_progress', assignee: 'Carla Mendes', dueDate: '2024-01-25', progress: 90 },
                { id: '4', name: 'Aprovação final', status: 'pending', assignee: 'Fernanda Costa', dueDate: '2024-02-01', progress: 0 }
            ],
            milestones: [
                { id: '1', name: 'Briefing aprovado', date: '2023-12-10', status: 'completed', description: 'Briefing e direcionamento aprovados' },
                { id: '2', name: 'Logo finalizada', date: '2024-01-15', status: 'completed', description: 'Nova logo aprovada e finalizada' },
                { id: '3', name: 'Entrega final', date: '2024-02-01', status: 'upcoming', description: 'Entrega de todos os materiais' }
            ]
        },
        {
            id: '3',
            name: 'Documentário Corporativo',
            client: 'Empresa Histórica Ltda',
            status: 'planning',
            priority: 'low',
            progress: 15,
            budget: 80000,
            spent: 12000,
            startDate: '2024-02-01',
            endDate: '2024-05-01',
            team: ['Diego Rocha', 'Patrícia Nunes', 'Marcos Vieira', 'Sandra Lopes'],
            manager: 'Ricardo Barbosa',
            description: 'Produção de documentário sobre os 50 anos da empresa.',
            lastUpdate: '2024-01-19',
            health: 'good',
            tasks: [
                { id: '1', name: 'Pesquisa histórica', status: 'in_progress', assignee: 'Patrícia Nunes', dueDate: '2024-02-15', progress: 60 },
                { id: '2', name: 'Roteiro preliminar', status: 'pending', assignee: 'Diego Rocha', dueDate: '2024-02-20', progress: 0 },
                { id: '3', name: 'Agendamento de entrevistas', status: 'pending', assignee: 'Sandra Lopes', dueDate: '2024-02-25', progress: 0 }
            ],
            milestones: [
                { id: '1', name: 'Pesquisa concluída', date: '2024-02-20', status: 'upcoming', description: 'Finalização da pesquisa histórica' },
                { id: '2', name: 'Início das filmagens', date: '2024-03-15', status: 'upcoming', description: 'Início da produção audiovisual' },
                { id: '3', name: 'Entrega final', date: '2024-05-01', status: 'upcoming', description: 'Documentário finalizado' }
            ]
        },
        {
            id: '4',
            name: 'E-commerce Fashion Store',
            client: 'Fashion Trends',
            status: 'on_hold',
            priority: 'critical',
            progress: 40,
            budget: 120000,
            spent: 48000,
            startDate: '2023-11-01',
            endDate: '2024-03-01',
            team: ['Amanda Torres', 'Bruno Cardoso', 'Cristina Dias'],
            manager: 'Eduardo Silva',
            description: 'Desenvolvimento completo de plataforma e-commerce com integração de pagamentos.',
            lastUpdate: '2024-01-10',
            health: 'critical',
            tasks: [
                { id: '1', name: 'Arquitetura do sistema', status: 'completed', assignee: 'Bruno Cardoso', dueDate: '2023-12-01', progress: 100 },
                { id: '2', name: 'Design das páginas', status: 'completed', assignee: 'Amanda Torres', dueDate: '2023-12-15', progress: 100 },
                { id: '3', name: 'Desenvolvimento backend', status: 'blocked', assignee: 'Bruno Cardoso', dueDate: '2024-01-15', progress: 60 },
                { id: '4', name: 'Integração de pagamentos', status: 'pending', assignee: 'Cristina Dias', dueDate: '2024-02-01', progress: 0 }
            ],
            milestones: [
                { id: '1', name: 'Protótipo aprovado', date: '2023-12-20', status: 'completed', description: 'Protótipo das páginas aprovado' },
                { id: '2', name: 'MVP funcional', date: '2024-01-30', status: 'delayed', description: 'Versão mínima funcional' },
                { id: '3', name: 'Launch beta', date: '2024-02-15', status: 'upcoming', description: 'Lançamento da versão beta' }
            ]
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'planning': return 'bg-gray-100 text-gray-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'review': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'on_hold': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'low': return 'bg-gray-100 text-gray-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'critical': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getHealthColor = (health: string) => {
        switch (health) {
            case 'good': return 'text-green-600';
            case 'warning': return 'text-yellow-600';
            case 'critical': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getTaskStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-gray-100 text-gray-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'blocked': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredProjects = mockProjects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
        
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const stats = {
        total: mockProjects.length,
        active: mockProjects.filter(p => p.status === 'in_progress').length,
        completed: mockProjects.filter(p => p.status === 'completed').length,
        delayed: mockProjects.filter(p => p.health === 'critical').length,
        totalBudget: mockProjects.reduce((sum, p) => sum + p.budget, 0),
        totalSpent: mockProjects.reduce((sum, p) => sum + p.spent, 0)
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Acompanhamento de Projetos</h1>
                        <p className="text-gray-600 mt-1">Monitore o progresso e performance de todos os projetos</p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                viewMode === 'grid' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Grade
                        </button>
                        <button 
                            onClick={() => setViewMode('timeline')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                viewMode === 'timeline' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Timeline
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
                    <div className="text-sm text-gray-600">Ativos</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                    <div className="text-sm text-gray-600">Concluídos</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-red-600">{stats.delayed}</div>
                    <div className="text-sm text-gray-600">Atrasados</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">R$ {stats.totalBudget.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Orçamento</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">R$ {stats.totalSpent.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Gasto</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar projetos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="planning">Planejamento</option>
                            <option value="in_progress">Em Andamento</option>
                            <option value="review">Em Revisão</option>
                            <option value="completed">Concluído</option>
                            <option value="on_hold">Pausado</option>
                        </select>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todas as Prioridades</option>
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                            <option value="critical">Crítica</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            {viewMode === 'grid' && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            {/* Project Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                                    <p className="text-sm text-gray-600">{project.client}</p>
                                </div>
                                <div className={`p-1 rounded-full ${getHealthColor(project.health)}`}>
                                    <Activity className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Status and Priority */}
                            <div className="flex gap-2 mb-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                    {project.status === 'planning' && 'Planejamento'}
                                    {project.status === 'in_progress' && 'Em Andamento'}
                                    {project.status === 'review' && 'Em Revisão'}
                                    {project.status === 'completed' && 'Concluído'}
                                    {project.status === 'on_hold' && 'Pausado'}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                                    {project.priority === 'low' && 'Baixa'}
                                    {project.priority === 'medium' && 'Média'}
                                    {project.priority === 'high' && 'Alta'}
                                    {project.priority === 'critical' && 'Crítica'}
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Progresso</span>
                                    <span className="font-medium">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Budget */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Orçamento</span>
                                    <span className="font-medium">
                                        R$ {project.spent.toLocaleString()} / R$ {project.budget.toLocaleString()}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(project.spent / project.budget) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Team and Manager */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <User className="w-4 h-4" />
                                    <span>Gerente: {project.manager}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{project.team.length} membros</span>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {new Date(project.startDate).toLocaleDateString('pt-BR')} - {new Date(project.endDate).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setSelectedProject(project.id)}
                                    className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                >
                                    Ver Detalhes
                                </button>
                                <button className="bg-gray-50 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
                                    <Edit className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Timeline View */}
            {viewMode === 'timeline' && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-6">Timeline dos Projetos</h3>
                    <div className="space-y-6">
                        {filteredProjects.map((project, index) => (
                            <div key={project.id} className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                            {project.status === 'planning' && 'Planejamento'}
                                            {project.status === 'in_progress' && 'Em Andamento'}
                                            {project.status === 'review' && 'Em Revisão'}
                                            {project.status === 'completed' && 'Concluído'}
                                            {project.status === 'on_hold' && 'Pausado'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                        <span>{project.client}</span>
                                        <span>{new Date(project.startDate).toLocaleDateString('pt-BR')} - {new Date(project.endDate).toLocaleDateString('pt-BR')}</span>
                                        <span>{project.progress}% concluído</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Project Detail Modal */}
            {selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {(() => {
                            const project = mockProjects.find(p => p.id === selectedProject);
                            if (!project) return null;

                            return (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-semibold">{project.name}</h3>
                                        <button 
                                            onClick={() => setSelectedProject(null)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        {/* Project Info */}
                                        <div>
                                            <h4 className="font-medium mb-3">Informações do Projeto</h4>
                                            <div className="space-y-2 text-sm">
                                                <div><span className="text-gray-600">Cliente:</span> {project.client}</div>
                                                <div><span className="text-gray-600">Gerente:</span> {project.manager}</div>
                                                <div><span className="text-gray-600">Período:</span> {new Date(project.startDate).toLocaleDateString('pt-BR')} - {new Date(project.endDate).toLocaleDateString('pt-BR')}</div>
                                                <div><span className="text-gray-600">Orçamento:</span> R$ {project.budget.toLocaleString()}</div>
                                                <div><span className="text-gray-600">Gasto:</span> R$ {project.spent.toLocaleString()}</div>
                                            </div>
                                        </div>

                                        {/* Team */}
                                        <div>
                                            <h4 className="font-medium mb-3">Equipe</h4>
                                            <div className="space-y-1">
                                                {project.team.map((member, index) => (
                                                    <div key={index} className="text-sm text-gray-600">{member}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tasks */}
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-3">Tarefas</h4>
                                        <div className="space-y-2">
                                            {project.tasks.map((task) => (
                                                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex-1">
                                                        <div className="font-medium text-sm">{task.name}</div>
                                                        <div className="text-xs text-gray-600">{task.assignee} • {new Date(task.dueDate).toLocaleDateString('pt-BR')}</div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                                                            {task.status === 'pending' && 'Pendente'}
                                                            {task.status === 'in_progress' && 'Em Andamento'}
                                                            {task.status === 'completed' && 'Concluída'}
                                                            {task.status === 'blocked' && 'Bloqueada'}
                                                        </span>
                                                        <div className="text-sm font-medium">{task.progress}%</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Milestones */}
                                    <div>
                                        <h4 className="font-medium mb-3">Marcos</h4>
                                        <div className="space-y-2">
                                            {project.milestones.map((milestone) => (
                                                <div key={milestone.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <div className={`w-3 h-3 rounded-full ${
                                                        milestone.status === 'completed' ? 'bg-green-500' :
                                                        milestone.status === 'current' ? 'bg-blue-500' :
                                                        milestone.status === 'delayed' ? 'bg-red-500' :
                                                        'bg-gray-300'
                                                    }`}></div>
                                                    <div className="flex-1">
                                                        <div className="font-medium text-sm">{milestone.name}</div>
                                                        <div className="text-xs text-gray-600">{milestone.description}</div>
                                                    </div>
                                                    <div className="text-sm text-gray-600">{new Date(milestone.date).toLocaleDateString('pt-BR')}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
                    <p className="text-gray-600">Tente ajustar os filtros para ver mais projetos.</p>
                </div>
            )}
        </div>
    );
};

export default CompanyProjectTrackingView;