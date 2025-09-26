import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    User, 
    Calendar, 
    Award, 
    BookOpen, 
    TrendingUp, 
    Eye, 
    Download, 
    Star,
    Clock,
    MapPin,
    Phone,
    Mail,
    GraduationCap,
    Briefcase,
    Camera,
    Video,
    Palette,
    Code,
    Users,
    FileText,
    CheckCircle,
    AlertCircle,
    XCircle,
    BarChart3,
    PieChart,
    Activity
} from 'lucide-react';

interface StudentRecord {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    course: string;
    semester: number;
    status: 'active' | 'graduated' | 'dropped' | 'suspended';
    enrollmentDate: string;
    graduationDate?: string;
    gpa: number;
    totalCredits: number;
    completedCredits: number;
    specialization: string[];
    skills: string[];
    projects: {
        id: string;
        title: string;
        type: string;
        grade: number;
        date: string;
        description: string;
    }[];
    internships: {
        company: string;
        position: string;
        startDate: string;
        endDate?: string;
        current: boolean;
        description: string;
    }[];
    certifications: {
        name: string;
        issuer: string;
        date: string;
        expiryDate?: string;
    }[];
    performance: {
        attendance: number;
        punctuality: number;
        participation: number;
        teamwork: number;
        creativity: number;
        technical: number;
    };
    notes: string;
    lastActivity: string;
}

const CompanyStudentHistoryView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [courseFilter, setCourseFilter] = useState<string>('all');
    const [specializationFilter, setSpecializationFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

    // Mock data
    const mockStudents: StudentRecord[] = [
        {
            id: '1',
            name: 'Ana Carolina Silva',
            email: 'ana.silva@email.com',
            phone: '(11) 99999-1234',
            avatar: '/api/placeholder/100/100',
            course: 'Produção Audiovisual',
            semester: 8,
            status: 'graduated',
            enrollmentDate: '2020-02-15',
            graduationDate: '2023-12-15',
            gpa: 9.2,
            totalCredits: 240,
            completedCredits: 240,
            specialization: ['Direção de Fotografia', 'Pós-Produção'],
            skills: ['Fotografia', 'Premiere Pro', 'After Effects', 'Lightroom', 'DaVinci Resolve'],
            projects: [
                {
                    id: '1',
                    title: 'Documentário "Vozes da Cidade"',
                    type: 'TCC',
                    grade: 9.5,
                    date: '2023-11-20',
                    description: 'Documentário sobre artistas de rua em São Paulo'
                },
                {
                    id: '2',
                    title: 'Curta-metragem "Reflexos"',
                    type: 'Projeto Final',
                    grade: 9.0,
                    date: '2023-06-15',
                    description: 'Drama psicológico sobre identidade'
                }
            ],
            internships: [
                {
                    company: 'Globo Filmes',
                    position: 'Assistente de Direção de Fotografia',
                    startDate: '2023-01-15',
                    endDate: '2023-06-30',
                    current: false,
                    description: 'Trabalhou em 3 longas-metragens como assistente'
                }
            ],
            certifications: [
                {
                    name: 'Adobe Certified Expert - Premiere Pro',
                    issuer: 'Adobe',
                    date: '2023-03-10',
                    expiryDate: '2025-03-10'
                }
            ],
            performance: {
                attendance: 95,
                punctuality: 92,
                participation: 88,
                teamwork: 90,
                creativity: 95,
                technical: 93
            },
            notes: 'Aluna exemplar com excelente desempenho técnico e criativo. Demonstrou liderança em projetos colaborativos.',
            lastActivity: '2024-01-15'
        },
        {
            id: '2',
            name: 'Carlos Eduardo Santos',
            email: 'carlos.santos@email.com',
            phone: '(21) 98888-5678',
            avatar: '/api/placeholder/100/100',
            course: 'Design Gráfico',
            semester: 6,
            status: 'active',
            enrollmentDate: '2021-08-20',
            gpa: 8.7,
            totalCredits: 180,
            completedCredits: 135,
            specialization: ['UI/UX Design', 'Branding'],
            skills: ['Figma', 'Adobe Creative Suite', 'Sketch', 'Prototyping', 'HTML/CSS'],
            projects: [
                {
                    id: '3',
                    title: 'Redesign App Banco Digital',
                    type: 'Projeto Semestral',
                    grade: 8.8,
                    date: '2023-12-10',
                    description: 'Redesign completo da interface de um aplicativo bancário'
                }
            ],
            internships: [
                {
                    company: 'StartupTech',
                    position: 'Designer UI/UX Júnior',
                    startDate: '2023-08-01',
                    current: true,
                    description: 'Desenvolvimento de interfaces para aplicativos mobile'
                }
            ],
            certifications: [
                {
                    name: 'Google UX Design Certificate',
                    issuer: 'Google',
                    date: '2023-09-15'
                }
            ],
            performance: {
                attendance: 88,
                punctuality: 85,
                participation: 92,
                teamwork: 87,
                creativity: 91,
                technical: 89
            },
            notes: 'Aluno dedicado com forte aptidão para design de interfaces. Precisa melhorar pontualidade.',
            lastActivity: '2024-01-18'
        },
        {
            id: '3',
            name: 'Marina Oliveira Costa',
            email: 'marina.costa@email.com',
            phone: '(31) 97777-9012',
            avatar: '/api/placeholder/100/100',
            course: 'Marketing Digital',
            semester: 4,
            status: 'active',
            enrollmentDate: '2022-02-10',
            gpa: 9.0,
            totalCredits: 120,
            completedCredits: 80,
            specialization: ['Social Media', 'Performance Marketing'],
            skills: ['Google Ads', 'Facebook Ads', 'Analytics', 'Copywriting', 'Canva'],
            projects: [
                {
                    id: '4',
                    title: 'Campanha Digital Sustentabilidade',
                    type: 'Projeto Integrador',
                    grade: 9.2,
                    date: '2023-11-30',
                    description: 'Campanha completa para conscientização ambiental'
                }
            ],
            internships: [],
            certifications: [
                {
                    name: 'Google Ads Certified',
                    issuer: 'Google',
                    date: '2023-10-05',
                    expiryDate: '2024-10-05'
                }
            ],
            performance: {
                attendance: 96,
                punctuality: 94,
                participation: 95,
                teamwork: 93,
                creativity: 88,
                technical: 85
            },
            notes: 'Aluna proativa e engajada. Excelente em trabalhos em equipe e apresentações.',
            lastActivity: '2024-01-20'
        },
        {
            id: '4',
            name: 'Roberto Lima Ferreira',
            email: 'roberto.ferreira@email.com',
            phone: '(61) 96666-3456',
            avatar: '/api/placeholder/100/100',
            course: 'Desenvolvimento Web',
            semester: 7,
            status: 'active',
            enrollmentDate: '2021-02-15',
            gpa: 8.5,
            totalCredits: 210,
            completedCredits: 180,
            specialization: ['Full Stack', 'Mobile Development'],
            skills: ['React', 'Node.js', 'Python', 'MongoDB', 'React Native', 'AWS'],
            projects: [
                {
                    id: '5',
                    title: 'Plataforma E-learning',
                    type: 'TCC em Desenvolvimento',
                    grade: 0,
                    date: '2024-06-30',
                    description: 'Sistema completo de ensino à distância'
                }
            ],
            internships: [
                {
                    company: 'TechCorp',
                    position: 'Desenvolvedor Full Stack',
                    startDate: '2023-03-01',
                    current: true,
                    description: 'Desenvolvimento de aplicações web e mobile'
                }
            ],
            certifications: [
                {
                    name: 'AWS Cloud Practitioner',
                    issuer: 'Amazon',
                    date: '2023-07-20'
                }
            ],
            performance: {
                attendance: 82,
                punctuality: 78,
                participation: 85,
                teamwork: 88,
                creativity: 82,
                technical: 95
            },
            notes: 'Aluno com excelente conhecimento técnico, mas precisa melhorar assiduidade.',
            lastActivity: '2024-01-17'
        },
        {
            id: '5',
            name: 'Juliana Mendes Rocha',
            email: 'juliana.rocha@email.com',
            phone: '(41) 95555-7890',
            avatar: '/api/placeholder/100/100',
            course: 'Produção Audiovisual',
            semester: 2,
            status: 'dropped',
            enrollmentDate: '2023-08-15',
            gpa: 6.5,
            totalCredits: 60,
            completedCredits: 25,
            specialization: ['Edição de Vídeo'],
            skills: ['Premiere Pro', 'Photoshop'],
            projects: [],
            internships: [],
            certifications: [],
            performance: {
                attendance: 65,
                punctuality: 60,
                participation: 55,
                teamwork: 70,
                creativity: 75,
                technical: 68
            },
            notes: 'Aluna com potencial criativo, mas enfrentou dificuldades de adaptação ao curso.',
            lastActivity: '2023-11-20'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'graduated': return 'bg-blue-100 text-blue-800';
            case 'dropped': return 'bg-red-100 text-red-800';
            case 'suspended': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'graduated': return <GraduationCap className="w-4 h-4" />;
            case 'dropped': return <XCircle className="w-4 h-4" />;
            case 'suspended': return <AlertCircle className="w-4 h-4" />;
            default: return <User className="w-4 h-4" />;
        }
    };

    const getPerformanceColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 80) return 'text-yellow-600';
        if (score >= 70) return 'text-orange-600';
        return 'text-red-600';
    };

    const filteredStudents = mockStudents.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.course.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
        const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
        const matchesSpecialization = specializationFilter === 'all' || 
            student.specialization.some(spec => spec.toLowerCase().includes(specializationFilter.toLowerCase()));
        
        return matchesSearch && matchesStatus && matchesCourse && matchesSpecialization;
    });

    const sortedStudents = [...filteredStudents].sort((a, b) => {
        switch (sortBy) {
            case 'name': return a.name.localeCompare(b.name);
            case 'gpa': return b.gpa - a.gpa;
            case 'semester': return b.semester - a.semester;
            case 'enrollment': return new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime();
            default: return 0;
        }
    });

    const stats = {
        total: mockStudents.length,
        active: mockStudents.filter(s => s.status === 'active').length,
        graduated: mockStudents.filter(s => s.status === 'graduated').length,
        dropped: mockStudents.filter(s => s.status === 'dropped').length,
        avgGpa: (mockStudents.reduce((sum, s) => sum + s.gpa, 0) / mockStudents.length).toFixed(1),
        avgCompletion: Math.round(mockStudents.reduce((sum, s) => sum + (s.completedCredits / s.totalCredits * 100), 0) / mockStudents.length)
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Histórico de Alunos</h1>
                        <p className="text-gray-600 mt-1">Acompanhe o desempenho e progresso dos estudantes</p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setViewMode('cards')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                viewMode === 'cards' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Cards
                        </button>
                        <button 
                            onClick={() => setViewMode('table')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                viewMode === 'table' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Tabela
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Exportar
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                    <div className="text-sm text-gray-600">Ativos</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.graduated}</div>
                    <div className="text-sm text-gray-600">Formados</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-red-600">{stats.dropped}</div>
                    <div className="text-sm text-gray-600">Desistentes</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.avgGpa}</div>
                    <div className="text-sm text-gray-600">Média Geral</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{stats.avgCompletion}%</div>
                    <div className="text-sm text-gray-600">Conclusão Média</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar por nome, email ou curso..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="active">Ativo</option>
                            <option value="graduated">Formado</option>
                            <option value="dropped">Desistente</option>
                            <option value="suspended">Suspenso</option>
                        </select>

                        <select
                            value={courseFilter}
                            onChange={(e) => setCourseFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todos os Cursos</option>
                            <option value="Produção Audiovisual">Produção Audiovisual</option>
                            <option value="Design Gráfico">Design Gráfico</option>
                            <option value="Marketing Digital">Marketing Digital</option>
                            <option value="Desenvolvimento Web">Desenvolvimento Web</option>
                        </select>

                        <select
                            value={specializationFilter}
                            onChange={(e) => setSpecializationFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todas as Especializações</option>
                            <option value="fotografia">Fotografia</option>
                            <option value="design">Design</option>
                            <option value="desenvolvimento">Desenvolvimento</option>
                            <option value="marketing">Marketing</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="name">Nome</option>
                            <option value="gpa">Melhor Média</option>
                            <option value="semester">Semestre</option>
                            <option value="enrollment">Data de Matrícula</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Students Cards */}
            {viewMode === 'cards' && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {sortedStudents.map((student) => (
                        <div key={student.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            {/* Student Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">{student.name}</h3>
                                    <p className="text-sm text-gray-600 mb-1">{student.course}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(student.status)}`}>
                                            {getStatusIcon(student.status)}
                                            {student.status === 'active' && 'Ativo'}
                                            {student.status === 'graduated' && 'Formado'}
                                            {student.status === 'dropped' && 'Desistente'}
                                            {student.status === 'suspended' && 'Suspenso'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Info */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <div className="text-sm text-gray-600">Semestre</div>
                                    <div className="font-medium">{student.semester}º</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Média Geral</div>
                                    <div className={`font-medium ${getPerformanceColor(student.gpa * 10)}`}>
                                        {student.gpa.toFixed(1)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Progresso</div>
                                    <div className="font-medium">
                                        {Math.round((student.completedCredits / student.totalCredits) * 100)}%
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Projetos</div>
                                    <div className="font-medium">{student.projects.length}</div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Créditos</span>
                                    <span>{student.completedCredits}/{student.totalCredits}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full" 
                                        style={{ width: `${(student.completedCredits / student.totalCredits) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Specializations */}
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-1">
                                    {student.specialization.slice(0, 2).map((spec, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                            {spec}
                                        </span>
                                    ))}
                                    {student.specialization.length > 2 && (
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                            +{student.specialization.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setSelectedStudent(student.id)}
                                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    Ver Detalhes
                                </button>
                                <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Students Table */}
            {viewMode === 'table' && (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aluno
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Curso
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Semestre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Média
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Progresso
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                                    <User className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                    <div className="text-sm text-gray-500">{student.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {student.course}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(student.status)}`}>
                                                {getStatusIcon(student.status)}
                                                {student.status === 'active' && 'Ativo'}
                                                {student.status === 'graduated' && 'Formado'}
                                                {student.status === 'dropped' && 'Desistente'}
                                                {student.status === 'suspended' && 'Suspenso'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {student.semester}º
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm font-medium ${getPerformanceColor(student.gpa * 10)}`}>
                                                {student.gpa.toFixed(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                    <div 
                                                        className="bg-blue-600 h-2 rounded-full" 
                                                        style={{ width: `${(student.completedCredits / student.totalCredits) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {Math.round((student.completedCredits / student.totalCredits) * 100)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => setSelectedStudent(student.id)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                Ver
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Student Detail Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                        {(() => {
                            const student = mockStudents.find(s => s.id === selectedStudent);
                            if (!student) return null;

                            return (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-semibold">Detalhes do Aluno</h3>
                                        <button 
                                            onClick={() => setSelectedStudent(null)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {/* Left Column - Basic Info */}
                                        <div className="md:col-span-1">
                                            <div className="text-center mb-6">
                                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <User className="w-12 h-12 text-gray-400" />
                                                </div>
                                                <h4 className="text-xl font-semibold mb-1">{student.name}</h4>
                                                <p className="text-gray-600 mb-2">{student.course}</p>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit mx-auto ${getStatusColor(student.status)}`}>
                                                    {getStatusIcon(student.status)}
                                                    {student.status === 'active' && 'Ativo'}
                                                    {student.status === 'graduated' && 'Formado'}
                                                    {student.status === 'dropped' && 'Desistente'}
                                                    {student.status === 'suspended' && 'Suspenso'}
                                                </span>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <h5 className="font-medium mb-2">Contato</h5>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Mail className="w-4 h-4 text-gray-400" />
                                                            {student.email}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="w-4 h-4 text-gray-400" />
                                                            {student.phone}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h5 className="font-medium mb-2">Informações Acadêmicas</h5>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Semestre:</span>
                                                            <span>{student.semester}º</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Média Geral:</span>
                                                            <span className={getPerformanceColor(student.gpa * 10)}>
                                                                {student.gpa.toFixed(1)}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Créditos:</span>
                                                            <span>{student.completedCredits}/{student.totalCredits}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Matrícula:</span>
                                                            <span>{new Date(student.enrollmentDate).toLocaleDateString('pt-BR')}</span>
                                                        </div>
                                                        {student.graduationDate && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Formatura:</span>
                                                                <span>{new Date(student.graduationDate).toLocaleDateString('pt-BR')}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column - Detailed Info */}
                                        <div className="md:col-span-2">
                                            <div className="space-y-6">
                                                {/* Performance Chart */}
                                                <div>
                                                    <h5 className="font-medium mb-3">Desempenho</h5>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        {Object.entries(student.performance).map(([key, value]) => (
                                                            <div key={key} className="text-center">
                                                                <div className="text-sm text-gray-600 mb-1 capitalize">
                                                                    {key === 'attendance' && 'Frequência'}
                                                                    {key === 'punctuality' && 'Pontualidade'}
                                                                    {key === 'participation' && 'Participação'}
                                                                    {key === 'teamwork' && 'Trabalho em Equipe'}
                                                                    {key === 'creativity' && 'Criatividade'}
                                                                    {key === 'technical' && 'Técnico'}
                                                                </div>
                                                                <div className={`text-lg font-semibold ${getPerformanceColor(value)}`}>
                                                                    {value}%
                                                                </div>
                                                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                                                    <div 
                                                                        className={`h-2 rounded-full ${
                                                                            value >= 90 ? 'bg-green-500' :
                                                                            value >= 80 ? 'bg-yellow-500' :
                                                                            value >= 70 ? 'bg-orange-500' : 'bg-red-500'
                                                                        }`}
                                                                        style={{ width: `${value}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Specializations */}
                                                <div>
                                                    <h5 className="font-medium mb-3">Especializações</h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {student.specialization.map((spec, index) => (
                                                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                                {spec}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Skills */}
                                                <div>
                                                    <h5 className="font-medium mb-3">Habilidades</h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {student.skills.map((skill, index) => (
                                                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Projects */}
                                                <div>
                                                    <h5 className="font-medium mb-3">Projetos</h5>
                                                    <div className="space-y-3">
                                                        {student.projects.map((project) => (
                                                            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <h6 className="font-medium">{project.title}</h6>
                                                                    <span className="text-sm text-gray-500">{project.type}</span>
                                                                </div>
                                                                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                                                                <div className="flex justify-between items-center text-sm">
                                                                    <span className="text-gray-500">
                                                                        {new Date(project.date).toLocaleDateString('pt-BR')}
                                                                    </span>
                                                                    {project.grade > 0 && (
                                                                        <span className={`font-medium ${getPerformanceColor(project.grade * 10)}`}>
                                                                            Nota: {project.grade.toFixed(1)}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {student.projects.length === 0 && (
                                                            <p className="text-gray-500 text-sm">Nenhum projeto registrado</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Internships */}
                                                <div>
                                                    <h5 className="font-medium mb-3">Estágios</h5>
                                                    <div className="space-y-3">
                                                        {student.internships.map((internship, index) => (
                                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <h6 className="font-medium">{internship.company}</h6>
                                                                    {internship.current && (
                                                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                                                            Atual
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm text-gray-600 mb-2">{internship.position}</p>
                                                                <p className="text-sm text-gray-600 mb-2">{internship.description}</p>
                                                                <div className="text-sm text-gray-500">
                                                                    {new Date(internship.startDate).toLocaleDateString('pt-BR')} - {
                                                                        internship.current ? 'Atual' : 
                                                                        internship.endDate ? new Date(internship.endDate).toLocaleDateString('pt-BR') : 'Não informado'
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {student.internships.length === 0 && (
                                                            <p className="text-gray-500 text-sm">Nenhum estágio registrado</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Certifications */}
                                                <div>
                                                    <h5 className="font-medium mb-3">Certificações</h5>
                                                    <div className="space-y-3">
                                                        {student.certifications.map((cert, index) => (
                                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                                <h6 className="font-medium">{cert.name}</h6>
                                                                <p className="text-sm text-gray-600">{cert.issuer}</p>
                                                                <div className="text-sm text-gray-500 mt-1">
                                                                    Emitido em: {new Date(cert.date).toLocaleDateString('pt-BR')}
                                                                    {cert.expiryDate && (
                                                                        <span> • Expira em: {new Date(cert.expiryDate).toLocaleDateString('pt-BR')}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {student.certifications.length === 0 && (
                                                            <p className="text-gray-500 text-sm">Nenhuma certificação registrada</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Notes */}
                                                <div>
                                                    <h5 className="font-medium mb-3">Observações</h5>
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <p className="text-sm text-gray-700">{student.notes}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {sortedStudents.length === 0 && (
                <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum aluno encontrado</h3>
                    <p className="text-gray-600">Tente ajustar os filtros para encontrar mais estudantes.</p>
                </div>
            )}
        </div>
    );
};

export default CompanyStudentHistoryView;