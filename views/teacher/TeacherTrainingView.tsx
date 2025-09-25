import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    GraduationCap, 
    BookOpen, 
    Award, 
    Clock, 
    Users, 
    Star,
    Play,
    Download,
    Calendar,
    TrendingUp,
    CheckCircle,
    Plus,
    Search,
    Filter,
    Settings
} from 'lucide-react';

interface TeacherTrainingViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para cursos de formação
const trainingCourses = [
    {
        id: 1,
        title: 'Metodologias Ativas de Ensino',
        category: 'Pedagogia',
        instructor: 'Dra. Maria Eduarda',
        duration: '40h',
        progress: 75,
        rating: 4.9,
        students: 156,
        thumbnail: '/api/placeholder/300/200',
        status: 'Em Andamento',
        nextClass: '2024-02-08 14:00'
    },
    {
        id: 2,
        title: 'Tecnologias Educacionais',
        category: 'Tecnologia',
        instructor: 'Prof. João Silva',
        duration: '30h',
        progress: 100,
        rating: 4.8,
        students: 89,
        thumbnail: '/api/placeholder/300/200',
        status: 'Concluído',
        completedAt: '2024-01-15'
    },
    {
        id: 3,
        title: 'Avaliação por Competências',
        category: 'Avaliação',
        instructor: 'Dra. Ana Costa',
        duration: '25h',
        progress: 0,
        rating: 4.7,
        students: 203,
        thumbnail: '/api/placeholder/300/200',
        status: 'Não Iniciado',
        startDate: '2024-02-15'
    }
];

const certificates = [
    {
        id: 1,
        title: 'Especialista em Educação Digital',
        issuer: 'Instituto de Educação Avançada',
        issueDate: '2024-01-20',
        validUntil: '2026-01-20',
        credentialId: 'IEA-2024-001234'
    },
    {
        id: 2,
        title: 'Metodologias Ativas Certificado',
        issuer: 'Centro de Formação Docente',
        issueDate: '2023-12-10',
        validUntil: '2025-12-10',
        credentialId: 'CFD-2023-005678'
    }
];

const upcomingEvents = [
    {
        id: 1,
        title: 'Workshop: Inteligência Artificial na Educação',
        date: '2024-02-12',
        time: '19:00',
        type: 'Workshop',
        duration: '2h'
    },
    {
        id: 2,
        title: 'Webinar: Tendências em EdTech 2024',
        date: '2024-02-15',
        time: '20:00',
        type: 'Webinar',
        duration: '1h30'
    }
];

const TeacherTrainingView: React.FC<TeacherTrainingViewProps> = ({ setActiveView }) => {
    const [selectedTab, setSelectedTab] = useState('cursos');
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Todos');

    const tabs = [
        { id: 'cursos', label: 'Meus Cursos', icon: BookOpen },
        { id: 'certificados', label: 'Certificados', icon: Award },
        { id: 'eventos', label: 'Eventos', icon: Calendar }
    ];

    const categories = ['Todos', 'Pedagogia', 'Tecnologia', 'Avaliação', 'Gestão'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Em Andamento': return 'bg-blue-100 text-blue-800';
            case 'Concluído': return 'bg-green-100 text-green-800';
            case 'Não Iniciado': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredCourses = trainingCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'Todos' || course.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="teacher-container">
            {/* Header */}
            <div className="teacher-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Formação</h1>
                    <p className="text-gray-600 mt-1">Desenvolva suas competências pedagógicas</p>
                </div>
                <div className="teacher-actions">
                    <button className="teacher-button">
                        <Plus className="w-4 h-4" />
                        Buscar Cursos
                    </button>
                    <button className="teacher-icon-button">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="teacher-stats-grid grid-cols-1 md:grid-cols-4 mb-6">
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Cursos Concluídos</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Horas de Formação</p>
                            <p className="text-2xl font-bold text-gray-900">240h</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Certificados</p>
                            <p className="text-2xl font-bold text-gray-900">8</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Award className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Avaliação Média</p>
                            <p className="text-2xl font-bold text-gray-900">4.8</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Star className="w-6 h-6 text-yellow-600" />
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
            {selectedTab === 'cursos' && (
                <>
                    {/* Search and Filters */}
                    <div className="teacher-filters mb-6">
                        <div className="teacher-search-container">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar cursos..."
                                className="teacher-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="teacher-filter-group">
                            <select
                                className="teacher-select"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    <div className="teacher-card-grid">
                        {filteredCourses.map((course) => (
                            <div key={course.id} className="teacher-card">
                                <div className="relative mb-4">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                                            {course.status}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="mb-2">
                                    <span className="text-xs text-purple-600 font-medium">{course.category}</span>
                                </div>
                                
                                <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">Por {course.instructor}</p>
                                
                                {/* Progress Bar (only for in-progress courses) */}
                                {course.status === 'Em Andamento' && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Progresso</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Course Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span>{course.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>{course.students} alunos</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between">
                                    <button className="teacher-button text-sm">
                                        <Play className="w-4 h-4" />
                                        {course.status === 'Concluído' ? 'Revisar' : 'Continuar'}
                                    </button>
                                    {course.status === 'Concluído' && (
                                        <button className="teacher-icon-button">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {selectedTab === 'certificados' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Meus Certificados</h2>
                        <div className="space-y-4">
                            {certificates.map((cert) => (
                                <div key={cert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <Award className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{cert.title}</h4>
                                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                                            <p className="text-sm text-gray-500">
                                                Emitido em {cert.issueDate} • Válido até {cert.validUntil}
                                            </p>
                                            <p className="text-xs text-gray-400">ID: {cert.credentialId}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="teacher-button text-sm">
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'eventos' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximos Eventos</h2>
                        <div className="space-y-4">
                            {upcomingEvents.map((event) => (
                                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <Calendar className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                                            <p className="text-sm text-gray-600">{event.type} • {event.duration}</p>
                                            <p className="text-sm text-gray-500">
                                                {event.date} às {event.time}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="teacher-button text-sm">
                                        Participar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherTrainingView;