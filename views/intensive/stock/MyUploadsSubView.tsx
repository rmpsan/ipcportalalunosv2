import React from 'react';

const uploads = [
    { id: 1, title: 'Pôr do sol na praia', status: 'Aprovado', img: 'https://picsum.photos/seed/upload1/500/300' },
    { id: 2, title: 'Tráfego urbano em timelapse', status: 'Pendente', img: 'https://picsum.photos/seed/upload2/500/300' },
    { id: 3, title: 'Close-up de gotas de chuva', status: 'Aprovado', img: 'https://picsum.photos/seed/upload3/500/300' },
    { id: 4, title: 'Cena de escritório (foco seletivo)', status: 'Rejeitado', reason: 'Foco instável', img: 'https://picsum.photos/seed/upload4/500/300' },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const styles = {
        'Aprovado': 'bg-green-100 text-green-800',
        'Pendente': 'bg-yellow-100 text-yellow-800',
        'Rejeitado': 'bg-red-100 text-red-800',
    };
    return <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
}

const MyUploadsSubView: React.FC = () => {
    return (
        <div className="animate-[fadeInUp_0.4s_ease-out]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Meus Envios</h2>
                <button className="bg-teal-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                    Enviar Novo Vídeo
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {uploads.map(item => (
                        <div key={item.id} className="border rounded-lg overflow-hidden">
                            <img src={item.img} alt={item.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold truncate">{item.title}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <StatusBadge status={item.status} />
                                    {item.status === 'Rejeitado' && <p className="text-xs text-red-600">{item.reason}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyUploadsSubView;