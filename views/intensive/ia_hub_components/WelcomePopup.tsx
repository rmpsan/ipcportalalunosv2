import React from 'react';

interface WelcomePopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-[fadeInUp_0.3s_ease-out]">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">🚀 Bem-vindo ao Hub de IA!</h2>
                            <p className="text-purple-100">Seu playground exclusivo de Inteligência Artificial</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    {/* Intro */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">🎓 Acesso Educacional Gratuito</h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Como aluno do Instituto Paulista de Cinema, você tem acesso <strong>100% gratuito</strong> às principais ferramentas de IA do mercado. 
                            Explore, experimente e crie sem limites!
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* LLMs Playground */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-500 p-2 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.745C2.512 15.042 2 13.574 2 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-800">Playground LLMs</h4>
                            </div>
                            <p className="text-gray-600 mb-4">Converse com as principais IAs:</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    <strong>Claude 3.5 Sonnet</strong> - Criatividade avançada
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <strong>ChatGPT-4</strong> - Versatilidade total
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <strong>Gemini Pro</strong> - Análise profunda
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                    <strong>Llama 3.1</strong> - Código e desenvolvimento
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <strong>Mistral Large</strong> - Estratégia criativa
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                    <strong>Perplexity</strong> - Pesquisa inteligente
                                </li>
                            </ul>
                        </div>

                        {/* Video AI Tools */}
                        <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-6 rounded-xl border border-pink-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-pink-500 p-2 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-800">IA para Vídeo</h4>
                            </div>
                            <p className="text-gray-600 mb-4">Ferramentas premium de vídeo:</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                    <strong>Runway ML</strong> - Texto para vídeo
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <strong>Pika Labs</strong> - Vídeos cinematográficos
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <strong>OpenAI Sora</strong> - Ultra-realismo
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    <strong>Stable Video</strong> - Imagem para vídeo
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                    <strong>Luma Dream</strong> - Vídeos 3D
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                    <strong>Synthesia</strong> - Avatares IA
                                </li>
                            </ul>
                        </div>

                        {/* Templates & Prompts */}
                        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-green-500 p-2 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-800">Templates & Prompts</h4>
                            </div>
                            <p className="text-gray-600 mb-4">Prompts profissionais para:</p>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <strong>Roteiro & Storytelling</strong>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                    <strong>Produção & Direção</strong>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    <strong>Pós-Produção</strong>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <strong>Marketing & Distribuição</strong>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* How to Use */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-2xl">💡</span>
                            Como usar o Hub de IA
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">1</div>
                                <div>
                                    <p className="font-semibold text-gray-800">Escolha sua ferramenta</p>
                                    <p className="text-gray-600">Use a sidebar para navegar entre Playground, IA para Vídeo e Templates</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</div>
                                <div>
                                    <p className="font-semibold text-gray-800">Selecione a IA ideal</p>
                                    <p className="text-gray-600">Cada LLM tem especialidades diferentes para seu projeto</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">3</div>
                                <div>
                                    <p className="font-semibold text-gray-800">Comece a criar</p>
                                    <p className="text-gray-600">Use prompts específicos ou templates prontos para melhores resultados</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl">
                        <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">🎯 Benefícios Exclusivos IPC</h4>
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">✨ Sem limites de uso</span>
                            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">🎓 Suporte educacional</span>
                            <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">💰 100% gratuito</span>
                            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">🚀 APIs premium</span>
                            <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">🎬 Foco audiovisual</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-6 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Este popup aparece sempre que você acessar o Hub de IA</span>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
                        >
                            Fechar
                        </button>
                        <button 
                            onClick={onClose}
                            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all font-medium shadow-lg"
                        >
                            Começar a Explorar! 🚀
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePopup;