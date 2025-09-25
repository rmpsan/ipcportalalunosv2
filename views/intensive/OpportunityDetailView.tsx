import React, { useState } from 'react';
import { Opportunity } from '../../types';

// FIX: Define the props interface for the component.
interface OpportunityDetailViewProps {
    opportunity: Opportunity;
    onBack: () => void;
}

const OpportunityDetailView: React.FC<OpportunityDetailViewProps> = ({ opportunity, onBack }) => {
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [coverLetter, setCoverLetter] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        setIsSubmitted(true);
    };

    const SuccessMessage = () => (
         <div className="text-center bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg animate-[fadeInUp_0.3s_ease-out]">
            <svg className="mx-auto h-16 w-16 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-bold text-2xl mt-4">Candidatura Enviada!</h4>
            <p className="text-sm mt-2">Sua aplicação foi recebida com sucesso. Boa sorte! A equipe de produção entrará em contato em breve.</p>
        </div>
    );

    const renderCommercialProject = () => {
        const project = opportunity;
        if (project.type !== 'commercial') return null;
        
        return (
            <>
                <div className="h-72 bg-cover bg-center relative" style={{backgroundImage: `url(${project.image})`}}>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                        <img src={project.clientLogo} alt={project.client} className="h-12 mb-2" />
                        <h1 className="text-3xl md:text-5xl font-extrabold">{project.title}</h1>
                        <p className="text-xl mt-1 opacity-90">Cliente: {project.client}</p>
                    </div>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2">Briefing do Projeto</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{project.description}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2">Vagas Disponíveis</h2>
                            <div className="flex flex-wrap gap-3">
                                {project.roles.map(role => <span key={role} className="bg-teal-100 text-teal-800 font-semibold px-4 py-2 rounded-full">{role}</span>)}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-28">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Candidatar-se</h3>
                            {isSubmitted ? <SuccessMessage /> : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Selecione a vaga</label>
                                        <select id="role" value={selectedRole} onChange={e => setSelectedRole(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500">
                                            <option value="" disabled>-- Escolha uma opção --</option>
                                            {project.roles.map(role => <option key={role} value={role}>{role}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="cover-letter" className="block text-sm font-medium text-gray-700">Mensagem de Apresentação</label>
                                        <textarea id="cover-letter" value={coverLetter} onChange={e => setCoverLetter(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" placeholder="Por que você é a pessoa ideal para esta vaga?"></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                        Enviar Candidatura
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const renderInternalCall = () => {
        const call = opportunity;
        if (call.type !== 'internal') return null;

        return (
             <>
                <div className="h-72 bg-cover bg-center relative" style={{backgroundImage: `url(${call.image})`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-50">{call.title}</h1>
                        <p className="text-xl mt-2 text-red-400 font-semibold">Inscrições até: {call.deadline}</p>
                    </div>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                         <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-cyan-500 pb-2">Descrição do Edital</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{call.description}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-cyan-500 pb-2">Critérios de Submissão</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {call.submissionCriteria.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-cyan-500 pb-2">Prêmios</h2>
                             <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {call.prizes.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                     <div className="lg:col-span-1">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-28">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Inscrever Projeto</h3>
                            {isSubmitted ? <SuccessMessage /> : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                     <div>
                                        <label htmlFor="project-title" className="block text-sm font-medium text-gray-700">Título do Projeto</label>
                                        <input type="text" id="project-title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="project-file" className="block text-sm font-medium text-gray-700">Arquivo do Projeto (PDF)</label>
                                        <input type="file" id="project-file" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer"/>
                                    </div>
                                    <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                        Enviar Inscrição
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen animate-[fadeInUp_0.5s_ease-out]">
            <div className="container mx-auto p-0 md:p-10">
                 <div className="px-6 md:px-0 pt-6">
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Voltar para Oportunidades
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {opportunity.type === 'commercial' ? renderCommercialProject() : renderInternalCall()}
                </div>
            </div>
        </div>
    );
};

export default OpportunityDetailView;
