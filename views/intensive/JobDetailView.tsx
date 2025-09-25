import React from 'react';
import { Job } from '../../types';

interface JobDetailViewProps {
    job: Job;
    onBack: () => void;
}

const JobDetailView: React.FC<JobDetailViewProps> = ({ job, onBack }) => {
    return (
        <div className="bg-gray-100 min-h-screen animate-[fadeInUp_0.5s_ease-out]">
            <div className="container mx-auto p-6 md:p-10">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Voltar para o Mural de Vagas
                </button>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-8 md:p-12 bg-teal-600 text-white">
                        {job.isNew && <span className="text-xs bg-white text-teal-800 font-bold px-3 py-1 rounded-full mb-4 inline-block">VAGA NOVA</span>}
                        <h1 className="text-3xl md:text-5xl font-extrabold">{job.title}</h1>
                        <p className="text-xl mt-2 opacity-90">{job.company}</p>
                    </div>

                    <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2">Descrição da Vaga</h2>
                                <p className="text-gray-700 leading-relaxed">{job.description}</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2">Responsabilidades</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2">Qualificações</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    {job.qualifications.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-28">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Resumo da Vaga</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-600">Empresa:</span>
                                        <span className="font-medium text-gray-800">{job.company}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-600">Localização:</span>
                                        <span className="font-medium text-gray-800">{job.location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-600">Tipo:</span>
                                        <span className="font-medium text-gray-800">{job.type}</span>
                                    </div>
                                </div>
                                <button className="w-full mt-6 bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                    Candidatar-se Agora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailView;