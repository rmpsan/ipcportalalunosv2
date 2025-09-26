import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Star, 
    MessageSquare, 
    User, 
    Calendar, 
    TrendingUp, 
    Eye, 
    Plus, 
    Send,
    ThumbsUp,
    ThumbsDown,
    AlertCircle,
    CheckCircle,
    Clock,
    Award,
    Target,
    BarChart3,
    PieChart,
    Activity,
    FileText,
    Users,
    BookOpen,
    Briefcase,
    Camera,
    Video,
    Palette,
    Code,
    Heart,
    Flag,
    Edit,
    Trash2,
    Reply,
    MoreHorizontal
} from 'lucide-react';

interface FeedbackItem {
    id: string;
    type: 'student_evaluation' | 'project_feedback' | 'course_review' | 'instructor_rating' | 'company_feedback';
    title: string;
    description: string;
    rating: number;
    author: {
        name: string;
        avatar: string;
        role: string;
        id: string;
    };
    target: {
        name: string;
        type: string;
        id: string;
    };
    date: string;
    status: 'pending' | 'reviewed' | 'responded' | 'archived';
    tags: string[];
    responses: {
        id: string;
        author: string;
        content: string;
        date: string;
        isOfficial: boolean;
    }[];
    metrics: {
        helpful: number;
        notHelpful: number;
        views: number;
    };
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: string;
    isAnonymous: boolean;
    attachments?: string[];
}

const CompanyFeedbackSystemView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('date');
    const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
    const [showNewFeedbackModal, setShowNewFeedbackModal] = useState(false);
    const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

    // Mock data
    const mockFeedback: FeedbackItem[] = [
        {
            id: '1',
            type: 'student_evaluation',
            title: 'Excelente desempenho em Produção Audiovisual',
            description: 'Ana demonstrou excepcional criatividade e domínio técnico durante o projeto de documentário. Sua capacidade de liderança e colaboração foram fundamentais para o sucesso da equipe.',
            rating: 5,
            author: {
                name: 'Prof. Carlos Silva',
                avatar: '/api/placeholder/40/40',
                role: 'Instrutor',
                id: 'prof1'
            },
            target: {
                name: 'Ana Carolina Silva',
                type: 'Aluna',
                id: 'student1'
            },
            date: '2024-01-18',
            status: 'reviewed',
            tags: ['Criatividade', 'Liderança', 'Técnico', 'Colaboração'],
            responses: [
                {
                    id: 'r1',
                    author: 'Ana Carolina Silva',
                    content: 'Muito obrigada pelo feedback! Foi uma experiência incrível trabalhar neste projeto.',
                    date: '2024-01-19',
                    isOfficial: false
                }
            ],
            metrics: {
                helpful: 12,
                notHelpful: 0,
                views: 45
            },
            priority: 'medium',
            category: 'Avaliação Acadêmica',
            isAnonymous: false
        },
        {
            id: '2',
            type: 'project_feedback',
            title: 'Sugestões para melhoria do projeto de UI/UX',
            description: 'O projeto apresenta boa estrutura visual, mas poderia beneficiar-se de maior consistência nos padrões de design e melhor acessibilidade para usuários com deficiência.',
            rating: 4,
            author: {
                name: 'Empresa TechDesign',
                avatar: '/api/placeholder/40/40',
                role: 'Parceiro Empresarial',
                id: 'company1'
            },
            target: {
                name: 'Projeto App Bancário',
                type: 'Projeto',
                id: 'project1'
            },
            date: '2024-01-17',
            status: 'pending',
            tags: ['UI/UX', 'Acessibilidade', 'Design System'],
            responses: [],
            metrics: {
                helpful: 8,
                notHelpful: 1,
                views: 23
            },
            priority: 'high',
            category: 'Feedback de Projeto',
            isAnonymous: false,
            attachments: ['design_guidelines.pdf', 'accessibility_checklist.pdf']
        },
        {
            id: '3',
            type: 'course_review',
            title: 'Curso de Marketing Digital muito completo',
            description: 'O curso aborda todos os aspectos essenciais do marketing digital de forma prática e atualizada. Os professores são experientes e o material é de alta qualidade.',
            rating: 5,
            author: {
                name: 'Aluno Anônimo',
                avatar: '/api/placeholder/40/40',
                role: 'Aluno',
                id: 'anonymous1'
            },
            target: {
                name: 'Marketing Digital - Turma 2024.1',
                type: 'Curso',
                id: 'course1'
            },
            date: '2024-01-16',
            status: 'reviewed',
            tags: ['Qualidade', 'Prático', 'Atualizado'],
            responses: [
                {
                    id: 'r2',
                    author: 'Coordenação Acadêmica',
                    content: 'Agradecemos o feedback positivo! Continuaremos trabalhando para manter a qualidade do curso.',
                    date: '2024-01-17',
                    isOfficial: true
                }
            ],
            metrics: {
                helpful: 15,
                notHelpful: 2,
                views: 67
            },
            priority: 'low',
            category: 'Avaliação de Curso',
            isAnonymous: true
        },
        {
            id: '4',
            type: 'instructor_rating',
            title: 'Professor muito didático e acessível',
            description: 'O professor Roberto tem uma metodologia excelente, sempre disponível para tirar dúvidas e explica os conceitos de forma clara e objetiva.',
            rating: 5,
            author: {
                name: 'Marina Costa',
                avatar: '/api/placeholder/40/40',
                role: 'Aluna',
                id: 'student2'
            },
            target: {
                name: 'Prof. Roberto Lima',
                type: 'Instrutor',
                id: 'instructor1'
            },
            date: '2024-01-15',
            status: 'responded',
            tags: ['Didática', 'Disponibilidade', 'Clareza'],
            responses: [
                {
                    id: 'r3',
                    author: 'Prof. Roberto Lima',
                    content: 'Obrigado Marina! É muito gratificante saber que estou contribuindo para seu aprendizado.',
                    date: '2024-01-16',
                    isOfficial: true
                }
            ],
            metrics: {
                helpful: 9,
                notHelpful: 0,
                views: 34
            },
            priority: 'medium',
            category: 'Avaliação de Instrutor',
            isAnonymous: false
        },
        {
            id: '5',
            type: 'company_feedback',
            title: 'Estagiário demonstrou excelente adaptação',
            description: 'Carlos se adaptou rapidamente ao ambiente de trabalho e demonstrou proatividade em todas as tarefas. Recomendamos fortemente para futuras oportunidades.',
            rating: 5,
            author: {
                name: 'StartupTech RH',
                avatar: '/api/placeholder/40/40',
                role: 'Empresa Parceira',
                id: 'company2'
            },
            target: {
                name: 'Carlos Eduardo Santos',
                type: 'Aluno',
                id: 'student3'
            },
            date: '2024-01-14',
            status: 'reviewed',
            tags: ['Adaptação', 'Proatividade', 'Recomendação'],
            responses: [
                {
                    id: 'r4',
                    author: 'Carlos Eduardo Santos',
                    content: 'Muito obrigado pela oportunidade! Aprendi muito durante o estágio.',
                    date: '2024-01-15',
                    isOfficial: false
                }
            ],
            metrics: {
                helpful: 6,
                notHelpful: 0,
                views: 28
            },
            priority: 'medium',
            category: 'Feedback Empresarial',
            isAnonymous: false
        },
        {
            id: '6',
            type: 'student_evaluation',
            title: 'Necessita melhorar pontualidade e participação',
            description: 'O aluno possui bom conhecimento técnico, mas precisa trabalhar a pontualidade e participação mais ativa nas discussões em sala de aula.',
            rating: 3,
            author: {
                name: 'Prof. Maria Santos',
                avatar: '/api/placeholder/40/40',
                role: 'Instrutora',
                id: 'prof2'
            },
            target: {
                name: 'Roberto Ferreira',
                type: 'Aluno',
                id: 'student4'
            },
            date: '2024-01-13',
            status: 'pending',
            tags: ['Pontualidade', 'Participação', 'Desenvolvimento'],
            responses: [],
            metrics: {
                helpful: 3,
                notHelpful: 1,
                views: 12
            },
            priority: 'high',
            category: 'Avaliação Acadêmica',
            isAnonymous: false
        }
    ];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'student_evaluation': return <User className="w-4 h-4" />;
            case 'project_feedback': return <Briefcase className="w-4 h-4" />;
            case 'course_review': return <BookOpen className="w-4 h-4" />;
            case 'instructor_rating': return <Award className="w-4 h-4" />;
            case 'company_feedback': return <Users className="w-4 h-4" />;
            default: return <MessageSquare className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'student_evaluation': return 'bg-blue-100 text-blue-800';
            case 'project_feedback': return 'bg-purple-100 text-purple-800';
            case 'course_review': return 'bg-green-100 text-green-800';
            case 'instructor_rating': return 'bg-yellow-100 text-yellow-800';
            case 'company_feedback': return 'bg-indigo-100 text-indigo-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'reviewed': return 'bg-blue-100 text-blue-800';
            case 'responded': return 'bg-green-100 text-green-800';
            case 'archived': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'reviewed': return <Eye className="w-4 h-4" />;
            case 'responded': return <CheckCircle className="w-4 h-4" />;
            case 'archived': return <FileText className="w-4 h-4" />;
            default: return <MessageSquare className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-100 text-red-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
            />
        ));
    };

    const filteredFeedback = mockFeedback.filter(feedback => {
        const matchesSearch = feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            feedback.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            feedback.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            feedback.target.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || feedback.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || feedback.priority === priorityFilter;
        
        return matchesSearch && matchesType && matchesStatus && matchesPriority;
    });

    const sortedFeedback = [...filteredFeedback].sort((a, b) => {
        switch (sortBy) {
            case 'date': return new Date(b.date).getTime() - new Date(a.date).getTime();
            case 'rating': return b.rating - a.rating;
            case 'helpful': return b.metrics.helpful - a.metrics.helpful;
            case 'priority': 
                const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            default: return 0;
        }
    });

    const stats = {
        total: mockFeedback.length,
        pending: mockFeedback.filter(f => f.status === 'pending').length,
        avgRating: (mockFeedback.reduce((sum, f) => sum + f.rating, 0) / mockFeedback.length).toFixed(1),
        totalViews: mockFeedback.reduce((sum, f) => sum + f.metrics.views, 0),
        responseRate: Math.round((mockFeedback.filter(f => f.responses.length > 0).length / mockFeedback.length) * 100)
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Sistema de Feedback</h1>
                        <p className="text-gray-600 mt-1">Gerencie avaliações, comentários e sugestões</p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setViewMode('cards')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                viewMode === 'cards' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Cards
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                viewMode === 'list' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Lista
                        </button>
                        <button 
                            onClick={() => setShowNewFeedbackModal(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Feedback
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-sm text-gray-600">Pendentes</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">{stats.avgRating}</div>
                    <div className="text-sm text-gray-600">Média Geral</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
                    <div className="text-sm text-gray-600">Visualizações</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-purple-600">{stats.responseRate}%</div>
                    <div className="text-sm text-gray-600">Taxa Resposta</div>
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
                                placeholder="Buscar feedback..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todos os Tipos</option>
                            <option value="student_evaluation">Avaliação de Aluno</option>
                            <option value="project_feedback">Feedback de Projeto</option>
                            <option value="course_review">Avaliação de Curso</option>
                            <option value="instructor_rating">Avaliação de Instrutor</option>
                            <option value="company_feedback">Feedback Empresarial</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="pending">Pendente</option>
                            <option value="reviewed">Revisado</option>
                            <option value="responded">Respondido</option>
                            <option value="archived">Arquivado</option>
                        </select>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todas as Prioridades</option>
                            <option value="urgent">Urgente</option>
                            <option value="high">Alta</option>
                            <option value="medium">Média</option>
                            <option value="low">Baixa</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="date">Data</option>
                            <option value="rating">Avaliação</option>
                            <option value="helpful">Mais Úteis</option>
                            <option value="priority">Prioridade</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Feedback Cards */}
            {viewMode === 'cards' && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {sortedFeedback.map((feedback) => (
                        <div key={feedback.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeColor(feedback.type)}`}>
                                        {getTypeIcon(feedback.type)}
                                        {feedback.type === 'student_evaluation' && 'Avaliação'}
                                        {feedback.type === 'project_feedback' && 'Projeto'}
                                        {feedback.type === 'course_review' && 'Curso'}
                                        {feedback.type === 'instructor_rating' && 'Instrutor'}
                                        {feedback.type === 'company_feedback' && 'Empresa'}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(feedback.priority)}`}>
                                        {feedback.priority === 'urgent' && 'Urgente'}
                                        {feedback.priority === 'high' && 'Alta'}
                                        {feedback.priority === 'medium' && 'Média'}
                                        {feedback.priority === 'low' && 'Baixa'}
                                    </span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Title and Rating */}
                            <div className="mb-3">
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{feedback.title}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex">{renderStars(feedback.rating)}</div>
                                    <span className="text-sm text-gray-600">({feedback.rating}/5)</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{feedback.description}</p>

                            {/* Author and Target */}
                            <div className="mb-4 space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500">De:</span>
                                    <span className="font-medium">{feedback.isAnonymous ? 'Anônimo' : feedback.author.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500">Para:</span>
                                    <span className="font-medium">{feedback.target.name}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-1">
                                    {feedback.tags.slice(0, 3).map((tag, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                    {feedback.tags.length > 3 && (
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                            +{feedback.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Status and Metrics */}
                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(feedback.status)}`}>
                                    {getStatusIcon(feedback.status)}
                                    {feedback.status === 'pending' && 'Pendente'}
                                    {feedback.status === 'reviewed' && 'Revisado'}
                                    {feedback.status === 'responded' && 'Respondido'}
                                    {feedback.status === 'archived' && 'Arquivado'}
                                </span>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <ThumbsUp className="w-3 h-3" />
                                        {feedback.metrics.helpful}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {feedback.metrics.views}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" />
                                        {feedback.responses.length}
                                    </div>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="text-xs text-gray-500 mb-4">
                                {new Date(feedback.date).toLocaleDateString('pt-BR')}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setSelectedFeedback(feedback.id)}
                                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    Ver Detalhes
                                </button>
                                <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                                    <Reply className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Feedback List */}
            {viewMode === 'list' && (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Feedback
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tipo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Avaliação
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Data
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedFeedback.map((feedback) => (
                                    <tr key={feedback.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 mb-1">{feedback.title}</div>
                                                <div className="text-sm text-gray-500">
                                                    {feedback.isAnonymous ? 'Anônimo' : feedback.author.name} → {feedback.target.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getTypeColor(feedback.type)}`}>
                                                {getTypeIcon(feedback.type)}
                                                {feedback.type === 'student_evaluation' && 'Avaliação'}
                                                {feedback.type === 'project_feedback' && 'Projeto'}
                                                {feedback.type === 'course_review' && 'Curso'}
                                                {feedback.type === 'instructor_rating' && 'Instrutor'}
                                                {feedback.type === 'company_feedback' && 'Empresa'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="flex">{renderStars(feedback.rating)}</div>
                                                <span className="text-sm text-gray-600">({feedback.rating})</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(feedback.status)}`}>
                                                {getStatusIcon(feedback.status)}
                                                {feedback.status === 'pending' && 'Pendente'}
                                                {feedback.status === 'reviewed' && 'Revisado'}
                                                {feedback.status === 'responded' && 'Respondido'}
                                                {feedback.status === 'archived' && 'Arquivado'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(feedback.date).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => setSelectedFeedback(feedback.id)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                Ver
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900">
                                                <Reply className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Feedback Detail Modal */}
            {selectedFeedback && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {(() => {
                            const feedback = mockFeedback.find(f => f.id === selectedFeedback);
                            if (!feedback) return null;

                            return (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-semibold">Detalhes do Feedback</h3>
                                        <button 
                                            onClick={() => setSelectedFeedback(null)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Header Info */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getTypeColor(feedback.type)}`}>
                                                {getTypeIcon(feedback.type)}
                                                {feedback.category}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(feedback.status)}`}>
                                                {getStatusIcon(feedback.status)}
                                                {feedback.status === 'pending' && 'Pendente'}
                                                {feedback.status === 'reviewed' && 'Revisado'}
                                                {feedback.status === 'responded' && 'Respondido'}
                                                {feedback.status === 'archived' && 'Arquivado'}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(feedback.priority)}`}>
                                                Prioridade: {feedback.priority === 'urgent' && 'Urgente'}
                                                {feedback.priority === 'high' && 'Alta'}
                                                {feedback.priority === 'medium' && 'Média'}
                                                {feedback.priority === 'low' && 'Baixa'}
                                            </span>
                                        </div>

                                        {/* Title and Rating */}
                                        <div>
                                            <h4 className="text-lg font-semibold mb-2">{feedback.title}</h4>
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="flex">{renderStars(feedback.rating)}</div>
                                                <span className="text-sm text-gray-600">({feedback.rating}/5)</span>
                                            </div>
                                        </div>

                                        {/* Author and Target */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-medium mb-2">Autor</h5>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <User className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{feedback.isAnonymous ? 'Anônimo' : feedback.author.name}</div>
                                                        <div className="text-sm text-gray-600">{feedback.author.role}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="font-medium mb-2">Destinatário</h5>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <User className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{feedback.target.name}</div>
                                                        <div className="text-sm text-gray-600">{feedback.target.type}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <h5 className="font-medium mb-2">Descrição</h5>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-gray-700">{feedback.description}</p>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <h5 className="font-medium mb-2">Tags</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {feedback.tags.map((tag, index) => (
                                                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Attachments */}
                                        {feedback.attachments && feedback.attachments.length > 0 && (
                                            <div>
                                                <h5 className="font-medium mb-2">Anexos</h5>
                                                <div className="space-y-2">
                                                    {feedback.attachments.map((attachment, index) => (
                                                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                                            <FileText className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm">{attachment}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Metrics */}
                                        <div>
                                            <h5 className="font-medium mb-2">Métricas</h5>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="text-center">
                                                    <div className="text-lg font-semibold text-green-600">{feedback.metrics.helpful}</div>
                                                    <div className="text-sm text-gray-600">Útil</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-lg font-semibold text-red-600">{feedback.metrics.notHelpful}</div>
                                                    <div className="text-sm text-gray-600">Não Útil</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-lg font-semibold text-blue-600">{feedback.metrics.views}</div>
                                                    <div className="text-sm text-gray-600">Visualizações</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Responses */}
                                        <div>
                                            <h5 className="font-medium mb-3">Respostas ({feedback.responses.length})</h5>
                                            <div className="space-y-4">
                                                {feedback.responses.map((response) => (
                                                    <div key={response.id} className={`p-4 rounded-lg ${response.isOfficial ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium">{response.author}</span>
                                                                {response.isOfficial && (
                                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                                        Oficial
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-sm text-gray-500">
                                                                {new Date(response.date).toLocaleDateString('pt-BR')}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-700">{response.content}</p>
                                                    </div>
                                                ))}
                                                {feedback.responses.length === 0 && (
                                                    <p className="text-gray-500 text-center py-4">Nenhuma resposta ainda</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Response Form */}
                                        <div>
                                            <h5 className="font-medium mb-3">Adicionar Resposta</h5>
                                            <div className="space-y-3">
                                                <textarea
                                                    placeholder="Digite sua resposta..."
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    rows={3}
                                                />
                                                <div className="flex justify-between items-center">
                                                    <label className="flex items-center gap-2">
                                                        <input type="checkbox" className="rounded" />
                                                        <span className="text-sm text-gray-600">Resposta oficial</span>
                                                    </label>
                                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                                        <Send className="w-4 h-4" />
                                                        Enviar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* New Feedback Modal */}
            {showNewFeedbackModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold">Novo Feedback</h3>
                            <button 
                                onClick={() => setShowNewFeedbackModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="student_evaluation">Avaliação de Aluno</option>
                                        <option value="project_feedback">Feedback de Projeto</option>
                                        <option value="course_review">Avaliação de Curso</option>
                                        <option value="instructor_rating">Avaliação de Instrutor</option>
                                        <option value="company_feedback">Feedback Empresarial</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="low">Baixa</option>
                                        <option value="medium">Média</option>
                                        <option value="high">Alta</option>
                                        <option value="urgent">Urgente</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                <input
                                    type="text"
                                    placeholder="Título do feedback..."
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Destinatário</label>
                                <input
                                    type="text"
                                    placeholder="Nome do destinatário..."
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação</label>
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Star key={i} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <textarea
                                    placeholder="Descreva seu feedback..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={4}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                <input
                                    type="text"
                                    placeholder="Adicione tags separadas por vírgula..."
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded" />
                                    <span className="text-sm text-gray-600">Feedback anônimo</span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowNewFeedbackModal(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Enviar Feedback
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {sortedFeedback.length === 0 && (
                <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum feedback encontrado</h3>
                    <p className="text-gray-600">Tente ajustar os filtros para encontrar mais feedback.</p>
                </div>
            )}
        </div>
    );
};

export default CompanyFeedbackSystemView;