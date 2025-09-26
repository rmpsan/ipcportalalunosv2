import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    MapPin, 
    DollarSign, 
    Calendar, 
    Clock,
    Users,
    Eye,
    Edit,
    Trash2,
    Plus,
    Building2,
    Briefcase,
    Star,
    AlertCircle,
    CheckCircle,
    XCircle,
    MoreHorizontal,
    Download,
    Share2
} from 'lucide-react';
import { CompanyView } from '../../types';

interface CompanyViewJobsViewProps {
    onViewChange?: (view: CompanyView) => void;
}

interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    workType: 'remote' | 'hybrid' | 'onsite';
    contractType: 'full-time' | 'part-time' | 'freelance' | 'internship';
    experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
    salary: {
        min: number;
        max: number;
        currency: string;
        period: 'hour' | 'month' | 'year';
    };
    category: string;
    postedDate: string;
    applicationDeadline: string;
    applicationsCount: number;
    status: 'active' | 'paused' | 'closed' | 'draft';
    isUrgent: boolean;
    description: string;
    requirements: string[];
    benefits: string[];
    skills: string[];
}

const CompanyViewJobsView: React.FC<CompanyViewJobsViewProps> = ({ onViewChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    // Mock data
    const [jobs] = useState<JobListing[]>([
        {
            id: '1',
            title: 'Editor de Vídeo Sênior',
            company: 'Produtora Digital',
            location: 'São Paulo, SP',
            workType: 'hybrid',
            contractType: 'full-time',
            experienceLevel: 'senior',
            salary: { min: 4000, max: 6000, currency: 'BRL', period: 'month' },
            category: 'Edição de Vídeo',
            postedDate: '2024-01-15',
            applicationDeadline: '2024-02-15',
            applicationsCount: 23,
            status: 'active',
            isUrgent: true,
            description: 'Procuramos um editor de vídeo experiente para trabalhar em projetos de alta qualidade...',
            requirements: ['Adobe Premiere Pro', 'After Effects', '3+ anos de experiência'],
            benefits: ['Vale alimentação', 'Plano de saúde', 'Home office'],
            skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve']
        },
        {
            id: '2',
            title: 'Fotógrafo de Eventos',
            company: 'Studio Criativo',
            location: 'Rio de Janeiro, RJ',
            workType: 'onsite',
            contractType: 'freelance',
            experienceLevel: 'mid',
            salary: { min: 200, max: 500, currency: 'BRL', period: 'hour' },
            category: 'Fotografia',
            postedDate: '2024-01-10',
            applicationDeadline: '2024-02-10',
            applicationsCount: 15,
            status: 'active',
            isUrgent: false,
            description: 'Buscamos fotógrafo especializado em eventos corporativos e sociais...',
            requirements: ['Portfolio comprovado', 'Equipamentos próprios', 'Disponibilidade fins de semana'],
            benefits: ['Pagamento por evento', 'Networking', 'Flexibilidade'],
            skills: ['Fotografia', 'Lightroom', 'Photoshop']
        },
        {
            id: '3',
            title: 'Motion Designer',
            company: 'Agência Criativa',
            location: 'Belo Horizonte, MG',
            workType: 'remote',
            contractType: 'part-time',
            experienceLevel: 'mid',
            salary: { min: 2500, max: 3500, currency: 'BRL', period: 'month' },
            category: 'Motion Graphics',
            postedDate: '2024-01-08',
            applicationDeadline: '2024-02-08',
            applicationsCount: 31,
            status: 'paused',
            isUrgent: false,
            description: 'Oportunidade para motion designer criativo trabalhar em campanhas publicitárias...',
            requirements: ['After Effects avançado', 'Cinema 4D', 'Portfolio diversificado'],
            benefits: ['Horário flexível', 'Projetos variados', 'Crescimento profissional'],
            skills: ['After Effects', 'Cinema 4D', 'Illustrator']
        }
    ]);

    const categories = [
        'Produção Audiovisual',
        'Edição de Vídeo',
        'Fotografia',
        'Motion Graphics',
        'Direção',
        'Roteiro',
        'Som e Áudio',
        'Iluminação',
        'Marketing Digital',
        'Social Media',
        'Design Gráfico',
        'Desenvolvimento Web',
        'Gestão de Projetos'
    ];

    const statusLabels = {
        active: 'Ativa',
        paused: 'Pausada',
        closed: 'Fechada',
        draft: 'Rascunho'
    };

    const statusColors = {
        active: 'bg-green-100 text-green-800',
        paused: 'bg-yellow-100 text-yellow-800',
        closed: 'bg-red-100 text-red-800',
        draft: 'bg-gray-100 text-gray-800'
    };

    const workTypeLabels = {
        remote: 'Remoto',
        hybrid: 'Híbrido',
        onsite: 'Presencial'
    };

    const contractTypeLabels = {
        'full-time': 'Tempo Integral',
        'part-time': 'Meio Período',
        'freelance': 'Freelancer',
        'internship': 'Estágio'
    };

    const experienceLevelLabels = {
        entry: 'Iniciante',
        mid: 'Pleno',
        senior: 'Sênior',
        lead: 'Líder/Especialista'
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || job.category === selectedCategory;
        const matchesStatus = !selectedStatus || job.status === selectedStatus;
        const matchesWorkType = !selectedWorkType || job.workType === selectedWorkType;

        return matchesSearch && matchesCategory && matchesStatus && matchesWorkType;
    });

    const formatSalary = (salary: JobListing['salary']) => {
        const { min, max, currency, period } = salary;
        const currencySymbol = currency === 'BRL' ? 'R$' : currency === 'USD' ? '$' : '€';
        const periodLabel = period === 'hour' ? '/h' : period === 'month' ? '/mês' : '/ano';
        
        if (min && max) {
            return `${currencySymbol} ${min.toLocaleString()} - ${max.toLocaleString()} ${periodLabel}`;
        } else if (min) {
            return `A partir de ${currencySymbol} ${min.toLocaleString()} ${periodLabel}`;
        }
        return 'A combinar';
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'paused': return <Clock className="w-4 h-4" />;
            case 'closed': return <XCircle className="w-4 h-4" />;
            case 'draft': return <Edit className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const JobCard = ({ job }: { job: JobListing }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        {job.isUrgent && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Urgente
                            </span>
                        )}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm space-x-4 mb-3">
                        <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-1" />
                            {job.company}
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                        </div>
                        <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {workTypeLabels[job.workType]}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                        {getStatusIcon(job.status)}
                        <span className="ml-1">{statusLabels[job.status]}</span>
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-600 text-sm space-x-4">
                    <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {formatSalary(job.salary)}
                    </div>
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Até {new Date(job.applicationDeadline).toLocaleDateString('pt-BR')}
                    </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {job.applicationsCount} candidatos
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {skill}
                    </span>
                ))}
                {job.skills.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                        +{job.skills.length - 3} mais
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Publicada em {new Date(job.postedDate).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setSelectedJob(job)}
                        className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium"
                    >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Detalhes
                    </button>
                    <button className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );

    const JobDetailModal = ({ job, onClose }: { job: JobListing; onClose: () => void }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                                {job.isUrgent && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        Urgente
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center text-gray-600 space-x-4">
                                <div className="flex items-center">
                                    <Building2 className="w-4 h-4 mr-1" />
                                    {job.company}
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {job.location}
                                </div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                                    {getStatusIcon(job.status)}
                                    <span className="ml-1">{statusLabels[job.status]}</span>
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <XCircle className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center text-gray-600 mb-2">
                                <DollarSign className="w-5 h-5 mr-2" />
                                <span className="font-medium">Remuneração</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">{formatSalary(job.salary)}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center text-gray-600 mb-2">
                                <Users className="w-5 h-5 mr-2" />
                                <span className="font-medium">Candidatos</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">{job.applicationsCount}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center text-gray-600 mb-2">
                                <Calendar className="w-5 h-5 mr-2" />
                                <span className="font-medium">Prazo</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">
                                {new Date(job.applicationDeadline).toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição da Vaga</h3>
                        <p className="text-gray-700 leading-relaxed">{job.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Requisitos</h3>
                            <ul className="space-y-2">
                                {job.requirements.map((requirement, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{requirement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefícios</h3>
                            <ul className="space-y-2">
                                {job.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start">
                                        <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Habilidades Desejadas</h3>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                            Publicada em {new Date(job.postedDate).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                                <Share2 className="w-4 h-4 mr-2" />
                                Compartilhar
                            </button>
                            <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                                <Download className="w-4 h-4 mr-2" />
                                Exportar
                            </button>
                            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <Edit className="w-4 h-4 mr-2" />
                                Editar Vaga
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Vagas Publicadas</h1>
                        <p className="text-gray-600">Gerencie suas oportunidades de trabalho</p>
                    </div>
                    <button 
                        onClick={() => onViewChange?.(CompanyView.POST_JOB)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Vaga
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar vagas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                    </button>
                </div>

                {showFilters && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Todas as categorias</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Todos os status</option>
                            {Object.entries(statusLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>

                        <select
                            value={selectedWorkType}
                            onChange={(e) => setSelectedWorkType(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Todos os tipos</option>
                            {Object.entries(workTypeLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>

                        <button
                            onClick={() => {
                                setSelectedCategory('');
                                setSelectedStatus('');
                                setSelectedWorkType('');
                                setSearchTerm('');
                            }}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                            Limpar Filtros
                        </button>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total de Vagas</p>
                                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                            </div>
                            <Briefcase className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Vagas Ativas</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {jobs.filter(job => job.status === 'active').length}
                                </p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total de Candidatos</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {jobs.reduce((sum, job) => sum + job.applicationsCount, 0)}
                                </p>
                            </div>
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Vagas Urgentes</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {jobs.filter(job => job.isUrgent).length}
                                </p>
                            </div>
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Listings */}
            <div className="px-6 pb-6">
                <div className="space-y-4">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma vaga encontrada</h3>
                            <p className="text-gray-600 mb-4">
                                Não encontramos vagas que correspondam aos seus filtros.
                            </p>
                            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto">
                                <Plus className="w-4 h-4 mr-2" />
                                Criar Nova Vaga
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Job Detail Modal */}
            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default CompanyViewJobsView;