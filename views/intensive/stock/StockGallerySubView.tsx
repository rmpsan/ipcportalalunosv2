import React from 'react';

const footage = [
    { id: 1, title: 'Drone sobre a cidade', author: 'Maria S.', price: 'R$ 50', img: 'https://picsum.photos/seed/stock1/500/300' },
    { id: 2, title: 'Café sendo servido', author: 'João P.', price: 'R$ 30', img: 'https://picsum.photos/seed/stock2/500/300' },
    { id: 3, title: 'Pessoas trabalhando', author: 'Ana L.', price: 'R$ 45', img: 'https://picsum.photos/seed/stock3/500/300' },
    { id: 4, title: 'Cachoeira em slow-motion', author: 'Pedro H.', price: 'R$ 60', img: 'https://picsum.photos/seed/stock4/500/300' },
    { id: 5, title: 'Luzes da cidade à noite', author: 'Carla M.', price: 'R$ 55', img: 'https://picsum.photos/seed/stock5/500/300' },
    { id: 6, title: 'Detalhe de teclado', author: 'Fernando G.', price: 'R$ 25', img: 'https://picsum.photos/seed/stock6/500/300' },
];

const StockGallerySubView: React.FC = () => {
    return (
        <div className="animate-[fadeInUp_0.4s_ease-out]">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <div className="relative w-full md:w-1/2">
                    <input type="text" placeholder="Buscar por tema, autor, palavra-chave..." className="bg-white border border-gray-300 text-gray-800 placeholder-gray-500 rounded-md py-2 pl-10 pr-4 w-full focus:ring-2 focus:ring-teal-500 focus:outline-none"/>
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                </div>
                <div className="flex items-center gap-2">
                    <select className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-teal-500 focus:border-teal-500">
                        <option>Mais Recentes</option>
                        <option>Mais Populares</option>
                        <option>Maior Preço</option>
                        <option>Menor Preço</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {footage.map(item => (
                    <div key={item.id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative">
                            <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg truncate">{item.title}</h3>
                            <p className="text-sm text-gray-600">por {item.author}</p>
                            <div className="flex justify-between items-center mt-3">
                                <span className="text-xl font-extrabold text-teal-600">{item.price}</span>
                                <button className="bg-teal-500 text-white text-sm font-semibold py-1 px-3 rounded-md hover:bg-teal-600 transition-colors">Licenciar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockGallerySubView;