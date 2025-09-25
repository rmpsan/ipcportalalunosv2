import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    Users, 
    UserPlus, 
    MessageCircle, 
    Calendar, 
    MapPin, 
    Star,
    Award,
    Building,
    GraduationCap,
    Briefcase,
    Globe,
    Search,
    Filter,
    Plus,
    Settings,
    Send,
    Heart,
    Share2,
    BookOpen,
    TrendingUp,
    Clock,
    Eye
} from 'lucide-react';

interface TeacherNetworkingViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para conexões
const connections = [
    {
        id: 1,
        name: 'Dra. Maria Eduarda Santos',
        title: 'Coordenadora Pedagógica',
        institution: 'Instituto Tecnológico Avançado',
        location: 'São Paulo, SP',
        expertise: ['Metodologias Ativas', 'Educação Digital'],
        connections: 245,
        posts: 18,
        avatar: '/api/placeholder/60/60',
        isConnected: true,
        mutualConnections: 12
    },
    {
        id: 2,
        name: 'Prof. João Silva',
        title: 'Especialista em EdTech',
        institution: 'TechEdu Solutions',
        location: 'Rio de Janeiro, RJ',
        expertise: ['Inteligência Artificial', 'Inovação Educacional'],
        connections: 189,
        posts: 24,
        avatar: '/api/placeholder/60/60',
        isConnected: false,
        mutualConnections: 8
    },
    {
        id: 3,
        name: 'Dra. Ana Costa',
        title: 'Pesquisadora em Educação',
        institution: 'Universidade Federal',
        location: 'Brasília, DF',
        expertise: ['Avaliação Educacional', 'Pesquisa Acadêmica'],
        connections: 312,
        posts: 31,
        avatar: '/api/placeholder/60/60',
        isConnected: true,
        mutualConnections: 15
    }
];

const groups = [
    {
        id: 1,
        name: 'Educadores Inovadores Brasil',
        description: 'Comunidade de professores focados em inovação educacional',
        members: 1250,
        posts: 45,
        category: 'Educação',
        isJoined: true,
        recentActivity: '2 horas atrás'
    },
    {
        id: 2,
        name: 'Tecnologia na Educação',
        description: 'Discussões sobre ferramentas e metodologias digitais',
        members: 890,
        posts: 32,
        category: 'Tecnologia',
        isJoined: true,
        recentActivity: '5 horas atrás'
    },
    {
        id: 3,
        name: 'Metodologias Ativas',
        description: 'Compartilhamento de práticas pedagógicas ativas',
        members: 567,
        posts: 28,
        category: 'Pedagogia',
        isJoined: false,
        recentActivity: '1 dia atrás'
    }
];

const events = [
    {
        id: 1,
        title: 'Congresso Nacional de Educação 2024',
        date: '2024-03-15',
        time: '09:00',
        location: 'São Paulo Convention Center',
        type: 'Presencial',
        attendees: 500,
        price: 'R$ 350',
        organizer: 'Associação Brasileira de Educadores',
        isRegistered: true
    },
    {
        id: 2,
        title: 'Workshop: IA na Sala de Aula',
        date: '2024-02-20',
        time: '19:00',
        location: 'Online',
        type: 'Virtual',
        attendees: 150,
        price: 'Gratuito',
        organizer: 'TechEdu Brasil',
        isRegistered: false
    },
    {
        id: 3,
        title: 'Meetup: Educadores de São Paulo',
        date: '2024-02-25',
        time: '18:30',
        location: 'Hub de Inovação Educacional',
        type: 'Presencial',
        attendees: 80,
        price: 'R$ 50',
        organizer: 'Rede de Educadores SP',
        isRegistered: false
    }
];

const posts = [
    {
        id: 1,
        author: 'Dra. Maria Eduarda Santos',
        authorTitle: 'Coordenadora Pedagógica',
        avatar: '/api/placeholder/40/40',
        content: 'Acabei de implementar uma nova metodologia ativa em minhas aulas e os resultados têm sido incríveis! Os alunos estão muito mais engajados. Alguém mais tem experiências similares?',
        timestamp: '2 horas atrás',
        likes: 24,
        comments: 8,
        shares: 3,
        hasLiked: false
    },
    {
        id: 2,
        author: 'Prof. João Silva',
        authorTitle: 'Especialista em EdTech',
        avatar: '/api/placeholder/40/40',
        content: 'Compartilhando um artigo interessante sobre o uso de IA na educação. Vale a pena a leitura para quem está explorando essas tecnologias.',
        timestamp: '4 horas atrás',
        likes: 18,
        comments: 5,
        shares: 7,
        hasLiked: true,
        attachment: {
            type: 'article',
            title: 'O Futuro da IA na Educação',
            description: 'Como a inteligência artificial está transformando...'
        }
    }
];

const TeacherNetworkingView: React.FC<TeacherNetworkingViewProps> = ({ setActiveView }) => {
    const [selectedTab, setSelectedTab] = useState('feed');
    const [searchTerm, setSearchTerm] = useState('');
    const [newPost, setNewPost] = useState('');

    const tabs = [
        { id: 'feed', label: 'Feed', icon: Globe },
        { id: 'conexoes', label: 'Conexões', icon: Users },
        { id: 'grupos', label: 'Grupos', icon: UserPlus },
        { id: 'eventos', label: 'Eventos', icon: Calendar }
    ];

    const handleLike = (postId: number) => {
        // Implementar lógica de like
        console.log('Like post:', postId);
    };

    const handleShare = (postId: number) => {
        // Implementar lógica de compartilhamento
        console.log('Share post:', postId);
    };

    const handleConnect = (userId: number) => {
        // Implementar lógica de conexão
        console.log('Connect with user:', userId);
    };

    return (
        <div className="teacher-container">
            {/* Header */}
            <div className="teacher-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Networking</h1>
                    <p className="text-gray-600 mt-1">Conecte-se com outros educadores</p>
                </div>
                <div className="teacher-actions">
                    <button className="teacher-button">
                        <Plus className="w-4 h-4" />
                        Nova Publicação
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
                            <p className="text-sm text-gray-600">Conexões</p>
                            <p className="text-2xl font-bold text-gray-900">156</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Grupos</p>
                            <p className="text-2xl font-bold text-gray-900">8</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <UserPlus className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Publicações</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <MessageCircle className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Eventos</p>
                            <p className="text-2xl font-bold text-gray-900">3</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Calendar className="w-6 h-6 text-yellow-600" />
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
            {selectedTab === 'feed' && (
                <div className="space-y-6">
                    {/* New Post */}
                    <div className="teacher-card">
                        <div className="flex items-start gap-4">
                            <img
                                src="/api/placeholder/40/40"
                                alt="Seu avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <textarea
                                    placeholder="Compartilhe suas experiências educacionais..."
                                    className="teacher-textarea resize-none"
                                    rows={3}
                                    value={newPost}
                                    onChange={(e) => setNewPost(e.target.value)}
                                />
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-2">
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <BookOpen className="w-4 h-4" />
                                        </button>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <Calendar className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button className="teacher-button text-sm">
                                        <Send className="w-4 h-4" />
                                        Publicar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div key={post.id} className="teacher-card">
                                <div className="flex items-start gap-4 mb-4">
                                    <img
                                        src={post.avatar}
                                        alt={post.author}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-medium text-gray-900">{post.author}</h4>
                                            <span className="text-sm text-gray-500">•</span>
                                            <span className="text-sm text-gray-500">{post.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{post.authorTitle}</p>
                                    </div>
                                </div>

                                <p className="text-gray-900 mb-4">{post.content}</p>

                                {post.attachment && (
                                    <div className="p-4 bg-gray-50 rounded-lg mb-4">
                                        <h5 className="font-medium text-gray-900 mb-1">{post.attachment.title}</h5>
                                        <p className="text-sm text-gray-600">{post.attachment.description}</p>
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center gap-2 text-sm transition-colors ${
                                                post.hasLiked 
                                                    ? 'text-red-600 hover:text-red-700' 
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-current' : ''}`} />
                                            <span>{post.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>{post.comments}</span>
                                        </button>
                                        <button
                                            onClick={() => handleShare(post.id)}
                                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            <span>{post.shares}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedTab === 'conexoes' && (
                <>
                    {/* Search */}
                    <div className="teacher-filters mb-6">
                        <div className="teacher-search-container">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar educadores..."
                                className="teacher-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Connections Grid */}
                    <div className="teacher-card-grid">
                        {connections.map((connection) => (
                            <div key={connection.id} className="teacher-card">
                                <div className="text-center mb-4">
                                    <img
                                        src={connection.avatar}
                                        alt={connection.name}
                                        className="w-16 h-16 rounded-full mx-auto mb-3"
                                    />
                                    <h3 className="font-semibold text-gray-900 mb-1">{connection.name}</h3>
                                    <p className="text-sm text-gray-600 mb-1">{connection.title}</p>
                                    <p className="text-sm text-gray-500 mb-2">{connection.institution}</p>
                                    <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-3">
                                        <MapPin className="w-3 h-3" />
                                        <span>{connection.location}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {connection.expertise.map((skill, index) => (
                                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{connection.connections}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{connection.posts}</span>
                                    </div>
                                </div>

                                {connection.mutualConnections > 0 && (
                                    <p className="text-xs text-gray-500 mb-4">
                                        {connection.mutualConnections} conexões em comum
                                    </p>
                                )}

                                <div className="flex items-center gap-2">
                                    {connection.isConnected ? (
                                        <button className="teacher-button-secondary flex-1 text-sm">
                                            <MessageCircle className="w-4 h-4" />
                                            Mensagem
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleConnect(connection.id)}
                                            className="teacher-button flex-1 text-sm"
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            Conectar
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {selectedTab === 'grupos' && (
                <div className="space-y-4">
                    {groups.map((group) => (
                        <div key={group.id} className="teacher-card">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-2">{group.name}</h3>
                                    <p className="text-gray-600 mb-3">{group.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            <span>{group.members} membros</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>{group.posts} posts</span>
                                        </div>
                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                            {group.category}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Última atividade: {group.recentActivity}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                {group.isJoined ? (
                                    <button className="teacher-button-secondary text-sm">
                                        <Eye className="w-4 h-4" />
                                        Ver Grupo
                                    </button>
                                ) : (
                                    <button className="teacher-button text-sm">
                                        <Plus className="w-4 h-4" />
                                        Participar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedTab === 'eventos' && (
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="teacher-card">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{event.date} às {event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>{event.attendees} participantes</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Building className="w-4 h-4" />
                                            <span>{event.organizer}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            event.type === 'Virtual' 
                                                ? 'bg-blue-100 text-blue-800' 
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {event.type}
                                        </span>
                                        <span className="text-sm font-medium text-green-600">{event.price}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                {event.isRegistered ? (
                                    <span className="text-sm text-green-600 font-medium">✓ Inscrito</span>
                                ) : (
                                    <button className="teacher-button text-sm">
                                        <Plus className="w-4 h-4" />
                                        Inscrever-se
                                    </button>
                                )}
                                <button className="teacher-button-secondary text-sm">
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeacherNetworkingView;