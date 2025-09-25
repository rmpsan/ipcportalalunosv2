import React from 'react';
import { IntensiveView } from '../../types';

interface DashboardViewProps {
    setActiveView: (view: IntensiveView) => void;
    onSelectCourse: (course: { title: string, instructor: string }) => void;
}

const opportunities = [
    { client: 'TechCorp', title: 'Editor de Vídeo', logo: 'https://placehold.co/40x40/94A3B8/1E293B?text=TC' },
    { client: 'Varejo Total', title: 'Motion Designer', logo: 'https://placehold.co/40x40/94A3B8/1E293B?text=VT' },
    { client: 'Creative Minds', title: 'Roteirista Jr.', logo: 'https://placehold.co/40x40/94A3B8/1E293B?text=CM' },
];

const DashboardView: React.FC<DashboardViewProps> = ({ setActiveView, onSelectCourse }) => {
    const formationProgress = 35; 
    
    return (
        <div className="space-y-8 animate-[fadeInUp_0.5s_ease-out]">
            <header>
                <h1 className="text-4xl font-extrabold text-gray-900">Seja bem-vindo, Aluno!</h1>
                <p className="text-lg text-gray-600 mt-1">Aqui está um resumo do seu progresso e das suas próximas oportunidades.</p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    
                    {/* Continue Watching */}
                    <div 
                        className="relative bg-gray-800 rounded-2xl p-8 text-white overflow-hidden group cursor-pointer shadow-2xl hover:shadow-teal-500/20 transition-all duration-300"
                        onClick={() => onSelectCourse({ title: 'Técnicas de Roteiro para Cinema', instructor: 'Dr. Lúcia Borges (USP)' })}
                    >
                        <img src="https://picsum.photos/seed/intro-roteiro/800/400" alt="Continue Watching" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
                        <div className="relative">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-teal-400">Continue de onde parou</h2>
                            <h3 className="text-3xl font-bold mt-2">Técnicas de Roteiro para Cinema</h3>
                            <p className="text-gray-300">com Dr. Lúcia Borges (USP)</p>
                            <div className="w-full bg-white/20 rounded-full h-2.5 mt-6">
                                <div className="bg-teal-400 h-2.5 rounded-full" style={{width: '65%'}}></div>
                            </div>
                            <p className="text-xs text-right mt-1">65% concluído</p>
                        </div>
                    </div>

                    {/* Opportunities */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Novas Oportunidades de Job</h2>
                             <button 
                                onClick={() => setActiveView(IntensiveView.OPPORTUNITIES)}
                                className="text-teal-600 font-semibold hover:text-teal-800 transition-colors text-sm"
                            >
                                Ver Todas &rarr;
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {opportunities.map(op => (
                                <div key={op.client} className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                                    <img src={op.logo} alt={op.client} className="h-10 w-10 rounded-full mb-2" />
                                    <h4 className="font-bold text-gray-900">{op.title}</h4>
                                    <p className="text-sm text-gray-500">{op.client}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Financial Status */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Financeiro (Mês Atual)</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center"><span className="text-gray-600">Bolsa Integral:</span><span className="font-semibold text-gray-900">R$ 1.412,00</span></div>
                            <div className="flex justify-between items-center"><span className="text-gray-600">Projetos:</span><span className="font-semibold text-gray-900">R$ 350,00</span></div>
                            <div className="flex justify-between items-center"><span className="text-gray-600">Stock Footage:</span><span className="font-semibold text-gray-900">R$ 85,50</span></div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-baseline">
                                <span className="text-base font-bold text-gray-900">Total:</span>
                                <span className="text-2xl font-extrabold text-teal-600">R$ 1.847,50</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Specialization Track */}
                    <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-bold">Sua Trilha de Especialização</h3>
                        <p className="text-teal-100 mt-1">IA Audiovisual</p>
                        <div className="w-full bg-white/30 rounded-full h-2.5 mt-4">
                            <div className="bg-white h-2.5 rounded-full" style={{width: `${formationProgress}%`}}></div>
                        </div>
                        <p className="text-xs text-right mt-1 opacity-80">{formationProgress}% concluída</p>
                    </div>

                    {/* Internal Calls */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                        <div className="bg-cyan-100 text-cyan-700 p-4 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Mostra de Curtas IPC 2024</h3>
                            <p className="text-sm text-gray-600">Inscrições abertas! <a href="#" onClick={(e) => { e.preventDefault(); setActiveView(IntensiveView.OPPORTUNITIES);}} className="text-cyan-600 font-semibold hover:underline">Saiba mais</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
