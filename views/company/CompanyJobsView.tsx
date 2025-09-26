import React, { useState } from 'react';
import { 
    Plus, 
    Search, 
    Filter, 
    MapPin, 
    Clock, 
    DollarSign, 
    Users, 
    Briefcase, 
    Eye, 
    Edit, 
    Trash2, 
    MoreHorizontal,
    Calendar,
    Star,
    CheckCircle,
    XCircle,
    AlertCircle,
    FileText,
    Send,
    UserCheck,
    TrendingUp
} from 'lucide-react';

interface JobApplication {
    id: string;
    candidateName: string;
    candidateEmail: string;
    appliedAt: string;
    status: 'pending' | 'reviewing' | 'approved' | 'rejected';
    rating?: number;
    notes?: string;
    resume?: string;
    portfolio?: string;
}

interface Job {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    salary?: number;
    salaryRange?: { min: number; max: number };
    location: string;
    type: 'full_time' | 'part_time' | 'internship' | 'freelance';
    status: 'active' | 'paused' | 'closed';
    createdAt: string;
    deadline?: string;
    category: string;
    experience: string;
    applications: JobApplication[];
    views: number;
}

const CompanyJobsView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [showNewJobModal, setShowNewJobModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [showApplications, setShowApplications] = useState(false);

    // Mock data
    const jobs: Job[] = [
        {
            id: '1',
            title: 'Editor de Vídeo Sênior',
            description: 'Buscamos um editor de vídeo experiente para trabalhar em projetos publicitários e corporativos de alta qualidade.',
            requirements: [
                'Experiência mínima de 3 anos em edição de vídeo',
                'Domínio avançado do Adobe Premiere Pro e After Effects',
                'Conhecimento em correção de cor e motion graphics',
                'Portfolio com trabalhos relevantes'
            ],
            responsibilities: [
                'Editar vídeos publicitários e corporativos',
                'Criar motion graphics e animações',
                'Colaborar com a equipe criativa',
                'Gerenciar prazos e entregas'
            ],
            salaryRange: { min: 4000, max: 7000 },
            location: 'São Paulo, SP',
            type: 'full_time',
            status: 'active',
            createdAt: '2024-01-15',
            deadline: '2024-02-15',
            category: 'Edição',
            experience: 'Sênior',
            views: 245,
            applications: [
                {
                    id: '1',
                    candidateName: 'João Silva',
                    candidateEmail: 'joao@email.com',
                    appliedAt: '2024-01-20',
                    status: 'reviewing',
                    rating: 4,
                    notes: 'Candidato com boa experiência, portfolio interessante'
                },
                {
                    id: '2',
                    candidateName: 'Maria Santos',
                    candidateEmail: 'maria@email.com',
                    appliedAt: '2024-01-18',
                    status: 'approved',
                    rating: 5,
                    notes: 'Excelente candidata, experiência alinhada com nossas necessidades'
                }
            ]
        },
        {
            id: '2',
            title: 'Cinegrafista Freelancer',
            description: 'Procuramos cinegrafista freelancer para projetos pontuais de eventos e produções corporativas.',
            requirements: [
                'Experiência com câmeras profissionais',
                'Equipamento próprio (câmera, tripé, áudio)',
                'Disponibilidade para trabalhar em fins de semana',
                'Conhecimento em iluminação básica'
            ],
            responsibilities: [
                'Capturar imagens de eventos corporativos',
                'Operar equipamentos de filmagem',
                'Colaborar com a equipe de produção',
                'Entregar material bruto organizado'
            ],
            salary: 800,
            location: 'Rio de Janeiro, RJ',
            type: 'freelance',
            status: 'active',
            createdAt: '2024-01-10',
            category: 'Filmagem',
            experience: 'Pleno',
            views: 156,
            applications: [
                {
                    id: '3',
                    candidateName: 'Pedro Costa',
                    candidateEmail: 'pedro@email.com',
                    appliedAt: '2024-01-12',
                    status: 'pending',
                    notes: 'Aguardando análise do portfolio'
                }
            ]
        },
        {
            id: '3',
            title: 'Estagiário de Produção',
            description: 'Oportunidade de estágio em produção audiovisual para estudantes de comunicação ou áreas afins.',
            requirements: [
                'Cursando comunicação, jornalismo ou áreas afins',
                'Conhecimentos básicos de produção audiovisual',
                'Proatividade e vontade de aprender',
                'Disponibilidade de 6 horas diárias'
            ],
            responsibilities: [
                'Auxiliar na organização de produções',
                'Apoiar a equipe em gravações',
                'Organizar equipamentos e materiais',
                'Participar de reuniões de planejamento'
            ],
            salary: 1200,
            location: 'Belo Horizonte, MG',
            type: 'internship',
            status: 'paused',
            createdAt: '2024-01-05',
            deadline: '2024-01-30',
            category: 'Produção',
            experience: 'Júnior',
            views: 89,
            applications: []
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'paused': return 'bg-yellow-100 text-yellow-800';
            case 'closed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'paused': return <AlertCircle className="w-4 h-4" />;
            case 'closed': return <XCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'full_time': return 'Tempo Integral';
            case 'part_time': return 'Meio Período';
            case 'internship': return 'Estágio';
            case 'freelance': return 'Freelancer';
            default: return type;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Ativa';
            case 'paused': return 'Pausada';
            case 'closed': return 'Fechada';
            default: return status;
        }
    };

    const getApplicationStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'reviewing': return 'bg-blue-100 text-blue-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getApplicationStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'Pendente';
            case 'reviewing': return 'Em Análise';
            case 'approved': return 'Aprovado';
            case 'rejected': return 'Rejeitado';
            default: return status;
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
        const matchesType = typeFilter === 'all' || job.type === typeFilter;
        
        return matchesSearch && matchesStatus && matchesType;
    });

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

    const getTotalApplications = () => {
        return jobs.reduce((total, job) => total + job.applications.length, 0);
    };

    const getActiveJobs = () => {
        return jobs.filter(job => job.status === 'active').length;
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestão de Vagas</h1>
                    <p className="text-gray-600">Publique vagas e gerencie candidatos</p>
                </div>
                
                <button
                    onClick={() => setShowNewJobModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Nova Vaga
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total de Vagas</p>
                            <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Vagas Ativas</p>
                            <p className="text-2xl font-bold text-green-600">{getActiveJobs()}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Candidaturas</p>
                            <p className="text-2xl font-bold text-blue-600">{getTotalApplications()}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Visualizações</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {jobs.reduce((total, job) => total + job.views, 0)}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Eye className="w-6 h-6 text-purple-600" />
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
                            placeholder="Buscar vagas..."
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
                        <option value="active">Ativa</option>
                        <option value="paused">Pausada</option>
                        <option value="closed">Fechada</option>
                    </select>

                    {/* Type Filter */}
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Todos os Tipos</option>
                        <option value="full_time">Tempo Integral</option>
                        <option value="part_time">Meio Período</option>
                        <option value="internship">Estágio</option>
                        <option value="freelance">Freelancer</option>
                    </select>
                </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
                {filteredJobs.map(job => (
                    <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            {/* Job Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {job.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {job.description}
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                                            {getStatusIcon(job.status)}
                                            {getStatusLabel(job.status)}
                                        </span>
                                    </div>
                                </div>

                                {/* Job Details */}
                                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm mb-4">
                                    <div>
                                        <p className="text-gray-500">Tipo</p>
                                        <p className="font-medium text-gray-900">{getTypeLabel(job.type)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Localização</p>
                                        <p className="font-medium text-gray-900 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {job.location}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Salário</p>
                                        <p className="font-medium text-gray-900">
                                            {job.salary ? formatCurrency(job.salary) : 
                                             job.salaryRange ? `${formatCurrency(job.salaryRange.min)} - ${formatCurrency(job.salaryRange.max)}` : 
                                             'A combinar'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Experiência</p>
                                        <p className="font-medium text-gray-900">{job.experience}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Categoria</p>
                                        <p className="font-medium text-gray-900">{job.category}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {job.views} visualizações
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {job.applications.length} candidatos
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        Publicada em {formatDate(job.createdAt)}
                                    </div>
                                    {job.deadline && (
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {getDaysUntilDeadline(job.deadline) > 0 ? 
                                                `${getDaysUntilDeadline(job.deadline)} dias restantes` : 
                                                'Prazo expirado'}
                                        </div>
                                    )}
                                </div>

                                {/* Applications Preview */}
                                {job.applications.length > 0 && (
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-medium text-gray-700">
                                                Últimas candidaturas ({job.applications.length})
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setSelectedJob(job);
                                                    setShowApplications(true);
                                                }}
                                                className="text-sm text-blue-600 hover:text-blue-700"
                                            >
                                                Ver todas
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {job.applications.slice(0, 2).map(application => (
                                                <div key={application.id} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <span className="text-xs font-medium text-blue-600">
                                                                {application.candidateName.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {application.candidateName}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {formatDate(application.appliedAt)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(application.status)}`}>
                                                        {getApplicationStatusLabel(application.status)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedJob(job);
                                            setShowApplications(true);
                                        }}
                                        className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                                    >
                                        <Users className="w-4 h-4" />
                                        Candidatos
                                    </button>
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
            {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhuma vaga encontrada
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Tente ajustar os filtros ou publique uma nova vaga
                    </p>
                    <button
                        onClick={() => setShowNewJobModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Publicar Primeira Vaga
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompanyJobsView;