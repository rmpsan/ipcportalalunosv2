import React from 'react';

interface StockInfoPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const StockInfoPopup: React.FC<StockInfoPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-6 rounded-t-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Stock Footage São Paulo</h2>
                    <p className="text-teal-100 text-lg">Transforme sua criatividade em renda extra</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Foco Principal */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-500">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <svg className="w-6 h-6 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Nosso Foco: São Paulo Autêntica
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            Capture a essência de São Paulo! Nosso foco é conteúdo <strong>autêntico da cultura cotidiana e lifestyle paulistano</strong>. 
                            Desde a correria da Paulista até os cantinhos escondidos da cidade, cada imagem e vídeo conta uma história única da metrópole.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Card 1: Cultura Cotidiana */}
                        <div className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 ml-3">Cultura Cotidiana</h4>
                            </div>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                    Movimento nas estações de metrô
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                    Food trucks e comida de rua
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                    Arte urbana e grafites
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                    Mercados e feiras livres
                                </li>
                            </ul>
                        </div>

                        {/* Card 2: Lifestyle Paulistano */}
                        <div className="bg-white border-2 border-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 ml-3">Lifestyle Paulistano</h4>
                            </div>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                    Cafeterias e coworkings
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                    Parques e áreas verdes
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                    Vida noturna e entretenimento
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                    Arquitetura e skyline urbano
                                </li>
                            </ul>
                        </div>

                        {/* Card 2.5: Arquitetura e Lugares Icônicos */}
                        <div className="bg-white border-2 border-amber-100 rounded-xl p-6 hover:shadow-lg transition-shadow md:col-span-2">
                            <div className="flex items-center mb-4">
                                <div className="bg-amber-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 ml-3">Arquitetura & Lugares Icônicos</h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="font-semibold text-amber-700 mb-2">🏛️ Arquitetura Histórica</h5>
                                    <ul className="space-y-1 text-gray-600 text-sm">
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Teatro Municipal
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Estação da Luz
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Mercado Municipal
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Catedral da Sé
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-amber-700 mb-2">🏙️ Arquitetura Moderna</h5>
                                    <ul className="space-y-1 text-gray-600 text-sm">
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Edifício Copan
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            MASP (Museu de Arte)
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Pinacoteca do Estado
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Edifício Martinelli
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-amber-700 mb-2">📍 Lugares Emblemáticos</h5>
                                    <ul className="space-y-1 text-gray-600 text-sm">
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Avenida Paulista
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Vale do Anhangabaú
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Largo do Arouche
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Praça da República
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-amber-700 mb-2">🌆 Bairros Característicos</h5>
                                    <ul className="space-y-1 text-gray-600 text-sm">
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Vila Madalena
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Liberdade
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Bela Vista
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                                            Santa Cecília
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Equipamentos */}
                        <div className="bg-white border-2 border-purple-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 ml-3">Equipamentos Disponíveis</h4>
                            </div>
                            <p className="text-gray-600 mb-3">Agende equipamentos profissionais:</p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                    Câmeras DSLR e mirrorless
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                    Drones para filmagem aérea
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                    Estabilizadores e tripés
                                </li>
                            </ul>
                        </div>

                        {/* Card 4: Renda Extra */}
                        <div className="bg-white border-2 border-yellow-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 ml-3">Renda Extra Garantida</h4>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-600 mb-3">
                                        <strong>O Instituto intermedia suas vendas</strong> com os principais players do mercado e 
                                        <strong className="text-yellow-600"> divide os lucros com você!</strong>
                                    </p>
                                    <div className="bg-yellow-50 p-3 rounded-lg">
                                        <p className="text-sm text-yellow-800 font-medium">
                                            💰 Ganhe dinheiro com seu talento criativo
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-yellow-700 mb-2">🤝 Nossos Parceiros Comerciais</h5>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                                            Shutterstock
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                                            Getty Images
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                                            Adobe Stock
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                                            iStock
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                                            Unsplash+
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                                            Pexels Pro
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                                            Depositphotos
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                                            123RF
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seção de Benefícios Extras */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-100">
                        <div className="flex items-center mb-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 ml-3">Benefícios Extras para sua Formação</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-indigo-700 mb-3">🎓 Para sua Educação</h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                                        Pontos extras no currículo
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                                        Portfólio profissional
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                                        Experiência prática real
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                                        Networking profissional
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-purple-700 mb-3">📚 Banco de Imagens Gratuito</h4>
                                <div className="bg-white rounded-lg p-4 border border-purple-200">
                                    <p className="text-gray-700 mb-3 text-sm">
                                        <strong>Todo o acervo do Instituto está disponível gratuitamente!</strong>
                                    </p>
                                    <ul className="space-y-2 text-gray-600 text-sm">
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                                            Use em seus projetos pessoais
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                                            Projetos acadêmicos do Instituto
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                                            Trabalhos de conclusão de curso
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                                            Apresentações e portfólios
                                        </li>
                                    </ul>
                                    <div className="mt-3 p-2 bg-purple-50 rounded text-xs text-purple-700">
                                        💡 <strong>Acesso ilimitado</strong> durante toda sua formação
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-2">Pronto para começar?</h3>
                        <p className="mb-4">Explore São Paulo, capture momentos únicos e transforme sua paixão em renda!</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button className="bg-white text-teal-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Agendar Equipamentos
                            </button>
                            <button className="bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-800 transition-colors">
                                Ver Galeria
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 rounded-b-2xl text-center">
                    <p className="text-sm text-gray-600">
                        Este popup aparece sempre que você acessar o Stock Footage
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StockInfoPopup;