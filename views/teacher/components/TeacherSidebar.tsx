import React from 'react';
import { TeacherView } from '../../../types';

interface TeacherSidebarProps {
    activeView: TeacherView;
    setActiveView: (view: TeacherView) => void;
    onLogout: () => void;
}

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ activeView, setActiveView, onLogout }) => {
    const menuItems = [
        { id: TeacherView.DASHBOARD, label: 'Dashboard', icon: '📊' },
        { id: TeacherView.STUDENTS, label: 'Alunos', icon: '👥' },
        { id: TeacherView.GRADES, label: 'Avaliações', icon: '📝' },
        { id: TeacherView.CATALOG, label: 'Conteúdos', icon: '📚' },
        { id: TeacherView.ANALYTICS, label: 'Relatórios', icon: '📈' },
        { id: TeacherView.IA_HUB, label: 'Hub de IA', icon: '🤖' },
        { id: TeacherView.PRODUCTION, label: 'Produção', icon: '🎬' },
        { id: TeacherView.TRAINING, label: 'Formação', icon: '🎓' },
        { id: TeacherView.CAREER, label: 'Carreira', icon: '💼' },
        { id: TeacherView.EQUIPMENT, label: 'Equipamentos', icon: '📹' },
        { id: TeacherView.NETWORKING, label: 'Networking', icon: '🌐' },
        { id: TeacherView.POINTS, label: 'Pontuação', icon: '⭐' },
        { id: TeacherView.STOCK, label: 'Stock', icon: '🎞️' },
        { id: TeacherView.FINANCIAL, label: 'Financeiro', icon: '💰' },
        { id: TeacherView.ADMIN, label: 'Admin', icon: '⚙️' },
    ];

    return (
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">👨‍🏫</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Portal Professor</h1>
                        <p className="text-xs text-gray-500">IPC Audiovisual</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                            activeView === item.id
                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">PF</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Prof. Fernando</p>
                        <p className="text-xs text-gray-500 truncate">Coordenador</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <span className="mr-2">🚪</span>
                    Sair
                </button>
            </div>
        </aside>
    );
};

export default TeacherSidebar;