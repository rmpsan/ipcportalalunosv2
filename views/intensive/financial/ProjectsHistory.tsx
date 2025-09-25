import React from 'react';

const projects = [
    { id: 1, name: 'Vídeo de Lançamento de Produto', client: 'TechCorp', date: '25/07/2024', earnings: 'R$ 1.200,00', role: 'Editor de Vídeo Sênior' },
    { id: 2, name: 'Campanha de Mídias Sociais', client: 'Varejo Total', date: '20/07/2024', earnings: 'R$ 850,00', role: 'Diretor de Fotografia' },
    { id: 3, name: 'Documentário de Marca', client: 'Creative Minds Agency', date: '15/07/2024', earnings: 'R$ 1.500,00', role: 'Roteirista' },
    { id: 4, name: 'Pós-Produção de Áudio para Podcast', client: 'SoundWave Studios', date: '10/07/2024', earnings: 'R$ 750,00', role: 'Produtor Executivo' },
    { id: 5, name: 'Assistência em Produção', client: 'Estúdio Local', date: '05/07/2024', earnings: 'R$ 300,00', role: 'Assistente de Produção' },
    { id: 6, name: 'Suporte Técnico de Câmera', client: 'Produtora Independente', date: '28/06/2024', earnings: 'R$ 250,00', role: 'Assistente de Câmera' },
];

const ProjectsHistory: React.FC = () => {
    return (
        <div className="animate-[fadeInUp_0.4s_ease-out]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Histórico de Ganhos com Projetos</h2>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
                    <h3 className="font-semibold text-gray-500">Total Ganho em Projetos</h3>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">R$ 4.850,00</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-cyan-500">
                    <h3 className="font-semibold text-gray-500">Projetos Concluídos</h3>
                    <p className="text-3xl font-extrabold text-gray-800 mt-1">6</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Extrato de Projetos</h3>
                 <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 font-semibold">Projeto</th>
                                <th className="p-3 font-semibold">Cliente</th>
                                <th className="p-3 font-semibold">Função</th>
                                <th className="p-3 font-semibold">Data de Conclusão</th>
                                <th className="p-3 font-semibold">Valor Recebido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-semibold">{project.name}</td>
                                    <td className="p-3">{project.client}</td>
                                    <td className="p-3 text-sm text-blue-600 font-medium">{project.role}</td>
                                    <td className="p-3">{project.date}</td>
                                    <td className="p-3 font-bold text-green-700">{project.earnings}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjectsHistory;