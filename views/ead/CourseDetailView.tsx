import React from 'react';

interface CourseDetailViewProps {
    course: { title: string; instructor: string; };
    onBack: () => void;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, onBack }) => {
    return (
        <div className="animate-[fadeInUp_0.5s_ease-out]">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Voltar para o Catálogo
            </button>
            <div className="lg:flex lg:gap-8">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    {/* Video Player */}
                    <div className="aspect-video bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                        <iframe 
                            src="https://www.youtube.com/embed/laiLTJNT9LI" 
                            title="IA Edita Sozinha no DaVinci Resolve! Editor Copilot e Triplique Sua Produtividade Tokens Gratis !"
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6">{course.title}</h1>
                    <p className="text-lg text-gray-600 mt-2">Progresso: 25%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '25%'}}></div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3 mt-8 lg:mt-0 space-y-6">
                    {/* Instructor Profile */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Instrutor</h3>
                        <div className="flex items-center gap-4">
                            <img src="https://i.pravatar.cc/80" alt={course.instructor} className="w-16 h-16 rounded-full" />
                            <div>
                                <h4 className="font-bold text-lg">{course.instructor}</h4>
                                <p className="text-sm text-gray-600">Especialista com 15+ anos de mercado</p>
                            </div>
                        </div>
                    </div>

                    {/* Materials */}
                     <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Materiais Didáticos</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="flex items-center gap-2 text-teal-600 hover:underline"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" /></svg> Slides da Aula (PDF)</a></li>
                             <li><a href="#" className="flex items-center gap-2 text-teal-600 hover:underline"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg> Referências Externas</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailView;
