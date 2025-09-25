import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    DollarSign, 
    TrendingUp, 
    TrendingDown, 
    PieChart, 
    BarChart3,
    Calendar,
    CreditCard,
    Wallet,
    Receipt,
    Target,
    AlertCircle,
    CheckCircle,
    Clock,
    Filter,
    Download,
    Upload,
    Plus,
    Search,
    Settings,
    Eye,
    Edit3,
    FileText,
    Calculator,
    Banknote,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

interface TeacherFinancialViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para dados financeiros
const financialStats = {
    totalBudget: 125000.00,
    usedBudget: 87350.50,
    remainingBudget: 37649.50,
    monthlyExpenses: 12450.75,
    pendingPayments: 8750.00,
    approvedBudget: 98.5
};

const budgetCategories = [
    {
        id: 1,
        name: 'Equipamentos',
        allocated: 45000.00,
        spent: 32150.75,
        remaining: 12849.25,
        percentage: 71.4,
        color: 'bg-blue-500'
    },
    {
        id: 2,
        name: 'Materiais de Consumo',
        allocated: 25000.00,
        spent: 18900.50,
        remaining: 6099.50,
        percentage: 75.6,
        color: 'bg-green-500'
    },
    {
        id: 3,
        name: 'Capacitação',
        allocated: 20000.00,
        spent: 15200.00,
        remaining: 4800.00,
        percentage: 76.0,
        color: 'bg-purple-500'
    },
    {
        id: 4,
        name: 'Manutenção',
        allocated: 15000.00,
        spent: 8950.25,
        remaining: 6049.75,
        percentage: 59.7,
        color: 'bg-orange-500'
    },
    {
        id: 5,
        name: 'Projetos Especiais',
        allocated: 20000.00,
        spent: 12149.00,
        remaining: 7851.00,
        percentage: 60.7,
        color: 'bg-red-500'
    }
];

const recentTransactions = [
    {
        id: 1,
        type: 'expense',
        description: 'Compra de Arduino Uno - 20 unidades',
        category: 'Equipamentos',
        amount: 1798.00,
        date: '2024-02-07',
        status: 'approved',
        reference: 'NF-2024-001'
    },
    {
        id: 2,
        type: 'expense',
        description: 'Curso de Metodologias Ativas',
        category: 'Capacitação',
        amount: 850.00,
        date: '2024-02-06',
        status: 'pending',
        reference: 'SOL-2024-015'
    },
    {
        id: 3,
        type: 'income',
        description: 'Verba adicional - Projeto FAPESP',
        category: 'Projetos Especiais',
        amount: 5000.00,
        date: '2024-02-05',
        status: 'approved',
        reference: 'PROJ-2024-003'
    },
    {
        id: 4,
        type: 'expense',
        description: 'Manutenção preventiva - Laboratório A',
        category: 'Manutenção',
        amount: 1250.50,
        date: '2024-02-04',
        status: 'approved',
        reference: 'OS-2024-008'
    },
    {
        id: 5,
        type: 'expense',
        description: 'Materiais para aulas práticas',
        category: 'Materiais de Consumo',
        amount: 450.75,
        date: '2024-02-03',
        status: 'approved',
        reference: 'REQ-2024-025'
    }
];

const pendingApprovals = [
    {
        id: 1,
        description: 'Aquisição de Impressora 3D',
        category: 'Equipamentos',
        amount: 3500.00,
        requestDate: '2024-02-06',
        priority: 'high',
        status: 'pending'
    },
    {
        id: 2,
        description: 'Participação em Congresso Internacional',
        category: 'Capacitação',
        amount: 2800.00,
        requestDate: '2024-02-05',
        priority: 'medium',
        status: 'review'
    },
    {
        id: 3,
        description: 'Licenças de Software Educacional',
        category: 'Equipamentos',
        amount: 1200.00,
        requestDate: '2024-02-04',
        priority: 'low',
        status: 'pending'
    }
];

const monthlyData = [
    { month: 'Jan', budget: 10000, spent: 8500, income: 500 },
    { month: 'Fev', budget: 10000, spent: 9200, income: 1200 },
    { month: 'Mar', budget: 10000, spent: 7800, income: 800 },
    { month: 'Abr', budget: 10000, spent: 9500, income: 300 },
    { month: 'Mai', budget: 10000, spent: 8900, income: 1500 },
    { month: 'Jun', budget: 10000, spent: 9100, income: 700 }
];

const TeacherFinancialView: React.FC<TeacherFinancialViewProps> = ({ setActiveView }) => {
    const [selectedTab, setSelectedTab] = useState('visao-geral');
    const [selectedPeriod, setSelectedPeriod] = useState('mensal');

    const tabs = [
        { id: 'visao-geral', label: 'Visão Geral', icon: BarChart3 },
        { id: 'orcamento', label: 'Orçamento', icon: Target },
        { id: 'transacoes', label: 'Transações', icon: Receipt },
        { id: 'aprovacoes', label: 'Aprovações', icon: CheckCircle },
        { id: 'relatorios', label: 'Relatórios', icon: FileText }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'text-green-600 bg-green-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'review': return 'text-blue-600 bg-blue-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'approved': return 'Aprovado';
            case 'pending': return 'Pendente';
            case 'review': return 'Em Análise';
            case 'rejected': return 'Rejeitado';
            default: return 'Desconhecido';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'high': return 'Alta';
            case 'medium': return 'Média';
            case 'low': return 'Baixa';
            default: return 'Normal';
        }
    };

    return (
        <div className="teacher-container">
            {/* Header */}
            <div className="teacher-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestão Financeira</h1>
                    <p className="text-gray-600 mt-1">Controle de orçamentos e despesas</p>
                </div>
                <div className="teacher-actions">
                    <button className="teacher-button">
                        <Plus className="w-4 h-4" />
                        Nova Solicitação
                    </button>
                    <button className="teacher-button teacher-button-secondary">
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                    <button className="teacher-icon-button">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="teacher-stats-grid grid-cols-1 md:grid-cols-6 mb-6">
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Orçamento Total</p>
                            <p className="text-2xl font-bold text-gray-900">
                                R$ {financialStats.totalBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Wallet className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Orçamento Usado</p>
                            <p className="text-2xl font-bold text-red-600">
                                R$ {financialStats.usedBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-lg">
                            <TrendingDown className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Saldo Disponível</p>
                            <p className="text-2xl font-bold text-green-600">
                                R$ {financialStats.remainingBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Gastos Mensais</p>
                            <p className="text-2xl font-bold text-gray-900">
                                R$ {financialStats.monthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Calculator className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pagamentos Pendentes</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                R$ {financialStats.pendingPayments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Taxa de Aprovação</p>
                            <p className="text-2xl font-bold text-gray-900">{financialStats.approvedBudget}%</p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-orange-600" />
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
            {selectedTab === 'visao-geral' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Budget Usage Chart */}
                    <div className="lg:col-span-2">
                        <div className="teacher-card mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Uso do Orçamento por Categoria</h2>
                            <div className="space-y-4">
                                {budgetCategories.map((category) => (
                                    <div key={category.id} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-900">{category.name}</span>
                                            <span className="text-gray-600">
                                                R$ {category.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / 
                                                R$ {category.allocated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-300 ${category.color}`}
                                                style={{ width: `${category.percentage}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>{category.percentage.toFixed(1)}% usado</span>
                                            <span>Restante: R$ {category.remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Monthly Trend */}
                        <div className="teacher-card">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tendência Mensal</h2>
                            <div className="h-64 flex items-end justify-between gap-2">
                                {monthlyData.map((data, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div className="w-full flex flex-col items-center gap-1 mb-2">
                                            <div
                                                className="w-full bg-blue-500 rounded-t"
                                                style={{ height: `${(data.budget / 12000) * 200}px` }}
                                                title={`Orçamento: R$ ${data.budget}`}
                                            />
                                            <div
                                                className="w-full bg-red-500"
                                                style={{ height: `${(data.spent / 12000) * 200}px` }}
                                                title={`Gasto: R$ ${data.spent}`}
                                            />
                                            <div
                                                className="w-full bg-green-500 rounded-b"
                                                style={{ height: `${(data.income / 12000) * 200}px` }}
                                                title={`Receita: R$ ${data.income}`}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-600">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-6 mt-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                    <span>Orçamento</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                                    <span>Gastos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                    <span>Receitas</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats and Alerts */}
                    <div className="space-y-6">
                        <div className="teacher-card">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas Financeiros</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-yellow-800">Orçamento Baixo</p>
                                        <p className="text-xs text-yellow-600">Categoria "Equipamentos" com apenas 28% restante</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-red-800">Pagamento Atrasado</p>
                                        <p className="text-xs text-red-600">3 solicitações pendentes há mais de 15 dias</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-800">Meta Atingida</p>
                                        <p className="text-xs text-blue-600">Economia de 15% no orçamento de manutenção</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="teacher-card">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Mês</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Transações Aprovadas</span>
                                    <span className="text-sm font-medium text-green-600">24</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Solicitações Pendentes</span>
                                    <span className="text-sm font-medium text-yellow-600">8</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Economia Realizada</span>
                                    <span className="text-sm font-medium text-blue-600">R$ 2.450,00</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Próximo Vencimento</span>
                                    <span className="text-sm font-medium text-gray-900">15/02/2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'orcamento' && (
                <div className="teacher-card-grid">
                    {budgetCategories.map((category) => (
                        <div key={category.id} className="teacher-card">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                <button className="teacher-icon-button-sm">
                                    <Edit3 className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Orçamento Alocado</span>
                                    <span className="font-medium">R$ {category.allocated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Valor Gasto</span>
                                    <span className="font-medium text-red-600">R$ {category.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Saldo Restante</span>
                                    <span className="font-medium text-green-600">R$ {category.remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>

                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Progresso</span>
                                        <span>{category.percentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${category.color}`}
                                            style={{ width: `${category.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedTab === 'transacoes' && (
                <div className="teacher-card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Transações Recentes</h2>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar transações..."
                                    className="teacher-input pl-10 w-64"
                                />
                            </div>
                            <button className="teacher-icon-button">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {recentTransactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${
                                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                                    }`}>
                                        {transaction.type === 'income' ? (
                                            <ArrowUpRight className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <ArrowDownRight className="w-4 h-4 text-red-600" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span>{transaction.category}</span>
                                            <span>•</span>
                                            <span>{transaction.date}</span>
                                            <span>•</span>
                                            <span>{transaction.reference}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-semibold ${
                                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                        {getStatusText(transaction.status)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedTab === 'aprovacoes' && (
                <div className="teacher-card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Solicitações Pendentes</h2>
                        <button className="teacher-button">
                            <Plus className="w-4 h-4" />
                            Nova Solicitação
                        </button>
                    </div>

                    <div className="space-y-4">
                        {pendingApprovals.map((approval) => (
                            <div key={approval.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{approval.description}</h4>
                                        <p className="text-sm text-gray-600">{approval.category}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(approval.priority)}`}>
                                            {getPriorityText(approval.priority)}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(approval.status)}`}>
                                            {getStatusText(approval.status)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span>Valor: R$ {approval.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        <span>•</span>
                                        <span>Solicitado em: {approval.requestDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="teacher-button-sm">
                                            <Eye className="w-3 h-3" />
                                            Ver Detalhes
                                        </button>
                                        <button className="teacher-button-sm teacher-button-secondary">
                                            <Edit3 className="w-3 h-3" />
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedTab === 'relatorios' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Relatórios Financeiros</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <BarChart3 className="w-5 h-5 text-purple-600" />
                                    <h3 className="font-medium text-gray-900">Relatório de Gastos</h3>
                                </div>
                                <p className="text-sm text-gray-600">Análise detalhada de despesas por categoria</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <PieChart className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-medium text-gray-900">Distribuição Orçamentária</h3>
                                </div>
                                <p className="text-sm text-gray-600">Visualização da alocação de recursos</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                    <h3 className="font-medium text-gray-900">Análise de Tendências</h3>
                                </div>
                                <p className="text-sm text-gray-600">Projeções e tendências financeiras</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <Receipt className="w-5 h-5 text-orange-600" />
                                    <h3 className="font-medium text-gray-900">Extrato Detalhado</h3>
                                </div>
                                <p className="text-sm text-gray-600">Histórico completo de transações</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <Target className="w-5 h-5 text-red-600" />
                                    <h3 className="font-medium text-gray-900">Performance Orçamentária</h3>
                                </div>
                                <p className="text-sm text-gray-600">Comparativo entre planejado e executado</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <FileText className="w-5 h-5 text-gray-600" />
                                    <h3 className="font-medium text-gray-900">Relatório Personalizado</h3>
                                </div>
                                <p className="text-sm text-gray-600">Crie relatórios customizados</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherFinancialView;