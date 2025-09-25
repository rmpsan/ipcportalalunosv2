import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    Settings, 
    Users, 
    Shield, 
    Database, 
    Activity,
    Bell,
    Lock,
    Key,
    UserPlus,
    UserMinus,
    Edit3,
    Trash2,
    Eye,
    EyeOff,
    Search,
    Filter,
    Download,
    Upload,
    RefreshCw,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Clock,
    Server,
    HardDrive,
    Wifi,
    Monitor,
    Smartphone,
    Globe,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Plus
} from 'lucide-react';

interface TeacherAdminViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para administração
const systemStats = {
    totalUsers: 1247,
    activeUsers: 892,
    pendingApprovals: 23,
    systemUptime: 99.8,
    storageUsed: 67.5,
    lastBackup: '2024-02-07 03:00'
};

const users = [
    {
        id: 1,
        name: 'Prof. João Silva',
        email: 'joao.silva@ipc.edu.br',
        role: 'Professor',
        department: 'Engenharia',
        status: 'active',
        lastLogin: '2024-02-07 14:30',
        permissions: ['read', 'write', 'grade'],
        avatar: '/api/placeholder/40/40'
    },
    {
        id: 2,
        name: 'Dra. Maria Santos',
        email: 'maria.santos@ipc.edu.br',
        role: 'Coordenadora',
        department: 'Ciências',
        status: 'active',
        lastLogin: '2024-02-07 13:45',
        permissions: ['read', 'write', 'grade', 'admin'],
        avatar: '/api/placeholder/40/40'
    },
    {
        id: 3,
        name: 'Ana Costa',
        email: 'ana.costa@ipc.edu.br',
        role: 'Secretária',
        department: 'Administração',
        status: 'inactive',
        lastLogin: '2024-02-05 16:20',
        permissions: ['read', 'write'],
        avatar: '/api/placeholder/40/40'
    },
    {
        id: 4,
        name: 'Carlos Oliveira',
        email: 'carlos.oliveira@ipc.edu.br',
        role: 'Técnico',
        department: 'TI',
        status: 'pending',
        lastLogin: 'Nunca',
        permissions: ['read'],
        avatar: '/api/placeholder/40/40'
    }
];

const systemLogs = [
    {
        id: 1,
        timestamp: '2024-02-07 14:35:22',
        level: 'info',
        action: 'Login realizado',
        user: 'Prof. João Silva',
        details: 'Login bem-sucedido via web'
    },
    {
        id: 2,
        timestamp: '2024-02-07 14:30:15',
        level: 'warning',
        action: 'Tentativa de acesso negada',
        user: 'Sistema',
        details: 'IP bloqueado por múltiplas tentativas'
    },
    {
        id: 3,
        timestamp: '2024-02-07 14:25:08',
        level: 'error',
        action: 'Falha na sincronização',
        user: 'Sistema',
        details: 'Erro ao sincronizar com banco de dados externo'
    },
    {
        id: 4,
        timestamp: '2024-02-07 14:20:33',
        level: 'info',
        action: 'Backup automático',
        user: 'Sistema',
        details: 'Backup diário executado com sucesso'
    }
];

const systemSettings = [
    {
        category: 'Geral',
        settings: [
            { key: 'site_name', label: 'Nome do Site', value: 'Portal IPC', type: 'text' },
            { key: 'site_description', label: 'Descrição', value: 'Portal do Aluno IPC', type: 'text' },
            { key: 'maintenance_mode', label: 'Modo Manutenção', value: false, type: 'boolean' },
            { key: 'registration_enabled', label: 'Registro Habilitado', value: true, type: 'boolean' }
        ]
    },
    {
        category: 'Segurança',
        settings: [
            { key: 'password_min_length', label: 'Tamanho Mínimo da Senha', value: 8, type: 'number' },
            { key: 'session_timeout', label: 'Timeout da Sessão (min)', value: 30, type: 'number' },
            { key: 'two_factor_required', label: '2FA Obrigatório', value: false, type: 'boolean' },
            { key: 'login_attempts', label: 'Tentativas de Login', value: 5, type: 'number' }
        ]
    },
    {
        category: 'Notificações',
        settings: [
            { key: 'email_notifications', label: 'Notificações por Email', value: true, type: 'boolean' },
            { key: 'sms_notifications', label: 'Notificações por SMS', value: false, type: 'boolean' },
            { key: 'push_notifications', label: 'Notificações Push', value: true, type: 'boolean' },
            { key: 'notification_frequency', label: 'Frequência', value: 'daily', type: 'select' }
        ]
    }
];

const permissions = [
    { id: 'read', name: 'Visualizar', description: 'Pode visualizar conteúdo' },
    { id: 'write', name: 'Editar', description: 'Pode criar e editar conteúdo' },
    { id: 'grade', name: 'Avaliar', description: 'Pode avaliar alunos e atividades' },
    { id: 'admin', name: 'Administrar', description: 'Acesso total ao sistema' },
    { id: 'reports', name: 'Relatórios', description: 'Pode gerar relatórios' },
    { id: 'finance', name: 'Financeiro', description: 'Acesso ao módulo financeiro' }
];

const TeacherAdminView: React.FC<TeacherAdminViewProps> = ({ setActiveView }) => {
    const [selectedTab, setSelectedTab] = useState('usuarios');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('Todos');

    const tabs = [
        { id: 'usuarios', label: 'Usuários', icon: Users },
        { id: 'permissoes', label: 'Permissões', icon: Shield },
        { id: 'configuracoes', label: 'Configurações', icon: Settings },
        { id: 'sistema', label: 'Sistema', icon: Server },
        { id: 'logs', label: 'Logs', icon: Activity }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-100';
            case 'inactive': return 'text-gray-600 bg-gray-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'blocked': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active': return 'Ativo';
            case 'inactive': return 'Inativo';
            case 'pending': return 'Pendente';
            case 'blocked': return 'Bloqueado';
            default: return 'Desconhecido';
        }
    };

    const getLogLevelColor = (level: string) => {
        switch (level) {
            case 'info': return 'text-blue-600 bg-blue-100';
            case 'warning': return 'text-yellow-600 bg-yellow-100';
            case 'error': return 'text-red-600 bg-red-100';
            case 'success': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'Todos' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="teacher-container">
            {/* Header */}
            <div className="teacher-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Administração do Sistema</h1>
                    <p className="text-gray-600 mt-1">Gerencie usuários, permissões e configurações</p>
                </div>
                <div className="teacher-actions">
                    <button className="teacher-button">
                        <UserPlus className="w-4 h-4" />
                        Novo Usuário
                    </button>
                    <button className="teacher-button teacher-button-secondary">
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                    <button className="teacher-icon-button">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="teacher-stats-grid grid-cols-1 md:grid-cols-6 mb-6">
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total de Usuários</p>
                            <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Usuários Ativos</p>
                            <p className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Aprovações Pendentes</p>
                            <p className="text-2xl font-bold text-yellow-600">{systemStats.pendingApprovals}</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Uptime do Sistema</p>
                            <p className="text-2xl font-bold text-gray-900">{systemStats.systemUptime}%</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Activity className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Armazenamento</p>
                            <p className="text-2xl font-bold text-gray-900">{systemStats.storageUsed}%</p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <HardDrive className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Último Backup</p>
                            <p className="text-lg font-bold text-gray-900">Hoje</p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-lg">
                            <Database className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                    {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    selectedTab === tab.id
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <IconComponent className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Content based on selected tab */}
            {selectedTab === 'usuarios' && (
                <div className="space-y-6">
                    {/* Search and Filters */}
                    <div className="teacher-card">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Buscar usuários..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="teacher-input pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="teacher-select"
                                >
                                    <option value="Todos">Todos os Cargos</option>
                                    <option value="Professor">Professor</option>
                                    <option value="Coordenadora">Coordenadora</option>
                                    <option value="Secretária">Secretária</option>
                                    <option value="Técnico">Técnico</option>
                                </select>
                                <button className="teacher-icon-button">
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="teacher-card">
                        <div className="teacher-table-container">
                            <table className="teacher-table">
                                <thead>
                                    <tr>
                                        <th>Usuário</th>
                                        <th>Cargo</th>
                                        <th>Departamento</th>
                                        <th>Status</th>
                                        <th>Último Login</th>
                                        <th>Permissões</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{user.name}</p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.role}</td>
                                            <td>{user.department}</td>
                                            <td>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                                    {getStatusText(user.status)}
                                                </span>
                                            </td>
                                            <td className="text-sm text-gray-600">{user.lastLogin}</td>
                                            <td>
                                                <div className="flex flex-wrap gap-1">
                                                    {user.permissions.slice(0, 2).map((permission) => (
                                                        <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                            {permission}
                                                        </span>
                                                    ))}
                                                    {user.permissions.length > 2 && (
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                            +{user.permissions.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-1">
                                                    <button className="teacher-icon-button-sm">
                                                        <Eye className="w-3 h-3" />
                                                    </button>
                                                    <button className="teacher-icon-button-sm">
                                                        <Edit3 className="w-3 h-3" />
                                                    </button>
                                                    <button className="teacher-icon-button-sm">
                                                        <Lock className="w-3 h-3" />
                                                    </button>
                                                    <button className="teacher-icon-button-sm text-red-600 hover:bg-red-50">
                                                        <Trash2 className="w-3 h-3" />
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
            )}

            {selectedTab === 'permissoes' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Gerenciar Permissões</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {permissions.map((permission) => (
                                <div key={permission.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-medium text-gray-900">{permission.name}</h3>
                                        <button className="teacher-icon-button-sm">
                                            <Edit3 className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">{permission.description}</p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">ID: {permission.id}</span>
                                        <button className="text-purple-600 hover:text-purple-800">
                                            Ver Usuários
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Criar Nova Permissão</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome da Permissão
                                </label>
                                <input
                                    type="text"
                                    className="teacher-input"
                                    placeholder="Ex: Gerenciar Biblioteca"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ID da Permissão
                                </label>
                                <input
                                    type="text"
                                    className="teacher-input"
                                    placeholder="Ex: library_manage"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descrição
                                </label>
                                <textarea
                                    className="teacher-input"
                                    rows={3}
                                    placeholder="Descreva o que esta permissão permite fazer..."
                                />
                            </div>
                            <div className="md:col-span-2">
                                <button className="teacher-button">
                                    <Plus className="w-4 h-4" />
                                    Criar Permissão
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'configuracoes' && (
                <div className="space-y-6">
                    {systemSettings.map((section) => (
                        <div key={section.category} className="teacher-card">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">{section.category}</h2>
                            <div className="space-y-4">
                                {section.settings.map((setting) => (
                                    <div key={setting.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{setting.label}</h3>
                                            <p className="text-sm text-gray-500">Configuração: {setting.key}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {setting.type === 'boolean' ? (
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={setting.value as boolean}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                </label>
                                            ) : setting.type === 'number' ? (
                                                <input
                                                    type="number"
                                                    value={setting.value as number}
                                                    className="teacher-input w-20"
                                                />
                                            ) : setting.type === 'select' ? (
                                                <select className="teacher-select w-32">
                                                    <option value="daily">Diário</option>
                                                    <option value="weekly">Semanal</option>
                                                    <option value="monthly">Mensal</option>
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={setting.value as string}
                                                    className="teacher-input w-48"
                                                />
                                            )}
                                            <button className="teacher-icon-button-sm">
                                                <Edit3 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedTab === 'sistema' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="teacher-card">
                            <div className="flex items-center gap-3 mb-3">
                                <Server className="w-5 h-5 text-blue-600" />
                                <h3 className="font-medium text-gray-900">Status do Servidor</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>CPU</span>
                                    <span className="text-green-600">45%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Memória</span>
                                    <span className="text-yellow-600">72%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Disco</span>
                                    <span className="text-red-600">89%</span>
                                </div>
                            </div>
                        </div>

                        <div className="teacher-card">
                            <div className="flex items-center gap-3 mb-3">
                                <Database className="w-5 h-5 text-green-600" />
                                <h3 className="font-medium text-gray-900">Banco de Dados</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Conexões</span>
                                    <span className="text-green-600">24/100</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tamanho</span>
                                    <span>2.4 GB</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Último Backup</span>
                                    <span className="text-green-600">Hoje</span>
                                </div>
                            </div>
                        </div>

                        <div className="teacher-card">
                            <div className="flex items-center gap-3 mb-3">
                                <Wifi className="w-5 h-5 text-purple-600" />
                                <h3 className="font-medium text-gray-900">Conectividade</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Latência</span>
                                    <span className="text-green-600">12ms</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Uptime</span>
                                    <span className="text-green-600">99.8%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tráfego</span>
                                    <span>1.2 GB/h</span>
                                </div>
                            </div>
                        </div>

                        <div className="teacher-card">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="w-5 h-5 text-orange-600" />
                                <h3 className="font-medium text-gray-900">Segurança</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Firewall</span>
                                    <span className="text-green-600">Ativo</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>SSL</span>
                                    <span className="text-green-600">Válido</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Ameaças</span>
                                    <span className="text-red-600">3 bloqueadas</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Ações do Sistema</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <Database className="w-6 h-6 text-blue-600 mb-2" />
                                <h3 className="font-medium text-gray-900 mb-1">Backup Manual</h3>
                                <p className="text-sm text-gray-600">Criar backup do sistema</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <RefreshCw className="w-6 h-6 text-green-600 mb-2" />
                                <h3 className="font-medium text-gray-900 mb-1">Reiniciar Serviços</h3>
                                <p className="text-sm text-gray-600">Reiniciar serviços do sistema</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <Download className="w-6 h-6 text-purple-600 mb-2" />
                                <h3 className="font-medium text-gray-900 mb-1">Exportar Dados</h3>
                                <p className="text-sm text-gray-600">Exportar dados do sistema</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <Settings className="w-6 h-6 text-orange-600 mb-2" />
                                <h3 className="font-medium text-gray-900 mb-1">Manutenção</h3>
                                <p className="text-sm text-gray-600">Ativar modo manutenção</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'logs' && (
                <div className="teacher-card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Logs do Sistema</h2>
                        <div className="flex gap-2">
                            <select className="teacher-select">
                                <option value="all">Todos os Níveis</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                            <button className="teacher-icon-button">
                                <RefreshCw className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {systemLogs.map((log) => (
                            <div key={log.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getLogLevelColor(log.level)}`}>
                                    {log.level.toUpperCase()}
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-900">{log.action}</h4>
                                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">{log.details}</p>
                                    <p className="text-xs text-gray-500">Usuário: {log.user}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherAdminView;