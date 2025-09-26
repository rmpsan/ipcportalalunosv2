import React from 'react';
import { 
    LayoutDashboard, 
    Video, 
    FileText, 
    BarChart3, 
    Briefcase, 
    Users, 
    GraduationCap, 
    MessageSquare,
    Settings,
    HelpCircle,
    Building2,
    LogOut,
    X,
    PlayCircle,
    Plus,
    Eye,
    FolderPlus
} from 'lucide-react';
import { CompanyView } from '../../../types';

interface CompanyMobileSidebarProps {
    currentView: CompanyView;
    onViewChange: (view: CompanyView) => void;
    onLogout: () => void;
    companyName: string;
    isOpen: boolean;
    onClose: () => void;
}

const CompanyMobileSidebar: React.FC<CompanyMobileSidebarProps> = ({ 
    currentView, 
    onViewChange, 
    onLogout,
    companyName,
    isOpen,
    onClose
}) => {
    const menuItems = [
        {
            id: CompanyView.DASHBOARD,
            label: 'Dashboard',
            icon: LayoutDashboard,
        },
        {
            id: CompanyView.STOCK_FOOTAGE,
            label: 'Stock Footage',
            icon: Video,
        },
        {
            id: CompanyView.PROJECTS,
            label: 'Projetos',
            icon: FileText,
        },
        {
            id: CompanyView.JOBS,
            label: 'Vagas',
            icon: Briefcase,
        },
        {
            id: CompanyView.TALENT_SEARCH,
            label: 'Busca de Talentos',
            icon: Users,
        },
        {
            id: CompanyView.ANALYTICS,
            label: 'Analytics',
            icon: BarChart3,
        },
        {
            id: CompanyView.PRODUCTION_REQUESTS,
            label: 'Solicitações',
            icon: FileText,
        },
        {
            id: CompanyView.PROJECT_TRACKING,
            label: 'Acompanhamento',
            icon: BarChart3,
        },
        {
            id: CompanyView.STUDENT_HISTORY,
            label: 'Histórico Acadêmico',
            icon: GraduationCap,
        },
        {
            id: CompanyView.FEEDBACK_SYSTEM,
            label: 'Feedback',
            icon: MessageSquare,
        },
        {
            id: CompanyView.VIDEO_REVIEW,
            label: 'Revisão de Vídeos',
            icon: PlayCircle,
        },
        {
            id: CompanyView.NEW_PRODUCTION_REQUEST,
            label: 'Nova Solicitação',
            icon: Plus,
        },
        {
            id: CompanyView.POST_JOB,
            label: 'Postar Vaga',
            icon: Plus,
        },
        {
            id: CompanyView.VIEW_JOBS,
            label: 'Ver Vagas',
            icon: Eye,
        },
        {
            id: CompanyView.NEW_PROJECT,
            label: 'Novo Projeto',
            icon: FolderPlus,
        },
        {
            id: CompanyView.VIEW_PROJECTS,
            label: 'Ver Projetos',
            icon: Eye,
        },
        {
            id: CompanyView.SETTINGS,
            label: 'Configurações',
            icon: Settings,
        },
        {
            id: CompanyView.SUPPORT,
            label: 'Suporte',
            icon: HelpCircle,
        }
    ];

    const handleItemClick = (view: CompanyView) => {
        onViewChange(view);
        onClose();
    };

    const handleLogout = () => {
        onLogout();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={onClose}
            />
            
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 rounded-lg p-2">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-white truncate">{companyName}</h2>
                                <p className="text-sm text-blue-100">Portal Empresarial</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </header>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <div className="px-4 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentView === item.id;
                            
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item.id)}
                                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-l-4 border-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className={`w-5 h-5 mr-3 ${
                                        isActive ? 'text-blue-600' : 'text-gray-400'
                                    }`} />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="w-5 h-5 mr-3 text-red-500" />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default CompanyMobileSidebar;