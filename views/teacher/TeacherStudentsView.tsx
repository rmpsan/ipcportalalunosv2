import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Users, 
    Mail, 
    Phone, 
    MapPin, 
    Calendar,
    TrendingUp,
    TrendingDown,
    Minus,
    Eye,
    Edit,
    MoreHorizontal,
    UserPlus,
    Download,
    Upload,
    MessageCircle
} from 'lucide-react';

const TeacherStudentsView: React.FC = () => {
    const [selectedClass, setSelectedClass] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTab, setSelectedTab] = useState('students');

    const classes = [
        { id: 'all', name: 'Todas as Turmas', students: 65 },
        { id: 'ia-2024-1', name: 'IA Audiovisual 2024.1', students: 28 },
        { id: 'producao-avancada', name: 'Produção Avançada', students: 15 },
        { id: 'motion-graphics', name: 'Workshop Motion Graphics', students: 22 }
    ];

    const students = [
        {
            id: 1,
            name: 'Ana Silva',
            email: 'ana.silva@email.com',
            class: 'IA Audiovisual 2024.1',
            progress: 85,
            lastAccess: '2 horas atrás',
            status: 'active',
            avatar: '👩‍🎓',
            projects: 3,
            grade: 8.5
        },
        {
            id: 2,
            name: 'Carlos Santos',
            email: 'carlos.santos@email.com',
            class: 'Produção Avançada',
            progress: 92,
            lastAccess: '1 hora atrás',
            status: 'active',
            avatar: '👨‍🎓',
            projects: 5,
            grade: 9.2
        },
        {
            id: 3,
            name: 'Marina Costa',
            email: 'marina.costa@email.com',
            class: 'IA Audiovisual 2024.1',
            progress: 78,
            lastAccess: '3 horas atrás',
            status: 'active',
            avatar: '👩‍🎓',
            projects: 2,
            grade: 7.8
        },
        {
            id: 4,
            name: 'João Oliveira',
            email: 'joao.oliveira@email.com',
            class: 'Motion Graphics',
            progress: 95,
            lastAccess: '30 min atrás',
            status: 'active',
            avatar: '👨‍🎓',
            projects: 4,
            grade: 9.5
        },
        {
            id: 5,
            name: 'Beatriz Lima',
            email: 'beatriz.lima@email.com',
            class: 'IA Audiovisual 2024.1',
            progress: 45,
            lastAccess: '2 dias atrás',
            status: 'inactive',
            avatar: '👩‍🎓',
            projects: 1,
            grade: 6.5
        }
    ];

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = selectedClass === 'all' || student.class === classes.find(c => c.id === selectedClass)?.name;
        return matchesSearch && matchesClass;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-50';
            case 'inactive': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return 'bg-green-500';
        if (progress >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="teacher-container p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div className="teacher-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Gerenciar Alunos</h1>
                    <p className="text-gray-600 mt-1">Visualize e gerencie informações dos seus alunos</p>
                </div>
                <div className="teacher-actions flex flex-col sm:flex-row gap-2">
                    <button className="teacher-button flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Lista
                    </button>
                    <button className="teacher-button flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Adicionar Aluno
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <div className="teacher-filters flex flex-col lg:flex-row gap-4">
                    <div className="teacher-search-container flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar alunos..."
                                className="teacher-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="teacher-filter-group flex flex-col sm:flex-row gap-2">
                        <select className="teacher-select px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            <option value="">Todas as Turmas</option>
                            <option value="ia-audiovisual">IA Audiovisual</option>
                            <option value="producao-avancada">Produção Avançada</option>
                            <option value="motion-graphics">Motion Graphics</option>
                        </select>
                        <select className="teacher-select px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            <option value="">Todos os Status</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                            <option value="pendente">Pendente</option>
                        </select>
                        <button className="teacher-button teacher-icon-button p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Students Grid/List */}
            <div className="teacher-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Mobile View */}
                <div className="lg:hidden">
                    <div className="teacher-mobile-list divide-y divide-gray-200">
                        {filteredStudents.map((student) => (
                            <div key={student.id} className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{student.name}</h3>
                                            <p className="text-sm text-gray-600">{student.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                                        {student.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Turma:</span>
                                        <p className="font-medium">{student.class}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Progresso:</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-purple-600 h-2 rounded-full" 
                                                    style={{ width: `${student.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium">{student.progress}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="teacher-button flex-1 flex items-center justify-center px-3 py-2 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        Mensagem
                                    </button>
                                    <button className="teacher-button flex-1 flex items-center justify-center px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
                                        <Eye className="w-4 h-4 mr-1" />
                                        Ver Perfil
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block">
                    <div className="teacher-table-container overflow-x-auto">
                        <table className="teacher-table w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aluno
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Turma
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Progresso
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Última Atividade
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <User className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                    <div className="text-sm text-gray-500">{student.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {student.class}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                    <div 
                                                        className="bg-purple-600 h-2 rounded-full" 
                                                        style={{ width: `${student.progress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-900">{student.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {student.lastActivity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button className="teacher-button teacher-icon-button text-purple-600 hover:text-purple-900">
                                                <MessageCircle className="w-4 h-4" />
                                            </button>
                                            <button className="teacher-button teacher-icon-button text-gray-600 hover:text-gray-900">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="teacher-button teacher-icon-button text-gray-600 hover:text-gray-900">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherStudentsView;