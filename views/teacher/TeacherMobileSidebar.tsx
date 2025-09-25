import React from 'react';
import { TeacherView } from '../../types';
import { 
    LayoutDashboard, 
    Users, 
    ClipboardCheck, 
    BookOpen, 
    BarChart3, 
    MessageCircle,
    LogOut,
    GraduationCap,
    Bot,
    Video,
    Briefcase,
    Camera,
    Globe,
    Star,
    Film,
    DollarSign,
    Settings,
    X
} from 'lucide-react';

interface TeacherMobileSidebarProps {
    activeView: TeacherView;
    setActiveView: (view: TeacherView) => void;
    onLogout: () => void;
    isOpen: boolean;
    onClose: () => void;
}

const TeacherMobileSidebar: React.FC<TeacherMobileSidebarProps> = ({ 
    activeView, 
    setActiveView, 
    onLogout, 
    isOpen, 
    onClose 
}) => {
    const menuItems = [
        { id: TeacherView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
        { id: TeacherView.STUDENTS, label: 'Alunos', icon: Users },
        { id: TeacherView.GRADES, label: 'Avaliações', icon: ClipboardCheck },
        { id: TeacherView.CATALOG, label: 'Conteúdos', icon: BookOpen },
        { id: TeacherView.ANALYTICS, label: 'Relatórios', icon: BarChart3 },
        { id: TeacherView.COMMUNICATION, label: 'Comunicação', icon: MessageCircle },
        { id: TeacherView.IA_HUB, label: 'Hub de IA', icon: Bot },
        { id: TeacherView.PRODUCTION, label: 'Produção', icon: Video },
        { id: TeacherView.TRAINING, label: 'Formação', icon: GraduationCap },
        { id: TeacherView.CAREER, label: 'Carreira', icon: Briefcase },
        { id: TeacherView.EQUIPMENT, label: 'Equipamentos', icon: Camera },
        { id: TeacherView.NETWORKING, label: 'Networking', icon: Globe },
        { id: TeacherView.POINTS, label: 'Pontuação', icon: Star },
        { id: TeacherView.STOCK, label: 'Stock', icon: Film },
        { id: TeacherView.FINANCIAL, label: 'Financeiro', icon: DollarSign },
        { id: TeacherView.ADMIN, label: 'Admin', icon: Settings },
    ];

    const handleItemClick = (view: TeacherView) => {
        setActiveView(view);
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
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            
            {/* Mobile Sidebar */}
            <div className={`teacher-mobile-sidebar fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="teacher-sidebar-header">
                    <div className="flex items-center justify-between">
                        <div className="teacher-sidebar-logo">
                            <GraduationCap className="w-8 h-8" />
                            <span>Portal Professor</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                
                <nav className="teacher-sidebar-nav flex-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveView(item.id);
                                    onClose();
                                }}
                                className={`teacher-nav-item w-full ${
                                    activeView === item.id ? 'active' : ''
                                }`}
                            >
                                <IconComponent className="teacher-nav-icon" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="teacher-sidebar-footer p-4 border-t border-white/10">
                    <button className="teacher-nav-item w-full text-red-300 hover:text-red-200 hover:bg-red-500/10">
                        <LogOut className="teacher-nav-icon" />
                        <span>Sair</span>
                    </button>
                </div>
            </div>

            {/* Bottom Navigation for Mobile */}
            <div className="teacher-mobile-sidebar lg:hidden">
                <div className="flex justify-around">
                    {menuItems.slice(0, 5).map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveView(item.id)}
                                className={`teacher-mobile-nav-item ${
                                    activeView === item.id ? 'active' : ''
                                }`}
                            >
                                <IconComponent className="teacher-mobile-nav-icon" />
                                <span className="teacher-mobile-nav-text">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default TeacherMobileSidebar;