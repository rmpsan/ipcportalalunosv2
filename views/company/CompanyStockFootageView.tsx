import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Play, 
    Download, 
    ShoppingCart, 
    Star, 
    Clock, 
    Eye,
    Grid3X3,
    List,
    SlidersHorizontal,
    Tag,
    DollarSign,
    Heart,
    Share2
} from 'lucide-react';

interface StockFootageItem {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: number;
    resolution: string;
    price: number;
    license: 'standard' | 'extended' | 'exclusive';
    tags: string[];
    previewUrl: string;
    thumbnailUrl: string;
    downloads: number;
    rating: number;
    creator: string;
}

const CompanyStockFootageView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [cart, setCart] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    // Mock data
    const stockFootage: StockFootageItem[] = [
        {
            id: '1',
            title: 'Drone Shot - Cidade de São Paulo',
            description: 'Vista aérea impressionante da cidade de São Paulo durante o pôr do sol',
            category: 'Aéreo',
            duration: 45,
            resolution: '4K',
            price: 299,
            license: 'standard',
            tags: ['drone', 'cidade', 'aéreo', 'são paulo', 'pôr do sol'],
            previewUrl: '/preview1.mp4',
            thumbnailUrl: '/thumb1.jpg',
            downloads: 1247,
            rating: 4.8,
            creator: 'João Silva'
        },
        {
            id: '2',
            title: 'Time-lapse - Trânsito Noturno',
            description: 'Time-lapse do trânsito noturno em avenida movimentada',
            category: 'Time-lapse',
            duration: 30,
            resolution: '4K',
            price: 199,
            license: 'standard',
            tags: ['time-lapse', 'trânsito', 'noite', 'carros', 'luzes'],
            previewUrl: '/preview2.mp4',
            thumbnailUrl: '/thumb2.jpg',
            downloads: 892,
            rating: 4.6,
            creator: 'Maria Santos'
        },
        {
            id: '3',
            title: 'Natureza - Cachoeira',
            description: 'Cachoeira cristalina em meio à mata atlântica',
            category: 'Natureza',
            duration: 60,
            resolution: '4K',
            price: 349,
            license: 'extended',
            tags: ['natureza', 'cachoeira', 'água', 'mata', 'verde'],
            previewUrl: '/preview3.mp4',
            thumbnailUrl: '/thumb3.jpg',
            downloads: 567,
            rating: 4.9,
            creator: 'Pedro Costa'
        },
        {
            id: '4',
            title: 'Corporativo - Reunião',
            description: 'Equipe em reunião de negócios em escritório moderno',
            category: 'Corporativo',
            duration: 25,
            resolution: '4K',
            price: 249,
            license: 'standard',
            tags: ['corporativo', 'reunião', 'negócios', 'escritório', 'equipe'],
            previewUrl: '/preview4.mp4',
            thumbnailUrl: '/thumb4.jpg',
            downloads: 1034,
            rating: 4.7,
            creator: 'Ana Lima'
        }
    ];

    const categories = ['all', 'Aéreo', 'Time-lapse', 'Natureza', 'Corporativo', 'Tecnologia', 'Lifestyle'];

    const filteredFootage = stockFootage.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
        
        return matchesSearch && matchesCategory && matchesPrice;
    });

    const addToCart = (id: string) => {
        if (!cart.includes(id)) {
            setCart([...cart, id]);
        }
    };

    const removeFromCart = (id: string) => {
        setCart(cart.filter(item => item !== id));
    };

    const toggleFavorite = (id: string) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(item => item !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getTotalCartValue = () => {
        return cart.reduce((total, id) => {
            const item = stockFootage.find(footage => footage.id === id);
            return total + (item?.price || 0);
        }, 0);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Stock Footage</h1>
                    <p className="text-gray-600">Catálogo completo de vídeos profissionais</p>
                </div>
                
                {cart.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-blue-900">
                                    {cart.length} item(s) no carrinho
                                </span>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-blue-900">
                                    R$ {getTotalCartValue().toLocaleString()}
                                </div>
                                <button className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors">
                                    Finalizar Compra
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar por título, tags ou categoria..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'Todas as Categorias' : category}
                            </option>
                        ))}
                    </select>

                    {/* View Mode Toggle */}
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Grid3X3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Advanced Filters Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        Filtros
                    </button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Faixa de Preço
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-gray-600">
                    {filteredFootage.length} vídeo(s) encontrado(s)
                </p>
            </div>

            {/* Stock Footage Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                {filteredFootage.map(item => (
                    <div key={item.id} className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}>
                        {/* Thumbnail */}
                        <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'} bg-gray-100`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white ml-1" />
                                </div>
                            </div>
                            
                            {/* Duration Badge */}
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                <Clock className="w-3 h-3 inline mr-1" />
                                {formatDuration(item.duration)}
                            </div>

                            {/* Resolution Badge */}
                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                {item.resolution}
                            </div>

                            {/* Favorite Button */}
                            <button
                                onClick={() => toggleFavorite(item.id)}
                                className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-all"
                            >
                                <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                                    {item.title}
                                </h3>
                            </div>

                            <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                                {item.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                                {item.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                                {item.tags.length > 3 && (
                                    <span className="text-xs text-gray-500">+{item.tags.length - 3}</span>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                <div className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {item.downloads}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500" />
                                    {item.rating}
                                </div>
                            </div>

                            {/* Price and Actions */}
                            <div className="flex items-center justify-between">
                                <div className="text-lg font-bold text-blue-600">
                                    R$ {item.price}
                                </div>
                                
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                    
                                    {cart.includes(item.id) ? (
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition-colors"
                                        >
                                            Remover
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => addToCart(item.id)}
                                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                        >
                                            Adicionar
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* License Info */}
                            <div className="mt-2 text-xs text-gray-500">
                                Licença: {item.license === 'standard' ? 'Padrão' : item.license === 'extended' ? 'Estendida' : 'Exclusiva'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredFootage.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhum vídeo encontrado
                    </h3>
                    <p className="text-gray-600">
                        Tente ajustar os filtros ou termos de busca
                    </p>
                </div>
            )}
        </div>
    );
};

export default CompanyStockFootageView;