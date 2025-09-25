import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    Monitor, 
    Laptop, 
    Printer, 
    Camera, 
    Mic, 
    Projector,
    Calendar,
    Clock,
    MapPin,
    User,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Plus,
    Search,
    Filter,
    Settings,
    QrCode,
    Wrench,
    Battery,
    Wifi,
    Volume2
} from 'lucide-react';

interface TeacherEquipmentViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para equipamentos
const equipment = [
    {
        id: 1,
        name: 'Projetor Epson PowerLite',
        type: 'Projetor',
        location: 'Sala 101',
        status: 'Disponível',
        condition: 'Excelente',
        lastMaintenance: '2024-01-15',
        nextMaintenance: '2024-04-15',
        reservedBy: null,
        reservedUntil: null,
        specifications: {
            resolution: '1920x1080',
            brightness: '3500 lumens',
            connectivity: 'HDMI, VGA, USB'
        }
    },
    {
        id: 2,
        name: 'Notebook Dell Inspiron',
        type: 'Laptop',
        location: 'Laboratório A',
        status: 'Reservado',
        condition: 'Bom',
        lastMaintenance: '2024-01-20',
        nextMaintenance: '2024-05-20',
        reservedBy: 'Prof. Maria Silva',
        reservedUntil: '2024-02-08 16:00',
        specifications: {
            processor: 'Intel i5',
            memory: '8GB RAM',
            storage: '256GB SSD'
        }
    },
    {
        id: 3,
        name: 'Câmera Canon EOS',
        type: 'Câmera',
        location: 'Estúdio',
        status: 'Manutenção',
        condition: 'Necessita Reparo',
        lastMaintenance: '2024-01-30',
        nextMaintenance: '2024-02-10',
        reservedBy: null,
        reservedUntil: null,
        specifications: {
            resolution: '24MP',
            video: '4K 30fps',
            lens: '18-55mm'
        }
    },
    {
        id: 4,
        name: 'Microfone Shure SM58',
        type: 'Áudio',
        location: 'Auditório',
        status: 'Disponível',
        condition: 'Excelente',
        lastMaintenance: '2024-01-10',
        nextMaintenance: '2024-04-10',
        reservedBy: null,
        reservedUntil: null,
        specifications: {
            type: 'Dinâmico',
            pattern: 'Cardioide',
            frequency: '50Hz-15kHz'
        }
    }
];

const myReservations = [
    {
        id: 1,
        equipmentName: 'Projetor Samsung',
        location: 'Sala 205',
        date: '2024-02-08',
        startTime: '14:00',
        endTime: '16:00',
        status: 'Confirmada',
        purpose: 'Aula de Programação'
    },
    {
        id: 2,
        equipmentName: 'Tablet iPad Pro',
        location: 'Laboratório B',
        date: '2024-02-10',
        startTime: '09:00',
        endTime: '11:00',
        status: 'Pendente',
        purpose: 'Workshop de Design'
    }
];

const maintenanceSchedule = [
    {
        id: 1,
        equipmentName: 'Impressora HP LaserJet',
        type: 'Manutenção Preventiva',
        scheduledDate: '2024-02-12',
        technician: 'João Santos',
        status: 'Agendada'
    },
    {
        id: 2,
        equipmentName: 'Projetor Benq',
        type: 'Reparo',
        scheduledDate: '2024-02-09',
        technician: 'Ana Costa',
        status: 'Em Andamento'
    }
];

const TeacherEquipmentView: React.FC<TeacherEquipmentViewProps> = ({ setActiveView }) => {
    const [selectedTab, setSelectedTab] = useState('equipamentos');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [typeFilter, setTypeFilter] = useState('Todos');

    const tabs = [
        { id: 'equipamentos', label: 'Equipamentos', icon: Monitor },
        { id: 'reservas', label: 'Minhas Reservas', icon: Calendar },
        { id: 'manutencao', label: 'Manutenção', icon: Wrench }
    ];

    const statusOptions = ['Todos', 'Disponível', 'Reservado', 'Manutenção'];
    const typeOptions = ['Todos', 'Projetor', 'Laptop', 'Câmera', 'Áudio', 'Impressora'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Disponível': return 'bg-green-100 text-green-800';
            case 'Reservado': return 'bg-blue-100 text-blue-800';
            case 'Manutenção': return 'bg-red-100 text-red-800';
            case 'Confirmada': return 'bg-green-100 text-green-800';
            case 'Pendente': return 'bg-yellow-100 text-yellow-800';
            case 'Agendada': return 'bg-blue-100 text-blue-800';
            case 'Em Andamento': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'Excelente': return 'text-green-600';
            case 'Bom': return 'text-blue-600';
            case 'Regular': return 'text-yellow-600';
            case 'Necessita Reparo': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getEquipmentIcon = (type: string) => {
        switch (type) {
            case 'Projetor': return Projector;
            case 'Laptop': return Laptop;
            case 'Câmera': return Camera;
            case 'Áudio': return Mic;
            case 'Impressora': return Printer;
            default: return Monitor;
        }
    };

    const filteredEquipment = equipment.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Todos' || item.status === statusFilter;
        const matchesType = typeFilter === 'Todos' || item.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="teacher-container">
            {/* Header */}
            <div className="teacher-header">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Equipamentos</h1>
                    <p className="text-gray-600 mt-1">Gerencie recursos e faça reservas</p>
                </div>
                <div className="teacher-actions">
                    <button className="teacher-button">
                        <Plus className="w-4 h-4" />
                        Nova Reserva
                    </button>
                    <button className="teacher-icon-button">
                        <QrCode className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="teacher-stats-grid grid-cols-1 md:grid-cols-4 mb-6">
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Equipamentos</p>
                            <p className="text-2xl font-bold text-gray-900">48</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Monitor className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Disponíveis</p>
                            <p className="text-2xl font-bold text-gray-900">32</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Reservados</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="teacher-stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Em Manutenção</p>
                            <p className="text-2xl font-bold text-gray-900">4</p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-lg">
                            <Wrench className="w-6 h-6 text-red-600" />
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
            {selectedTab === 'equipamentos' && (
                <>
                    {/* Search and Filters */}
                    <div className="teacher-filters mb-6">
                        <div className="teacher-search-container">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar equipamentos..."
                                className="teacher-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="teacher-filter-group">
                            <select
                                className="teacher-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <select
                                className="teacher-select"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                {typeOptions.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Equipment Grid */}
                    <div className="teacher-card-grid">
                        {filteredEquipment.map((item) => {
                            const IconComponent = getEquipmentIcon(item.type);
                            return (
                                <div key={item.id} className="teacher-card">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-gray-100 rounded-lg">
                                                <IconComponent className="w-6 h-6 text-gray-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-600">{item.type}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Localização:</span>
                                            <span className="text-gray-900">{item.location}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Condição:</span>
                                            <span className={`font-medium ${getConditionColor(item.condition)}`}>
                                                {item.condition}
                                            </span>
                                        </div>
                                        {item.reservedBy && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Reservado por:</span>
                                                <span className="text-gray-900">{item.reservedBy}</span>
                                            </div>
                                        )}
                                        {item.reservedUntil && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Até:</span>
                                                <span className="text-gray-900">{item.reservedUntil}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Specifications */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Especificações:</h4>
                                        <div className="space-y-1">
                                            {Object.entries(item.specifications).map(([key, value]) => (
                                                <div key={key} className="flex justify-between text-xs text-gray-600">
                                                    <span className="capitalize">{key}:</span>
                                                    <span>{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between">
                                        <button 
                                            className={`teacher-button text-sm ${
                                                item.status === 'Disponível' 
                                                    ? '' 
                                                    : 'opacity-50 cursor-not-allowed'
                                            }`}
                                            disabled={item.status !== 'Disponível'}
                                        >
                                            <Calendar className="w-4 h-4" />
                                            Reservar
                                        </button>
                                        <button className="teacher-icon-button">
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {selectedTab === 'reservas' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Minhas Reservas</h2>
                        <div className="space-y-4">
                            {myReservations.map((reservation) => (
                                <div key={reservation.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-gray-900">{reservation.equipmentName}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                                            {reservation.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{reservation.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{reservation.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{reservation.startTime} - {reservation.endTime}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>{reservation.purpose}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button className="text-purple-600 hover:text-purple-700 text-sm">
                                            Editar Reserva
                                        </button>
                                        <button className="text-red-600 hover:text-red-700 text-sm">
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'manutencao' && (
                <div className="space-y-6">
                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Cronograma de Manutenção</h2>
                        <div className="space-y-4">
                            {maintenanceSchedule.map((maintenance) => (
                                <div key={maintenance.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-gray-900">{maintenance.equipmentName}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(maintenance.status)}`}>
                                            {maintenance.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div>
                                            <span className="font-medium">Tipo:</span> {maintenance.type}
                                        </div>
                                        <div>
                                            <span className="font-medium">Data:</span> {maintenance.scheduledDate}
                                        </div>
                                        <div>
                                            <span className="font-medium">Técnico:</span> {maintenance.technician}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="teacher-card">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button className="teacher-button justify-center">
                                <AlertTriangle className="w-4 h-4" />
                                Reportar Problema
                            </button>
                            <button className="teacher-button justify-center">
                                <Calendar className="w-4 h-4" />
                                Agendar Manutenção
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherEquipmentView;