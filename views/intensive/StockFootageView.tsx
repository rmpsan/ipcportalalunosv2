import React, { useState, useEffect } from 'react';
import { StockSubView } from '../../types';
import StockGallerySubView from './stock/StockGallerySubView';
import MyUploadsSubView from './stock/MyUploadsSubView';
import StockEarningsSubView from './stock/StockEarningsSubView';
import StockInfoPopup from './stock/StockInfoPopup';
import ChallengesView from './stock/ChallengesView';

const StockFootageView: React.FC = () => {
    const [activeSubView, setActiveSubView] = useState<StockSubView>(StockSubView.GALLERY);
    const [showInfoPopup, setShowInfoPopup] = useState(false);
    const [showChallenges, setShowChallenges] = useState(false);

    useEffect(() => {
        // Mostrar popup sempre que acessar a tela
        setShowInfoPopup(true);
    }, []);

    const renderSubView = () => {
        if (showChallenges) {
            return <ChallengesView />;
        }

        switch (activeSubView) {
            case StockSubView.UPLOADS:
                return <MyUploadsSubView />;
            case StockSubView.EARNINGS:
                return <StockEarningsSubView />;
            case StockSubView.GALLERY:
            default:
                return <StockGallerySubView />;
        }
    };
    
    return (
        <div className="animate-[fadeInUp_0.5s_ease-out]">
            <StockInfoPopup 
                isOpen={showInfoPopup} 
                onClose={() => setShowInfoPopup(false)} 
            />
            
            {!showChallenges ? (
                <>
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Stock Footage Marketplace</h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-2">Comercialize suas produções, explore o trabalho de outros alunos e gere uma nova fonte de renda.</p>
                    </div>

                    {/* Card de Desafios */}
                    <div className="mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Desafios de Conteúdo</h3>
                                    <p className="text-purple-100">Acelere sua pontuação e desbloqueie benefícios exclusivos</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowChallenges(true)}
                                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2"
                            >
                                <span>Ver Desafios</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Benefícios em destaque */}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm">Pontos Extras</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">Troca de Nível</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-orange-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">Conteúdo Exclusivo</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-300 mb-4 md:mb-6 overflow-x-auto">
                        <div className="flex w-full sm:w-auto">
                            <button
                                onClick={() => setActiveSubView(StockSubView.GALLERY)}
                                className={`py-2 sm:py-3 px-3 sm:px-6 font-semibold transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap ${activeSubView === StockSubView.GALLERY ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
                            >
                                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                                <span className="hidden sm:inline">Galeria Geral</span>
                                <span className="sm:hidden">Galeria</span>
                            </button>
                            <button
                                onClick={() => setActiveSubView(StockSubView.UPLOADS)}
                                className={`py-2 sm:py-3 px-3 sm:px-6 font-semibold transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap ${activeSubView === StockSubView.UPLOADS ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
                            >
                                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="hidden sm:inline">Meus Envios</span>
                                <span className="sm:hidden">Envios</span>
                            </button>
                            <button
                                onClick={() => setActiveSubView(StockSubView.EARNINGS)}
                                className={`py-2 sm:py-3 px-3 sm:px-6 font-semibold transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap ${activeSubView === StockSubView.EARNINGS ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
                            >
                                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                                <span className="hidden sm:inline">Meus Ganhos</span>
                                <span className="sm:hidden">Ganhos</span>
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="mb-4">
                    <button
                        onClick={() => setShowChallenges(false)}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Voltar ao Stock Footage
                    </button>
                </div>
            )}

            <div className={`${!showChallenges ? 'bg-gray-50 -mx-4 sm:-mx-6 md:-mx-10 p-4 sm:p-6 md:p-10 rounded-lg shadow-inner' : ''}`}>
                {renderSubView()}
            </div>
        </div>
    );
};

export default StockFootageView;