import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Plus, 
    MessageSquare, 
    User, 
    Calendar, 
    Clock, 
    CheckCircle, 
    AlertCircle, 
    XCircle,
    Eye,
    Send,
    Paperclip,
    Phone,
    Mail,
    MessageCircle,
    HelpCircle,
    Book,
    FileText,
    Video,
    Download,
    ExternalLink,
    Star,
    ThumbsUp,
    ThumbsDown,
    Flag,
    Edit,
    Trash2,
    MoreHorizontal,
    Zap,
    Shield,
    Settings,
    Users,
    Headphones,
    Monitor,
    Smartphone,
    Wifi,
    Database,
    Code,
    Palette,
    Camera,
    Briefcase,
    GraduationCap,
    Target,
    TrendingUp,
    Activity,
    BarChart3,
    PieChart,
    Award,
    Heart,
    Lightbulb,
    Rocket,
    Globe,
    Lock,
    Unlock,
    RefreshCw,
    Archive,
    Bookmark,
    Tag,
    Filter as FilterIcon,
    SortAsc,
    Grid,
    List,
    Maximize2,
    Minimize2
} from 'lucide-react';

interface SupportTicket {
    id: string;
    title: string;
    description: string;
    category: 'technical' | 'account' | 'billing' | 'feature' | 'bug' | 'general';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'open' | 'in_progress' | 'waiting_response' | 'resolved' | 'closed';
    author: {
        name: string;
        email: string;
        avatar: string;
        role: string;
        id: string;
    };
    assignee?: {
        name: string;
        avatar: string;
        id: string;
    };
    createdAt: string;
    updatedAt: string;
    responses: {
        id: string;
        author: string;
        content: string;
        timestamp: string;
        isStaff: boolean;
        attachments?: string[];
    }[];
    tags: string[];
    attachments: string[];
    satisfaction?: {
        rating: number;
        feedback: string;
    };
}

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
    helpful: number;
    notHelpful: number;
    views: number;
    tags: string[];
}

interface Resource {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'document' | 'tutorial' | 'guide' | 'webinar';
    category: string;
    url: string;
    duration?: string;
    downloads: number;
    rating: number;
    thumbnail?: string;
}

const CompanySupportView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'tickets' | 'faq' | 'resources' | 'contact'>('tickets');
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('updated');
    const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);
    const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

    // Mock data
    const mockTickets: SupportTicket[] = [
        {
            id: '1',
            title: 'Erro ao fazer upload de vídeos grandes',
            description: 'Estou tentando fazer upload de um vídeo de 2GB para meu projeto, mas o sistema apresenta erro após 50% do upload. Já tentei várias vezes com o mesmo resultado.',
            category: 'technical',
            priority: 'high',
            status: 'in_progress',
            author: {
                name: 'Ana Silva',
                email: 'ana.silva@email.com',
                avatar: '/api/placeholder/40/40',
                role: 'Aluna',
                id: 'user1'
            },
            assignee: {
                name: 'João Suporte',
                avatar: '/api/placeholder/40/40',
                id: 'support1'
            },
            createdAt: '2024-01-18T10:30:00Z',
            updatedAt: '2024-01-18T14:20:00Z',
            responses: [
                {
                    id: 'r1',
                    author: 'João Suporte',
                    content: 'Olá Ana! Estamos investigando este problema. Pode nos informar qual navegador está usando e o formato do arquivo?',
                    timestamp: '2024-01-18T11:00:00Z',
                    isStaff: true
                },
                {
                    id: 'r2',
                    author: 'Ana Silva',
                    content: 'Estou usando Chrome versão 120 e o arquivo é MP4. O tamanho é 2.1GB.',
                    timestamp: '2024-01-18T11:30:00Z',
                    isStaff: false
                },
                {
                    id: 'r3',
                    author: 'João Suporte',
                    content: 'Obrigado pelas informações. Identificamos o problema e estamos trabalhando na correção. Deve ser resolvido nas próximas 24h.',
                    timestamp: '2024-01-18T14:20:00Z',
                    isStaff: true
                }
            ],
            tags: ['upload', 'vídeo', 'erro', 'chrome'],
            attachments: ['screenshot_erro.png', 'log_upload.txt']
        },
        {
            id: '2',
            title: 'Solicitação de nova funcionalidade - Colaboração em tempo real',
            description: 'Gostaria de sugerir uma funcionalidade de colaboração em tempo real nos projetos, similar ao Google Docs, onde múltiplos usuários podem editar simultaneamente.',
            category: 'feature',
            priority: 'medium',
            status: 'open',
            author: {
                name: 'Carlos Santos',
                email: 'carlos.santos@empresa.com',
                avatar: '/api/placeholder/40/40',
                role: 'Empresa Parceira',
                id: 'user2'
            },
            createdAt: '2024-01-17T15:45:00Z',
            updatedAt: '2024-01-17T15:45:00Z',
            responses: [],
            tags: ['funcionalidade', 'colaboração', 'tempo-real'],
            attachments: ['mockup_colaboracao.pdf']
        },
        {
            id: '3',
            title: 'Problema com cobrança duplicada',
            description: 'Fui cobrado duas vezes pela mesma mensalidade no mês de janeiro. Preciso de ajuda para resolver esta questão de faturamento.',
            category: 'billing',
            priority: 'high',
            status: 'waiting_response',
            author: {
                name: 'Maria Costa',
                email: 'maria.costa@email.com',
                avatar: '/api/placeholder/40/40',
                role: 'Aluna',
                id: 'user3'
            },
            assignee: {
                name: 'Pedro Financeiro',
                avatar: '/api/placeholder/40/40',
                id: 'finance1'
            },
            createdAt: '2024-01-16T09:20:00Z',
            updatedAt: '2024-01-17T16:30:00Z',
            responses: [
                {
                    id: 'r4',
                    author: 'Pedro Financeiro',
                    content: 'Olá Maria! Verifiquei sua conta e realmente houve uma cobrança duplicada. Já solicitei o estorno que deve aparecer em até 5 dias úteis. Pode confirmar os dados da sua conta bancária?',
                    timestamp: '2024-01-17T16:30:00Z',
                    isStaff: true
                }
            ],
            tags: ['cobrança', 'duplicada', 'estorno', 'financeiro'],
            attachments: ['comprovante_pagamento.pdf']
        },
        {
            id: '4',
            title: 'Não consigo acessar minha conta',
            description: 'Esqueci minha senha e o link de recuperação não está chegando no meu email. Já verifiquei spam e outras pastas.',
            category: 'account',
            priority: 'medium',
            status: 'resolved',
            author: {
                name: 'Roberto Lima',
                email: 'roberto.lima@email.com',
                avatar: '/api/placeholder/40/40',
                role: 'Aluno',
                id: 'user4'
            },
            assignee: {
                name: 'Ana Suporte',
                avatar: '/api/placeholder/40/40',
                id: 'support2'
            },
            createdAt: '2024-01-15T14:10:00Z',
            updatedAt: '2024-01-16T10:45:00Z',
            responses: [
                {
                    id: 'r5',
                    author: 'Ana Suporte',
                    content: 'Olá Roberto! Verifiquei que seu email estava com um filtro bloqueando nossos emails. Já corrigi e enviei um novo link de recuperação.',
                    timestamp: '2024-01-15T16:20:00Z',
                    isStaff: true
                },
                {
                    id: 'r6',
                    author: 'Roberto Lima',
                    content: 'Perfeito! Consegui acessar minha conta. Muito obrigado pela ajuda rápida!',
                    timestamp: '2024-01-16T10:45:00Z',
                    isStaff: false
                }
            ],
            tags: ['senha', 'recuperação', 'email', 'acesso'],
            attachments: [],
            satisfaction: {
                rating: 5,
                feedback: 'Atendimento excelente e rápido!'
            }
        },
        {
            id: '5',
            title: 'Bug na visualização de projetos no mobile',
            description: 'Quando acesso a plataforma pelo celular, os projetos não carregam corretamente na tela de portfólio. Aparecem apenas placeholders vazios.',
            category: 'bug',
            priority: 'medium',
            status: 'open',
            author: {
                name: 'Fernanda Oliveira',
                email: 'fernanda.oliveira@email.com',
                avatar: '/api/placeholder/40/40',
                role: 'Aluna',
                id: 'user5'
            },
            createdAt: '2024-01-14T11:30:00Z',
            updatedAt: '2024-01-14T11:30:00Z',
            responses: [],
            tags: ['bug', 'mobile', 'projetos', 'portfólio'],
            attachments: ['screenshot_mobile_bug.jpg']
        }
    ];

    const mockFAQ: FAQItem[] = [
        {
            id: '1',
            question: 'Como faço upload de arquivos grandes?',
            answer: 'Para arquivos grandes (acima de 1GB), recomendamos: 1) Use uma conexão estável de internet, 2) Feche outros programas que usam internet, 3) Tente fazer o upload em horários de menor tráfego, 4) Se o problema persistir, entre em contato conosco.',
            category: 'Técnico',
            helpful: 45,
            notHelpful: 3,
            views: 234,
            tags: ['upload', 'arquivos', 'grandes']
        },
        {
            id: '2',
            question: 'Como alterar minha senha?',
            answer: 'Para alterar sua senha: 1) Acesse Configurações > Segurança, 2) Clique em "Alterar Senha", 3) Digite sua senha atual, 4) Digite a nova senha duas vezes, 5) Clique em "Salvar". Sua senha deve ter pelo menos 8 caracteres.',
            category: 'Conta',
            helpful: 67,
            notHelpful: 2,
            views: 456,
            tags: ['senha', 'segurança', 'conta']
        },
        {
            id: '3',
            question: 'Posso cancelar minha assinatura a qualquer momento?',
            answer: 'Sim, você pode cancelar sua assinatura a qualquer momento. Acesse Configurações > Assinatura e clique em "Cancelar". Você continuará tendo acesso até o final do período pago.',
            category: 'Faturamento',
            helpful: 89,
            notHelpful: 5,
            views: 678,
            tags: ['cancelamento', 'assinatura', 'faturamento']
        },
        {
            id: '4',
            question: 'Como compartilhar meus projetos?',
            answer: 'Para compartilhar projetos: 1) Abra o projeto, 2) Clique no botão "Compartilhar", 3) Escolha as permissões (visualizar/editar), 4) Digite o email dos colaboradores, 5) Clique em "Enviar convite".',
            category: 'Projetos',
            helpful: 123,
            notHelpful: 8,
            views: 890,
            tags: ['compartilhar', 'projetos', 'colaboração']
        }
    ];

    const mockResources: Resource[] = [
        {
            id: '1',
            title: 'Guia Completo da Plataforma',
            description: 'Tutorial abrangente sobre todas as funcionalidades da plataforma, desde o básico até recursos avançados.',
            type: 'guide',
            category: 'Geral',
            url: '/resources/guia-completo.pdf',
            downloads: 1234,
            rating: 4.8,
            thumbnail: '/api/placeholder/200/120'
        },
        {
            id: '2',
            title: 'Como Criar Projetos Incríveis',
            description: 'Vídeo tutorial mostrando as melhores práticas para criar e organizar seus projetos na plataforma.',
            type: 'video',
            category: 'Projetos',
            url: '/resources/video-projetos.mp4',
            duration: '15:30',
            downloads: 567,
            rating: 4.9,
            thumbnail: '/api/placeholder/200/120'
        },
        {
            id: '3',
            title: 'Webinar: Tendências em Design 2024',
            description: 'Gravação do webinar sobre as principais tendências de design para 2024 e como aplicá-las em seus projetos.',
            type: 'webinar',
            category: 'Design',
            url: '/resources/webinar-design-2024.mp4',
            duration: '45:20',
            downloads: 890,
            rating: 4.7,
            thumbnail: '/api/placeholder/200/120'
        },
        {
            id: '4',
            title: 'Manual de Boas Práticas',
            description: 'Documento com diretrizes e boas práticas para maximizar seu aprendizado e resultados na plataforma.',
            type: 'document',
            category: 'Educação',
            url: '/resources/manual-boas-praticas.pdf',
            downloads: 345,
            rating: 4.6,
            thumbnail: '/api/placeholder/200/120'
        }
    ];

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'technical': return <Monitor className="w-4 h-4" />;
            case 'account': return <User className="w-4 h-4" />;
            case 'billing': return <Briefcase className="w-4 h-4" />;
            case 'feature': return <Lightbulb className="w-4 h-4" />;
            case 'bug': return <AlertCircle className="w-4 h-4" />;
            case 'general': return <MessageSquare className="w-4 h-4" />;
            default: return <HelpCircle className="w-4 h-4" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'technical': return 'bg-blue-100 text-blue-800';
            case 'account': return 'bg-green-100 text-green-800';
            case 'billing': return 'bg-yellow-100 text-yellow-800';
            case 'feature': return 'bg-purple-100 text-purple-800';
            case 'bug': return 'bg-red-100 text-red-800';
            case 'general': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'waiting_response': return 'bg-orange-100 text-orange-800';
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'open': return <MessageCircle className="w-4 h-4" />;
            case 'in_progress': return <Clock className="w-4 h-4" />;
            case 'waiting_response': return <Eye className="w-4 h-4" />;
            case 'resolved': return <CheckCircle className="w-4 h-4" />;
            case 'closed': return <XCircle className="w-4 h-4" />;
            default: return <HelpCircle className="w-4 h-4" />;
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

    const getResourceTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video className="w-4 h-4" />;
            case 'document': return <FileText className="w-4 h-4" />;
            case 'tutorial': return <Book className="w-4 h-4" />;
            case 'guide': return <Book className="w-4 h-4" />;
            case 'webinar': return <Video className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
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

    const filteredTickets = mockTickets.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.author.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
        
        return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });

    const stats = {
        total: mockTickets.length,
        open: mockTickets.filter(t => t.status === 'open').length,
        inProgress: mockTickets.filter(t => t.status === 'in_progress').length,
        resolved: mockTickets.filter(t => t.status === 'resolved').length,
        avgResponseTime: '2.5h',
        satisfaction: 4.7
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Central de Suporte</h1>
                        <p className="text-gray-600 mt-1">Obtenha ajuda e suporte para suas necessidades</p>
                    </div>
                    <button 
                        onClick={() => setShowNewTicketModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Novo Ticket
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.open}</div>
                    <div className="text-sm text-gray-600">Abertos</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                    <div className="text-sm text-gray-600">Em Andamento</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
                    <div className="text-sm text-gray-600">Resolvidos</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-purple-600">{stats.avgResponseTime}</div>
                    <div className="text-sm text-gray-600">Tempo Médio</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-orange-600">{stats.satisfaction}</div>
                    <div className="text-sm text-gray-600">Satisfação</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {[
                            { id: 'tickets', label: 'Tickets', icon: MessageSquare },
                            { id: 'faq', label: 'FAQ', icon: HelpCircle },
                            { id: 'resources', label: 'Recursos', icon: Book },
                            { id: 'contact', label: 'Contato', icon: Phone }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Tickets Tab */}
            {activeTab === 'tickets' && (
                <>
                    {/* Filters */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Buscar tickets..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap gap-4">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">Todas as Categorias</option>
                                    <option value="technical">Técnico</option>
                                    <option value="account">Conta</option>
                                    <option value="billing">Faturamento</option>
                                    <option value="feature">Funcionalidade</option>
                                    <option value="bug">Bug</option>
                                    <option value="general">Geral</option>
                                </select>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">Todos os Status</option>
                                    <option value="open">Aberto</option>
                                    <option value="in_progress">Em Andamento</option>
                                    <option value="waiting_response">Aguardando Resposta</option>
                                    <option value="resolved">Resolvido</option>
                                    <option value="closed">Fechado</option>
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

                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setViewMode('cards')}
                                        className={`px-3 py-2 rounded-lg transition-colors ${
                                            viewMode === 'cards' 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`px-3 py-2 rounded-lg transition-colors ${
                                            viewMode === 'list' 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tickets Cards */}
                    {viewMode === 'cards' && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredTickets.map((ticket) => (
                                <div key={ticket.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getCategoryColor(ticket.category)}`}>
                                                {getCategoryIcon(ticket.category)}
                                                {ticket.category === 'technical' && 'Técnico'}
                                                {ticket.category === 'account' && 'Conta'}
                                                {ticket.category === 'billing' && 'Faturamento'}
                                                {ticket.category === 'feature' && 'Funcionalidade'}
                                                {ticket.category === 'bug' && 'Bug'}
                                                {ticket.category === 'general' && 'Geral'}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                                {ticket.priority === 'urgent' && 'Urgente'}
                                                {ticket.priority === 'high' && 'Alta'}
                                                {ticket.priority === 'medium' && 'Média'}
                                                {ticket.priority === 'low' && 'Baixa'}
                                            </span>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{ticket.title}</h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{ticket.description}</p>

                                    {/* Author */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium">{ticket.author.name}</div>
                                            <div className="text-xs text-gray-500">{ticket.author.role}</div>
                                        </div>
                                    </div>

                                    {/* Status and Assignee */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                                            {getStatusIcon(ticket.status)}
                                            {ticket.status === 'open' && 'Aberto'}
                                            {ticket.status === 'in_progress' && 'Em Andamento'}
                                            {ticket.status === 'waiting_response' && 'Aguardando'}
                                            {ticket.status === 'resolved' && 'Resolvido'}
                                            {ticket.status === 'closed' && 'Fechado'}
                                        </span>
                                        {ticket.assignee && (
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <User className="w-3 h-3" />
                                                {ticket.assignee.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1">
                                            {ticket.tags.slice(0, 3).map((tag, index) => (
                                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                            {ticket.tags.length > 3 && (
                                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                    +{ticket.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="w-3 h-3" />
                                                {ticket.responses.length}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Paperclip className="w-3 h-3" />
                                                {ticket.attachments.length}
                                            </div>
                                        </div>
                                        <div>
                                            {new Date(ticket.updatedAt).toLocaleDateString('pt-BR')}
                                        </div>
                                    </div>

                                    {/* Satisfaction */}
                                    {ticket.satisfaction && (
                                        <div className="mb-4 p-2 bg-green-50 rounded border border-green-200">
                                            <div className="flex items-center gap-2">
                                                <div className="flex">{renderStars(ticket.satisfaction.rating)}</div>
                                                <span className="text-sm text-green-700">Resolvido com sucesso</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <button 
                                        onClick={() => setSelectedTicket(ticket.id)}
                                        className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                    >
                                        Ver Detalhes
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tickets List */}
                    {viewMode === 'list' && (
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ticket
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Categoria
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Prioridade
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Atualizado
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredTickets.map((ticket) => (
                                            <tr key={ticket.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 mb-1">{ticket.title}</div>
                                                        <div className="text-sm text-gray-500">{ticket.author.name}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getCategoryColor(ticket.category)}`}>
                                                        {getCategoryIcon(ticket.category)}
                                                        {ticket.category === 'technical' && 'Técnico'}
                                                        {ticket.category === 'account' && 'Conta'}
                                                        {ticket.category === 'billing' && 'Faturamento'}
                                                        {ticket.category === 'feature' && 'Funcionalidade'}
                                                        {ticket.category === 'bug' && 'Bug'}
                                                        {ticket.category === 'general' && 'Geral'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(ticket.status)}`}>
                                                        {getStatusIcon(ticket.status)}
                                                        {ticket.status === 'open' && 'Aberto'}
                                                        {ticket.status === 'in_progress' && 'Em Andamento'}
                                                        {ticket.status === 'waiting_response' && 'Aguardando'}
                                                        {ticket.status === 'resolved' && 'Resolvido'}
                                                        {ticket.status === 'closed' && 'Fechado'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getPriorityColor(ticket.priority)}`}>
                                                        {ticket.priority === 'urgent' && 'Urgente'}
                                                        {ticket.priority === 'high' && 'Alta'}
                                                        {ticket.priority === 'medium' && 'Média'}
                                                        {ticket.priority === 'low' && 'Baixa'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(ticket.updatedAt).toLocaleDateString('pt-BR')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button 
                                                        onClick={() => setSelectedTicket(ticket.id)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Ver
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
                <div className="space-y-6">
                    {/* Search */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar perguntas frequentes..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-4">
                        {mockFAQ.map((faq) => (
                            <div key={faq.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                        {faq.category}
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-4">{faq.answer}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {faq.views} visualizações
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="flex items-center gap-1 text-green-600 hover:text-green-700">
                                                <ThumbsUp className="w-4 h-4" />
                                                {faq.helpful}
                                            </button>
                                            <button className="flex items-center gap-1 text-red-600 hover:text-red-700">
                                                <ThumbsDown className="w-4 h-4" />
                                                {faq.notHelpful}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {faq.tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
                <div className="space-y-6">
                    {/* Search and Filters */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Buscar recursos..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="all">Todos os Tipos</option>
                                <option value="video">Vídeos</option>
                                <option value="document">Documentos</option>
                                <option value="tutorial">Tutoriais</option>
                                <option value="guide">Guias</option>
                                <option value="webinar">Webinars</option>
                            </select>
                        </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {mockResources.map((resource) => (
                            <div key={resource.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                {/* Thumbnail */}
                                <div className="h-32 bg-gray-200 flex items-center justify-center">
                                    {getResourceTypeIcon(resource.type)}
                                </div>

                                <div className="p-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                            {getResourceTypeIcon(resource.type)}
                                            {resource.type === 'video' && 'Vídeo'}
                                            {resource.type === 'document' && 'Documento'}
                                            {resource.type === 'tutorial' && 'Tutorial'}
                                            {resource.type === 'guide' && 'Guia'}
                                            {resource.type === 'webinar' && 'Webinar'}
                                        </span>
                                        {resource.duration && (
                                            <span className="text-xs text-gray-500">{resource.duration}</span>
                                        )}
                                    </div>

                                    {/* Title and Description */}
                                    <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>

                                    {/* Rating and Downloads */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1">
                                            <div className="flex">{renderStars(resource.rating)}</div>
                                            <span className="text-sm text-gray-600">({resource.rating})</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Download className="w-4 h-4" />
                                            {resource.downloads}
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div className="mb-4">
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                            {resource.category}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                                            <ExternalLink className="w-4 h-4" />
                                            Acessar
                                        </button>
                                        <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Contact Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações de Contato</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="font-medium">Telefone</div>
                                    <div className="text-gray-600">(11) 1234-5678</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="font-medium">Email</div>
                                    <div className="text-gray-600">suporte@plataforma.com</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="font-medium">Chat Online</div>
                                    <div className="text-gray-600">Seg-Sex, 9h às 18h</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="font-medium mb-3">Horário de Atendimento</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div>Segunda a Sexta: 9h às 18h</div>
                                <div>Sábado: 9h às 14h</div>
                                <div>Domingo: Fechado</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Envie uma Mensagem</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>Suporte Técnico</option>
                                    <option>Questões de Conta</option>
                                    <option>Faturamento</option>
                                    <option>Sugestão de Funcionalidade</option>
                                    <option>Outros</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                                <textarea
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* New Ticket Modal */}
            {showNewTicketModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold">Novo Ticket de Suporte</h3>
                            <button 
                                onClick={() => setShowNewTicketModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="technical">Técnico</option>
                                        <option value="account">Conta</option>
                                        <option value="billing">Faturamento</option>
                                        <option value="feature">Funcionalidade</option>
                                        <option value="bug">Bug</option>
                                        <option value="general">Geral</option>
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
                                    placeholder="Descreva brevemente o problema..."
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <textarea
                                    placeholder="Descreva detalhadamente o problema ou solicitação..."
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Anexos</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                    <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">Clique para adicionar arquivos ou arraste aqui</p>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowNewTicketModal(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Criar Ticket
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Ticket Detail Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {(() => {
                            const ticket = mockTickets.find(t => t.id === selectedTicket);
                            if (!ticket) return null;

                            return (
                                <>
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getCategoryColor(ticket.category)}`}>
                                                    {getCategoryIcon(ticket.category)}
                                                    {ticket.category === 'technical' && 'Técnico'}
                                                    {ticket.category === 'account' && 'Conta'}
                                                    {ticket.category === 'billing' && 'Faturamento'}
                                                    {ticket.category === 'feature' && 'Funcionalidade'}
                                                    {ticket.category === 'bug' && 'Bug'}
                                                    {ticket.category === 'general' && 'Geral'}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                                    {ticket.priority === 'urgent' && 'Urgente'}
                                                    {ticket.priority === 'high' && 'Alta'}
                                                    {ticket.priority === 'medium' && 'Média'}
                                                    {ticket.priority === 'low' && 'Baixa'}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                                                    {getStatusIcon(ticket.status)}
                                                    {ticket.status === 'open' && 'Aberto'}
                                                    {ticket.status === 'in_progress' && 'Em Andamento'}
                                                    {ticket.status === 'waiting_response' && 'Aguardando'}
                                                    {ticket.status === 'resolved' && 'Resolvido'}
                                                    {ticket.status === 'closed' && 'Fechado'}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900">{ticket.title}</h3>
                                            <p className="text-gray-600 mt-2">{ticket.description}</p>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedTicket(null)}
                                            className="text-gray-400 hover:text-gray-600 ml-4"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    {/* Author and Assignee */}
                                    <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{ticket.author.name}</div>
                                                <div className="text-sm text-gray-500">{ticket.author.email}</div>
                                                <div className="text-xs text-gray-400">{ticket.author.role}</div>
                                            </div>
                                        </div>
                                        {ticket.assignee && (
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-500">Atribuído para</div>
                                                    <div className="font-medium">{ticket.assignee.name}</div>
                                                </div>
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <User className="w-5 h-5 text-blue-600" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tags and Attachments */}
                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {ticket.tags.map((tag, index) => (
                                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {ticket.attachments.length > 0 && (
                                            <div>
                                                <div className="text-sm font-medium text-gray-700 mb-2">Anexos:</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {ticket.attachments.map((attachment, index) => (
                                                        <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm">
                                                            <Paperclip className="w-4 h-4 text-gray-500" />
                                                            {attachment}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Responses */}
                                    <div className="mb-6">
                                        <h4 className="font-medium text-gray-900 mb-4">Conversação ({ticket.responses.length})</h4>
                                        <div className="space-y-4 max-h-96 overflow-y-auto">
                                            {ticket.responses.map((response) => (
                                                <div key={response.id} className={`p-4 rounded-lg ${response.isStaff ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="font-medium text-sm">{response.author}</div>
                                                            {response.isStaff && (
                                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Suporte</span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {new Date(response.timestamp).toLocaleString('pt-BR')}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700">{response.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Satisfaction Rating */}
                                    {ticket.satisfaction && (
                                        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                                <span className="font-medium text-green-800">Ticket Resolvido</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex">{renderStars(ticket.satisfaction.rating)}</div>
                                                <span className="text-sm text-green-700">Avaliação: {ticket.satisfaction.rating}/5</span>
                                            </div>
                                            <p className="text-sm text-green-700">{ticket.satisfaction.feedback}</p>
                                        </div>
                                    )}

                                    {/* Reply Form */}
                                    {ticket.status !== 'closed' && (
                                        <div className="border-t pt-6">
                                            <h4 className="font-medium text-gray-900 mb-4">Adicionar Resposta</h4>
                                            <div className="space-y-4">
                                                <textarea
                                                    placeholder="Digite sua resposta..."
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    rows={3}
                                                />
                                                <div className="flex items-center justify-between">
                                                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                        <Paperclip className="w-4 h-4" />
                                                        Anexar arquivo
                                                    </button>
                                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                                        <Send className="w-4 h-4" />
                                                        Enviar Resposta
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanySupportView;