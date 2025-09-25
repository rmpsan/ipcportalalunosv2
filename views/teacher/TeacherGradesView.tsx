import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    User,
    Edit,
    MessageCircle,
    CheckCircle,
    Clock,
    BarChart3,
    FileText,
    Plus,
    TrendingUp,
    Eye,
    Download
} from 'lucide-react';

const TeacherGradesView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');

    const students = [
        {
            id: 1,
            name: 'Ana Silva',
            email: 'ana.silva@email.com',
            class: 'IA Audiovisual 2024.1',
            average: 8.5,
            status: 'Aprovado',
            attendance: 95,
            lastGrade: 9.0,
            grades: [
                { subject: 'Direção', grade: 8.5, date: '2024-01-15' },
                { subject: 'Roteiro', grade: 9.0, date: '2024-01-10' },
                { subject: 'Edição', grade: 8.0, date: '2024-01-05' }
            ]
        },
        {
            id: 2,
            name: 'Carlos Santos',
            email: 'carlos.santos@email.com',
            class: 'Produção Avançada',
            average: 7.8,
            status: 'Aprovado',
            attendance: 88,
            lastGrade: 8.2,
            grades: [
                { subject: 'Motion Graphics', grade: 8.2, date: '2024-01-14' },
                { subject: 'Design', grade: 7.5, date: '2024-01-08' },
                { subject: 'Animação', grade: 7.8, date: '2024-01-03' }
            ]
        },
        {
            id: 3,
            name: 'Marina Costa',
            email: 'marina.costa@email.com',
            class: 'IA Audiovisual 2024.1',
            average: 9.2,
            status: 'Aprovado',
            attendance: 98,
            lastGrade: 9.5,
            grades: [
                { subject: 'Documentário', grade: 9.5, date: '2024-01-12' },
                { subject: 'Fotografia', grade: 9.0, date: '2024-01-07' },
                { subject: 'Som', grade: 9.1, date: '2024-01-02' }
            ]
        },
        {
            id: 4,
            name: 'João Oliveira',
            email: 'joao.oliveira@email.com',
            class: 'Motion Graphics',
            average: 6.8,
            status: 'Recuperação',
            attendance: 75,
            lastGrade: 7.0,
            grades: [
                { subject: 'Animação 2D', grade: 7.0, date: '2024-01-11' },
                { subject: 'Ilustração', grade: 6.5, date: '2024-01-06' },
                { subject: 'Composição', grade: 6.9, date: '2024-01-01' }
            ]
        },
        {
            id: 5,
            name: 'Beatriz Lima',
            email: 'beatriz.lima@email.com',
            class: 'Produção Avançada',
            average: 8.9,
            status: 'Aprovado',
            attendance: 92,
            lastGrade: 9.2,
            grades: [
                { subject: 'Produção', grade: 9.2, date: '2024-01-13' },
                { subject: 'Direção Arte', grade: 8.7, date: '2024-01-09' },
                { subject: 'Pós-produção', grade: 8.8, date: '2024-01-04' }
            ]
        }
    ];

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = !selectedClass || student.class.toLowerCase().includes(selectedClass.toLowerCase());
        const matchesPeriod = !selectedPeriod || student.class.includes(selectedPeriod);
        
        return matchesSearch && matchesClass && matchesPeriod;
    });

    const getGradeColor = (grade: number) => {
        if (grade >= 9) return 'text-green-600';
        if (grade >= 8) return 'text-blue-600';
        if (grade >= 7) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Aprovado':
                return 'bg-green-100 text-green-800';
            case 'Recuperação':
                return 'bg-yellow-100 text-yellow-800';
            case 'Reprovado':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="teacher-container p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div className="teacher-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Notas e Avaliações</h1>
                    <p className="text-gray-600 mt-1">Gerencie as notas e avaliações dos seus alunos</p>
                </div>
                <div className="teacher-actions flex flex-col sm:flex-row gap-2">
                    <button className="teacher-button flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Notas
                    </button>
                    <button className="teacher-button flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Avaliação
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="teacher-filters bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="teacher-search-container flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar aluno..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="teacher-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="teacher-filter-group flex flex-col sm:flex-row gap-2">
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="teacher-select px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="">Todas as turmas</option>
                            <option value="ia-audiovisual">IA Audiovisual</option>
                            <option value="producao">Produção</option>
                            <option value="motion">Motion Graphics</option>
                        </select>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="teacher-select px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="">Todos os períodos</option>
                            <option value="2024.1">2024.1</option>
                            <option value="2024.2">2024.2</option>
                        </select>
                        <button className="teacher-icon-button p-2 text-gray-600 hover:text-purple-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="teacher-stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="teacher-stat-card teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Média Geral</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">8.2</p>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Aprovados</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">89%</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pendentes</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">12</p>
                        </div>
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avaliações</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">45</p>
                        </div>
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile List View */}
            <div className="teacher-mobile-list lg:hidden">
                {filteredStudents.map((student) => (
                    <div key={student.id} className="teacher-card bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{student.name}</h3>
                                    <p className="text-sm text-gray-600">{student.class}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <button className="teacher-icon-button p-1 text-gray-600 hover:text-blue-600">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button className="teacher-icon-button p-1 text-gray-600 hover:text-green-600">
                                    <MessageCircle className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-gray-600">Média:</span>
                                <span className={`ml-2 font-medium ${getGradeColor(student.average)}`}>
                                    {student.average}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600">Status:</span>
                                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                                    {student.status}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600">Frequência:</span>
                                <span className="ml-2 font-medium text-gray-900">{student.attendance}%</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Última Nota:</span>
                                <span className="ml-2 font-medium text-gray-900">{student.lastGrade}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="teacher-table-container hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
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
                                    Média
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Frequência
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Última Nota
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
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                                <User className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                <div className="text-sm text-gray-500">{student.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {student.class}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`text-sm font-medium ${getGradeColor(student.average)}`}>
                                            {student.average}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {student.attendance}%
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {student.lastGrade}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button className="teacher-icon-button p-1 text-gray-600 hover:text-blue-600">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="teacher-icon-button p-1 text-gray-600 hover:text-green-600">
                                                <MessageCircle className="w-4 h-4" />
                                            </button>
                                            <button className="teacher-icon-button p-1 text-gray-600 hover:text-purple-600">
                                                <BarChart3 className="w-4 h-4" />
                                            </button>
                                            <button className="teacher-icon-button p-1 text-gray-600 hover:text-gray-800">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherGradesView;