import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    Bot, 
    Sparkles, 
    MessageSquare, 
    FileText, 
    Image, 
    Video, 
    Code, 
    Lightbulb,
    TrendingUp,
    Clock,
    Users,
    Star,
    Play,
    Download,
    Share2,
    Settings
} from 'lucide-react';

interface TeacherIAHubViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para ferramentas de IA
const aiTools = [
    {
        id: 1,
        name: 'Gerador de Conteúdo',
        description: 'Crie materiais didáticos automaticamente',
        icon: FileText,
        category: 'Conteúdo',
        usage: 245,
        rating: 4.8
    },
    {
        id: 2,
        name: 'Assistente de Avaliação',
        description: 'Corrija provas e trabalhos com IA',
        icon: Bot,
        category: 'Avaliação',
        usage: 189,
        rating: 4.9
    },
    {
        id: 3,
        name: 'Criador de Imagens',
        description: 'Gere ilustrações para suas aulas',
        icon: Image,
        category: 'Visual',
        usage: 156,
        rating: 4.7
    },
    {
        id: 4,
        name: 'Editor de Vídeo IA',
        description: 'Edite vídeos automaticamente',
        icon: Video,
        category: 'Vídeo',
        usage: 98,
        rating: 4.6
    }
];

const recentProjects = [
    {
        id: 1,
        title: 'Plano de Aula - Iluminação',
        type: 'Conteúdo',
        createdAt: '2 horas atrás',
        status: 'Concluído'
    },
    {
        id: 2,
        title: 'Quiz - Fundamentos de Produção',
        type: 'Avaliação',
        createdAt: '1 dia atrás',
        status: 'Em andamento'
    },
    {
        id: 3,
        title: 'Infográfico - Tipos de Câmera',
        type: 'Visual',
        createdAt: '2 dias atrás',
        status: 'Concluído'
    }
];

const TeacherIAHubView: React.FC<TeacherIAHubViewProps> = ({ setActiveView }) => {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['Todos', 'Conteúdo', 'Avaliação', 'Visual', 'Vídeo'];

    const filteredTools = aiTools.filter(tool => {
        const matchesCategory = selectedCategory === 'Todos' || tool.category === selectedCategory;
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="teacher-container">
            {/* Header */}
            <div className="teacher-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hub de IA</h1>
                    <p className="text-gray-600 mt-1">Ferramentas inteligentes para potencializar seu ensino</p>
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
                            <p className="text-sm text-gray-600">Projetos Criados</p>
                            <p className="text-2xl font-bold text-gray-900">127</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Sparkles className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Horas Economizadas</p>
                            <p className="text-2xl font-bold text-gray-900">45h</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Clock className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Ferramentas Usadas</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Bot className="w-6 h-6 text-purple-600" />
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

            {/* Search and Filters */}
            <div className="teacher-filters mb-6">
                <div className="teacher-search-container">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar ferramentas de IA..."
                        className="teacher-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="teacher-filter-group">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedCategory === category
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Tools Grid */}
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Ferramentas Disponíveis</h2>
                    <div className="teacher-card-grid">
                        {filteredTools.map((tool) => {
                            const IconComponent = tool.icon;
                            return (
                                <div key={tool.id} className="teacher-card hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <IconComponent className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="text-sm text-gray-600">{tool.rating}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{tool.usage} usos</span>
                                        </div>
                                        <button className="teacher-button text-sm">
                                            <Play className="w-4 h-4" />
                                            Usar
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Projects Sidebar */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Projetos Recentes</h2>
                    <div className="teacher-card">
                        <div className="space-y-4">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-white rounded-lg">
                                        <FileText className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 text-sm truncate">{project.title}</h4>
                                        <p className="text-xs text-gray-600">{project.type}</p>
                                        <p className="text-xs text-gray-500 mt-1">{project.createdAt}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button className="teacher-icon-button p-1">
                                            <Download className="w-3 h-3" />
                                        </button>
                                        <button className="teacher-icon-button p-1">
                                            <Share2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 text-center text-purple-600 hover:text-purple-700 text-sm font-medium">
                            Ver todos os projetos
                        </button>
                    </div>

                    {/* Quick Tips */}
                    <div className="teacher-card mt-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="w-5 h-5 text-yellow-500" />
                            <h3 className="font-semibold text-gray-900">Dicas Rápidas</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="text-sm text-gray-600">
                                💡 Use o Gerador de Conteúdo para criar exercícios personalizados
                            </div>
                            <div className="text-sm text-gray-600">
                                🎯 O Assistente de Avaliação pode identificar padrões de erro
                            </div>
                            <div className="text-sm text-gray-600">
                                🎨 Combine ferramentas visuais para aulas mais engajantes
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherIAHubView;