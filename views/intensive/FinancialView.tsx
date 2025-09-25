import React, { useState } from 'react';
import { FinancialSubView } from '../../types';
import ScholarshipHistory from './financial/ScholarshipHistory';
import ProjectsHistory from './financial/ProjectsHistory';
import StockHistory from './financial/StockHistory';

const FinancialView: React.FC = () => {
    const [activeSubView, setActiveSubView] = useState<FinancialSubView>(FinancialSubView.SCHOLARSHIP);

    const renderSubView = () => {
        switch (activeSubView) {
            case FinancialSubView.PROJECTS:
                return <ProjectsHistory />;
            case FinancialSubView.STOCK:
                return <StockHistory />;
            case FinancialSubView.SCHOLARSHIP:
            default:
                return <ScholarshipHistory />;
        }
    };
    
    return (
        <div className="animate-[fadeInUp_0.5s_ease-out]">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Extrato Financeiro Detalhado</h1>
                <p className="text-gray-600 mt-2">Acompanhe todas as suas fontes de renda: bolsa, projetos e vendas de stock footage.</p>
            </div>

            <div className="flex items-center border-b border-gray-300 mb-6">
                 <button
                    onClick={() => setActiveSubView(FinancialSubView.SCHOLARSHIP)}
                    className={`py-3 px-6 font-semibold transition-colors flex items-center gap-2 ${activeSubView === FinancialSubView.SCHOLARSHIP ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
                >
                    Bolsa Estudo
                </button>
                 <button
                    onClick={() => setActiveSubView(FinancialSubView.PROJECTS)}
                    className={`py-3 px-6 font-semibold transition-colors flex items-center gap-2 ${activeSubView === FinancialSubView.PROJECTS ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
                >
                   Projetos & Jobs
                </button>
                 <button
                    onClick={() => setActiveSubView(FinancialSubView.STOCK)}
                    className={`py-3 px-6 font-semibold transition-colors flex items-center gap-2 ${activeSubView === FinancialSubView.STOCK ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
                >
                    Vendas de Stock
                </button>
            </div>

            <div className="bg-gray-50 -mx-6 md:-mx-10 p-6 md:p-10 rounded-lg shadow-inner">
                {renderSubView()}
            </div>
        </div>
    );
};

export default FinancialView;