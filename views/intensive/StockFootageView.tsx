import React, { useState } from 'react';
import { StockSubView } from '../../types';
import StockGallerySubView from './stock/StockGallerySubView';
import MyUploadsSubView from './stock/MyUploadsSubView';
import StockEarningsSubView from './stock/StockEarningsSubView';

const StockFootageView: React.FC = () => {
    const [activeSubView, setActiveSubView] = useState<StockSubView>(StockSubView.GALLERY);

    const renderSubView = () => {
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
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Stock Footage Marketplace</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2">Comercialize suas produções, explore o trabalho de outros alunos e gere uma nova fonte de renda.</p>
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

            <div className="bg-gray-50 -mx-4 sm:-mx-6 md:-mx-10 p-4 sm:p-6 md:p-10 rounded-lg shadow-inner">
                {renderSubView()}
            </div>
        </div>
    );
};

export default StockFootageView;