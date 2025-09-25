import React from 'react';

const recentSales = [
  { id: 1, video: 'Drone sobre a cidade', date: '20/07/2024', earnings: 'R$ 25,00' },
  { id: 2, video: 'Close-up de gotas de chuva', date: '18/07/2024', earnings: 'R$ 12,50' },
  { id: 3, video: 'Pôr do sol na praia', date: '15/07/2024', earnings: 'R$ 25,00' },
  { id: 4, video: 'Drone sobre a cidade', date: '12/07/2024', earnings: 'R$ 25,00' },
];

const StockEarningsSubView: React.FC = () => {
    return (
        <div className="animate-[fadeInUp_0.4s_ease-out]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Ganhos com Stock Footage</h2>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <h3 className="font-semibold text-gray-500">Ganhos Totais</h3>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">R$ 237,50</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <h3 className="font-semibold text-gray-500">Ganhos no Mês (Julho)</h3>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">R$ 85,50</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
                    <h3 className="font-semibold text-gray-500">Vídeos Vendidos</h3>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">12</p>
                </div>
            </div>

            {/* Earnings Chart and Top Videos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Ganhos por Mês</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <p className="text-gray-500">[Gráfico de Barras]</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Vídeos Mais Rentáveis</h3>
                    <ul className="space-y-3">
                       <li className="flex justify-between items-center"><span className="font-semibold">1. Drone sobre a cidade</span><span className="font-bold text-green-600">R$ 125,00</span></li>
                       <li className="flex justify-between items-center"><span className="font-semibold">2. Pôr do sol na praia</span><span className="font-bold text-green-600">R$ 75,00</span></li>
                       <li className="flex justify-between items-center"><span className="font-semibold">3. Close-up de gotas de chuva</span><span className="font-bold text-green-600">R$ 37,50</span></li>
                    </ul>
                </div>
            </div>

             {/* Recent Sales History */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Vendas Recentes</h3>
                 <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 font-semibold">Vídeo</th>
                                <th className="p-3 font-semibold">Data da Venda</th>
                                <th className="p-3 font-semibold">Seus Ganhos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSales.map(sale => (
                                <tr key={sale.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-semibold">{sale.video}</td>
                                    <td className="p-3">{sale.date}</td>
                                    <td className="p-3 font-bold text-green-700">{sale.earnings}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StockEarningsSubView;