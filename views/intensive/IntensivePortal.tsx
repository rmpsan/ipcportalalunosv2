import React, { useState, useCallback } from 'react';
import { AppView, IntensiveView, ProfileData, Job, Opportunity } from '../../types';
import Sidebar from '../../components/Sidebar';
import DashboardView from './DashboardView';
import IAHubView from './IAHubView';
import ProductionView from './ProductionView';
import TrainingView from './TrainingView';
import CareerView from './CareerView';
import EquipmentSchedulingView from './EquipmentSchedulingView';
import CatalogView from '../ead/CatalogView';
import CourseDetailView from '../ead/CourseDetailView';
import AdminView from './AdminView';
import StockFootageView from './StockFootageView';
import FinancialView from './FinancialView';
import JobDetailView from './JobDetailView';
import OpportunitiesHubView from './OpportunitiesHubView';
import OpportunityDetailView from './OpportunityDetailView';

interface IntensivePortalProps {
    onNavigate: (view: AppView) => void;
    profileData: ProfileData;
    setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const IntensivePortal: React.FC<IntensivePortalProps> = ({ onNavigate, profileData, setProfileData }) => {
    const [activeView, setActiveView] = useState<IntensiveView>(IntensiveView.DASHBOARD);
    const [selectedCourse, setSelectedCourse] = useState<{title: string, instructor: string} | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

    const handleLogout = useCallback(() => {
        window.location.reload();
    }, []);

    const handleSelectCourse = (course: {title: string, instructor: string}) => {
        setSelectedCourse(course);
        setActiveView(IntensiveView.COURSE_DETAIL);
    };

    const handleSelectJob = (job: Job) => {
        setSelectedJob(job);
        setActiveView(IntensiveView.JOB_DETAIL);
    };

    const handleSelectOpportunity = (opportunity: Opportunity) => {
        setSelectedOpportunity(opportunity);
        setActiveView(IntensiveView.OPPORTUNITY_DETAIL);
    };

    const handleBackToCatalog = () => {
        setSelectedCourse(null);
        setActiveView(IntensiveView.CATALOG);
    };

    const handleBackToCareers = () => {
        setSelectedJob(null);
        setActiveView(IntensiveView.CARREIRA);
    };
    
    const handleBackToOpportunities = () => {
        setSelectedOpportunity(null);
        setActiveView(IntensiveView.OPPORTUNITIES);
    };

    const renderActiveView = () => {
        switch (activeView) {
            case IntensiveView.IA_HUB:
                return <IAHubView />;
            case IntensiveView.PRODUCAO:
                return <ProductionView setActiveView={setActiveView} />;
            case IntensiveView.FORMACAO:
                return <TrainingView />;
            case IntensiveView.CARREIRA:
                return <CareerView onNavigate={onNavigate} profileData={profileData} setProfileData={setProfileData} onSelectJob={handleSelectJob} />;
            case IntensiveView.EQUIPMENT:
                return <EquipmentSchedulingView setActiveView={setActiveView} />;
            case IntensiveView.CATALOG:
                return <CatalogView onSelectCourse={handleSelectCourse} />;
            case IntensiveView.COURSE_DETAIL:
                if (!selectedCourse) {
                    return <CatalogView onSelectCourse={handleSelectCourse} />;
                }
                return <CourseDetailView course={selectedCourse} onBack={handleBackToCatalog} />;
            case IntensiveView.JOB_DETAIL:
                if (!selectedJob) {
                    return <CareerView onNavigate={onNavigate} profileData={profileData} setProfileData={setProfileData} onSelectJob={handleSelectJob} />;
                }
                return <JobDetailView job={selectedJob} onBack={handleBackToCareers} />;
            case IntensiveView.OPPORTUNITIES:
                return <OpportunitiesHubView onSelectOpportunity={handleSelectOpportunity} />;
            case IntensiveView.OPPORTUNITY_DETAIL:
                 if (!selectedOpportunity) {
                    return <OpportunitiesHubView onSelectOpportunity={handleSelectOpportunity} />;
                }
                return <OpportunityDetailView opportunity={selectedOpportunity} onBack={handleBackToOpportunities} />;
            case IntensiveView.ADMIN:
                return <AdminView />;
            case IntensiveView.STOCK:
                return <StockFootageView />;
            case IntensiveView.FINANCEIRO:
                return <FinancialView />;
            case IntensiveView.DASHBOARD:
            default:
                return <DashboardView setActiveView={setActiveView} onSelectCourse={handleSelectCourse} />;
        }
    }

    return (
        <section className="min-h-screen bg-gray-100">
            <div className="flex">
                <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />
                <div className="flex-1">
                    {/* Remove padding for certain views to allow full-width content */}
                    <div className={
                        [IntensiveView.CATALOG, IntensiveView.COURSE_DETAIL, IntensiveView.JOB_DETAIL, IntensiveView.OPPORTUNITY_DETAIL].includes(activeView) 
                        ? '' 
                        : 'p-6 md:p-10'
                    }>
                         {renderActiveView()}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntensivePortal;