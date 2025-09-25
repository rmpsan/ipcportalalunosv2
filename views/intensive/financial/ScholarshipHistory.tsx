import React from 'react';

const payments = [
    { id: 4, date: '05/07/2024', amount: 'R$ 1.412,00', status: 'Pago' },
    { id: 3, date: '05/06/2024', amount: 'R$ 1.412,00', status: 'Pago' },
    { id: 2, date: '05/05/2024', amount: 'R$ 1.412,00', status: 'Pago' },
    { id: 1, date: '05/04/2024', amount: 'R$ 1.412,00', status: 'Pago' },
];

const ScholarshipHistory: React.FC = () => {
    return (
        <div className="animate-[fadeInUp_0.4s_ease-out]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Histórico da Bolsa Estudo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <h3 className="font-semibold text-gray-500">Valor Mensal</h3>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">R$ 1.412,00</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <h3 className="font-semibold text-gray-500">Status</h3>
                    <p className="text-3xl font-extrabold text-green-600 mt-1">Ativa</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gray-500">
                    <h3 className="font-semibold text-gray-500">Próximo Pagamento</h3>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">05/08/2024</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Histórico de Pagamentos</h3>
                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 font-semibold">Data de Pagamento</th>
                                <th className="p-3 font-semibold">Valor Recebido</th>
                                <th className="p-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(payment => (
                                <tr key={payment.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{payment.date}</td>
                                    <td className="p-3 font-semibold">{payment.amount}</td>
                                    <td className="p-3">
                                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{payment.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipHistory;