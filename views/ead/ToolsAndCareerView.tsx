import React from 'react';

const ToolsAndCareerView: React.FC = () => {
    return (
        <div className="animate-[fadeInUp_0.5s_ease-out] space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">IA Tools e Carreira</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* IA Tools */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Acesso Exploratório a IA</h2>
                    <p className="text-gray-600 mb-4">Use nossas ferramentas de IA (via API) para tarefas criativas e de produção. O uso é limitado para exploração.</p>
                    <textarea 
                        className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ex: 'Gere 3 ideias de logline para um curta de ficção científica...'"
                    ></textarea>
                    <button className="mt-2 w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
                        Gerar com IA
                    </button>
                </div>

                {/* Certificados */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Certificação Digital</h2>
                    <p className="text-gray-600 mb-4">Gere e baixe certificados de conclusão para os cursos e módulos EAD que você finalizar.</p>
                    <div className="space-y-3">
                        <div className="border p-3 rounded-md flex justify-between items-center">
                            <span>Introdução à IA Generativa</span>
                            <span className="text-sm font-bold text-green-600">Concluído</span>
                        </div>
                         <button className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors">
                            Baixar Certificado
                        </button>
                    </div>
                </div>
            </div>

            {/* Mural de Oportunidades */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                 <h2 className="text-2xl font-bold mb-4">Mural de Oportunidades</h2>
                 <p className="text-gray-600 mb-4">Fique de olho no mercado! O setor audiovisual tem um déficit de mais de 50.000 vagas.</p>
                 <div className="space-y-4">
                     <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-gray-800">Editor(a) de Vídeo Freelancer</h4>
                            <p className="text-sm text-gray-600">Diversas Empresas - Remoto</p>
                        </div>
                        <a href="#" className="text-teal-600 font-semibold hover:underline">Ver Mais</a>
                    </div>
                     <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-gray-800">Social Media Audiovisual</h4>
                            <p className="text-sm text-gray-600">Agência Digital - São Paulo, SP</p>
                        </div>
                        <a href="#" className="text-teal-600 font-semibold hover:underline">Ver Mais</a>
                    </div>
                 </div>
            </div>

        </div>
    );
};

export default ToolsAndCareerView;
