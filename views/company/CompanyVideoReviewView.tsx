import React, { useState, useRef, useEffect } from 'react';
import { 
    Play, 
    Pause, 
    Volume2, 
    VolumeX, 
    Maximize, 
    SkipBack, 
    SkipForward,
    MessageCircle,
    Send,
    Clock,
    User,
    CheckCircle,
    AlertCircle,
    Edit3,
    Trash2,
    Filter,
    Search,
    Calendar,
    Eye,
    Download,
    Star,
    MoreVertical
} from 'lucide-react';

interface VideoProject {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
    submittedBy: string;
    submittedAt: Date;
    status: 'pending' | 'in_review' | 'approved' | 'needs_changes';
    priority: 'low' | 'medium' | 'high';
    category: string;
    version: number;
    comments: VideoComment[];
    tags: string[];
}

interface VideoComment {
    id: string;
    timestamp: number;
    author: string;
    authorRole: 'reviewer' | 'student' | 'coordinator';
    content: string;
    type: 'general' | 'technical' | 'creative' | 'urgent';
    createdAt: Date;
    resolved: boolean;
    replies?: VideoComment[];
}

const CompanyVideoReviewView: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [newComment, setNewComment] = useState('');
    const [commentType, setCommentType] = useState<'general' | 'technical' | 'creative' | 'urgent'>('general');
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentTimestamp, setCommentTimestamp] = useState(0);
    
    const videoRef = useRef<HTMLVideoElement>(null);

    // Mock data
    const mockProjects: VideoProject[] = [
        {
            id: '1',
            title: 'Campanha Publicitária - Produto X',
            description: 'Vídeo promocional para lançamento do novo produto da empresa parceira',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
            duration: 120,
            submittedBy: 'João Silva',
            submittedAt: new Date('2024-01-15'),
            status: 'in_review',
            priority: 'high',
            category: 'Comercial',
            version: 2,
            tags: ['publicidade', 'produto', 'comercial'],
            comments: [
                {
                    id: '1',
                    timestamp: 15,
                    author: 'Maria Santos',
                    authorRole: 'reviewer',
                    content: 'A transição aos 15 segundos precisa ser mais suave. Considere usar um fade.',
                    type: 'technical',
                    createdAt: new Date('2024-01-16'),
                    resolved: false
                },
                {
                    id: '2',
                    timestamp: 45,
                    author: 'Carlos Lima',
                    authorRole: 'coordinator',
                    content: 'Excelente enquadramento nesta cena! Muito bem executado.',
                    type: 'creative',
                    createdAt: new Date('2024-01-16'),
                    resolved: true
                }
            ]
        },
        {
            id: '2',
            title: 'Documentário - História da Empresa',
            description: 'Documentário institucional sobre os 50 anos da empresa',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
            duration: 300,
            submittedBy: 'Ana Costa',
            submittedAt: new Date('2024-01-14'),
            status: 'pending',
            priority: 'medium',
            category: 'Institucional',
            version: 1,
            tags: ['documentário', 'institucional', 'história'],
            comments: []
        },
        {
            id: '3',
            title: 'Tutorial - Uso do Produto',
            description: 'Vídeo tutorial explicativo sobre como usar o produto',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
            duration: 180,
            submittedBy: 'Pedro Oliveira',
            submittedAt: new Date('2024-01-13'),
            status: 'approved',
            priority: 'low',
            category: 'Tutorial',
            version: 3,
            tags: ['tutorial', 'produto', 'educativo'],
            comments: [
                {
                    id: '3',
                    timestamp: 90,
                    author: 'Lucia Ferreira',
                    authorRole: 'reviewer',
                    content: 'Perfeito! Aprovado para publicação.',
                    type: 'general',
                    createdAt: new Date('2024-01-14'),
                    resolved: true
                }
            ]
        }
    ];

    const [projects] = useState<VideoProject[]>(mockProjects);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'in_review': return 'bg-blue-100 text-blue-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'needs_changes': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    const getCommentTypeColor = (type: string) => {
        switch (type) {
            case 'technical': return 'bg-blue-100 text-blue-800';
            case 'creative': return 'bg-purple-100 text-purple-800';
            case 'urgent': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        if (videoRef.current) {
            videoRef.current.volume = vol;
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const addCommentAtCurrentTime = () => {
        setCommentTimestamp(currentTime);
        setShowCommentForm(true);
    };

    const submitComment = () => {
        if (newComment.trim() && selectedProject) {
            const comment: VideoComment = {
                id: Date.now().toString(),
                timestamp: commentTimestamp,
                author: 'Revisor Atual',
                authorRole: 'reviewer',
                content: newComment,
                type: commentType,
                createdAt: new Date(),
                resolved: false
            };

            // In a real app, this would be sent to the backend
            console.log('New comment:', comment);
            
            setNewComment('');
            setShowCommentForm(false);
            setCommentType('general');
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
        
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const stats = {
        total: projects.length,
        pending: projects.filter(p => p.status === 'pending').length,
        inReview: projects.filter(p => p.status === 'in_review').length,
        approved: projects.filter(p => p.status === 'approved').length,
        needsChanges: projects.filter(p => p.status === 'needs_changes').length
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Revisão de Vídeos</h1>
                <p className="text-gray-600">Revise e comente nos vídeos dos projetos submetidos pelos alunos</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <Eye className="h-8 w-8 text-gray-400" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pendentes</p>
                            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <Clock className="h-8 w-8 text-yellow-400" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Em Revisão</p>
                            <p className="text-2xl font-bold text-blue-600">{stats.inReview}</p>
                        </div>
                        <MessageCircle className="h-8 w-8 text-blue-400" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Aprovados</p>
                            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Alterações</p>
                            <p className="text-2xl font-bold text-red-600">{stats.needsChanges}</p>
                        </div>
                        <AlertCircle className="h-8 w-8 text-red-400" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Projects List */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Projetos para Revisão</h2>
                            
                            {/* Search and Filters */}
                            <div className="space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Buscar projetos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                
                                <div className="flex gap-2">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">Todos os Status</option>
                                        <option value="pending">Pendente</option>
                                        <option value="in_review">Em Revisão</option>
                                        <option value="approved">Aprovado</option>
                                        <option value="needs_changes">Precisa Alterações</option>
                                    </select>
                                    
                                    <select
                                        value={priorityFilter}
                                        onChange={(e) => setPriorityFilter(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">Todas Prioridades</option>
                                        <option value="high">Alta</option>
                                        <option value="medium">Média</option>
                                        <option value="low">Baixa</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => setSelectedProject(project)}
                                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                                        selectedProject?.id === project.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={project.thumbnailUrl}
                                            alt={project.title}
                                            className="w-16 h-12 object-cover rounded"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900 truncate">{project.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2">por {project.submittedBy}</p>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                                    {project.status === 'pending' && 'Pendente'}
                                                    {project.status === 'in_review' && 'Em Revisão'}
                                                    {project.status === 'approved' && 'Aprovado'}
                                                    {project.status === 'needs_changes' && 'Precisa Alterações'}
                                                </span>
                                                <span className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
                                                    {project.priority === 'high' && 'Alta'}
                                                    {project.priority === 'medium' && 'Média'}
                                                    {project.priority === 'low' && 'Baixa'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="h-3 w-3" />
                                                <span>{formatTime(project.duration)}</span>
                                                <MessageCircle className="h-3 w-3 ml-2" />
                                                <span>{project.comments.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Video Player and Comments */}
                <div className="lg:col-span-2">
                    {selectedProject ? (
                        <div className="space-y-6">
                            {/* Video Player */}
                            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                                <div className="p-4 border-b">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">{selectedProject.title}</h2>
                                            <p className="text-gray-600 mt-1">{selectedProject.description}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span>por {selectedProject.submittedBy}</span>
                                                <span>•</span>
                                                <span>Versão {selectedProject.version}</span>
                                                <span>•</span>
                                                <span>{selectedProject.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                                <Download className="h-5 w-5" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                                <Star className="h-5 w-5" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                                <MoreVertical className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="relative bg-black">
                                    <video
                                        ref={videoRef}
                                        src={selectedProject.videoUrl}
                                        className="w-full h-64 md:h-80"
                                        onTimeUpdate={handleTimeUpdate}
                                        onLoadedMetadata={handleLoadedMetadata}
                                        onClick={handlePlayPause}
                                    />
                                    
                                    {/* Video Controls */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={handlePlayPause}
                                                className="text-white hover:text-gray-300"
                                            >
                                                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                                            </button>
                                            
                                            <button className="text-white hover:text-gray-300">
                                                <SkipBack className="h-5 w-5" />
                                            </button>
                                            
                                            <button className="text-white hover:text-gray-300">
                                                <SkipForward className="h-5 w-5" />
                                            </button>
                                            
                                            <div className="flex-1 flex items-center gap-2">
                                                <span className="text-white text-sm">{formatTime(currentTime)}</span>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={duration}
                                                    value={currentTime}
                                                    onChange={handleSeek}
                                                    className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                                />
                                                <span className="text-white text-sm">{formatTime(duration)}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <button onClick={toggleMute} className="text-white hover:text-gray-300">
                                                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                                                </button>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.1"
                                                    value={volume}
                                                    onChange={handleVolumeChange}
                                                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                            
                                            <button className="text-white hover:text-gray-300">
                                                <Maximize className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="p-4 border-t bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={addCommentAtCurrentTime}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            <MessageCircle className="h-4 w-4" />
                                            Comentar no Tempo Atual
                                        </button>
                                        
                                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                            <option value="in_review">Marcar como Em Revisão</option>
                                            <option value="approved">Aprovar Vídeo</option>
                                            <option value="needs_changes">Solicitar Alterações</option>
                                        </select>
                                        
                                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                            Salvar Status
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="bg-white rounded-lg shadow-sm border">
                                <div className="p-4 border-b">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Comentários ({selectedProject.comments.length})
                                    </h3>
                                </div>
                                
                                <div className="p-4">
                                    {/* Comment Form */}
                                    {showCommentForm && (
                                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Clock className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">
                                                    Comentário no tempo: {formatTime(commentTimestamp)}
                                                </span>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <select
                                                    value={commentType}
                                                    onChange={(e) => setCommentType(e.target.value as any)}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="general">Comentário Geral</option>
                                                    <option value="technical">Técnico</option>
                                                    <option value="creative">Criativo</option>
                                                    <option value="urgent">Urgente</option>
                                                </select>
                                            </div>
                                            
                                            <textarea
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                placeholder="Digite seu comentário..."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                rows={3}
                                            />
                                            
                                            <div className="flex items-center gap-2 mt-3">
                                                <button
                                                    onClick={submitComment}
                                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                                >
                                                    <Send className="h-4 w-4" />
                                                    Enviar Comentário
                                                </button>
                                                <button
                                                    onClick={() => setShowCommentForm(false)}
                                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Comments List */}
                                    <div className="space-y-4">
                                        {selectedProject.comments.map((comment) => (
                                            <div key={comment.id} className="border-l-4 border-l-blue-200 pl-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                                            <User className="h-4 w-4 text-gray-600" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-gray-900">{comment.author}</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCommentTypeColor(comment.type)}`}>
                                                                    {comment.type}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {formatTime(comment.timestamp)}
                                                                </span>
                                                            </div>
                                                            <span className="text-xs text-gray-500">
                                                                {comment.createdAt.toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-1">
                                                        <button className="p-1 text-gray-400 hover:text-gray-600">
                                                            <Edit3 className="h-4 w-4" />
                                                        </button>
                                                        <button className="p-1 text-gray-400 hover:text-red-600">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-gray-700 mb-2">{comment.content}</p>
                                                
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className={`text-xs px-2 py-1 rounded ${
                                                            comment.resolved 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {comment.resolved ? 'Resolvido' : 'Marcar como Resolvido'}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {selectedProject.comments.length === 0 && (
                                            <div className="text-center py-8 text-gray-500">
                                                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                                <p>Nenhum comentário ainda</p>
                                                <p className="text-sm">Seja o primeiro a comentar neste vídeo</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border h-96 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <Play className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-medium mb-2">Selecione um projeto</h3>
                                <p>Escolha um projeto da lista para começar a revisão</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyVideoReviewView;