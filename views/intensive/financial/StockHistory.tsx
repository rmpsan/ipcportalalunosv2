import React from 'react';

const recentSales = [
  { id: 1, video: 'Drone sobre montanhas', date: '25/07/2024', earnings: 'R$ 156,00', platform: 'Pond5 + VideoHive + Dissolve' },
  { id: 2, video: 'Movimento de pessoas na cidade', date: '22/07/2024', earnings: 'R$ 75,00', platform: 'Adobe Stock + Dreamstime + Stocksy' },
  { id: 3, video: 'Arquitetura moderna', date: '20/07/2024', earnings: 'R$ 37,00', platform: 'Shutterstock + Alamy + 123RF' },
  { id: 4, video: 'Paisagem Urbana Noturna', date: '18/07/2024', earnings: 'R$ 245,80', platform: 'Shutterstock + Getty Images' },
  { id: 5, video: 'Natureza em Movimento', date: '15/07/2024', earnings: 'R$ 189,50', platform: 'Adobe Stock + Pond5' },
  { id: 6, video: 'Tecnologia Futurista', date: '12/07/2024', earnings: 'R$ 156,20', platform: 'VideoHive + Dissolve' },
  { id: 7, video: 'Pessoas em Ação', date: '10/07/2024', earnings: 'R$ 134,90', platform: 'Getty Images + Shutterstock' },
];

const StockHistory: React.FC = () => {
    // This component can reuse the logic and UI from StockEarningsSubView for consistency
    return (
        <div className="animate-[fadeInUp_0.4s_ease-out]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Histórico de Ganhos com Stock Footage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <h3 className="font-semibold text-gray-500">Ganhos Totais</h3>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">R$ 2.847,50</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <h3 className="font-semibold text-gray-500">Ganhos no Mês (Julho)</h3>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">R$ 994,90</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
                    <h3 className="font-semibold text-gray-500">Vídeos Vendidos</h3>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">127</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Ganhos por Mês</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <p className="text-gray-500">[Gráfico de Barras de Ganhos]</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Vídeos Mais Rentáveis</h3>
                    <ul className="space-y-3">
                       <li className="flex justify-between items-center"><span className="font-semibold">1. Paisagem Urbana Noturna</span><span className="font-bold text-green-600">R$ 245,80</span></li>
                       <li className="flex justify-between items-center"><span className="font-semibold">2. Natureza em Movimento</span><span className="font-bold text-green-600">R$ 189,50</span></li>
                       <li className="flex justify-between items-center"><span className="font-semibold">3. Tecnologia Futurista</span><span className="font-bold text-green-600">R$ 156,20</span></li>
                       <li className="flex justify-between items-center"><span className="font-semibold">4. Drone sobre montanhas</span><span className="font-bold text-green-600">R$ 156,00</span></li>
                       <li className="flex justify-between items-center"><span className="font-semibold">5. Pessoas em Ação</span><span className="font-bold text-green-600">R$ 134,90</span></li>
                    </ul>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Extrato de Vendas Recentes</h3>
                 <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 font-semibold">Vídeo</th>
                                <th className="p-3 font-semibold">Data da Venda</th>
                                <th className="p-3 font-semibold">Plataformas</th>
                                <th className="p-3 font-semibold">Seus Ganhos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSales.map(sale => (
                                <tr key={sale.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-semibold">{sale.video}</td>
                                    <td className="p-3">{sale.date}</td>
                                    <td className="p-3 text-sm text-gray-600">{sale.platform}</td>
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

export default StockHistory;