import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Star, 
    MapPin, 
    Clock, 
    DollarSign, 
    Eye, 
    MessageSquare, 
    Heart, 
    Download,
    User,
    Calendar,
    Award,
    Briefcase,
    GraduationCap,
    Camera,
    Video,
    Mic,
    Palette,
    Code,
    Megaphone,
    Users,
    TrendingUp,
    CheckCircle,
    Phone,
    Mail
} from 'lucide-react';

interface TalentProfile {
    id: string;
    name: string;
    title: string;
    avatar: string;
    location: string;
    rating: number;
    reviewCount: number;
    hourlyRate: number;
    availability: 'available' | 'busy' | 'unavailable';
    skills: string[];
    specialties: string[];
    experience: number;
    completedProjects: number;
    responseTime: string;
    languages: string[];
    education: string;
    portfolio: {
        images: number;
        videos: number;
        projects: number;
    };
    lastActive: string;
    verified: boolean;
    topRated: boolean;
    description: string;
    recentWork: string[];
}

const CompanyTalentBankView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState<string>('all');
    const [skillFilter, setSkillFilter] = useState<string>('all');
    const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
    const [rateFilter, setRateFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('rating');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedTalent, setSelectedTalent] = useState<string | null>(null);

    // Mock data
    const mockTalents: TalentProfile[] = [
        {
            id: '1',
            name: 'Ana Carolina Silva',
            title: 'Diretora de Fotografia',
            avatar: '/api/placeholder/100/100',
            location: 'São Paulo, SP',
            rating: 4.9,
            reviewCount: 127,
            hourlyRate: 150,
            availability: 'available',
            skills: ['Fotografia', 'Edição', 'Lightroom', 'Photoshop', 'Direção de Arte'],
            specialties: ['Fotografia Corporativa', 'Eventos', 'Produtos', 'Retratos'],
            experience: 8,
            completedProjects: 234,
            responseTime: '2 horas',
            languages: ['Português', 'Inglês', 'Espanhol'],
            education: 'Bacharelado em Fotografia - SENAC',
            portfolio: { images: 450, videos: 12, projects: 89 },
            lastActive: '2024-01-20',
            verified: true,
            topRated: true,
            description: 'Especialista em fotografia corporativa e eventos com mais de 8 anos de experiência. Trabalho com as principais marcas do mercado brasileiro.',
            recentWork: ['Campanha Banco XYZ', 'Evento Tech Summit 2024', 'Catálogo Fashion Week']
        },
        {
            id: '2',
            name: 'Carlos Eduardo Santos',
            title: 'Editor de Vídeo Senior',
            avatar: '/api/placeholder/100/100',
            location: 'Rio de Janeiro, RJ',
            rating: 4.8,
            reviewCount: 89,
            hourlyRate: 120,
            availability: 'busy',
            skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Graphics', 'Color Grading'],
            specialties: ['Documentários', 'Comerciais', 'Vídeos Corporativos', 'Motion Graphics'],
            experience: 6,
            completedProjects: 156,
            responseTime: '4 horas',
            languages: ['Português', 'Inglês'],
            education: 'Tecnólogo em Produção Audiovisual - UNESA',
            portfolio: { images: 23, videos: 178, projects: 67 },
            lastActive: '2024-01-19',
            verified: true,
            topRated: false,
            description: 'Editor especializado em conteúdo corporativo e documentários. Experiência com grandes produções e prazos apertados.',
            recentWork: ['Documentário Empresa ABC', 'Comercial TV Globo', 'Série Web Netflix']
        },
        {
            id: '3',
            name: 'Marina Oliveira Costa',
            title: 'Designer Gráfica & UI/UX',
            avatar: '/api/placeholder/100/100',
            location: 'Belo Horizonte, MG',
            rating: 4.7,
            reviewCount: 203,
            hourlyRate: 85,
            availability: 'available',
            skills: ['Figma', 'Adobe Creative Suite', 'Sketch', 'Prototyping', 'Branding'],
            specialties: ['Identidade Visual', 'UI/UX Design', 'Design Digital', 'Branding'],
            experience: 5,
            completedProjects: 189,
            responseTime: '1 hora',
            languages: ['Português', 'Inglês'],
            education: 'Design Gráfico - UFMG',
            portfolio: { images: 312, videos: 8, projects: 145 },
            lastActive: '2024-01-20',
            verified: true,
            topRated: true,
            description: 'Designer com foco em identidade visual e experiência do usuário. Trabalho com startups e grandes corporações.',
            recentWork: ['Rebranding TechStart', 'App Mobile Banking', 'Site E-commerce Fashion']
        },
        {
            id: '4',
            name: 'Roberto Lima Ferreira',
            title: 'Produtor Audiovisual',
            avatar: '/api/placeholder/100/100',
            location: 'Brasília, DF',
            rating: 4.6,
            reviewCount: 67,
            hourlyRate: 200,
            availability: 'available',
            skills: ['Produção', 'Direção', 'Roteiro', 'Gestão de Equipe', 'Orçamento'],
            specialties: ['Documentários', 'Institucionais', 'Eventos', 'Comerciais'],
            experience: 12,
            completedProjects: 98,
            responseTime: '6 horas',
            languages: ['Português', 'Inglês', 'Francês'],
            education: 'Cinema e Audiovisual - UnB',
            portfolio: { images: 45, videos: 89, projects: 34 },
            lastActive: '2024-01-18',
            verified: true,
            topRated: false,
            description: 'Produtor experiente com histórico em grandes produções institucionais e documentários premiados.',
            recentWork: ['Documentário Governo Federal', 'Institucional Petrobras', 'Evento Congresso Nacional']
        },
        {
            id: '5',
            name: 'Juliana Mendes Rocha',
            title: 'Social Media Manager',
            avatar: '/api/placeholder/100/100',
            location: 'Curitiba, PR',
            rating: 4.9,
            reviewCount: 145,
            hourlyRate: 75,
            availability: 'unavailable',
            skills: ['Social Media', 'Copywriting', 'Analytics', 'Ads Manager', 'Canva'],
            specialties: ['Instagram', 'LinkedIn', 'TikTok', 'Facebook Ads', 'Google Ads'],
            experience: 4,
            completedProjects: 267,
            responseTime: '30 minutos',
            languages: ['Português', 'Inglês'],
            education: 'Marketing Digital - PUCPR',
            portfolio: { images: 890, videos: 234, projects: 178 },
            lastActive: '2024-01-15',
            verified: true,
            topRated: true,
            description: 'Especialista em redes sociais com foco em crescimento orgânico e campanhas pagas. Resultados comprovados.',
            recentWork: ['Campanha Black Friday', 'Lançamento Produto Tech', 'Crescimento Startup Food']
        },
        {
            id: '6',
            name: 'Pedro Almeida Souza',
            title: 'Desenvolvedor Full Stack',
            avatar: '/api/placeholder/100/100',
            location: 'Florianópolis, SC',
            rating: 4.8,
            reviewCount: 92,
            hourlyRate: 110,
            availability: 'available',
            skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'PostgreSQL'],
            specialties: ['Web Development', 'APIs', 'E-commerce', 'SaaS'],
            experience: 7,
            completedProjects: 134,
            responseTime: '3 horas',
            languages: ['Português', 'Inglês'],
            education: 'Ciência da Computação - UFSC',
            portfolio: { images: 12, videos: 5, projects: 89 },
            lastActive: '2024-01-20',
            verified: true,
            topRated: false,
            description: 'Desenvolvedor full stack especializado em soluções web escaláveis e e-commerce de alta performance.',
            recentWork: ['Plataforma E-learning', 'E-commerce Fashion', 'Sistema ERP']
        }
    ];

    const getAvailabilityColor = (availability: string) => {
        switch (availability) {
            case 'available': return 'bg-green-100 text-green-800';
            case 'busy': return 'bg-yellow-100 text-yellow-800';
            case 'unavailable': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getSpecialtyIcon = (specialty: string) => {
        if (specialty.toLowerCase().includes('foto')) return <Camera className="w-4 h-4" />;
        if (specialty.toLowerCase().includes('video') || specialty.toLowerCase().includes('editor')) return <Video className="w-4 h-4" />;
        if (specialty.toLowerCase().includes('audio') || specialty.toLowerCase().includes('som')) return <Mic className="w-4 h-4" />;
        if (specialty.toLowerCase().includes('design') || specialty.toLowerCase().includes('gráf')) return <Palette className="w-4 h-4" />;
        if (specialty.toLowerCase().includes('dev') || specialty.toLowerCase().includes('program')) return <Code className="w-4 h-4" />;
        if (specialty.toLowerCase().includes('social') || specialty.toLowerCase().includes('marketing')) return <Megaphone className="w-4 h-4" />;
        return <Briefcase className="w-4 h-4" />;
    };

    const filteredTalents = mockTalents.filter(talent => {
        const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesLocation = locationFilter === 'all' || talent.location.includes(locationFilter);
        const matchesSkill = skillFilter === 'all' || talent.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
        const matchesAvailability = availabilityFilter === 'all' || talent.availability === availabilityFilter;
        const matchesRate = rateFilter === 'all' || 
            (rateFilter === 'low' && talent.hourlyRate < 100) ||
            (rateFilter === 'medium' && talent.hourlyRate >= 100 && talent.hourlyRate < 150) ||
            (rateFilter === 'high' && talent.hourlyRate >= 150);
        
        return matchesSearch && matchesLocation && matchesSkill && matchesAvailability && matchesRate;
    });

    const sortedTalents = [...filteredTalents].sort((a, b) => {
        switch (sortBy) {
            case 'rating': return b.rating - a.rating;
            case 'rate': return a.hourlyRate - b.hourlyRate;
            case 'experience': return b.experience - a.experience;
            case 'projects': return b.completedProjects - a.completedProjects;
            default: return 0;
        }
    });

    const stats = {
        total: mockTalents.length,
        available: mockTalents.filter(t => t.availability === 'available').length,
        topRated: mockTalents.filter(t => t.topRated).length,
        verified: mockTalents.filter(t => t.verified).length,
        avgRate: Math.round(mockTalents.reduce((sum, t) => sum + t.hourlyRate, 0) / mockTalents.length),
        avgRating: (mockTalents.reduce((sum, t) => sum + t.rating, 0) / mockTalents.length).toFixed(1)
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Banco de Talentos</h1>
                        <p className="text-gray-600 mt-1">Encontre e contrate os melhores profissionais</p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                viewMode === 'grid' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Grade
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                viewMode === 'list' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Lista
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">{stats.available}</div>
                    <div className="text-sm text-gray-600">Disponíveis</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-yellow-600">{stats.topRated}</div>
                    <div className="text-sm text-gray-600">Top Rated</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.verified}</div>
                    <div className="text-sm text-gray-600">Verificados</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">R$ {stats.avgRate}</div>
                    <div className="text-sm text-gray-600">Valor/Hora Médio</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.avgRating}</div>
                    <div className="text-sm text-gray-600">Avaliação Média</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar por nome, título ou habilidade..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todas as Localizações</option>
                            <option value="São Paulo">São Paulo</option>
                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                            <option value="Belo Horizonte">Belo Horizonte</option>
                            <option value="Brasília">Brasília</option>
                            <option value="Curitiba">Curitiba</option>
                            <option value="Florianópolis">Florianópolis</option>
                        </select>

                        <select
                            value={skillFilter}
                            onChange={(e) => setSkillFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todas as Habilidades</option>
                            <option value="fotografia">Fotografia</option>
                            <option value="video">Vídeo</option>
                            <option value="design">Design</option>
                            <option value="desenvolvimento">Desenvolvimento</option>
                            <option value="marketing">Marketing</option>
                        </select>

                        <select
                            value={availabilityFilter}
                            onChange={(e) => setAvailabilityFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todas as Disponibilidades</option>
                            <option value="available">Disponível</option>
                            <option value="busy">Ocupado</option>
                            <option value="unavailable">Indisponível</option>
                        </select>

                        <select
                            value={rateFilter}
                            onChange={(e) => setRateFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todas as Faixas</option>
                            <option value="low">Até R$ 100/h</option>
                            <option value="medium">R$ 100-150/h</option>
                            <option value="high">Acima de R$ 150/h</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="rating">Melhor Avaliação</option>
                            <option value="rate">Menor Preço</option>
                            <option value="experience">Mais Experiência</option>
                            <option value="projects">Mais Projetos</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Talents Grid */}
            {viewMode === 'grid' && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {sortedTalents.map((talent) => (
                        <div key={talent.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            {/* Profile Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-gray-400" />
                                    </div>
                                    {talent.verified && (
                                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                                            <CheckCircle className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate">{talent.name}</h3>
                                        {talent.topRated && (
                                            <div className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium">
                                                Top Rated
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{talent.title}</p>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <MapPin className="w-3 h-3" />
                                        {talent.location}
                                    </div>
                                </div>
                            </div>

                            {/* Rating and Rate */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="font-medium">{talent.rating}</span>
                                    <span className="text-sm text-gray-500">({talent.reviewCount})</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-gray-900">R$ {talent.hourlyRate}/h</div>
                                    <div className="text-xs text-gray-500">Responde em {talent.responseTime}</div>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="mb-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(talent.availability)}`}>
                                    {talent.availability === 'available' && 'Disponível'}
                                    {talent.availability === 'busy' && 'Ocupado'}
                                    {talent.availability === 'unavailable' && 'Indisponível'}
                                </span>
                            </div>

                            {/* Skills */}
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-1">
                                    {talent.skills.slice(0, 3).map((skill, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                            {skill}
                                        </span>
                                    ))}
                                    {talent.skills.length > 3 && (
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                            +{talent.skills.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                <div>
                                    <div className="text-gray-600">Experiência</div>
                                    <div className="font-medium">{talent.experience} anos</div>
                                </div>
                                <div>
                                    <div className="text-gray-600">Projetos</div>
                                    <div className="font-medium">{talent.completedProjects}</div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setSelectedTalent(talent.id)}
                                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    Ver Perfil
                                </button>
                                <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                                    <Heart className="w-4 h-4" />
                                </button>
                                <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                                    <MessageSquare className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Talents List */}
            {viewMode === 'list' && (
                <div className="space-y-4">
                    {sortedTalents.map((talent) => (
                        <div key={talent.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-6">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-gray-400" />
                                    </div>
                                    {talent.verified && (
                                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                                            <CheckCircle className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{talent.name}</h3>
                                        {talent.topRated && (
                                            <div className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium">
                                                Top Rated
                                            </div>
                                        )}
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(talent.availability)}`}>
                                            {talent.availability === 'available' && 'Disponível'}
                                            {talent.availability === 'busy' && 'Ocupado'}
                                            {talent.availability === 'unavailable' && 'Indisponível'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-2">{talent.title}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {talent.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            {talent.rating} ({talent.reviewCount})
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="w-3 h-3" />
                                            {talent.completedProjects} projetos
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {talent.experience} anos
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {talent.skills.slice(0, 5).map((skill, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                {skill}
                                            </span>
                                        ))}
                                        {talent.skills.length > 5 && (
                                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                +{talent.skills.length - 5}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Rate and Actions */}
                                <div className="flex-shrink-0 text-right">
                                    <div className="text-xl font-bold text-gray-900 mb-1">R$ {talent.hourlyRate}/h</div>
                                    <div className="text-xs text-gray-500 mb-4">Responde em {talent.responseTime}</div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setSelectedTalent(talent.id)}
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            Ver Perfil
                                        </button>
                                        <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Talent Detail Modal */}
            {selectedTalent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {(() => {
                            const talent = mockTalents.find(t => t.id === selectedTalent);
                            if (!talent) return null;

                            return (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-semibold">Perfil do Talento</h3>
                                        <button 
                                            onClick={() => setSelectedTalent(null)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {/* Left Column */}
                                        <div className="md:col-span-1">
                                            <div className="text-center mb-6">
                                                <div className="relative inline-block">
                                                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <User className="w-12 h-12 text-gray-400" />
                                                    </div>
                                                    {talent.verified && (
                                                        <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                                                            <CheckCircle className="w-4 h-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="text-xl font-semibold mb-1">{talent.name}</h4>
                                                <p className="text-gray-600 mb-2">{talent.title}</p>
                                                <div className="flex items-center justify-center gap-1 mb-4">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="font-medium">{talent.rating}</span>
                                                    <span className="text-sm text-gray-500">({talent.reviewCount} avaliações)</span>
                                                </div>
                                                <div className="text-2xl font-bold text-gray-900 mb-2">R$ {talent.hourlyRate}/h</div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(talent.availability)}`}>
                                                    {talent.availability === 'available' && 'Disponível'}
                                                    {talent.availability === 'busy' && 'Ocupado'}
                                                    {talent.availability === 'unavailable' && 'Indisponível'}
                                                </span>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <h5 className="font-medium mb-2">Contato</h5>
                                                    <div className="space-y-2">
                                                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                                            <MessageSquare className="w-4 h-4" />
                                                            Enviar Mensagem
                                                        </button>
                                                        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                                                            <Phone className="w-4 h-4" />
                                                            Ligar
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h5 className="font-medium mb-2">Localização</h5>
                                                    <p className="text-sm text-gray-600">{talent.location}</p>
                                                </div>

                                                <div>
                                                    <h5 className="font-medium mb-2">Idiomas</h5>
                                                    <div className="flex flex-wrap gap-1">
                                                        {talent.languages.map((lang, index) => (
                                                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                                {lang}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="md:col-span-2">
                                            <div className="space-y-6">
                                                <div>
                                                    <h5 className="font-medium mb-3">Sobre</h5>
                                                    <p className="text-gray-600">{talent.description}</p>
                                                </div>

                                                <div>
                                                    <h5 className="font-medium mb-3">Habilidades</h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {talent.skills.map((skill, index) => (
                                                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h5 className="font-medium mb-3">Especialidades</h5>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {talent.specialties.map((specialty, index) => (
                                                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                                                {getSpecialtyIcon(specialty)}
                                                                {specialty}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <h5 className="font-medium mb-3">Estatísticas</h5>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Experiência:</span>
                                                                <span>{talent.experience} anos</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Projetos concluídos:</span>
                                                                <span>{talent.completedProjects}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Tempo de resposta:</span>
                                                                <span>{talent.responseTime}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Última atividade:</span>
                                                                <span>{new Date(talent.lastActive).toLocaleDateString('pt-BR')}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h5 className="font-medium mb-3">Portfólio</h5>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Imagens:</span>
                                                                <span>{talent.portfolio.images}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Vídeos:</span>
                                                                <span>{talent.portfolio.videos}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Projetos:</span>
                                                                <span>{talent.portfolio.projects}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h5 className="font-medium mb-3">Trabalhos Recentes</h5>
                                                    <div className="space-y-2">
                                                        {talent.recentWork.map((work, index) => (
                                                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                                {work}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h5 className="font-medium mb-3">Formação</h5>
                                                    <p className="text-sm text-gray-600">{talent.education}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {sortedTalents.length === 0 && (
                <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum talento encontrado</h3>
                    <p className="text-gray-600">Tente ajustar os filtros para encontrar mais profissionais.</p>
                </div>
            )}
        </div>
    );
};

export default CompanyTalentBankView;