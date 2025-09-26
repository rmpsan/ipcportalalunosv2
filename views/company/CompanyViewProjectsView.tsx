import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Eye, 
    Edit, 
    Trash2, 
    Calendar, 
    DollarSign, 
    Users, 
    Clock, 
    MapPin,
    Star,
    MoreVertical,
    Plus,
    Download,
    Share2,
    AlertCircle,
    CheckCircle,
    XCircle,
    Pause,
    Play,
    Target,
    Briefcase,
    Tag,
    FileText,
    Image,
    Video,
    Music,
    File
} from 'lucide-react';
import { CompanyView } from '../../types';

interface CompanyViewProjectsViewProps {
    onViewChange?: (view: CompanyView) => void;
}

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    subcategory: string;
    status: 'draft' | 'active' | 'in_progress' | 'completed' | 'cancelled' | 'paused';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    budget: {
        min: number;
        max: number;
        currency: string;
        type: 'fixed' | 'hourly' | 'negotiable';
    };
    timeline: {
        startDate: string;
        endDate: string;
        estimatedHours: number;
        progress: number;
    };
    team: {
        size: string;
        assigned: number;
        roles: string[];
    };
    location: string;
    workType: 'remote' | 'hybrid' | 'onsite';
    tags: string[];
    applicants: number;
    views: number;
    createdAt: string;
    updatedAt: string;
    contactInfo: {
        email: string;
        phone: string;
    };
    attachments: Array<{
        name: string;
        type: string;
        size: number;
        url: string;
    }>;
}

const CompanyViewProjectsView: React.FC<CompanyViewProjectsViewProps> = ({ onViewChange }) => {
    const [projects] = useState<Project[]>([
        {
            id: '1',
            title: 'Produção de Vídeo Institucional',
            description: 'Criação de vídeo institucional para apresentação da empresa, incluindo roteiro, filmagem e edição.',
            category: 'Produção Audiovisual',
            subcategory: 'Institucional',
            status: 'active',
            priority: 'high',
            budget: {
                min: 8000,
                max: 12000,
                currency: 'BRL',
                type: 'fixed'
            },
            timeline: {
                startDate: '2024-02-01',
                endDate: '2024-03-15',
                estimatedHours: 80,
                progress: 0
            },
            team: {
                size: '4-6 pessoas',
                assigned: 0,
                roles: ['Diretor', 'Cinegrafista', 'Editor', 'Motion Designer']
            },
            location: 'São Paulo, SP',
            workType: 'hybrid',
            tags: ['vídeo', 'institucional', 'corporativo'],
            applicants: 12,
            views: 45,
            createdAt: '2024-01-15',
            updatedAt: '2024-01-15',
            contactInfo: {
                email: 'projetos@empresa.com',
                phone: '(11) 99999-9999'
            },
            attachments: [
                { name: 'briefing.pdf', type: 'application/pdf', size: 2048000, url: '#' },
                { name: 'referencias.zip', type: 'application/zip', size: 5120000, url: '#' }
            ]
        },
        {
            id: '2',
            title: 'Campanha de Marketing Digital',
            description: 'Desenvolvimento de campanha completa para redes sociais, incluindo criação de conteúdo e gestão.',
            category: 'Marketing Digital',
            subcategory: 'Campanha',
            status: 'in_progress',
            priority: 'medium',
            budget: {
                min: 5000,
                max: 8000,
                currency: 'BRL',
                type: 'fixed'
            },
            timeline: {
                startDate: '2024-01-20',
                endDate: '2024-02-28',
                estimatedHours: 60,
                progress: 35
            },
            team: {
                size: '3-4 pessoas',
                assigned: 3,
                roles: ['Social Media', 'Designer', 'Copywriter']
            },
            location: 'Remoto',
            workType: 'remote',
            tags: ['marketing', 'social media', 'conteúdo'],
            applicants: 8,
            views: 32,
            createdAt: '2024-01-10',
            updatedAt: '2024-01-25',
            contactInfo: {
                email: 'marketing@empresa.com',
                phone: '(11) 88888-8888'
            },
            attachments: [
                { name: 'estrategia.docx', type: 'application/docx', size: 1024000, url: '#' }
            ]
        },
        {
            id: '3',
            title: 'Desenvolvimento de E-commerce',
            description: 'Criação de loja virtual completa com sistema de pagamento e gestão de produtos.',
            category: 'Desenvolvimento Web',
            subcategory: 'E-commerce',
            status: 'completed',
            priority: 'high',
            budget: {
                min: 15000,
                max: 20000,
                currency: 'BRL',
                type: 'fixed'
            },
            timeline: {
                startDate: '2023-11-01',
                endDate: '2024-01-15',
                estimatedHours: 120,
                progress: 100
            },
            team: {
                size: '5-7 pessoas',
                assigned: 6,
                roles: ['Desenvolvedor Frontend', 'Desenvolvedor Backend', 'Designer UX/UI', 'QA Tester']
            },
            location: 'São Paulo, SP',
            workType: 'hybrid',
            tags: ['e-commerce', 'desenvolvimento', 'web'],
            applicants: 25,
            views: 78,
            createdAt: '2023-10-15',
            updatedAt: '2024-01-15',
            contactInfo: {
                email: 'tech@empresa.com',
                phone: '(11) 77777-7777'
            },
            attachments: [
                { name: 'wireframes.fig', type: 'application/figma', size: 3072000, url: '#' },
                { name: 'especificacoes.pdf', type: 'application/pdf', size: 4096000, url: '#' }
            ]
        },
        {
            id: '4',
            title: 'Sessão de Fotos Produto',
            description: 'Fotografia profissional de produtos para catálogo e e-commerce.',
            category: 'Fotografia',
            subcategory: 'Produto',
            status: 'draft',
            priority: 'low',
            budget: {
                min: 2000,
                max: 3500,
                currency: 'BRL',
                type: 'fixed'
            },
            timeline: {
                startDate: '2024-02-15',
                endDate: '2024-02-20',
                estimatedHours: 20,
                progress: 0
            },
            team: {
                size: '2-3 pessoas',
                assigned: 0,
                roles: ['Fotógrafo', 'Assistente']
            },
            location: 'Rio de Janeiro, RJ',
            workType: 'onsite',
            tags: ['fotografia', 'produto', 'catálogo'],
            applicants: 5,
            views: 18,
            createdAt: '2024-01-20',
            updatedAt: '2024-01-20',
            contactInfo: {
                email: 'foto@empresa.com',
                phone: '(21) 99999-9999'
            },
            attachments: []
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const statusLabels = {
        draft: 'Rascunho',
        active: 'Ativo',
        in_progress: 'Em Andamento',
        completed: 'Concluído',
        cancelled: 'Cancelado',
        paused: 'Pausado'
    };

    const statusColors = {
        draft: 'bg-gray-100 text-gray-800',
        active: 'bg-green-100 text-green-800',
        in_progress: 'bg-blue-100 text-blue-800',
        completed: 'bg-purple-100 text-purple-800',
        cancelled: 'bg-red-100 text-red-800',
        paused: 'bg-yellow-100 text-yellow-800'
    };

    const statusIcons = {
        draft: FileText,
        active: Play,
        in_progress: Clock,
        completed: CheckCircle,
        cancelled: XCircle,
        paused: Pause
    };

    const priorityLabels = {
        low: 'Baixa',
        medium: 'Média',
        high: 'Alta',
        urgent: 'Urgente'
    };

    const priorityColors = {
        low: 'bg-gray-100 text-gray-800',
        medium: 'bg-blue-100 text-blue-800',
        high: 'bg-yellow-100 text-yellow-800',
        urgent: 'bg-red-100 text-red-800'
    };

    const workTypeLabels = {
        remote: 'Remoto',
        hybrid: 'Híbrido',
        onsite: 'Presencial'
    };

    const categories = [
        'Produção Audiovisual',
        'Edição de Vídeo',
        'Fotografia',
        'Design Gráfico',
        'Marketing Digital',
        'Desenvolvimento Web'
    ];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = !selectedCategory || project.category === selectedCategory;
        const matchesStatus = !selectedStatus || project.status === selectedStatus;
        const matchesPriority = !selectedPriority || project.priority === selectedPriority;
        const matchesWorkType = !selectedWorkType || project.workType === selectedWorkType;

        return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesWorkType;
    }).sort((a, b) => {
        let aValue: any = a[sortBy as keyof Project];
        let bValue: any = b[sortBy as keyof Project];

        if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const getFileIcon = (type: string) => {
        if (type.includes('image')) return <Image className="w-4 h-4" />;
        if (type.includes('video')) return <Video className="w-4 h-4" />;
        if (type.includes('audio')) return <Music className="w-4 h-4" />;
        return <File className="w-4 h-4" />;
    };

    const formatCurrency = (amount: number, currency: string) => {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency === 'BRL' ? 'BRL' : 'USD'
        });
        return formatter.format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
        const StatusIcon = statusIcons[project.status];
        
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusLabels[project.status]}
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-1" />
                                {project.category}
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {project.location}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(project.timeline.startDate)}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                            {project.tags.length > 3 && (
                                <span className="text-xs text-gray-500">+{project.tags.length - 3} mais</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[project.priority]}`}>
                            <Star className="w-3 h-3 mr-1" />
                            {priorityLabels[project.priority]}
                        </span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {project.budget.type === 'negotiable' 
                                ? 'A negociar' 
                                : `${formatCurrency(project.budget.min, project.budget.currency)}${project.budget.max ? ` - ${formatCurrency(project.budget.max, project.budget.currency)}` : ''}`
                            }
                        </div>
                        <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {project.applicants} candidatos
                        </div>
                        <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {project.views} visualizações
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setSelectedProject(project)}
                            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                        >
                            Ver Detalhes
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium">
                            Editar
                        </button>
                    </div>
                </div>

                {project.status === 'in_progress' && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Progresso do Projeto</span>
                            <span>{project.timeline.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${project.timeline.progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
        const StatusIcon = statusIcons[project.status];
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">{project.title}</h2>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Share2 className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Download className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <XCircle className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Status and Priority */}
                        <div className="flex items-center space-x-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                                <StatusIcon className="w-4 h-4 mr-2" />
                                {statusLabels[project.status]}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${priorityColors[project.priority]}`}>
                                <Star className="w-4 h-4 mr-2" />
                                Prioridade {priorityLabels[project.priority]}
                            </span>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
                            <p className="text-gray-700">{project.description}</p>
                        </div>

                        {/* Project Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Informações Básicas</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Categoria:</span>
                                            <span className="text-gray-900">{project.category}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subcategoria:</span>
                                            <span className="text-gray-900">{project.subcategory}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Localização:</span>
                                            <span className="text-gray-900">{project.location}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tipo de Trabalho:</span>
                                            <span className="text-gray-900">{workTypeLabels[project.workType]}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Orçamento</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tipo:</span>
                                            <span className="text-gray-900">
                                                {project.budget.type === 'fixed' ? 'Valor Fixo' : 
                                                 project.budget.type === 'hourly' ? 'Por Hora' : 'A Negociar'}
                                            </span>
                                        </div>
                                        {project.budget.type !== 'negotiable' && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Valor Mínimo:</span>
                                                    <span className="text-gray-900">{formatCurrency(project.budget.min, project.budget.currency)}</span>
                                                </div>
                                                {project.budget.max && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Valor Máximo:</span>
                                                        <span className="text-gray-900">{formatCurrency(project.budget.max, project.budget.currency)}</span>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Cronograma</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Data de Início:</span>
                                            <span className="text-gray-900">{formatDate(project.timeline.startDate)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Data de Término:</span>
                                            <span className="text-gray-900">{formatDate(project.timeline.endDate)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Horas Estimadas:</span>
                                            <span className="text-gray-900">{project.timeline.estimatedHours}h</span>
                                        </div>
                                        {project.status === 'in_progress' && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Progresso:</span>
                                                <span className="text-gray-900">{project.timeline.progress}%</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Equipe</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tamanho:</span>
                                            <span className="text-gray-900">{project.team.size}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Membros Atribuídos:</span>
                                            <span className="text-gray-900">{project.team.assigned}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Roles */}
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Funções Necessárias</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.team.roles.map((role, index) => (
                                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                        <Users className="w-3 h-3 mr-1" />
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, index) => (
                                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                                        <Tag className="w-3 h-3 mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Attachments */}
                        {project.attachments.length > 0 && (
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">Anexos</h4>
                                <div className="space-y-2">
                                    {project.attachments.map((attachment, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                {getFileIcon(attachment.type)}
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {(attachment.size / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Informações de Contato</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="text-gray-900">{project.contactInfo.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Telefone:</span>
                                    <span className="text-gray-900">{project.contactInfo.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{project.applicants}</div>
                                <div className="text-sm text-gray-600">Candidatos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{project.views}</div>
                                <div className="text-sm text-gray-600">Visualizações</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {Math.ceil((new Date(project.timeline.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                                </div>
                                <div className="text-sm text-gray-600">Dias Restantes</div>
                            </div>
                        </div>

                        {/* Progress Bar for In Progress Projects */}
                        {project.status === 'in_progress' && (
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                    <span>Progresso do Projeto</span>
                                    <span>{project.timeline.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${project.timeline.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Fechar
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Editar Projeto
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Meus Projetos</h1>
                        <p className="text-gray-600">Gerencie e acompanhe seus projetos</p>
                    </div>
                    <button 
                        onClick={() => onViewChange?.(CompanyView.NEW_PROJECT)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Projeto
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar projetos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filtros
                        </button>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="createdAt">Data de Criação</option>
                            <option value="updatedAt">Última Atualização</option>
                            <option value="title">Título</option>
                            <option value="priority">Prioridade</option>
                        </select>

                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Todas as Categorias</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Todos os Status</option>
                            {Object.entries(statusLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>

                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Todas as Prioridades</option>
                            {Object.entries(priorityLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>

                        <select
                            value={selectedWorkType}
                            onChange={(e) => setSelectedWorkType(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Todos os Tipos</option>
                            {Object.entries(workTypeLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Projects Grid */}
            <div className="p-6">
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-12">
                        <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || selectedCategory || selectedStatus || selectedPriority || selectedWorkType
                                ? 'Tente ajustar os filtros de busca'
                                : 'Você ainda não criou nenhum projeto'
                            }
                        </p>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Criar Primeiro Projeto
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>

            {/* Project Detail Modal */}
            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                />
            )}
        </div>
    );
};

export default CompanyViewProjectsView;