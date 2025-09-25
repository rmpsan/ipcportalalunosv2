import React from 'react';
import { IntensiveView } from '../../types';

interface ProductionViewProps {
    setActiveView: (view: IntensiveView) => void;
}

const ProductionView: React.FC<ProductionViewProps> = ({ setActiveView }) => {
    const portfolioItems = [1, 2, 3, 4]; // Dummy data for 4 portfolio items
    
    return (
        <div className="animate-[fadeInUp_0.5s_ease-out] space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Produção, Portfólio e Recursos</h1>

            {/* Gerenciamento de Projetos */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Projetos Ativos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-bold text-lg">Campanha de Lançamento - Cliente TechCorp</h3>
                        <p className="text-sm text-gray-500 mb-3">Status: <span className="font-semibold text-blue-600">Em Progresso</span></p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '60%'}}></div>
                        </div>
                        <p className="text-xs text-right mt-1">60% Concluído</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-bold text-lg">Documentário Institucional - ONG Viver</h3>
                        <p className="text-sm text-gray-500 mb-3">Status: <span className="font-semibold text-yellow-600">Revisão Criativa</span></p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-yellow-500 h-2.5 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <p className="text-xs text-right mt-1">85% Concluído</p>
                    </div>
                </div>
            </div>

            {/* Agendamento e Qualidade */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Agendamento de Equipamentos</h2>
                    <p className="text-gray-600 mb-4 flex-grow">Acesso a R$ 4 milhões em equipamentos de ponta, incluindo câmeras 4K/8K, estúdios e ilhas de edição.</p>
                    <button 
                        onClick={() => setActiveView(IntensiveView.EQUIPMENT)}
                        className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-colors font-semibold"
                    >
                        Acessar Sistema de Agendamento
                    </button>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Qualidade e Aprovação</h2>
                    <p className="text-gray-700 mb-4">Nosso processo de <span className="font-bold">Revisão Tripla</span> (técnica, criativa e final) garante uma taxa de aprovação de <span className="font-bold">95% na primeira entrega</span>.</p>
                     <p className="text-sm text-gray-600">Taxa de refilmagem abaixo de 2%, um marco de eficiência no mercado.</p>
                </div>
            </div>

            {/* Portfólio */}
            <div>
                 <h2 className="text-2xl font-bold mb-4">Meu Portfólio</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {portfolioItems.map(item => (
                         <div key={item} className="group aspect-w-1 aspect-h-1 relative rounded-lg overflow-hidden cursor-pointer">
                            <img src={`https://picsum.photos/seed/portfolio${item}/400/400`} alt={`Portfolio item ${item}`} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
                             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
                             <div className="absolute inset-0 flex items-end p-4">
                                 <h3 className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">Projeto {item}</h3>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>

        </div>
    );
};

export default ProductionView;