import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    MapPin, 
    Star, 
    Briefcase, 
    GraduationCap, 
    Calendar, 
    DollarSign, 
    Eye, 
    Heart, 
    MessageCircle, 
    Send, 
    User, 
    Award, 
    Clock, 
    TrendingUp,
    Users,
    CheckCircle,
    Camera,
    Video,
    Palette,
    Music,
    Mic,
    Edit,
    Monitor,
    Headphones,
    Film,
    Zap
} from 'lucide-react';

interface TalentProfile {
    id: string;
    name: string;
    title: string;
    avatar?: string;
    location: string;
    experience: number;
    rating: number;
    reviewCount: number;
    hourlyRate?: number;
    projectRate?: number;
    skills: string[];
    specialties: string[];
    portfolio: {
        id: string;
        title: string;
        thumbnail: string;
        type: 'video' | 'image' | 'audio';
    }[];
    availability: 'available' | 'busy' | 'unavailable';
    responseTime: string;
    completedProjects: number;
    languages: string[];
    education?: string;
    certifications: string[];
    description: string;
    lastActive: string;
    verified: boolean;
    featured: boolean;
}

const CompanyTalentSearchView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('all');
    const [experienceFilter, setExperienceFilter] = useState('all');
    const [availabilityFilter, setAvailabilityFilter] = useState('all');
    const [skillsFilter, setSkillsFilter] = useState<string[]>([]);
    const [rateFilter, setRateFilter] = useState({ min: 0, max: 1000 });
    const [sortBy, setSortBy] = useState('relevance');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(null);
    const [showContactModal, setShowContactModal] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);

    // Mock data
    const talents: TalentProfile[] = [
        {
            id: '1',
            name: 'Ana Silva',
            title: 'Editora de Vídeo Sênior',
            location: 'São Paulo, SP',
            experience: 5,
            rating: 4.9,
            reviewCount: 47,
            hourlyRate: 85,
            projectRate: 2500,
            skills: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Graphics'],
            specialties: ['Edição Publicitária', 'Correção de Cor', 'Motion Graphics'],
            portfolio: [
                { id: '1', title: 'Campanha Nike 2024', thumbnail: '/api/placeholder/300/200', type: 'video' },
                { id: '2', title: 'Institucional Banco', thumbnail: '/api/placeholder/300/200', type: 'video' },
                { id: '3', title: 'Motion Graphics', thumbnail: '/api/placeholder/300/200', type: 'video' }
            ],
            availability: 'available',
            responseTime: '2 horas',
            completedProjects: 156,
            languages: ['Português', 'Inglês', 'Espanhol'],
            education: 'Comunicação Social - USP',
            certifications: ['Adobe Certified Expert', 'DaVinci Resolve Certified'],
            description: 'Editora de vídeo com mais de 5 anos de experiência em projetos publicitários e corporativos. Especialista em motion graphics e correção de cor.',
            lastActive: '2024-01-20',
            verified: true,
            featured: true
        },
        {
            id: '2',
            name: 'Carlos Mendes',
            title: 'Cinegrafista e Diretor de Fotografia',
            location: 'Rio de Janeiro, RJ',
            experience: 8,
            rating: 4.8,
            reviewCount: 32,
            hourlyRate: 120,
            projectRate: 4000,
            skills: ['Cinematografia', 'Iluminação', 'Câmeras RED', 'Steadicam'],
            specialties: ['Direção de Fotografia', 'Documentários', 'Publicidade'],
            portfolio: [
                { id: '4', title: 'Documentário Netflix', thumbnail: '/api/placeholder/300/200', type: 'video' },
                { id: '5', title: 'Comercial Coca-Cola', thumbnail: '/api/placeholder/300/200', type: 'video' }
            ],
            availability: 'busy',
            responseTime: '4 horas',
            completedProjects: 89,
            languages: ['Português', 'Inglês'],
            education: 'Cinema - FAAP',
            certifications: ['RED Camera Certified', 'Steadicam Operator'],
            description: 'Diretor de fotografia com vasta experiência em documentários e publicidade. Especialista em câmeras RED e operação de Steadicam.',
            lastActive: '2024-01-19',
            verified: true,
            featured: false
        },
        {
            id: '3',
            name: 'Mariana Costa',
            title: 'Designer Gráfico e Motion Designer',
            location: 'Belo Horizonte, MG',
            experience: 4,
            rating: 4.7,
            reviewCount: 28,
            hourlyRate: 65,
            projectRate: 1800,
            skills: ['After Effects', 'Cinema 4D', 'Illustrator', 'Photoshop'],
            specialties: ['Motion Graphics', 'Animação 2D', 'Identidade Visual'],
            portfolio: [
                { id: '6', title: 'Animação Corporativa', thumbnail: '/api/placeholder/300/200', type: 'video' },
                { id: '7', title: 'Logo Animado', thumbnail: '/api/placeholder/300/200', type: 'video' }
            ],
            availability: 'available',
            responseTime: '1 hora',
            completedProjects: 73,
            languages: ['Português', 'Inglês'],
            education: 'Design Gráfico - UFMG',
            certifications: ['Adobe Certified Expert'],
            description: 'Motion designer especializada em animações corporativas e identidade visual. Experiência com projetos para grandes marcas.',
            lastActive: '2024-01-20',
            verified: true,
            featured: false
        },
        {
            id: '4',
            name: 'Pedro Santos',
            title: 'Técnico de Som e Áudio',
            location: 'Porto Alegre, RS',
            experience: 6,
            rating: 4.6,
            reviewCount: 19,
            hourlyRate: 75,
            projectRate: 2200,
            skills: ['Pro Tools', 'Logic Pro', 'Mixagem', 'Masterização'],
            specialties: ['Pós-produção de Áudio', 'Sound Design', 'Trilha Sonora'],
            portfolio: [
                { id: '8', title: 'Trilha Documentário', thumbnail: '/api/placeholder/300/200', type: 'audio' },
                { id: '9', title: 'Sound Design Comercial', thumbnail: '/api/placeholder/300/200', type: 'audio' }
            ],
            availability: 'available',
            responseTime: '3 horas',
            completedProjects: 45,
            languages: ['Português'],
            education: 'Engenharia de Som - UFRGS',
            certifications: ['Pro Tools Certified', 'Dolby Atmos Certified'],
            description: 'Técnico de som especializado em pós-produção de áudio para cinema e TV. Experiência com sound design e trilhas sonoras.',
            lastActive: '2024-01-18',
            verified: false,
            featured: false
        }
    ];

    const skillOptions = [
        'Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro',
        'Cinema 4D', 'Blender', 'Maya', 'Photoshop', 'Illustrator',
        'Pro Tools', 'Logic Pro', 'Ableton Live', 'Cinematografia',
        'Iluminação', 'Motion Graphics', 'Sound Design', 'Correção de Cor'
    ];

    const getAvailabilityColor = (availability: string) => {
        switch (availability) {
            case 'available': return 'bg-green-100 text-green-800';
            case 'busy': return 'bg-yellow-100 text-yellow-800';
            case 'unavailable': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getAvailabilityLabel = (availability: string) => {
        switch (availability) {
            case 'available': return 'Disponível';
            case 'busy': return 'Ocupado';
            case 'unavailable': return 'Indisponível';
            default: return availability;
        }
    };

    const getSkillIcon = (skill: string) => {
        if (skill.includes('Premiere') || skill.includes('Final Cut')) return <Video className="w-4 h-4" />;
        if (skill.includes('After Effects') || skill.includes('Motion')) return <Zap className="w-4 h-4" />;
        if (skill.includes('Photoshop') || skill.includes('Illustrator')) return <Palette className="w-4 h-4" />;
        if (skill.includes('Pro Tools') || skill.includes('Logic') || skill.includes('Sound')) return <Headphones className="w-4 h-4" />;
        if (skill.includes('Cinema 4D') || skill.includes('Blender')) return <Monitor className="w-4 h-4" />;
        if (skill.includes('Cinematografia') || skill.includes('Câmera')) return <Camera className="w-4 h-4" />;
        return <Award className="w-4 h-4" />;
    };

    const filteredTalents = talents.filter(talent => {
        const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesLocation = locationFilter === 'all' || talent.location.includes(locationFilter);
        const matchesExperience = experienceFilter === 'all' || 
                                (experienceFilter === 'junior' && talent.experience <= 2) ||
                                (experienceFilter === 'pleno' && talent.experience > 2 && talent.experience <= 5) ||
                                (experienceFilter === 'senior' && talent.experience > 5);
        
        const matchesAvailability = availabilityFilter === 'all' || talent.availability === availabilityFilter;
        
        const matchesSkills = skillsFilter.length === 0 || 
                            skillsFilter.some(skill => talent.skills.includes(skill));
        
        const matchesRate = !talent.hourlyRate || 
                          (talent.hourlyRate >= rateFilter.min && talent.hourlyRate <= rateFilter.max);
        
        return matchesSearch && matchesLocation && matchesExperience && 
               matchesAvailability && matchesSkills && matchesRate;
    });

    const sortedTalents = [...filteredTalents].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'experience':
                return b.experience - a.experience;
            case 'rate_low':
                return (a.hourlyRate || 0) - (b.hourlyRate || 0);
            case 'rate_high':
                return (b.hourlyRate || 0) - (a.hourlyRate || 0);
            case 'recent':
                return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
            default:
                return b.featured ? 1 : -1;
        }
    });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const toggleFavorite = (talentId: string) => {
        setFavorites(prev => 
            prev.includes(talentId) 
                ? prev.filter(id => id !== talentId)
                : [...prev, talentId]
        );
    };

    const toggleSkillFilter = (skill: string) => {
        setSkillsFilter(prev => 
            prev.includes(skill)
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        );
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Busca de Talentos</h1>
                    <p className="text-gray-600">Encontre profissionais qualificados para seus projetos</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                            <div className="bg-current rounded-sm"></div>
                            <div className="bg-current rounded-sm"></div>
                            <div className="bg-current rounded-sm"></div>
                            <div className="bg-current rounded-sm"></div>
                        </div>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <div className="w-4 h-4 space-y-1">
                            <div className="h-0.5 bg-current rounded"></div>
                            <div className="h-0.5 bg-current rounded"></div>
                            <div className="h-0.5 bg-current rounded"></div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, especialidade ou habilidade..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Todas as Localizações</option>
                        <option value="São Paulo">São Paulo</option>
                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                        <option value="Belo Horizonte">Belo Horizonte</option>
                        <option value="Porto Alegre">Porto Alegre</option>
                    </select>

                    <select
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Toda Experiência</option>
                        <option value="junior">Júnior (0-2 anos)</option>
                        <option value="pleno">Pleno (3-5 anos)</option>
                        <option value="senior">Sênior (5+ anos)</option>
                    </select>

                    <select
                        value={availabilityFilter}
                        onChange={(e) => setAvailabilityFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Toda Disponibilidade</option>
                        <option value="available">Disponível</option>
                        <option value="busy">Ocupado</option>
                        <option value="unavailable">Indisponível</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="relevance">Mais Relevantes</option>
                        <option value="rating">Melhor Avaliação</option>
                        <option value="experience">Mais Experientes</option>
                        <option value="rate_low">Menor Valor</option>
                        <option value="rate_high">Maior Valor</option>
                        <option value="recent">Mais Ativos</option>
                    </select>

                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min R$"
                            value={rateFilter.min || ''}
                            onChange={(e) => setRateFilter(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                            className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            placeholder="Max R$"
                            value={rateFilter.max || ''}
                            onChange={(e) => setRateFilter(prev => ({ ...prev, max: Number(e.target.value) || 1000 }))}
                            className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                </div>

                {/* Skills Filter */}
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Habilidades:</p>
                    <div className="flex flex-wrap gap-2">
                        {skillOptions.map(skill => (
                            <button
                                key={skill}
                                onClick={() => toggleSkillFilter(skill)}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                                    skillsFilter.includes(skill)
                                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {getSkillIcon(skill)}
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-gray-600">
                    {sortedTalents.length} profissionais encontrados
                </p>
                
                {skillsFilter.length > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Filtros ativos:</span>
                        {skillsFilter.map(skill => (
                            <span
                                key={skill}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                                {skill}
                                <button
                                    onClick={() => toggleSkillFilter(skill)}
                                    className="hover:bg-blue-200 rounded-full p-0.5"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Talents Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                {sortedTalents.map(talent => (
                    <div
                        key={talent.id}
                        className={`bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow ${
                            viewMode === 'list' ? 'p-6' : 'p-4'
                        }`}
                    >
                        {viewMode === 'grid' ? (
                            // Grid View
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-lg font-semibold text-blue-600">
                                                {talent.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900">{talent.name}</h3>
                                                {talent.verified && (
                                                    <CheckCircle className="w-4 h-4 text-blue-500" />
                                                )}
                                                {talent.featured && (
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600">{talent.title}</p>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => toggleFavorite(talent.id)}
                                        className={`p-2 rounded-full transition-colors ${
                                            favorites.includes(talent.id)
                                                ? 'text-red-500 bg-red-50'
                                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                        }`}
                                    >
                                        <Heart className={`w-4 h-4 ${favorites.includes(talent.id) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                {/* Location and Availability */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        {talent.location}
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(talent.availability)}`}>
                                        {getAvailabilityLabel(talent.availability)}
                                    </span>
                                </div>

                                {/* Rating and Experience */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="font-medium">{talent.rating}</span>
                                        <span className="text-gray-500 text-sm">({talent.reviewCount})</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <Briefcase className="w-4 h-4" />
                                        {talent.experience} anos
                                    </div>
                                </div>

                                {/* Rate */}
                                {talent.hourlyRate && (
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-gray-900">
                                            {formatCurrency(talent.hourlyRate)}/hora
                                        </p>
                                        {talent.projectRate && (
                                            <p className="text-sm text-gray-600">
                                                ou {formatCurrency(talent.projectRate)}/projeto
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Skills */}
                                <div>
                                    <div className="flex flex-wrap gap-1">
                                        {talent.skills.slice(0, 3).map(skill => (
                                            <span
                                                key={skill}
                                                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                            >
                                                {getSkillIcon(skill)}
                                                {skill}
                                            </span>
                                        ))}
                                        {talent.skills.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                +{talent.skills.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedTalent(talent)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Ver Perfil
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedTalent(talent);
                                            setShowContactModal(true);
                                        }}
                                        className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // List View
                            <div className="flex items-center gap-6">
                                {/* Avatar and Basic Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-xl font-semibold text-blue-600">
                                            {talent.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-semibold text-gray-900">{talent.name}</h3>
                                            {talent.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                                            {talent.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                                        </div>
                                        <p className="text-gray-600 mb-1">{talent.title}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {talent.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Briefcase className="w-3 h-3" />
                                                {talent.experience} anos
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                {talent.rating} ({talent.reviewCount})
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-1">
                                        {talent.skills.slice(0, 4).map(skill => (
                                            <span
                                                key={skill}
                                                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                            >
                                                {getSkillIcon(skill)}
                                                {skill}
                                            </span>
                                        ))}
                                        {talent.skills.length > 4 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                +{talent.skills.length - 4}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Rate and Availability */}
                                <div className="text-right">
                                    {talent.hourlyRate && (
                                        <p className="text-lg font-bold text-gray-900 mb-1">
                                            {formatCurrency(talent.hourlyRate)}/hora
                                        </p>
                                    )}
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(talent.availability)}`}>
                                        {getAvailabilityLabel(talent.availability)}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleFavorite(talent.id)}
                                        className={`p-2 rounded-full transition-colors ${
                                            favorites.includes(talent.id)
                                                ? 'text-red-500 bg-red-50'
                                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                        }`}
                                    >
                                        <Heart className={`w-4 h-4 ${favorites.includes(talent.id) ? 'fill-current' : ''}`} />
                                    </button>
                                    <button
                                        onClick={() => setSelectedTalent(talent)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Ver Perfil
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedTalent(talent);
                                            setShowContactModal(true);
                                        }}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Contratar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {sortedTalents.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhum talento encontrado
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Tente ajustar os filtros de busca para encontrar mais profissionais
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setLocationFilter('all');
                            setExperienceFilter('all');
                            setAvailabilityFilter('all');
                            setSkillsFilter([]);
                            setRateFilter({ min: 0, max: 1000 });
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Limpar Filtros
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompanyTalentSearchView;