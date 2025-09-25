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
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Stock Footage Marketplace</h1>
                <p className="text-gray-600 mt-2">Comercialize suas produções, explore o trabalho de outros alunos e gere uma nova fonte de renda.</p>
            </div>

            <div className="flex items-center border-b border-gray-300 mb-6">
                 <button
                    onClick={() => setActiveSubView(StockSubView.GALLERY)}
                    className={`py-3 px-6 font-semibold transition-colors flex items-center gap-2 ${activeSubView === StockSubView.GALLERY ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
                >
                    Galeria Geral
                </button>
                 <button
                    onClick={() => setActiveSubView(StockSubView.UPLOADS)}
                    className={`py-3 px-6 font-semibold transition-colors flex items-center gap-2 ${activeSubView === StockSubView.UPLOADS ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
                >
                   Meus Envios
                </button>
                 <button
                    onClick={() => setActiveSubView(StockSubView.EARNINGS)}
                    className={`py-3 px-6 font-semibold transition-colors flex items-center gap-2 ${activeSubView === StockSubView.EARNINGS ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
                >
                    Meus Ganhos
                </button>
            </div>

            <div className="bg-gray-50 -mx-6 md:-mx-10 p-6 md:p-10 rounded-lg shadow-inner">
                {renderSubView()}
            </div>
        </div>
    );
};

export default StockFootageView;