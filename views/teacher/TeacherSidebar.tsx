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
    Settings
} from 'lucide-react';

interface TeacherSidebarProps {
    activeView: TeacherView;
    setActiveView: (view: TeacherView) => void;
    onLogout: () => void;
}

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ activeView, setActiveView, onLogout }) => {
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

    return (
        <div className="teacher-sidebar w-64 h-full flex flex-col">
            <div className="teacher-sidebar-header">
                <div className="teacher-sidebar-logo">
                    <GraduationCap className="w-8 h-8" />
                    <span>Portal Professor</span>
                </div>
            </div>
            
            <nav className="teacher-sidebar-nav flex-1">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
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
                <button
                    onClick={onLogout}
                    className="teacher-nav-item w-full text-red-300 hover:text-red-200 hover:bg-red-500/10"
                >
                    <LogOut className="teacher-nav-icon" />
                    <span>Sair</span>
                </button>
            </div>
        </div>
    );
};

export default TeacherSidebar;