import React, { useState } from 'react';
import { TeacherView } from '../../../types';

interface TeacherMobileSidebarProps {
    activeView: TeacherView;
    setActiveView: (view: TeacherView) => void;
    onLogout: () => void;
}

const TeacherMobileSidebar: React.FC<TeacherMobileSidebarProps> = ({ activeView, setActiveView, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

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

    const handleMenuClick = (view: TeacherView) => {
        setActiveView(view);
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between px-4 h-16">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">👨‍🏫</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Portal Professor</h1>
                        </div>
                    </div>

                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">PF</span>
                    </div>
                </div>
            </header>

            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`lg:hidden fixed top-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">👨‍🏫</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Portal Professor</h1>
                            <p className="text-xs text-gray-500">IPC Audiovisual</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.id)}
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
        </>
    );
};

export default TeacherMobileSidebar;