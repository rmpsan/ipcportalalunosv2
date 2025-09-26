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
    PlayCircle,
    Plus,
    Eye,
    FolderPlus
} from 'lucide-react';
import { CompanyView } from '../../../types';

interface CompanySidebarProps {
    currentView: CompanyView;
    onViewChange: (view: CompanyView) => void;
    onLogout: () => void;
    companyName: string;
}

const CompanySidebar: React.FC<CompanySidebarProps> = ({ 
    currentView, 
    onViewChange, 
    onLogout,
    companyName 
}) => {
    const menuItems = [
        {
            id: CompanyView.DASHBOARD,
            label: 'Dashboard',
            icon: LayoutDashboard,
            description: 'Visão geral e métricas'
        },
        {
            id: CompanyView.STOCK_FOOTAGE,
            label: 'Stock Footage',
            icon: Video,
            description: 'Catálogo de vídeos'
        },
        {
            id: CompanyView.PROJECTS,
            label: 'Projetos',
            icon: FileText,
            description: 'Gerenciamento de projetos'
        },
        {
            id: CompanyView.JOBS,
            label: 'Vagas',
            icon: Briefcase,
            description: 'Gestão de oportunidades'
        },
        {
            id: CompanyView.TALENT_SEARCH,
            label: 'Busca de Talentos',
            icon: Users,
            description: 'Busca por profissionais'
        },
        {
            id: CompanyView.ANALYTICS,
            label: 'Analytics',
            icon: BarChart3,
            description: 'Relatórios e métricas'
        },
        {
            id: CompanyView.PRODUCTION_REQUESTS,
            label: 'Solicitações',
            icon: FileText,
            description: 'Orçamentos de produção'
        },
        {
            id: CompanyView.PROJECT_TRACKING,
            label: 'Acompanhamento',
            icon: BarChart3,
            description: 'Status dos projetos'
        },
        {
            id: CompanyView.STUDENT_HISTORY,
            label: 'Histórico Acadêmico',
            icon: GraduationCap,
            description: 'Notas e desempenho'
        },
        {
            id: CompanyView.FEEDBACK_SYSTEM,
            label: 'Feedback',
            icon: MessageSquare,
            description: 'Avaliações de contratados'
        },
        {
            id: CompanyView.VIDEO_REVIEW,
            label: 'Revisão de Vídeos',
            icon: PlayCircle,
            description: 'Revisar projetos de vídeo'
        },
        {
            id: CompanyView.NEW_PRODUCTION_REQUEST,
            label: 'Nova Solicitação',
            icon: Plus,
            description: 'Criar nova solicitação de produção'
        },
        {
            id: CompanyView.POST_JOB,
            label: 'Postar Vaga',
            icon: Plus,
            description: 'Publicar nova oportunidade'
        },
        {
            id: CompanyView.VIEW_JOBS,
            label: 'Ver Vagas',
            icon: Eye,
            description: 'Visualizar vagas publicadas'
        },
        {
            id: CompanyView.NEW_PROJECT,
            label: 'Novo Projeto',
            icon: FolderPlus,
            description: 'Criar novo projeto'
        },
        {
            id: CompanyView.VIEW_PROJECTS,
            label: 'Ver Projetos',
            icon: Eye,
            description: 'Visualizar projetos criados'
        }
    ];

    const bottomMenuItems = [
        {
            id: CompanyView.SETTINGS,
            label: 'Configurações',
            icon: Settings,
            description: 'Configurações da conta'
        },
        {
            id: CompanyView.SUPPORT,
            label: 'Suporte',
            icon: HelpCircle,
            description: 'Ajuda e suporte'
        }
    ];

    return (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 truncate">{companyName}</h2>
                        <p className="text-sm text-gray-500">Portal Empresarial</p>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.id;
                        
                        return (
                            <button
                                key={item.id}
                                onClick={() => onViewChange(item.id)}
                                className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-all duration-200 group ${
                                    isActive
                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-l-4 border-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Icon className={`w-5 h-5 mr-3 ${
                                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                                }`} />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate">{item.label}</div>
                                    <div className="text-xs text-gray-500 truncate">{item.description}</div>
                                </div>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Navigation */}
            <div className="border-t border-gray-200 p-4">
                <nav className="space-y-1">
                    {bottomMenuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.id;
                        
                        return (
                            <button
                                key={item.id}
                                onClick={() => onViewChange(item.id)}
                                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-all duration-200 group ${
                                    isActive
                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Icon className={`w-5 h-5 mr-3 ${
                                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                                }`} />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                    
                    {/* Logout Button */}
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-all duration-200 group text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="w-5 h-5 mr-3 text-red-500 group-hover:text-red-600" />
                        <span className="font-medium">Sair</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default CompanySidebar;