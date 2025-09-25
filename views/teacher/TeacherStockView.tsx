import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    Package, 
    Search, 
    Filter, 
    Plus, 
    Edit3, 
    Trash2,
    AlertTriangle,
    TrendingDown,
    TrendingUp,
    BarChart3,
    Calendar,
    MapPin,
    User,
    CheckCircle,
    XCircle,
    Clock,
    Download,
    Upload,
    Settings,
    Eye,
    ShoppingCart,
    Truck,
    Archive
} from 'lucide-react';

interface TeacherStockViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para estoque
const stockStats = {
    totalItems: 1247,
    lowStock: 23,
    outOfStock: 8,
    totalValue: 125430.50,
    monthlyConsumption: 15680.25,
    pendingOrders: 12
};

const stockItems = [
    {
        id: 1,
        name: 'Arduino Uno R3',
        category: 'Eletrônicos',
        sku: 'ARD-UNO-001',
        currentStock: 45,
        minStock: 20,
        maxStock: 100,
        unitPrice: 89.90,
        totalValue: 4045.50,
        location: 'Sala A-101',
        supplier: 'TechSupply Ltda',
        lastUpdate: '2024-02-07',
        status: 'normal',
        image: '/api/placeholder/60/60'
    },
    {
        id: 2,
        name: 'Resistor 220Ω (Pacote 100un)',
        category: 'Componentes',
        sku: 'RES-220-100',
        currentStock: 8,
        minStock: 15,
        maxStock: 50,
        unitPrice: 12.50,
        totalValue: 100.00,
        location: 'Almoxarifado B',
        supplier: 'Componentes Brasil',
        lastUpdate: '2024-02-06',
        status: 'low',
        image: '/api/placeholder/60/60'
    },
    {
        id: 3,
        name: 'Protoboard 830 pontos',
        category: 'Ferramentas',
        sku: 'PROTO-830',
        currentStock: 0,
        minStock: 10,
        maxStock: 30,
        unitPrice: 25.90,
        totalValue: 0.00,
        location: 'Sala A-102',
        supplier: 'EletroMaker',
        lastUpdate: '2024-02-05',
        status: 'out',
        image: '/api/placeholder/60/60'
    },
    {
        id: 4,
        name: 'Cabo USB A-B',
        category: 'Cabos',
        sku: 'CAB-USB-AB',
        currentStock: 67,
        minStock: 25,
        maxStock: 80,
        unitPrice: 15.90,
        totalValue: 1065.30,
        location: 'Sala A-101',
        supplier: 'CaboTech',
        lastUpdate: '2024-02-07',
        status: 'normal',
        image: '/api/placeholder/60/60'
    },
    {
        id: 5,
        name: 'Sensor Ultrassônico HC-SR04',
        category: 'Sensores',
        sku: 'SENS-HC-SR04',
        currentStock: 12,
        minStock: 15,
        maxStock: 40,
        unitPrice: 18.50,
        totalValue: 222.00,
        location: 'Almoxarifado A',
        supplier: 'SensorMax',
        lastUpdate: '2024-02-06',
        status: 'low',
        image: '/api/placeholder/60/60'
    }
];

const recentMovements = [
    {
        id: 1,
        type: 'out',
        item: 'Arduino Uno R3',
        quantity: 5,
        user: 'Prof. João Silva',
        date: '2024-02-07 14:30',
        reason: 'Aula prática - Turma A'
    },
    {
        id: 2,
        type: 'in',
        item: 'Cabo USB A-B',
        quantity: 20,
        user: 'Sistema',
        date: '2024-02-07 09:15',
        reason: 'Compra - Pedido #1234'
    },
    {
        id: 3,
        type: 'out',
        item: 'Resistor 220Ω',
        quantity: 2,
        user: 'Prof. Maria Santos',
        date: '2024-02-06 16:45',
        reason: 'Projeto estudantil'
    },
    {
        id: 4,
        type: 'in',
        item: 'Sensor Ultrassônico',
        quantity: 10,
        user: 'Admin',
        date: '2024-02-06 11:20',
        reason: 'Reposição de estoque'
    }
];

const pendingOrders = [
    {
        id: 1,
        orderNumber: 'PED-2024-001',
        supplier: 'TechSupply Ltda',
        items: 8,
        totalValue: 2450.80,
        orderDate: '2024-02-05',
        expectedDate: '2024-02-12',
        status: 'pending'
    },
    {
        id: 2,
        orderNumber: 'PED-2024-002',
        supplier: 'Componentes Brasil',
        items: 15,
        totalValue: 890.50,
        orderDate: '2024-02-06',
        expectedDate: '2024-02-13',
        status: 'shipped'
    },
    {
        id: 3,
        orderNumber: 'PED-2024-003',
        supplier: 'EletroMaker',
        items: 5,
        totalValue: 1250.00,
        orderDate: '2024-02-07',
        expectedDate: '2024-02-14',
        status: 'processing'
    }
];

const categories = [
    'Todos',
    'Eletrônicos',
    'Componentes',
    'Ferramentas',
    'Cabos',
    'Sensores',
    'Materiais',
    'Consumíveis'
];

const TeacherStockView: React.FC<TeacherStockViewProps> = ({ setActiveView }) => {
    const [selectedTab, setSelectedTab] = useState('estoque');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const tabs = [
        { id: 'estoque', label: 'Estoque', icon: Package },
        { id: 'movimentacoes', label: 'Movimentações', icon: TrendingUp },
        { id: 'pedidos', label: 'Pedidos', icon: ShoppingCart },
        { id: 'relatorios', label: 'Relatórios', icon: BarChart3 }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'normal': return 'text-green-600 bg-green-100';
            case 'low': return 'text-yellow-600 bg-yellow-100';
            case 'out': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'normal': return 'Normal';
            case 'low': return 'Estoque Baixo';
            case 'out': return 'Sem Estoque';
            default: return 'Desconhecido';
        }
    };

    const getMovementIcon = (type: string) => {
        return type === 'in' ? TrendingUp : TrendingDown;
    };

    const getMovementColor = (type: string) => {
        return type === 'in' ? 'text-green-600' : 'text-red-600';
    };

    const getOrderStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'processing': return 'text-blue-600 bg-blue-100';
            case 'shipped': return 'text-purple-600 bg-purple-100';
            case 'delivered': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getOrderStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'Pendente';
            case 'processing': return 'Processando';
            case 'shipped': return 'Enviado';
            case 'delivered': return 'Entregue';
            default: return 'Desconhecido';
        }
    };

    const filteredItems = stockItems.filter(item => {
        const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.sku.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="teacher-container">
            {/* Header */}
            <div className="teacher-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Controle de Estoque</h1>
                    <p className="text-gray-600 mt-1">Gerencie materiais e equipamentos</p>
                </div>
                <div className="teacher-actions">
                    <button className="teacher-button">
                        <Plus className="w-4 h-4" />
                        Novo Item
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
                            <p className="text-sm text-gray-600">Total de Itens</p>
                            <p className="text-2xl font-bold text-gray-900">{stockStats.totalItems}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Estoque Baixo</p>
                            <p className="text-2xl font-bold text-yellow-600">{stockStats.lowStock}</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Sem Estoque</p>
                            <p className="text-2xl font-bold text-red-600">{stockStats.outOfStock}</p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-lg">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Valor Total</p>
                            <p className="text-2xl font-bold text-gray-900">R$ {stockStats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <BarChart3 className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Consumo Mensal</p>
                            <p className="text-2xl font-bold text-gray-900">R$ {stockStats.monthlyConsumption.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <TrendingDown className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pedidos Pendentes</p>
                            <p className="text-2xl font-bold text-gray-900">{stockStats.pendingOrders}</p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Truck className="w-6 h-6 text-orange-600" />
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
            {selectedTab === 'estoque' && (
                <div className="space-y-6">
                    {/* Search and Filters */}
                    <div className="teacher-card">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Buscar por nome ou SKU..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="teacher-input pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="teacher-select"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="teacher-icon-button"
                                >
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stock Items */}
                    <div className="teacher-card">
                        <div className="teacher-table-container">
                            <table className="teacher-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>SKU</th>
                                        <th>Categoria</th>
                                        <th>Estoque Atual</th>
                                        <th>Estoque Mín.</th>
                                        <th>Valor Unit.</th>
                                        <th>Valor Total</th>
                                        <th>Localização</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-sm text-gray-500">{item.supplier}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-mono text-sm">{item.sku}</td>
                                            <td>{item.category}</td>
                                            <td>
                                                <span className={`font-medium ${
                                                    item.currentStock <= item.minStock ? 'text-red-600' : 'text-gray-900'
                                                }`}>
                                                    {item.currentStock}
                                                </span>
                                            </td>
                                            <td>{item.minStock}</td>
                                            <td>R$ {item.unitPrice.toFixed(2)}</td>
                                            <td>R$ {item.totalValue.toFixed(2)}</td>
                                            <td>
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <MapPin className="w-3 h-3" />
                                                    {item.location}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                                    {getStatusText(item.status)}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-1">
                                                    <button className="teacher-icon-button-sm">
                                                        <Eye className="w-3 h-3" />
                                                    </button>
                                                    <button className="teacher-icon-button-sm">
                                                        <Edit3 className="w-3 h-3" />
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

            {selectedTab === 'movimentacoes' && (
                <div className="teacher-card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Movimentações Recentes</h2>
                    <div className="space-y-4">
                        {recentMovements.map((movement) => {
                            const IconComponent = getMovementIcon(movement.type);
                            return (
                                <div key={movement.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${movement.type === 'in' ? 'bg-green-100' : 'bg-red-100'}`}>
                                            <IconComponent className={`w-4 h-4 ${getMovementColor(movement.type)}`} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{movement.item}</h4>
                                            <p className="text-sm text-gray-600">
                                                {movement.type === 'in' ? 'Entrada' : 'Saída'} de {movement.quantity} unidades
                                            </p>
                                            <p className="text-xs text-gray-500">{movement.reason}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                                            <User className="w-3 h-3" />
                                            {movement.user}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" />
                                            {movement.date}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {selectedTab === 'pedidos' && (
                <div className="teacher-card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Pedidos de Compra</h2>
                        <button className="teacher-button">
                            <Plus className="w-4 h-4" />
                            Novo Pedido
                        </button>
                    </div>
                    <div className="space-y-4">
                        {pendingOrders.map((order) => (
                            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{order.orderNumber}</h4>
                                        <p className="text-sm text-gray-600">{order.supplier}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                                        {getOrderStatusText(order.status)}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Itens</p>
                                        <p className="font-medium">{order.items} itens</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Valor Total</p>
                                        <p className="font-medium">R$ {order.totalValue.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Data do Pedido</p>
                                        <p className="font-medium">{order.orderDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Previsão de Entrega</p>
                                        <p className="font-medium">{order.expectedDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
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
                        ))}
                    </div>
                </div>
            )}

            {selectedTab === 'relatorios' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Relatórios de Estoque</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <BarChart3 className="w-5 h-5 text-purple-600" />
                                    <h3 className="font-medium text-gray-900">Relatório de Movimentação</h3>
                                </div>
                                <p className="text-sm text-gray-600">Entradas e saídas por período</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                    <h3 className="font-medium text-gray-900">Itens em Falta</h3>
                                </div>
                                <p className="text-sm text-gray-600">Lista de itens com estoque baixo</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <Package className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-medium text-gray-900">Inventário Completo</h3>
                                </div>
                                <p className="text-sm text-gray-600">Lista completa do estoque atual</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                    <h3 className="font-medium text-gray-900">Análise de Consumo</h3>
                                </div>
                                <p className="text-sm text-gray-600">Padrões de uso e consumo</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <Truck className="w-5 h-5 text-orange-600" />
                                    <h3 className="font-medium text-gray-900">Pedidos e Fornecedores</h3>
                                </div>
                                <p className="text-sm text-gray-600">Histórico de compras e fornecedores</p>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <Archive className="w-5 h-5 text-gray-600" />
                                    <h3 className="font-medium text-gray-900">Relatório Financeiro</h3>
                                </div>
                                <p className="text-sm text-gray-600">Valores e custos do estoque</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherStockView;