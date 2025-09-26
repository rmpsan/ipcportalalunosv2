import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Plus, 
    Calendar, 
    Clock, 
    User, 
    FileText, 
    Eye, 
    Edit, 
    Trash2, 
    CheckCircle, 
    XCircle, 
    AlertCircle,
    Download,
    MessageSquare,
    DollarSign,
    Camera,
    Video,
    Mic,
    Image as ImageIcon
} from 'lucide-react';

interface ProductionRequest {
    id: string;
    title: string;
    type: 'video' | 'photo' | 'audio' | 'design';
    description: string;
    client: string;
    budget: number;
    deadline: string;
    status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    createdAt: string;
    assignedTo?: string;
    requirements: string[];
    deliverables: string[];
    comments: number;
}

const CompanyProductionRequestsView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [showNewRequestModal, setShowNewRequestModal] = useState(false);

    // Mock data
    const mockRequests: ProductionRequest[] = [
        {
            id: '1',
            title: 'Campanha Publicitária - Produto X',
            type: 'video',
            description: 'Criação de vídeo promocional para lançamento do produto X, incluindo roteiro, filmagem e edição.',
            client: 'Cliente ABC Ltda',
            budget: 15000,
            deadline: '2024-02-15',
            status: 'approved',
            priority: 'high',
            createdAt: '2024-01-10',
            assignedTo: 'Equipe de Vídeo',
            requirements: ['Roteiro aprovado', 'Locação definida', 'Atores contratados'],
            deliverables: ['Vídeo final 60s', 'Versões 30s e 15s', 'Making of'],
            comments: 8
        },
        {
            id: '2',
            title: 'Sessão de Fotos - Catálogo 2024',
            type: 'photo',
            description: 'Produção fotográfica para catálogo de produtos da linha primavera/verão 2024.',
            client: 'Fashion Store',
            budget: 8500,
            deadline: '2024-02-20',
            status: 'in_progress',
            priority: 'medium',
            createdAt: '2024-01-08',
            assignedTo: 'João Silva',
            requirements: ['Modelos selecionadas', 'Roupas separadas', 'Estúdio reservado'],
            deliverables: ['200 fotos editadas', 'Fotos em alta resolução', 'Versões para web'],
            comments: 5
        },
        {
            id: '3',
            title: 'Podcast Corporativo - Episódio 12',
            type: 'audio',
            description: 'Gravação e edição do episódio 12 do podcast corporativo com entrevista especial.',
            client: 'Empresa Interna',
            budget: 2500,
            deadline: '2024-02-10',
            status: 'pending',
            priority: 'low',
            createdAt: '2024-01-12',
            requirements: ['Convidado confirmado', 'Roteiro de perguntas', 'Estúdio de áudio'],
            deliverables: ['Episódio editado', 'Transcrição', 'Clipes para redes sociais'],
            comments: 2
        },
        {
            id: '4',
            title: 'Identidade Visual - Startup Tech',
            type: 'design',
            description: 'Desenvolvimento completo da identidade visual para nova startup de tecnologia.',
            client: 'TechStart Solutions',
            budget: 12000,
            deadline: '2024-02-25',
            status: 'rejected',
            priority: 'medium',
            createdAt: '2024-01-05',
            requirements: ['Briefing completo', 'Referências visuais', 'Aprovação do conceito'],
            deliverables: ['Logo principal', 'Variações do logo', 'Manual de identidade', 'Aplicações'],
            comments: 12
        },
        {
            id: '5',
            title: 'Documentário Corporativo',
            type: 'video',
            description: 'Produção de documentário sobre a história e valores da empresa para evento de 25 anos.',
            client: 'Empresa Centenária S.A.',
            budget: 25000,
            deadline: '2024-03-01',
            status: 'completed',
            priority: 'urgent',
            createdAt: '2023-12-20',
            assignedTo: 'Equipe Completa',
            requirements: ['Entrevistas gravadas', 'Material histórico', 'Aprovação da diretoria'],
            deliverables: ['Documentário 45min', 'Trailer 3min', 'Versão para redes sociais'],
            comments: 15
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-purple-100 text-purple-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'low': return 'bg-gray-100 text-gray-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'urgent': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video className="w-4 h-4" />;
            case 'photo': return <Camera className="w-4 h-4" />;
            case 'audio': return <Mic className="w-4 h-4" />;
            case 'design': return <ImageIcon className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const filteredRequests = mockRequests.filter(request => {
        const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            request.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        const matchesType = typeFilter === 'all' || request.type === typeFilter;
        const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
        
        return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });

    const stats = {
        total: mockRequests.length,
        pending: mockRequests.filter(r => r.status === 'pending').length,
        approved: mockRequests.filter(r => r.status === 'approved').length,
        inProgress: mockRequests.filter(r => r.status === 'in_progress').length,
        completed: mockRequests.filter(r => r.status === 'completed').length,
        totalBudget: mockRequests.reduce((sum, r) => sum + r.budget, 0)
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Solicitações de Produção</h1>
                        <p className="text-gray-600 mt-1">Gerencie todas as solicitações de produção audiovisual</p>
                    </div>
                    <button 
                        onClick={() => setShowNewRequestModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Nova Solicitação
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-sm text-gray-600">Pendentes</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.approved}</div>
                    <div className="text-sm text-gray-600">Aprovadas</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-purple-600">{stats.inProgress}</div>
                    <div className="text-sm text-gray-600">Em Produção</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                    <div className="text-sm text-gray-600">Concluídas</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">R$ {stats.totalBudget.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Orçamento Total</div>
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
                                placeholder="Buscar por título ou cliente..."
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
                            <option value="pending">Pendente</option>
                            <option value="approved">Aprovada</option>
                            <option value="in_progress">Em Produção</option>
                            <option value="completed">Concluída</option>
                            <option value="rejected">Rejeitada</option>
                        </select>

                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todos os Tipos</option>
                            <option value="video">Vídeo</option>
                            <option value="photo">Fotografia</option>
                            <option value="audio">Áudio</option>
                            <option value="design">Design</option>
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
                            <option value="urgent">Urgente</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
                {filteredRequests.map((request) => (
                    <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                            {/* Main Info */}
                            <div className="flex-1">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        {getTypeIcon(request.type)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{request.title}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{request.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                {request.client}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(request.deadline).toLocaleDateString('pt-BR')}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" />
                                                R$ {request.budget.toLocaleString()}
                                            </span>
                                            {request.assignedTo && (
                                                <span className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    {request.assignedTo}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Requirements and Deliverables */}
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Requisitos:</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {request.requirements.map((req, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Entregáveis:</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {request.deliverables.map((deliverable, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                                    {deliverable}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Status and Actions */}
                            <div className="lg:w-64 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                        {request.status === 'pending' && 'Pendente'}
                                        {request.status === 'approved' && 'Aprovada'}
                                        {request.status === 'in_progress' && 'Em Produção'}
                                        {request.status === 'completed' && 'Concluída'}
                                        {request.status === 'rejected' && 'Rejeitada'}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                        {request.priority === 'low' && 'Baixa'}
                                        {request.priority === 'medium' && 'Média'}
                                        {request.priority === 'high' && 'Alta'}
                                        {request.priority === 'urgent' && 'Urgente'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <MessageSquare className="w-4 h-4" />
                                    {request.comments} comentários
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                        <Eye className="w-4 h-4" />
                                        Ver
                                    </button>
                                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                        <Edit className="w-4 h-4" />
                                        Editar
                                    </button>
                                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                                        <Download className="w-4 h-4" />
                                        Baixar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma solicitação encontrada</h3>
                    <p className="text-gray-600">Tente ajustar os filtros ou criar uma nova solicitação.</p>
                </div>
            )}

            {/* New Request Modal Placeholder */}
            {showNewRequestModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Nova Solicitação</h3>
                        <p className="text-gray-600 mb-4">Funcionalidade em desenvolvimento...</p>
                        <button 
                            onClick={() => setShowNewRequestModal(false)}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyProductionRequestsView;