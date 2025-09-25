import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    Briefcase, 
    TrendingUp, 
    Users, 
    MapPin, 
    Clock, 
    DollarSign,
    Star,
    BookOpen,
    Award,
    Calendar,
    Search,
    Filter,
    Plus,
    ExternalLink,
    Building,
    User,
    Target,
    CheckCircle
} from 'lucide-react';

interface TeacherCareerViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para oportunidades de carreira
const jobOpportunities = [
    {
        id: 1,
        title: 'Coordenador Pedagógico',
        company: 'Instituto Tecnológico Avançado',
        location: 'São Paulo, SP',
        type: 'Tempo Integral',
        salary: 'R$ 8.000 - R$ 12.000',
        posted: '2 dias atrás',
        requirements: ['Mestrado em Educação', '5+ anos experiência', 'Liderança de equipe'],
        description: 'Oportunidade para liderar equipe pedagógica em instituição de ensino técnico.',
        match: 85
    },
    {
        id: 2,
        title: 'Professor Especialista em IA',
        company: 'TechEdu Solutions',
        location: 'Remote',
        type: 'Freelancer',
        salary: 'R$ 150/hora',
        posted: '1 semana atrás',
        requirements: ['Experiência em IA', 'Certificação em EdTech', 'Inglês fluente'],
        description: 'Desenvolver e ministrar cursos sobre Inteligência Artificial aplicada à educação.',
        match: 92
    },
    {
        id: 3,
        title: 'Consultor Educacional',
        company: 'EduConsult Brasil',
        location: 'Rio de Janeiro, RJ',
        type: 'Meio Período',
        salary: 'R$ 5.000 - R$ 7.000',
        posted: '3 dias atrás',
        requirements: ['Doutorado preferível', 'Experiência em consultoria', 'Metodologias ativas'],
        description: 'Consultoria para implementação de metodologias inovadoras em escolas.',
        match: 78
    }
];

const careerGoals = [
    {
        id: 1,
        title: 'Obter Certificação em EdTech',
        progress: 60,
        deadline: '2024-06-30',
        status: 'Em Progresso'
    },
    {
        id: 2,
        title: 'Completar Mestrado em Educação',
        progress: 80,
        deadline: '2024-12-15',
        status: 'Em Progresso'
    },
    {
        id: 3,
        title: 'Publicar Artigo Científico',
        progress: 30,
        deadline: '2024-08-30',
        status: 'Planejado'
    }
];

const networkingEvents = [
    {
        id: 1,
        title: 'Congresso Nacional de Educação',
        date: '2024-03-15',
        location: 'São Paulo, SP',
        type: 'Presencial',
        attendees: 500,
        price: 'R$ 350'
    },
    {
        id: 2,
        title: 'Workshop: Futuro da Educação',
        date: '2024-02-20',
        location: 'Online',
        type: 'Virtual',
        attendees: 200,
        price: 'Gratuito'
    }
];

const mentorshipPrograms = [
    {
        id: 1,
        title: 'Programa de Mentoria Pedagógica',
        mentor: 'Dra. Ana Silva',
        area: 'Metodologias Ativas',
        duration: '6 meses',
        status: 'Disponível'
    },
    {
        id: 2,
        title: 'Mentoria em Liderança Educacional',
        mentor: 'Prof. Carlos Santos',
        area: 'Gestão Escolar',
        duration: '4 meses',
        status: 'Lista de Espera'
    }
];

const TeacherCareerView: React.FC<TeacherCareerViewProps> = ({ setActiveView }) => {
    const [selectedTab, setSelectedTab] = useState('oportunidades');
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('Todos');
    const [typeFilter, setTypeFilter] = useState('Todos');

    const tabs = [
        { id: 'oportunidades', label: 'Oportunidades', icon: Briefcase },
        { id: 'metas', label: 'Metas de Carreira', icon: Target },
        { id: 'networking', label: 'Networking', icon: Users },
        { id: 'mentoria', label: 'Mentoria', icon: User }
    ];

    const locations = ['Todos', 'São Paulo, SP', 'Rio de Janeiro, RJ', 'Remote'];
    const jobTypes = ['Todos', 'Tempo Integral', 'Meio Período', 'Freelancer'];

    const getMatchColor = (match: number) => {
        if (match >= 90) return 'text-green-600 bg-green-100';
        if (match >= 80) return 'text-blue-600 bg-blue-100';
        if (match >= 70) return 'text-yellow-600 bg-yellow-100';
        return 'text-gray-600 bg-gray-100';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Em Progresso': return 'bg-blue-100 text-blue-800';
            case 'Planejado': return 'bg-yellow-100 text-yellow-800';
            case 'Concluído': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredJobs = jobOpportunities.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = locationFilter === 'Todos' || job.location === locationFilter;
        const matchesType = typeFilter === 'Todos' || job.type === typeFilter;
        return matchesSearch && matchesLocation && matchesType;
    });

    return (
        <div className="teacher-container">
            {/* Header */}
            <div className="teacher-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Carreira</h1>
                    <p className="text-gray-600 mt-1">Desenvolva sua carreira profissional</p>
                </div>
                <div className="teacher-actions">
                    <button className="teacher-button">
                        <Plus className="w-4 h-4" />
                        Criar Alerta
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="teacher-stats-grid grid-cols-1 md:grid-cols-4 mb-6">
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Oportunidades</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Match Médio</p>
                            <p className="text-2xl font-bold text-gray-900">85%</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Conexões</p>
                            <p className="text-2xl font-bold text-gray-900">156</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Metas Ativas</p>
                            <p className="text-2xl font-bold text-gray-900">3</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Target className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                    {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    selectedTab === tab.id
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <IconComponent className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Content based on selected tab */}
            {selectedTab === 'oportunidades' && (
                <>
                    {/* Search and Filters */}
                    <div className="teacher-filters mb-6">
                        <div className="teacher-search-container">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar oportunidades..."
                                className="teacher-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="teacher-filter-group">
                            <select
                                className="teacher-select"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                            >
                                {locations.map((location) => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                            <select
                                className="teacher-select"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                {jobTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Job Opportunities */}
                    <div className="space-y-4">
                        {filteredJobs.map((job) => (
                            <div key={job.id} className="teacher-card">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(job.match)}`}>
                                                {job.match}% match
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Building className="w-4 h-4" />
                                                <span>{job.company}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{job.type}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" />
                                                <span>{job.salary}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-3">{job.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {job.requirements.map((req, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500">Publicado {job.posted}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="teacher-button">
                                        <ExternalLink className="w-4 h-4" />
                                        Ver Detalhes
                                    </button>
                                    <button className="teacher-button-secondary">
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {selectedTab === 'metas' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Minhas Metas de Carreira</h2>
                            <button className="teacher-button text-sm">
                                <Plus className="w-4 h-4" />
                                Nova Meta
                            </button>
                        </div>
                        <div className="space-y-4">
                            {careerGoals.map((goal) => (
                                <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-gray-900">{goal.title}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                                            {goal.status}
                                        </span>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Progresso</span>
                                            <span>{goal.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${goal.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Prazo: {goal.deadline}</span>
                                        </div>
                                        <button className="text-purple-600 hover:text-purple-700">
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'networking' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Eventos de Networking</h2>
                        <div className="space-y-4">
                            {networkingEvents.map((event) => (
                                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <Calendar className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                                <span>{event.date}</span>
                                                <span>{event.location}</span>
                                                <span>{event.attendees} participantes</span>
                                            </div>
                                            <p className="text-sm font-medium text-green-600 mt-1">{event.price}</p>
                                        </div>
                                    </div>
                                    <button className="teacher-button text-sm">
                                        Inscrever-se
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'mentoria' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Programas de Mentoria</h2>
                        <div className="space-y-4">
                            {mentorshipPrograms.map((program) => (
                                <div key={program.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <User className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{program.title}</h4>
                                            <p className="text-sm text-gray-600">Mentor: {program.mentor}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                                <span>Área: {program.area}</span>
                                                <span>Duração: {program.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            program.status === 'Disponível' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {program.status}
                                        </span>
                                        <button className="teacher-button text-sm">
                                            {program.status === 'Disponível' ? 'Candidatar-se' : 'Entrar na Lista'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherCareerView;