import React, { useState } from 'react';

interface Contact {
    id: number;
    name: string;
    role: 'professor' | 'tutor' | 'sponsor';
    avatar: string;
    department: string;
    expertise: string[];
    connectionDate: string;
    lastInteraction: string;
    status: 'online' | 'offline' | 'busy';
    achievements: string[];
    isStarred: boolean;
    messageCount: number;
}

interface Message {
    id: number;
    contactId: number;
    sender: 'me' | 'contact';
    message: string;
    timestamp: string;
    type: 'text' | 'achievement' | 'opportunity';
}

const NetworkingView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'professor' | 'tutor' | 'sponsor'>('all');
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const contacts: Contact[] = [
        {
            id: 1,
            name: 'Prof. Carlos Mendes',
            role: 'professor',
            avatar: 'https://placehold.co/50x50/3B82F6/FFFFFF?text=CM',
            department: 'Direção Cinematográfica',
            expertise: ['Direção', 'Cinematografia', 'Narrativa Visual'],
            connectionDate: '2023-08-15',
            lastInteraction: '2024-01-16',
            status: 'online',
            achievements: ['Mentor do Ano 2023', 'Festival de Cannes - Jurado'],
            isStarred: true,
            messageCount: 12
        },
        {
            id: 2,
            name: 'Marina Silva',
            role: 'sponsor',
            avatar: 'https://placehold.co/50x50/10B981/FFFFFF?text=MS',
            department: 'Produtora Cinematográfica',
            expertise: ['Produção Executiva', 'Financiamento', 'Distribuição'],
            connectionDate: '2023-09-20',
            lastInteraction: '2024-01-15',
            status: 'busy',
            achievements: ['CEO - Silva Productions', 'Produtora de 15+ filmes premiados'],
            isStarred: true,
            messageCount: 8
        },
        {
            id: 3,
            name: 'João Santos',
            role: 'tutor',
            avatar: 'https://placehold.co/50x50/F59E0B/FFFFFF?text=JS',
            department: 'Mentoria Acadêmica',
            expertise: ['Orientação Acadêmica', 'Desenvolvimento Pessoal', 'Carreira'],
            connectionDate: '2023-08-01',
            lastInteraction: '2024-01-14',
            status: 'online',
            achievements: ['Tutor Destaque 2023', '500+ alunos orientados'],
            isStarred: false,
            messageCount: 25
        },
        {
            id: 4,
            name: 'Dra. Ana Rodrigues',
            role: 'professor',
            avatar: 'https://placehold.co/50x50/EF4444/FFFFFF?text=AR',
            department: 'Roteiro e Storytelling',
            expertise: ['Roteiro', 'Narrativa', 'Desenvolvimento de Personagens'],
            connectionDate: '2023-08-15',
            lastInteraction: '2024-01-13',
            status: 'offline',
            achievements: ['Roteirista Emmy Award', 'Autora de 3 livros'],
            isStarred: true,
            messageCount: 6
        },
        {
            id: 5,
            name: 'Roberto Lima',
            role: 'sponsor',
            avatar: 'https://placehold.co/50x50/8B5CF6/FFFFFF?text=RL',
            department: 'Estúdio de Pós-Produção',
            expertise: ['Edição', 'VFX', 'Color Grading'],
            connectionDate: '2023-10-05',
            lastInteraction: '2024-01-12',
            status: 'online',
            achievements: ['Fundador - Lima Studios', 'Especialista em VFX'],
            isStarred: false,
            messageCount: 4
        },
        {
            id: 6,
            name: 'Beatriz Oliveira',
            role: 'tutor',
            avatar: 'https://placehold.co/50x50/06B6D4/FFFFFF?text=BO',
            department: 'Suporte Estudantil',
            expertise: ['Psicologia Educacional', 'Bem-estar', 'Motivação'],
            connectionDate: '2023-08-01',
            lastInteraction: '2024-01-11',
            status: 'online',
            achievements: ['Psicóloga Educacional', 'Especialista em Motivação'],
            isStarred: false,
            messageCount: 15
        }
    ];

    const messages: Message[] = [
        {
            id: 1,
            contactId: 1,
            sender: 'contact',
            message: 'Parabéns pelo seu último projeto! Notei uma evolução significativa na sua técnica de direção.',
            timestamp: '2024-01-16T10:30:00',
            type: 'text'
        },
        {
            id: 2,
            contactId: 1,
            sender: 'me',
            message: 'Muito obrigado, Professor! Suas orientações foram fundamentais para esse resultado.',
            timestamp: '2024-01-16T10:35:00',
            type: 'text'
        },
        {
            id: 3,
            contactId: 2,
            sender: 'contact',
            message: '🎉 Nova oportunidade de estágio na Silva Productions! Gostaria de conversar sobre?',
            timestamp: '2024-01-15T14:20:00',
            type: 'opportunity'
        }
    ];

    const filteredContacts = contacts.filter(contact => {
        const matchesTab = activeTab === 'all' || contact.role === activeTab;
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            contact.department.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'busy': return 'bg-yellow-500';
            case 'offline': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'professor': return 'bg-blue-100 text-blue-700';
            case 'tutor': return 'bg-green-100 text-green-700';
            case 'sponsor': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'professor': return '👨‍🏫';
            case 'tutor': return '🎯';
            case 'sponsor': return '🤝';
            default: return '👤';
        }
    };

    const totalConnections = contacts.length;
    const activeConnections = contacts.filter(c => c.status === 'online').length;
    const starredConnections = contacts.filter(c => c.isStarred).length;

    return (
        <div className="min-h-screen bg-gray-50 animate-[fadeInUp_0.5s_ease-out] -m-6 md:-m-10">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">🌐 Rede de Contatos</h1>
                    <p className="text-purple-100">Conecte-se com professores, tutores e padrinhos para expandir suas oportunidades</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total de Conexões</p>
                                <p className="text-3xl font-bold text-purple-600">{totalConnections}</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Conexões Ativas</p>
                                <p className="text-3xl font-bold text-green-600">{activeConnections}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Conexões Favoritas</p>
                                <p className="text-3xl font-bold text-yellow-600">{starredConnections}</p>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Mensagens Hoje</p>
                                <p className="text-3xl font-bold text-blue-600">12</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.745C2.512 15.042 2 13.574 2 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Buscar contatos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {[
                                { key: 'all', label: 'Todos', icon: '👥' },
                                { key: 'professor', label: 'Professores', icon: '👨‍🏫' },
                                { key: 'tutor', label: 'Tutores', icon: '🎯' },
                                { key: 'sponsor', label: 'Padrinhos', icon: '🤝' }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key as any)}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                        activeTab === tab.key
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contacts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContacts.map((contact) => (
                        <div key={contact.id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img 
                                                src={contact.avatar} 
                                                alt={contact.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}></div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                                            <p className="text-sm text-gray-600">{contact.department}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {contact.isStarred && (
                                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        )}
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(contact.role)}`}>
                                            {getRoleIcon(contact.role)} {contact.role === 'professor' ? 'Professor' : contact.role === 'tutor' ? 'Tutor' : 'Padrinho'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">Especialidades:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {contact.expertise.slice(0, 3).map((skill, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                        {contact.expertise.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                +{contact.expertise.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">Conquistas:</p>
                                    <div className="space-y-1">
                                        {contact.achievements.slice(0, 2).map((achievement, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-xs text-gray-700">{achievement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>Conectado desde {new Date(contact.connectionDate).toLocaleDateString('pt-BR')}</span>
                                    <span>Última interação: {new Date(contact.lastInteraction).toLocaleDateString('pt-BR')}</span>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                                        💬 Conversar
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                        </svg>
                                    </button>
                                </div>

                                {contact.messageCount > 0 && (
                                    <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                        <p className="text-xs text-blue-700">
                                            📨 {contact.messageCount} mensagens trocadas
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Network Growth Section */}
                <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">🚀 Sua Rede Está Crescendo!</h2>
                        <p className="text-purple-100 mb-6">
                            Você já construiu conexões valiosas com {totalConnections} profissionais da indústria audiovisual.
                            Continue expandindo sua rede para descobrir novas oportunidades!
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="text-3xl font-bold">15+</div>
                                <div className="text-sm text-purple-100">Oportunidades Compartilhadas</div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="text-3xl font-bold">8</div>
                                <div className="text-sm text-purple-100">Projetos Colaborativos</div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="text-3xl font-bold">25+</div>
                                <div className="text-sm text-purple-100">Mentorias Recebidas</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkingView;