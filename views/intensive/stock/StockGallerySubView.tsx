import React, { useState } from 'react';

const footage = [
    { id: 1, title: 'Drone sobre a cidade', author: 'Maria S.', price: 'R$ 50', img: 'https://picsum.photos/seed/stock1/500/300', category: 'Urbano', tags: ['drone', 'cidade', 'aéreo'], duration: '0:45', resolution: '4K', downloads: 234, type: 'video' },
    { id: 2, title: 'Café sendo servido', author: 'João P.', price: 'R$ 30', img: 'https://picsum.photos/seed/stock2/500/300', category: 'Pessoas', tags: ['café', 'bebida', 'close-up'], duration: '0:15', resolution: 'HD', downloads: 156, type: 'video' },
    { id: 3, title: 'Pessoas trabalhando', author: 'Ana L.', price: 'R$ 45', img: 'https://picsum.photos/seed/stock3/500/300', category: 'Pessoas', tags: ['trabalho', 'escritório', 'equipe'], duration: '1:20', resolution: '4K', downloads: 89, type: 'video' },
    { id: 4, title: 'Cachoeira em slow-motion', author: 'Pedro H.', price: 'R$ 60', img: 'https://picsum.photos/seed/stock4/500/300', category: 'Natureza', tags: ['cachoeira', 'água', 'slow-motion'], duration: '0:30', resolution: '4K', downloads: 312, type: 'video' },
    { id: 5, title: 'Luzes da cidade à noite', author: 'Carla M.', price: 'R$ 55', img: 'https://picsum.photos/seed/stock5/500/300', category: 'Urbano', tags: ['noite', 'luzes', 'cidade'], duration: '1:05', resolution: 'HD', downloads: 198, type: 'video' },
    { id: 6, title: 'Detalhe de teclado', author: 'Fernando G.', price: 'R$ 25', img: 'https://picsum.photos/seed/stock6/500/300', category: 'Tecnologia', tags: ['teclado', 'tecnologia', 'close-up'], duration: '0:20', resolution: 'HD', downloads: 67, type: 'video' },
    { id: 7, title: 'Pôr do sol na praia', author: 'Lucia R.', price: 'R$ 40', img: 'https://picsum.photos/seed/stock7/500/300', category: 'Natureza', tags: ['praia', 'pôr do sol', 'mar'], duration: '0:50', resolution: '4K', downloads: 445, type: 'video' },
    { id: 8, title: 'Tráfego urbano timelapse', author: 'Carlos D.', price: 'R$ 65', img: 'https://picsum.photos/seed/stock8/500/300', category: 'Urbano', tags: ['tráfego', 'timelapse', 'carros'], duration: '0:35', resolution: '4K', downloads: 278, type: 'video' },
    { id: 9, title: 'Arquitetura moderna', author: 'Sofia T.', price: 'R$ 35', img: 'https://picsum.photos/seed/photo1/500/300', category: 'Arquitetura', tags: ['arquitetura', 'moderno', 'prédio'], resolution: '4K', downloads: 189, type: 'photo' },
    { id: 10, title: 'Paisagem montanhosa', author: 'Ricardo M.', price: 'R$ 40', img: 'https://picsum.photos/seed/photo2/500/300', category: 'Natureza', tags: ['montanha', 'paisagem', 'céu'], resolution: '4K', downloads: 267, type: 'photo' },
    { id: 11, title: 'Retrato profissional', author: 'Amanda K.', price: 'R$ 45', img: 'https://picsum.photos/seed/photo3/500/300', category: 'Pessoas', tags: ['retrato', 'profissional', 'estúdio'], resolution: 'HD', downloads: 134, type: 'photo' },
    { id: 12, title: 'Tecnologia e inovação', author: 'Bruno L.', price: 'R$ 30', img: 'https://picsum.photos/seed/photo4/500/300', category: 'Tecnologia', tags: ['tecnologia', 'inovação', 'digital'], resolution: '4K', downloads: 98, type: 'photo' },
];

const LicenseModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    media: typeof footage[0] | null;
}> = ({ isOpen, onClose, media }) => {
    const [licenseType, setLicenseType] = useState('institutional');

    if (!isOpen || !media) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-gray-800">
                            Licenciar {media.type === 'photo' ? 'Foto' : 'Vídeo'}
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                    </div>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Media Preview */}
                    <div className="flex gap-4">
                        <div className="relative">
                            <img src={media.img} alt={media.title} className="w-32 h-20 object-cover rounded-lg" />
                            <div className="absolute top-1 left-1">
                                <span className={`px-1 py-0.5 text-xs font-semibold rounded ${
                                    media.type === 'photo' 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {media.type === 'photo' ? 'FOTO' : 'VÍDEO'}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg">{media.title}</h4>
                            <p className="text-gray-600">por {media.author}</p>
                            <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                {media.type === 'video' && media.duration && <span>{media.duration}</span>}
                                <span>{media.resolution}</span>
                                <span>{media.downloads} downloads</span>
                            </div>
                        </div>
                    </div>

                    {/* License Options */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Licenciamento para Uso Interno</h4>
                        
                        <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-green-700">Uso Institucional - IPC</span>
                                <span className="text-2xl font-bold text-green-600">GRATUITO</span>
                            </div>
                            <p className="text-sm text-gray-700">
                                Para uso exclusivo em projetos de alunos e clientes do instituto. Download direto no portal do aluno.
                            </p>
                            <div className="mt-3 text-xs text-green-600 font-medium">
                                ✓ Projetos de alunos do IPC<br/>
                                ✓ Projetos de edição para clientes do instituto<br/>
                                ✓ Uso educacional e institucional
                            </div>
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Detalhes do Projeto</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Projeto</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Ex: Projeto Final - Design Gráfico" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Projeto</label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                    <option>Projeto de Aluno</option>
                                    <option>Projeto de Cliente do Instituto</option>
                                    <option>Material Educacional</option>
                                    <option>Campanha Institucional</option>
                                    <option>Outros</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Uso</label>
                            <textarea 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                                placeholder={`Descreva como ${media.type === 'photo' ? 'a foto' : 'o vídeo'} será utilizado no projeto...`}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancelar
                    </button>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Baixar para Projeto
                    </button>
                </div>
            </div>
        </div>
    );
};

const StockGallerySubView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [sortBy, setSortBy] = useState('Mais Recentes');
    const [selectedMedia, setSelectedMedia] = useState<typeof footage[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = ['Todas', 'Natureza', 'Urbano', 'Pessoas', 'Tecnologia', 'Arquitetura'];

    const filteredFootage = footage.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'Mais Populares':
                return b.downloads - a.downloads;
            case 'Maior Preço':
                return parseInt(b.price.replace('R$ ', '')) - parseInt(a.price.replace('R$ ', ''));
            case 'Menor Preço':
                return parseInt(a.price.replace('R$ ', '')) - parseInt(b.price.replace('R$ ', ''));
            default:
                return 0;
        }
    });

    const handleLicense = (media: typeof footage[0]) => {
        setSelectedMedia(media);
        setIsModalOpen(true);
    };

    return (
        <div className="animate-[fadeInUp_0.4s_ease-out]">
            <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Galeria de Stock Footage</h2>
                <p className="text-gray-600">Explore e licencie fotos e vídeos criados pelos estudantes para seus projetos</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
                    <div className="relative w-full lg:w-1/2">
                        <input 
                            type="text" 
                            placeholder="Buscar por tema, autor, palavra-chave..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-lg py-3 pl-12 pr-4 w-full focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg py-3 px-4 focus:ring-teal-500 focus:border-teal-500 w-full sm:w-auto"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg py-3 px-4 focus:ring-teal-500 focus:border-teal-500 w-full sm:w-auto"
                        >
                            <option>Mais Recentes</option>
                            <option>Mais Populares</option>
                            <option>Maior Preço</option>
                            <option>Menor Preço</option>
                        </select>
                    </div>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedCategory === category 
                                    ? 'bg-teal-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-gray-600">
                    {filteredFootage.length} {filteredFootage.length === 1 ? 'item' : 'itens'} encontrado{filteredFootage.length !== 1 ? 's' : ''}
                    {searchTerm && ` para "${searchTerm}"`}
                    {selectedCategory !== 'Todas' && ` na categoria "${selectedCategory}"`}
                </p>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFootage.map(item => (
                    <div key={item.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="relative">
                            <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                {item.type === 'video' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            
                            {/* Media Info Overlay */}
                            <div className="absolute top-2 left-2 flex gap-2">
                                <span className={`text-white text-xs px-2 py-1 rounded ${
                                    item.type === 'photo' 
                                        ? 'bg-purple-600/80' 
                                        : 'bg-blue-600/80'
                                }`}>
                                    {item.type === 'photo' ? 'FOTO' : 'VÍDEO'}
                                </span>
                                {item.type === 'video' && item.duration && (
                                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">{item.duration}</span>
                                )}
                                <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">{item.resolution}</span>
                            </div>
                            
                            {/* Category Badge */}
                            <div className="absolute top-2 right-2">
                                <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">{item.category}</span>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <h3 className="font-bold text-lg truncate mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">por {item.author}</p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                                {item.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Stats */}
                            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                <span>{item.downloads} downloads</span>
                                <div className="flex items-center gap-1">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span>4.8</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500">Licença Institucional</span>
                                    <span className="text-lg font-bold text-green-600">GRATUITO</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-500">Licença Comercial</span>
                                    <span className="text-lg font-bold text-teal-600">{item.price}</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => handleLicense(item)}
                                className="w-full mt-4 bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                            >
                                Licenciar {item.type === 'photo' ? 'Foto' : 'Vídeo'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results */}
            {filteredFootage.length === 0 && (
                <div className="text-center py-12">
                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhum item encontrado</h3>
                    <p className="text-gray-500">Tente ajustar os filtros ou termos de busca</p>
                </div>
            )}

            <LicenseModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                media={selectedMedia}
            />
        </div>
    );
};

export default StockGallerySubView;