import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    BookOpen, 
    Clock, 
    Users, 
    Star,
    Play,
    Plus,
    Edit,
    Trash2,
    Eye,
    Download,
    Upload,
    Tag,
    Calendar,
    BarChart3,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Share
} from 'lucide-react';

const TeacherCatalogView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const categories = [
        { id: 'all', name: 'Todas as Categorias' },
        { id: 'video-lessons', name: 'Videoaulas' },
        { id: 'exercises', name: 'Exercícios' },
        { id: 'projects', name: 'Projetos' },
        { id: 'resources', name: 'Recursos' },
        { id: 'assessments', name: 'Avaliações' }
    ];

    const myContent = [
        {
            id: 1,
            title: 'Fundamentos de Direção Cinematográfica',
            type: 'video-lessons',
            category: 'Videoaulas',
            duration: '45 min',
            students: 28,
            views: 156,
            status: 'published',
            createdAt: '2024-01-10',
            thumbnail: '🎬',
            description: 'Introdução aos conceitos básicos de direção para cinema e audiovisual'
        },
        {
            id: 2,
            title: 'Exercícios de Enquadramento',
            type: 'exercises',
            category: 'Exercícios',
            duration: '30 min',
            students: 25,
            views: 89,
            status: 'published',
            createdAt: '2024-01-08',
            thumbnail: '📐',
            description: 'Série de exercícios práticos para dominar técnicas de enquadramento'
        },
        {
            id: 3,
            title: 'Projeto Final - Curta Metragem',
            type: 'projects',
            category: 'Projetos',
            duration: '2 semanas',
            students: 15,
            views: 45,
            status: 'draft',
            createdAt: '2024-01-12',
            thumbnail: '🎭',
            description: 'Projeto integrador para aplicação de todos os conceitos aprendidos'
        },
        {
            id: 4,
            title: 'Kit de Recursos - Trilhas Sonoras',
            type: 'resources',
            category: 'Recursos',
            duration: '∞',
            students: 42,
            views: 234,
            status: 'published',
            createdAt: '2024-01-05',
            thumbnail: '🎵',
            description: 'Biblioteca de trilhas sonoras livres de direitos autorais'
        }
    ];

    const sharedContent = [
        {
            id: 5,
            title: 'Color Grading Avançado',
            author: 'Prof. Maria Santos',
            type: 'video-lessons',
            category: 'Videoaulas',
            duration: '60 min',
            rating: 4.8,
            views: 312,
            thumbnail: '🎨',
            description: 'Técnicas avançadas de correção de cor e gradação'
        },
        {
            id: 6,
            title: 'Roteiro para Documentários',
            author: 'Prof. João Silva',
            type: 'resources',
            category: 'Recursos',
            duration: '90 min',
            rating: 4.9,
            views: 187,
            thumbnail: '📝',
            description: 'Metodologia completa para criação de roteiros documentais'
        }
    ];

    const filteredContent = (selectedTab === 'my-content' ? myContent : sharedContent).filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'text-green-600 bg-green-50';
            case 'draft': return 'text-yellow-600 bg-yellow-50';
            case 'archived': return 'text-gray-600 bg-gray-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'published': return 'Publicado';
            case 'draft': return 'Rascunho';
            case 'archived': return 'Arquivado';
            default: return status;
        }
    };

    const getCategoryIcon = (type: string) => {
        switch (type) {
            case 'video-lessons': return '🎬';
            case 'exercises': return '📐';
            case 'projects': return '🎭';
            case 'resources': return '📚';
            case 'assessments': return '📝';
            default: return '📄';
        }
    };

    return (
        <div className="teacher-container p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div className="teacher-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Catálogo de Conteúdo</h1>
                    <p className="text-gray-600 mt-1">Gerencie e organize seus materiais didáticos</p>
                </div>
                <div className="teacher-actions flex flex-col sm:flex-row gap-2">
                    <button className="teacher-button flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Conteúdo
                    </button>
                    <button className="teacher-button flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Conteúdo
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="teacher-filters bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="teacher-search-container flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar conteúdo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="teacher-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="teacher-filter-group flex flex-col sm:flex-row gap-2">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="teacher-select px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="">Todos os tipos</option>
                            <option value="video">Vídeos</option>
                            <option value="document">Documentos</option>
                            <option value="exercise">Exercícios</option>
                            <option value="resource">Recursos</option>
                        </select>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="teacher-select px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="">Todas as categorias</option>
                            <option value="ia-audiovisual">IA Audiovisual</option>
                            <option value="producao">Produção</option>
                            <option value="motion">Motion Graphics</option>
                            <option value="edicao">Edição</option>
                        </select>
                        <button className="teacher-icon-button p-2 text-gray-600 hover:text-purple-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Stats */}
            <div className="teacher-stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="teacher-stat-card teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total de Conteúdos</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">127</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Visualizações</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">2.4k</p>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Eye className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">4.8</p>
                        </div>
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Star className="w-5 h-5 text-yellow-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Downloads</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">856</p>
                        </div>
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Download className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="teacher-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredContent.map((content) => (
                    <div key={content.id} className="teacher-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-gray-100 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {getTypeIcon(content.type)}
                            </div>
                            <div className="absolute top-2 left-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(content.type)}`}>
                                    {content.type}
                                </span>
                            </div>
                            <div className="absolute top-2 right-2">
                                <button className="teacher-icon-button p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white">
                                    <MoreVertical className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{content.title}</h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{content.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {content.createdAt}
                                </span>
                                <span className="flex items-center">
                                    <Eye className="w-4 h-4 mr-1" />
                                    {content.views}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-medium text-gray-900">{content.rating}</span>
                                    <span className="text-sm text-gray-500">({content.reviews})</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <button className="teacher-icon-button p-1 text-gray-600 hover:text-blue-600">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="teacher-icon-button p-1 text-gray-600 hover:text-green-600">
                                        <Share className="w-4 h-4" />
                                    </button>
                                    <button className="teacher-icon-button p-1 text-gray-600 hover:text-purple-600">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                    <button className="teacher-button px-3 py-2 text-gray-600 hover:text-purple-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="teacher-button px-3 py-2 bg-purple-600 text-white rounded-lg">1</button>
                    <button className="teacher-button px-3 py-2 text-gray-600 hover:text-purple-600 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                    <button className="teacher-button px-3 py-2 text-gray-600 hover:text-purple-600 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                    <button className="teacher-button px-3 py-2 text-gray-600 hover:text-purple-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherCatalogView;