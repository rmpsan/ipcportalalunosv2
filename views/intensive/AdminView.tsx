import React, { useState } from 'react';
import { AdminSubView } from '../../types';
import StudentDataSubView from './admin/StudentDataSubView';
import ScholarshipSubView from './admin/ScholarshipSubView';
import ProjectsSubView from './admin/ProjectsSubView';

const AdminView: React.FC = () => {
    const [activeSubView, setActiveSubView] = useState<AdminSubView>(AdminSubView.DATA);

    const renderSubView = () => {
        switch (activeSubView) {
            case AdminSubView.PAYMENTS:
                return <ScholarshipSubView />;
            case AdminSubView.PROJECTS:
                return <ProjectsSubView />;
            case AdminSubView.DATA:
            default:
                return <StudentDataSubView />;
        }
    };
    
    return (
        <div className="animate-[fadeInUp_0.5s_ease-out]">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Painel Administrativo</h1>
            <div className="flex items-center border-b border-gray-300 mb-6">
                 <button
                    onClick={() => setActiveSubView(AdminSubView.DATA)}
                    className={`py-3 px-6 font-semibold transition-colors ${activeSubView === AdminSubView.DATA ? 'bg-teal-500 text-white rounded-t-lg' : 'text-gray-600 hover:text-teal-600'}`}
                >
                    Dados do Aluno
                </button>
                 <button
                    onClick={() => setActiveSubView(AdminSubView.PAYMENTS)}
                    className={`py-3 px-6 font-semibold transition-colors ${activeSubView === AdminSubView.PAYMENTS ? 'bg-teal-500 text-white rounded-t-lg' : 'text-gray-600 hover:text-teal-600'}`}
                >
                    Pagamento de Bolsas
                </button>
                 <button
                    onClick={() => setActiveSubView(AdminSubView.PROJECTS)}
                    className={`py-3 px-6 font-semibold transition-colors ${activeSubView === AdminSubView.PROJECTS ? 'bg-teal-500 text-white rounded-t-lg' : 'text-gray-600 hover:text-teal-600'}`}
                >
                    Projetos Ativos
                </button>
            </div>
            {renderSubView()}
        </div>
    );
};

export default AdminView;