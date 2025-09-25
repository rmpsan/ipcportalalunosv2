import React, { useState } from 'react';

interface Grade {
    id: number;
    subject: string;
    assignment: string;
    grade: number;
    maxGrade: number;
    date: string;
    professor: string;
    professorAvatar: string;
    feedback: string;
    status: 'excellent' | 'good' | 'average' | 'needs_improvement';
}

interface Feedback {
    id: number;
    type: 'professor' | 'tutor';
    author: string;
    authorAvatar: string;
    subject: string;
    message: string;
    date: string;
    priority: 'high' | 'medium' | 'low';
    isRead: boolean;
}

const GradesAndFeedbackView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'grades' | 'feedback'>('grades');
    const [selectedPeriod, setSelectedPeriod] = useState('2024-1');

    const grades: Grade[] = [
        {
            id: 1,
            subject: 'Direção Cinematográfica',
            assignment: 'Projeto Final - Curta Metragem',
            grade: 9.2,
            maxGrade: 10,
            date: '2024-01-15',
            professor: 'Prof. Carlos Mendes',
            professorAvatar: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=CM',
            feedback: 'Excelente trabalho! A narrativa visual está muito bem construída. Continue explorando diferentes ângulos de câmera para enriquecer ainda mais suas produções.',
            status: 'excellent'
        },
        {
            id: 2,
            subject: 'Roteiro e Storytelling',
            assignment: 'Análise de Personagem',
            grade: 8.5,
            maxGrade: 10,
            date: '2024-01-12',
            professor: 'Profa. Ana Silva',
            professorAvatar: 'https://placehold.co/40x40/10B981/FFFFFF?text=AS',
            feedback: 'Boa análise psicológica dos personagens. Sugiro trabalhar mais o desenvolvimento do arco narrativo no segundo ato.',
            status: 'good'
        },
        {
            id: 3,
            subject: 'Edição e Pós-Produção',
            assignment: 'Montagem Rítmica',
            grade: 7.8,
            maxGrade: 10,
            date: '2024-01-10',
            professor: 'Prof. Roberto Lima',
            professorAvatar: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=RL',
            feedback: 'Técnica sólida, mas pode explorar mais a sincronização com a trilha sonora. Pratique mais os cortes no ritmo da música.',
            status: 'good'
        },
        {
            id: 4,
            subject: 'Produção Audiovisual',
            assignment: 'Plano de Produção',
            grade: 6.5,
            maxGrade: 10,
            date: '2024-01-08',
            professor: 'Prof. Marina Costa',
            professorAvatar: 'https://placehold.co/40x40/EF4444/FFFFFF?text=MC',
            feedback: 'O cronograma precisa ser mais detalhado. Revise os custos de produção e inclua mais alternativas para locações.',
            status: 'needs_improvement'
        }
    ];

    const feedbacks: Feedback[] = [
        {
            id: 1,
            type: 'professor',
            author: 'Prof. Carlos Mendes',
            authorAvatar: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=CM',
            subject: 'Parabéns pelo progresso!',
            message: 'Notei uma evolução significativa na sua técnica de direção. Seu último projeto demonstra maturidade artística. Continue assim!',
            date: '2024-01-16',
            priority: 'high',
            isRead: false
        },
        {
            id: 2,
            type: 'tutor',
            author: 'Tutor João Santos',
            authorAvatar: 'https://placehold.co/40x40/10B981/FFFFFF?text=JS',
            subject: 'Dicas para o próximo projeto',
            message: 'Baseado no seu perfil criativo, sugiro explorar o gênero documentário no próximo semestre. Tenho alguns contatos que podem ajudar.',
            date: '2024-01-14',
            priority: 'medium',
            isRead: true
        },
        {
            id: 3,
            type: 'professor',
            author: 'Profa. Ana Silva',
            authorAvatar: 'https://placehold.co/40x40/10B981/FFFFFF?text=AS',
            subject: 'Oportunidade de Mentoria',
            message: 'Gostaria de te convidar para participar do programa de mentoria avançada em roteiro. Sua dedicação merece esse reconhecimento.',
            date: '2024-01-13',
            priority: 'high',
            isRead: false
        },
        {
            id: 4,
            type: 'tutor',
            author: 'Tutora Beatriz Oliveira',
            authorAvatar: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=BO',
            subject: 'Recursos adicionais',
            message: 'Separei alguns materiais complementares sobre cinematografia que podem te interessar. Vou enviar por email.',
            date: '2024-01-11',
            priority: 'low',
            isRead: true
        }
    ];

    const getGradeColor = (status: string) => {
        switch (status) {
            case 'excellent': return 'text-green-600 bg-green-100';
            case 'good': return 'text-blue-600 bg-blue-100';
            case 'average': return 'text-yellow-600 bg-yellow-100';
            case 'needs_improvement': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const calculateAverage = () => {
        const total = grades.reduce((sum, grade) => sum + grade.grade, 0);
        return (total / grades.length).toFixed(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 animate-[fadeInUp_0.5s_ease-out] -m-6 md:-m-10">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">📊 Notas e Feedback</h1>
                    <p className="text-indigo-100">Acompanhe seu desempenho acadêmico e receba orientações personalizadas</p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('grades')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'grades'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            📈 Notas e Avaliações
                        </button>
                        <button
                            onClick={() => setActiveTab('feedback')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'feedback'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            💬 Feedback dos Educadores
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                {activeTab === 'grades' && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Média Geral</p>
                                        <p className="text-3xl font-bold text-indigo-600">{calculateAverage()}</p>
                                    </div>
                                    <div className="bg-indigo-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Disciplinas</p>
                                        <p className="text-3xl font-bold text-green-600">{grades.length}</p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Melhor Nota</p>
                                        <p className="text-3xl font-bold text-purple-600">9.2</p>
                                    </div>
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Período</p>
                                        <select 
                                            value={selectedPeriod}
                                            onChange={(e) => setSelectedPeriod(e.target.value)}
                                            className="text-lg font-bold text-gray-800 bg-transparent border-none focus:outline-none"
                                        >
                                            <option value="2024-1">2024.1</option>
                                            <option value="2023-2">2023.2</option>
                                            <option value="2023-1">2023.1</option>
                                        </select>
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Grades List */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800">Avaliações Recentes</h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {grades.map((grade) => (
                                    <div key={grade.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <img 
                                                        src={grade.professorAvatar} 
                                                        alt={grade.professor}
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800">{grade.subject}</h4>
                                                        <p className="text-sm text-gray-600">{grade.assignment}</p>
                                                        <p className="text-xs text-gray-500">{grade.professor} • {new Date(grade.date).toLocaleDateString('pt-BR')}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-700 italic">"{grade.feedback}"</p>
                                                </div>
                                            </div>
                                            <div className="ml-6 text-right">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-3xl font-bold text-gray-800">{grade.grade}</span>
                                                    <span className="text-lg text-gray-500">/{grade.maxGrade}</span>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(grade.status)}`}>
                                                    {grade.status === 'excellent' && 'Excelente'}
                                                    {grade.status === 'good' && 'Bom'}
                                                    {grade.status === 'average' && 'Regular'}
                                                    {grade.status === 'needs_improvement' && 'Precisa Melhorar'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'feedback' && (
                    <div className="space-y-6">
                        {/* Feedback Stats */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Mensagens Não Lidas</p>
                                        <p className="text-3xl font-bold text-red-600">{feedbacks.filter(f => !f.isRead).length}</p>
                                    </div>
                                    <div className="bg-red-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total de Feedbacks</p>
                                        <p className="text-3xl font-bold text-blue-600">{feedbacks.length}</p>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.745C2.512 15.042 2 13.574 2 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Educadores Ativos</p>
                                        <p className="text-3xl font-bold text-green-600">4</p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback List */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800">Mensagens dos Educadores</h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {feedbacks.map((feedback) => (
                                    <div key={feedback.id} className={`p-6 hover:bg-gray-50 transition-colors ${!feedback.isRead ? 'bg-blue-50' : ''}`}>
                                        <div className="flex items-start gap-4">
                                            <div className="relative">
                                                <img 
                                                    src={feedback.authorAvatar} 
                                                    alt={feedback.author}
                                                    className="w-12 h-12 rounded-full"
                                                />
                                                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getPriorityColor(feedback.priority)}`}></div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-gray-800">{feedback.author}</h4>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            feedback.type === 'professor' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                                                        }`}>
                                                            {feedback.type === 'professor' ? 'Professor' : 'Tutor'}
                                                        </span>
                                                        {!feedback.isRead && (
                                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-gray-500">{new Date(feedback.date).toLocaleDateString('pt-BR')}</span>
                                                </div>
                                                <h5 className="font-medium text-gray-800 mb-2">{feedback.subject}</h5>
                                                <p className="text-gray-700">{feedback.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GradesAndFeedbackView;