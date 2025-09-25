import React, { useState } from 'react';
import { EadView } from '../../types';
import EadSidebar from './EadSidebar';
import CatalogView from './CatalogView';
import CourseDetailView from './CourseDetailView';
import ToolsAndCareerView from './ToolsAndCareerView';

const EadPortal: React.FC = () => {
    const [activeView, setActiveView] = useState<EadView>(EadView.CATALOG);
    const [selectedCourse, setSelectedCourse] = useState<{title: string, instructor: string} | null>(null);

    // This would be triggered from App.tsx in a real app
    const handleLogout = () => window.location.reload();

    const handleSelectCourse = (course: {title: string, instructor: string}) => {
        setSelectedCourse(course);
        setActiveView(EadView.COURSE_DETAIL);
    };

    const handleBackToCatalog = () => {
        setSelectedCourse(null);
        setActiveView(EadView.CATALOG);
    };
    
    const renderActiveView = () => {
        switch (activeView) {
            case EadView.COURSE_DETAIL:
                return <CourseDetailView course={selectedCourse!} onBack={handleBackToCatalog} />;
            case EadView.TOOLS_CAREER:
                return <ToolsAndCareerView />;
            case EadView.CATALOG:
            default:
                return <CatalogView onSelectCourse={handleSelectCourse} />;
        }
    };

    return (
        <section className="min-h-screen bg-gray-100">
            <div className="flex">
                <EadSidebar activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />
                <div className="flex-1 p-6 md:p-10 text-gray-800">
                    {renderActiveView()}
                </div>
            </div>
        </section>
    );
};

export default EadPortal;
