import React, { useState } from 'react';

const uploads = [
    { 
        id: 1, 
        title: 'Pôr do sol na praia', 
        status: 'Aprovado', 
        img: 'https://picsum.photos/seed/upload1/500/300', 
        uploadDate: '15/07/2024', 
        views: 245, 
        downloads: 12, 
        type: 'video', 
        duration: '0:45',
        distributedTo: [
            { platform: 'Shutterstock', sales: 8, earnings: 'R$ 24,00' },
            { platform: 'Adobe Stock', sales: 4, earnings: 'R$ 16,00' }
        ]
    },
    { 
        id: 2, 
        title: 'Tráfego urbano em timelapse', 
        status: 'Pendente', 
        img: 'https://picsum.photos/seed/upload2/500/300', 
        uploadDate: '18/07/2024', 
        views: 0, 
        downloads: 0, 
        type: 'video', 
        duration: '1:20',
        distributedTo: []
    },
    { 
        id: 3, 
        title: 'Close-up de gotas de chuva', 
        status: 'Aprovado', 
        img: 'https://picsum.photos/seed/upload3/500/300', 
        uploadDate: '12/07/2024', 
        views: 189, 
        downloads: 8, 
        type: 'photo',
        distributedTo: [
            { platform: 'Getty Images', sales: 3, earnings: 'R$ 45,00' },
            { platform: '500px', sales: 2, earnings: 'R$ 18,00' },
            { platform: 'Depositphotos', sales: 3, earnings: 'R$ 12,00' }
        ]
    },
    { 
        id: 4, 
        title: 'Cena de escritório (foco seletivo)', 
        status: 'Rejeitado', 
        reason: 'Foco instável', 
        img: 'https://picsum.photos/seed/upload4/500/300', 
        uploadDate: '10/07/2024', 
        views: 0, 
        downloads: 0, 
        type: 'photo',
        distributedTo: []
    },
    { 
        id: 5, 
        title: 'Drone sobre montanhas', 
        status: 'Aprovado', 
        img: 'https://picsum.photos/seed/upload5/500/300', 
        uploadDate: '08/07/2024', 
        views: 312, 
        downloads: 18, 
        type: 'video', 
        duration: '2:15',
        distributedTo: [
            { platform: 'Pond5', sales: 12, earnings: 'R$ 96,00' },
            { platform: 'VideoHive', sales: 4, earnings: 'R$ 32,00' },
            { platform: 'Dissolve', sales: 2, earnings: 'R$ 28,00' }
        ]
    },
    { 
        id: 6, 
        title: 'Café sendo preparado', 
        status: 'Pendente', 
        img: 'https://picsum.photos/seed/upload6/500/300', 
        uploadDate: '20/07/2024', 
        views: 0, 
        downloads: 0, 
        type: 'photo',
        distributedTo: []
    },
    { 
        id: 7, 
        title: 'Arquitetura moderna', 
        status: 'Aprovado', 
        img: 'https://picsum.photos/seed/upload7/500/300', 
        uploadDate: '22/07/2024', 
        views: 156, 
        downloads: 9, 
        type: 'photo',
        distributedTo: [
            { platform: 'Shutterstock', sales: 5, earnings: 'R$ 15,00' },
            { platform: 'Alamy', sales: 2, earnings: 'R$ 14,00' },
            { platform: '123RF', sales: 2, earnings: 'R$ 8,00' }
        ]
    },
    { 
        id: 8, 
        title: 'Movimento de pessoas na cidade', 
        status: 'Aprovado', 
        img: 'https://picsum.photos/seed/upload8/500/300', 
        uploadDate: '25/07/2024', 
        views: 203, 
        downloads: 15, 
        type: 'video', 
        duration: '0:30',
        distributedTo: [
            { platform: 'Adobe Stock', sales: 8, earnings: 'R$ 32,00' },
            { platform: 'Dreamstime', sales: 4, earnings: 'R$ 16,00' },
            { platform: 'Stocksy', sales: 3, earnings: 'R$ 27,00' }
        ]
    },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const styles = {
        'Aprovado': 'bg-green-100 text-green-800 border border-green-200',
        'Pendente': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        'Rejeitado': 'bg-red-100 text-red-800 border border-red-200',
    };
    return <span className={`text-xs font-semibold px-3 py-1 rounded-full ${styles[status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>{status}</span>;
}

const UploadModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        // Simular upload
        simulateUpload();
    };

    const simulateUpload = () => {
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    setTimeout(() => onClose(), 1000);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-gray-800">Enviar Nova Mídia</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                    </div>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Media Type Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Tipo de Mídia</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setMediaType('photo')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                                    mediaType === 'photo' 
                                        ? 'border-teal-500 bg-teal-50 text-teal-700' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                                Foto
                            </button>
                            <button
                                onClick={() => setMediaType('video')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                                    mediaType === 'video' 
                                        ? 'border-teal-500 bg-teal-50 text-teal-700' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                </svg>
                                Vídeo
                            </button>
                        </div>
                    </div>

                    {/* Upload Area */}
                    <div 
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                            dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        {mediaType === 'photo' ? (
                            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        ) : (
                            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        )}
                        <p className="text-lg font-semibold text-gray-700 mb-2">
                            Arraste {mediaType === 'photo' ? 'sua foto' : 'seu vídeo'} aqui
                        </p>
                        <p className="text-gray-500 mb-4">ou clique para selecionar</p>
                        <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                            Selecionar Arquivo
                        </button>
                        <p className="text-xs text-gray-400 mt-3">
                            {mediaType === 'photo' 
                                ? 'Formatos aceitos: JPG, PNG, WEBP (máx. 50MB)' 
                                : 'Formatos aceitos: MP4, MOV, AVI (máx. 500MB)'
                            }
                        </p>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Enviando...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Título {mediaType === 'photo' ? 'da Foto' : 'do Vídeo'}
                            </label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                                placeholder={mediaType === 'photo' ? "Ex: Arquitetura moderna" : "Ex: Pôr do sol na praia"} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Categoria</label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                <option>Natureza</option>
                                <option>Urbano</option>
                                <option>Pessoas</option>
                                <option>Tecnologia</option>
                                <option>Arquitetura</option>
                                <option>Outros</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                        <textarea 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                            placeholder={mediaType === 'photo' ? "Descreva sua foto..." : "Descreva seu vídeo..."}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (separadas por vírgula)</label>
                        <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="praia, pôr do sol, natureza" />
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancelar
                    </button>
                    <button 
                        onClick={simulateUpload}
                        disabled={isUploading}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                        {isUploading ? 'Enviando...' : `Enviar ${mediaType === 'photo' ? 'Foto' : 'Vídeo'}`}
                    </button>
                </div>
            </div>
        </div>
    );
}

const MyUploadsSubView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('Todos');

    const filteredUploads = filterStatus === 'Todos' 
        ? uploads 
        : uploads.filter(upload => upload.status === filterStatus);

    return (
        <div className="animate-[fadeInUp_0.4s_ease-out]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Meus Envios</h2>
                    <p className="text-gray-600 mt-1">Gerencie suas fotos e vídeos enviados e acompanhe o status</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Enviar Nova Mídia
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Total de Mídias</h3>
                    <p className="text-2xl font-bold text-gray-800">{uploads.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Aprovados</h3>
                    <p className="text-2xl font-bold text-green-600">{uploads.filter(u => u.status === 'Aprovado').length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Pendentes</h3>
                    <p className="text-2xl font-bold text-yellow-600">{uploads.filter(u => u.status === 'Pendente').length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-teal-500">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Total de Views</h3>
                    <p className="text-2xl font-bold text-teal-600">{uploads.reduce((sum, u) => sum + u.views, 0)}</p>
                </div>
            </div>

            {/* Filter and Search */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {['Todos', 'Aprovado', 'Pendente', 'Rejeitado'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filterStatus === status 
                                        ? 'bg-teal-600 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <input 
                            type="text" 
                            placeholder="Buscar vídeos..." 
                            className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg py-2 pl-10 pr-4 w-full sm:w-64 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
            
            {/* Media Grid */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredUploads.map(item => (
                        <div key={item.id} className="group border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
                            <div className="relative">
                                <img src={item.img} alt={item.title} className="w-full h-40 object-cover" />
                                <div className="absolute top-2 left-2">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        item.type === 'photo' 
                                            ? 'bg-purple-100 text-purple-800' 
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {item.type === 'photo' ? 'FOTO' : 'VÍDEO'}
                                    </span>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <StatusBadge status={item.status} />
                                </div>
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    {item.type === 'video' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                {item.type === 'video' && item.duration && (
                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        {item.duration}
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg truncate mb-2">{item.title}</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Enviado em:</span>
                                        <span className="font-medium">{item.uploadDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Visualizações:</span>
                                        <span className="font-medium text-blue-600">{item.views}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Downloads:</span>
                                        <span className="font-medium text-green-600">{item.downloads}</span>
                                    </div>
                                </div>
                                {item.status === 'Rejeitado' && item.reason && (
                                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-xs text-red-700"><strong>Motivo:</strong> {item.reason}</p>
                                    </div>
                                )}
                                
                                {/* Distribution Info */}
                                {item.status === 'Aprovado' && item.distributedTo && item.distributedTo.length > 0 && (
                                    <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                                        <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                                            <svg className="w-3 h-3 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                            </svg>
                                            Distribuído em {item.distributedTo.length} plataforma{item.distributedTo.length > 1 ? 's' : ''}
                                        </h4>
                                        <div className="space-y-1">
                                            {item.distributedTo.slice(0, 2).map((dist, index) => (
                                                <div key={index} className="flex justify-between items-center text-xs">
                                                    <span className="font-medium text-gray-700">{dist.platform}</span>
                                                    <div className="flex gap-2 text-gray-600">
                                                        <span>{dist.sales} vendas</span>
                                                        <span className="font-semibold text-green-600">{dist.earnings}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            {item.distributedTo.length > 2 && (
                                                <div className="text-xs text-gray-500 text-center pt-1">
                                                    +{item.distributedTo.length - 2} outras plataformas
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-2 pt-2 border-t border-green-200">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-medium text-gray-700">Total Ganhos:</span>
                                                <span className="font-bold text-green-600">
                                                    R$ {item.distributedTo.reduce((sum, dist) => {
                                                        const value = parseFloat(dist.earnings.replace('R$ ', '').replace(',', '.'));
                                                        return sum + value;
                                                    }, 0).toFixed(2).replace('.', ',')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                                        Editar
                                    </button>
                                    {item.status === 'Aprovado' && (
                                        <button className="flex-1 bg-teal-100 text-teal-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-teal-200 transition-colors">
                                            Ver Stats
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {filteredUploads.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhum vídeo encontrado</h3>
                        <p className="text-gray-500">Não há vídeos com o status "{filterStatus}"</p>
                    </div>
                )}
            </div>

            <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default MyUploadsSubView;