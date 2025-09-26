import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { CompanyView } from '../../types';
import CompanySidebar from './components/CompanySidebar';
import CompanyMobileSidebar from './components/CompanyMobileSidebar';
import CompanyDashboardView from './CompanyDashboardView';
import CompanyStockFootageView from './CompanyStockFootageView';
import CompanyProjectsView from './CompanyProjectsView';
import CompanyJobsView from './CompanyJobsView';
import CompanyTalentSearchView from './CompanyTalentSearchView';
import CompanyAnalyticsView from './CompanyAnalyticsView';
import CompanySettingsView from './CompanySettingsView';
import CompanyProductionRequestsView from './CompanyProductionRequestsView';
import CompanyProjectTrackingView from './CompanyProjectTrackingView';
import CompanyTalentBankView from './CompanyTalentBankView';
import CompanyStudentHistoryView from './CompanyStudentHistoryView';
import CompanyFeedbackSystemView from './CompanyFeedbackSystemView';
import CompanySupportView from './CompanySupportView';
import CompanyVideoReviewView from './CompanyVideoReviewView';
import CompanyNewProductionRequestView from './CompanyNewProductionRequestView';
import CompanyPostJobView from './CompanyPostJobView';
import CompanyViewJobsView from './CompanyViewJobsView';
import CompanyNewProjectView from './CompanyNewProjectView';
import CompanyViewProjectsView from './CompanyViewProjectsView';

interface CompanyPortalProps {
    onLogout: () => void;
}

const CompanyPortal: React.FC<CompanyPortalProps> = ({ onLogout }) => {
    const [currentView, setCurrentView] = useState<CompanyView>(CompanyView.DASHBOARD);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const renderCurrentView = () => {
        switch (currentView) {
            case CompanyView.DASHBOARD:
                return <CompanyDashboardView onViewChange={setCurrentView} />;
            case CompanyView.STOCK_FOOTAGE:
                return <CompanyStockFootageView />;
            case CompanyView.PROJECTS:
                return <CompanyProjectsView />;
            case CompanyView.JOBS:
                return <CompanyJobsView />;
            case CompanyView.TALENT_SEARCH:
                return <CompanyTalentSearchView />;
            case CompanyView.ANALYTICS:
                return <CompanyAnalyticsView />;
            case CompanyView.SETTINGS:
                return <CompanySettingsView />;
            case CompanyView.PRODUCTION_REQUESTS:
                return <CompanyProductionRequestsView />;
            case CompanyView.PROJECT_TRACKING:
                return <CompanyProjectTrackingView />;
            case CompanyView.JOB_MANAGEMENT:
                return <div className="p-6"><h1 className="text-2xl font-bold">Gestão de Vagas (Legacy) - Em Desenvolvimento</h1></div>;
            case CompanyView.TALENT_BANK:
                return <CompanyTalentBankView />;
            case CompanyView.STUDENT_HISTORY:
                return <CompanyStudentHistoryView />;
            case CompanyView.FEEDBACK_SYSTEM:
                return <CompanyFeedbackSystemView />;
            case CompanyView.VIDEO_REVIEW:
                return <CompanyVideoReviewView />;
            case CompanyView.NEW_PRODUCTION_REQUEST:
                return <CompanyNewProductionRequestView onViewChange={setCurrentView} />;
            case CompanyView.POST_JOB:
                return <CompanyPostJobView onViewChange={setCurrentView} />;
            case CompanyView.VIEW_JOBS:
                return <CompanyViewJobsView onViewChange={setCurrentView} />;
            case CompanyView.NEW_PROJECT:
                return <CompanyNewProjectView onViewChange={setCurrentView} />;
            case CompanyView.VIEW_PROJECTS:
                return <CompanyViewProjectsView onViewChange={setCurrentView} />;
            case CompanyView.SUPPORT:
                return <CompanySupportView />;
            default:
                return <CompanyDashboardView />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <CompanySidebar
                    currentView={currentView}
                    onViewChange={setCurrentView}
                    onLogout={onLogout}
                    companyName="Empresa"
                />
            </div>

            {/* Mobile Sidebar */}
            <CompanyMobileSidebar
                currentView={currentView}
                onViewChange={setCurrentView}
                onLogout={onLogout}
                companyName="Empresa"
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsMobileSidebarOpen(true)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-900">Portal Empresarial</h1>
                        <div className="w-10" /> {/* Spacer for centering */}
                    </div>
                </div>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto">
                    {renderCurrentView()}
                </main>
            </div>
        </div>
    );
};

export default CompanyPortal;