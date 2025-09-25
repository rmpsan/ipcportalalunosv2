import React from 'react';

const ScholarshipSubView: React.FC = () => {
    const payments = [
        { id: 4, date: '05/07/2024', amount: 'R$ 1.412,00', status: 'Pago' },
        { id: 3, date: '05/06/2024', amount: 'R$ 1.412,00', status: 'Pago' },
        { id: 2, date: '05/05/2024', amount: 'R$ 1.412,00', status: 'Pago' },
        { id: 1, date: '05/04/2024', amount: 'R$ 1.412,00', status: 'Pago' },
    ];

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg animate-[fadeInUp_0.4s_ease-out]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Controle de Pagamento de Bolsa</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-500">Valor da Bolsa</h3>
                    <p className="text-2xl font-bold text-gray-800">R$ 1.412,00</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-700">Status Atual</h3>
                    <p className="text-2xl font-bold text-green-800">Pagamentos em Dia</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-700">Próximo Pagamento</h3>
                    <p className="text-2xl font-bold text-blue-800">05/08/2024</p>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-700 mb-4">Histórico de Pagamentos</h3>
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 font-semibold">Data</th>
                            <th className="p-3 font-semibold">Valor</th>
                            <th className="p-3 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{payment.date}</td>
                                <td className="p-3">{payment.amount}</td>
                                <td className="p-3">
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{payment.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScholarshipSubView;