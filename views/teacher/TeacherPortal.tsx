import React, { useState } from 'react';
import { TeacherView } from '../../types';
import TeacherSidebar from './TeacherSidebar';
import TeacherMobileSidebar from './TeacherMobileSidebar';
import TeacherDashboardView from './TeacherDashboardView';
import TeacherStudentsView from './TeacherStudentsView';
import TeacherGradesView from './TeacherGradesView';
import TeacherCatalogView from './TeacherCatalogView';
import TeacherAnalyticsView from './TeacherAnalyticsView';
import TeacherCommunicationView from './TeacherCommunicationView';
import TeacherIAHubView from './TeacherIAHubView';
import TeacherProductionView from './TeacherProductionView';
import TeacherTrainingView from './TeacherTrainingView';
import TeacherCareerView from './TeacherCareerView';
import TeacherEquipmentView from './TeacherEquipmentView';
import TeacherNetworkingView from './TeacherNetworkingView';
import TeacherPointsView from './TeacherPointsView';
import TeacherStockView from './TeacherStockView';
import TeacherFinancialView from './TeacherFinancialView';
import TeacherAdminView from './TeacherAdminView';

interface TeacherPortalProps {
    onLogout: () => void;
}

const TeacherPortal: React.FC<TeacherPortalProps> = ({ onLogout }) => {
    const [activeView, setActiveView] = useState<TeacherView>(TeacherView.DASHBOARD);
    const [selectedCourse, setSelectedCourse] = useState<{ title: string, instructor: string } | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleViewChange = (view: TeacherView) => {
        setActiveView(view);
        setIsMobileSidebarOpen(false);
    };

    const handleSelectCourse = (course: { title: string, instructor: string }) => {
        setSelectedCourse(course);
    };

    const handleSelectStudent = (student: any) => {
        setSelectedStudent(student);
    };

    const renderActiveView = () => {
        switch (activeView) {
            case TeacherView.DASHBOARD:
                return (
                    <TeacherDashboardView 
                        setActiveView={setActiveView}
                        onSelectCourse={handleSelectCourse}
                    />
                );
            case TeacherView.STUDENTS:
                return (
                    <TeacherStudentsView 
                        setActiveView={setActiveView}
                        onSelectStudent={handleSelectStudent}
                    />
                );
            case TeacherView.GRADES:
                return (
                    <TeacherGradesView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.CATALOG:
                return (
                    <TeacherCatalogView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.COMMUNICATION:
                return (
                    <TeacherCommunicationView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.ANALYTICS:
                return (
                    <TeacherAnalyticsView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.IA_HUB:
                return (
                    <TeacherIAHubView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.PRODUCTION:
                return (
                    <TeacherProductionView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.TRAINING:
                return (
                    <TeacherTrainingView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.CAREER:
                return (
                    <TeacherCareerView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.EQUIPMENT:
                return (
                    <TeacherEquipmentView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.NETWORKING:
                return (
                    <TeacherNetworkingView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.POINTS:
                return (
                    <TeacherPointsView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.STOCK:
                return (
                    <TeacherStockView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.FINANCIAL:
                return (
                    <TeacherFinancialView 
                        setActiveView={setActiveView}
                    />
                );
            case TeacherView.ADMIN:
                return (
                    <TeacherAdminView 
                        setActiveView={setActiveView}
                    />
                );
            default:
                return (
                    <TeacherDashboardView 
                        setActiveView={setActiveView}
                        onSelectCourse={handleSelectCourse}
                    />
                );
        }
    };

    return (
        <section className="min-h-screen bg-gray-100">
            <TeacherMobileSidebar 
                activeView={activeView} 
                setActiveView={handleViewChange} 
                onLogout={onLogout}
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />
            <div className="flex">
                <TeacherSidebar 
                    activeView={activeView} 
                    setActiveView={handleViewChange} 
                    onLogout={onLogout}
                />
                <div className="flex-1 min-h-screen">
                    <div className="p-4 pt-16 lg:p-6 lg:pt-10">
                        {renderActiveView()}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeacherPortal;