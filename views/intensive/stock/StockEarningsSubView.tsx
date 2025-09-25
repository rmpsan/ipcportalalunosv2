import React, { useState } from 'react';

const StockEarningsSubView: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Este Mês');
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const earningsData = {
        total: 2847.50,
        thisMonth: 485.30,
        videosSold: 127,
        pendingWithdrawal: 1200.00,
        availableBalance: 1647.50
    };

    const topVideos = [
        { id: 1, title: "Paisagem Urbana Noturna", earnings: 245.80, sales: 12, img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400" },
        { id: 2, title: "Natureza em Movimento", earnings: 189.50, sales: 8, img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400" },
        { id: 3, title: "Tecnologia Futurista", earnings: 156.20, sales: 6, img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400" },
        { id: 4, title: "Pessoas em Ação", earnings: 134.90, sales: 5, img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400" }
    ];

    const recentUsage = [
        { id: 1, video: "Paisagem Urbana Noturna", project: "Projeto Final - Design Gráfico", student: "Ana Silva", date: "2024-01-15", type: "Uso Interno", source: "Portal do Aluno" },
        { id: 2, video: "Natureza em Movimento", project: "Campanha Cliente - Eco Turismo", student: "Carlos Santos", date: "2024-01-14", type: "Uso Interno", source: "Portal do Aluno" },
        { id: 3, video: "Tecnologia Futurista", project: "Material Educacional - IA", student: "Mariana Costa", date: "2024-01-13", type: "Uso Interno", source: "Portal do Aluno" },
        { id: 4, video: "Pessoas em Ação", project: "Projeto TCC - Audiovisual", student: "João Oliveira", date: "2024-01-12", type: "Uso Interno", source: "Portal do Aluno" },
        { id: 5, video: "Paisagem Urbana Noturna", project: "Cliente Instituto - Imobiliária", student: "Beatriz Lima", date: "2024-01-11", type: "Uso Interno", source: "Portal do Aluno" }
    ];

    const externalSales = [
        { id: 1, video: "Paisagem Urbana Noturna", platform: "Shutterstock", date: "2024-01-15", amount: 25.00, buyer: "Cliente Externo" },
        { id: 2, video: "Tecnologia Futurista", platform: "Adobe Stock", date: "2024-01-13", amount: 30.00, buyer: "Cliente Externo" },
        { id: 3, video: "Natureza em Movimento", platform: "Getty Images", date: "2024-01-12", amount: 22.50, buyer: "Cliente Externo" },
        { id: 4, video: "Pessoas em Ação", platform: "Pond5", date: "2024-01-10", amount: 18.00, buyer: "Cliente Externo" },
        { id: 5, video: "Paisagem Urbana Noturna", platform: "VideoHive", date: "2024-01-09", amount: 25.00, buyer: "Cliente Externo" }
    ];

    const platformStats = [
        { platform: 'Shutterstock', sales: 45, earnings: 675.50, percentage: 23.7 },
        { platform: 'Adobe Stock', sales: 38, earnings: 532.20, percentage: 18.7 },
        { platform: 'Getty Images', sales: 22, earnings: 485.80, percentage: 17.1 },
        { platform: 'Pond5', sales: 28, earnings: 448.60, percentage: 15.8 },
        { platform: 'VideoHive', sales: 19, earnings: 312.40, percentage: 11.0 },
        { platform: 'Dissolve', sales: 12, earnings: 248.90, percentage: 8.7 },
        { platform: 'Outros', sales: 8, earnings: 144.10, percentage: 5.0 }
    ];

    const monthlyData = [
        { month: 'Jan', earnings: 320 },
        { month: 'Fev', earnings: 280 },
        { month: 'Mar', earnings: 450 },
        { month: 'Abr', earnings: 380 },
        { month: 'Mai', earnings: 520 },
        { month: 'Jun', earnings: 485 }
    ];

    const maxEarnings = Math.max(...monthlyData.map(d => d.earnings));

    const handleWithdraw = () => {
        if (parseFloat(withdrawAmount) > 0 && parseFloat(withdrawAmount) <= earningsData.availableBalance) {
            alert(`Solicitação de saque de R$ ${withdrawAmount} enviada com sucesso!`);
            setShowWithdrawModal(false);
            setWithdrawAmount('');
        }
    };

    return (
        <div className="animate-[fadeInUp_0.4s_ease-out]">
            <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Meus Ganhos</h2>
                <p className="text-gray-600">Acompanhe seus ganhos e gerencie seus saques</p>
            </div>

            {/* Earnings Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-teal-100 text-sm font-medium">Ganhos Totais</p>
                            <p className="text-2xl font-bold">R$ {earningsData.total.toFixed(2)}</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-lg">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Este Mês</p>
                            <p className="text-2xl font-bold text-gray-800">R$ {earningsData.thisMonth.toFixed(2)}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Vídeos Vendidos</p>
                            <p className="text-2xl font-bold text-gray-800">{earningsData.videosSold}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Saldo Disponível</p>
                            <p className="text-2xl font-bold text-green-600">R$ {earningsData.availableBalance.toFixed(2)}</p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-lg">
                            <svg className="h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Withdraw Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Solicitar Saque</h3>
                        <p className="text-gray-600">Saldo disponível para saque: <span className="font-semibold text-green-600">R$ {earningsData.availableBalance.toFixed(2)}</span></p>
                        {earningsData.pendingWithdrawal > 0 && (
                            <p className="text-sm text-orange-600 mt-1">Saque pendente: R$ {earningsData.pendingWithdrawal.toFixed(2)}</p>
                        )}
                    </div>
                    <button 
                        onClick={() => setShowWithdrawModal(true)}
                        className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                        disabled={earningsData.availableBalance <= 0}
                    >
                        Solicitar Saque
                    </button>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Earnings Chart */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Ganhos Mensais</h3>
                        <select 
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-sm"
                        >
                            <option>Este Mês</option>
                            <option>Últimos 3 Meses</option>
                            <option>Últimos 6 Meses</option>
                            <option>Este Ano</option>
                        </select>
                    </div>
                    
                    {/* Simple Bar Chart */}
                    <div className="space-y-4">
                        {monthlyData.map((data, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 w-8">{data.month}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                    <div 
                                        className="bg-gradient-to-r from-teal-500 to-teal-600 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                                        style={{ width: `${(data.earnings / maxEarnings) * 100}%` }}
                                    >
                                        <span className="text-white text-xs font-semibold">R$ {data.earnings}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Stats */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Vendas por Plataforma</h3>
                    <div className="space-y-4">
                        {platformStats.map((platform, index) => (
                            <div key={platform.platform} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-semibold text-gray-800 truncate">{platform.platform}</h4>
                                        <span className="text-sm text-gray-500">{platform.percentage}%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>{platform.sales} vendas</span>
                                        <span className="font-bold text-teal-600">R$ {platform.earnings.toFixed(2)}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${platform.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Internal Usage and External Sales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Internal Usage Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800">Usos Internos Recentes</h3>
                        <p className="text-sm text-gray-600 mt-1">Downloads gratuitos via Portal do Aluno</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mídia</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projeto</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aluno</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentUsage.map(usage => (
                                    <tr key={usage.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900 text-sm">{usage.video}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{usage.project}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{usage.student}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{new Date(usage.date).toLocaleDateString('pt-BR')}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* External Sales Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800">Vendas Externas Recentes</h3>
                        <p className="text-sm text-gray-600 mt-1">Vendas via agentes de stock</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mídia</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plataforma</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {externalSales.map(sale => (
                                    <tr key={sale.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900 text-sm">{sale.video}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-blue-600">{sale.platform}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{new Date(sale.date).toLocaleDateString('pt-BR')}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="font-semibold text-teal-600">R$ {sale.amount.toFixed(2)}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Solicitar Saque</h3>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Valor do Saque
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                <input
                                    type="number"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    placeholder="0,00"
                                    max={earningsData.availableBalance}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                Máximo disponível: R$ {earningsData.availableBalance.toFixed(2)}
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Método de Pagamento
                            </label>
                            <select className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none">
                                <option>PIX (Instantâneo)</option>
                                <option>Transferência Bancária (1-2 dias úteis)</option>
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowWithdrawModal(false)}
                                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleWithdraw}
                                className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
                            >
                                Confirmar Saque
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockEarningsSubView;