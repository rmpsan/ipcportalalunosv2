import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    Video, 
    Camera, 
    Mic, 
    Monitor, 
    Calendar, 
    Clock, 
    Users, 
    Play,
    Pause,
    Edit,
    Download,
    Share2,
    Plus,
    Filter,
    Search,
    CheckCircle,
    AlertCircle,
    Settings
} from 'lucide-react';

interface TeacherProductionViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para projetos de produção
const productionProjects = [
    {
        id: 1,
        title: 'Aula Prática - Iluminação Básica',
        type: 'Vídeo Educativo',
        status: 'Em Produção',
        progress: 75,
        deadline: '2024-02-15',
        team: ['Ana Silva', 'Carlos Santos'],
        equipment: ['Câmera DSLR', 'Kit de Iluminação', 'Microfone'],
        thumbnail: '/api/placeholder/300/200'
    },
    {
        id: 2,
        title: 'Tutorial - Edição no Premiere',
        type: 'Screencast',
        status: 'Pós-Produção',
        progress: 90,
        deadline: '2024-02-10',
        team: ['Marina Costa'],
        equipment: ['Computador', 'Software de Edição'],
        thumbnail: '/api/placeholder/300/200'
    },
    {
        id: 3,
        title: 'Documentário - História do Cinema',
        type: 'Documentário',
        status: 'Planejamento',
        progress: 25,
        deadline: '2024-03-01',
        team: ['João Oliveira', 'Maria Santos', 'Pedro Lima'],
        equipment: ['Câmera 4K', 'Drone', 'Kit de Som'],
        thumbnail: '/api/placeholder/300/200'
    }
];

const equipmentSchedule = [
    {
        id: 1,
        equipment: 'Câmera DSLR Canon',
        project: 'Aula Prática - Iluminação',
        timeSlot: '09:00 - 12:00',
        date: 'Hoje',
        status: 'Em Uso'
    },
    {
        id: 2,
        equipment: 'Kit de Iluminação LED',
        project: 'Tutorial - Fotografia',
        timeSlot: '14:00 - 17:00',
        date: 'Hoje',
        status: 'Reservado'
    },
    {
        id: 3,
        equipment: 'Microfone Shotgun',
        project: 'Entrevista - Ex-aluno',
        timeSlot: '10:00 - 11:30',
        date: 'Amanhã',
        status: 'Disponível'
    }
];

const TeacherProductionView: React.FC<TeacherProductionViewProps> = ({ setActiveView }) => {
    const [selectedTab, setSelectedTab] = useState('projetos');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    const tabs = [
        { id: 'projetos', label: 'Projetos', icon: Video },
        { id: 'equipamentos', label: 'Equipamentos', icon: Camera },
        { id: 'cronograma', label: 'Cronograma', icon: Calendar }
    ];

    const statusOptions = ['Todos', 'Planejamento', 'Em Produção', 'Pós-Produção', 'Concluído'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Planejamento': return 'bg-yellow-100 text-yellow-800';
            case 'Em Produção': return 'bg-blue-100 text-blue-800';
            case 'Pós-Produção': return 'bg-purple-100 text-purple-800';
            case 'Concluído': return 'bg-green-100 text-green-800';
            case 'Em Uso': return 'bg-red-100 text-red-800';
            case 'Reservado': return 'bg-orange-100 text-orange-800';
            case 'Disponível': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredProjects = productionProjects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Todos' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="teacher-container">
            {/* Header */}
            <div className="teacher-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Produção</h1>
                    <p className="text-gray-600 mt-1">Gerencie projetos audiovisuais e equipamentos</p>
                </div>
                <div className="teacher-actions">
                    <button className="teacher-button">
                        <Plus className="w-4 h-4" />
                        Novo Projeto
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
                            <p className="text-sm text-gray-600">Projetos Ativos</p>
                            <p className="text-2xl font-bold text-gray-900">8</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Video className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Equipamentos</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Camera className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Horas de Produção</p>
                            <p className="text-2xl font-bold text-gray-900">156h</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Colaboradores</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Users className="w-6 h-6 text-yellow-600" />
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
            {selectedTab === 'projetos' && (
                <>
                    {/* Search and Filters */}
                    <div className="teacher-filters mb-6">
                        <div className="teacher-search-container">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar projetos..."
                                className="teacher-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="teacher-filter-group">
                            <select
                                className="teacher-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="teacher-card-grid">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="teacher-card">
                                <div className="relative mb-4">
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">{project.type}</p>
                                
                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Progresso</span>
                                        <span>{project.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Team and Equipment */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{project.team.length} colaboradores</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Camera className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{project.equipment.length} equipamentos</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">Prazo: {project.deadline}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between">
                                    <button className="teacher-button text-sm">
                                        <Play className="w-4 h-4" />
                                        Visualizar
                                    </button>
                                    <div className="flex items-center gap-1">
                                        <button className="teacher-icon-button">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="teacher-icon-button">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {selectedTab === 'equipamentos' && (
                <div className="teacher-card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Agenda de Equipamentos</h2>
                    <div className="space-y-4">
                        {equipmentSchedule.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-lg">
                                        <Camera className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{item.equipment}</h4>
                                        <p className="text-sm text-gray-600">{item.project}</p>
                                        <p className="text-sm text-gray-500">{item.date} • {item.timeSlot}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedTab === 'cronograma' && (
                <div className="teacher-card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Cronograma de Produção</h2>
                    <div className="text-center py-12 text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Cronograma visual em desenvolvimento</p>
                        <p className="text-sm">Em breve você poderá visualizar o cronograma completo</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherProductionView;