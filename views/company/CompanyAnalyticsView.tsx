import React, { useState } from 'react';
import { 
    BarChart3, 
    TrendingUp, 
    TrendingDown, 
    Users, 
    DollarSign, 
    Eye, 
    Calendar, 
    Download, 
    Filter, 
    RefreshCw,
    ArrowUp,
    ArrowDown,
    Briefcase,
    Clock,
    Star,
    Target,
    PieChart,
    Activity,
    FileText,
    Award,
    MapPin,
    Zap
} from 'lucide-react';

interface MetricCard {
    title: string;
    value: string;
    change: number;
    changeType: 'increase' | 'decrease';
    icon: React.ReactNode;
    color: string;
}

interface ChartData {
    name: string;
    value: number;
    color?: string;
}

const CompanyAnalyticsView: React.FC = () => {
    const [dateRange, setDateRange] = useState('30d');
    const [selectedMetric, setSelectedMetric] = useState('overview');
    const [isLoading, setIsLoading] = useState(false);

    // Mock data for metrics
    const metrics: MetricCard[] = [
        {
            title: 'Receita Total',
            value: 'R$ 125.430',
            change: 12.5,
            changeType: 'increase',
            icon: <DollarSign className="w-6 h-6" />,
            color: 'bg-green-500'
        },
        {
            title: 'Projetos Ativos',
            value: '23',
            change: 8.2,
            changeType: 'increase',
            icon: <Briefcase className="w-6 h-6" />,
            color: 'bg-blue-500'
        },
        {
            title: 'Talentos Contratados',
            value: '47',
            change: -3.1,
            changeType: 'decrease',
            icon: <Users className="w-6 h-6" />,
            color: 'bg-purple-500'
        },
        {
            title: 'Taxa de Conclusão',
            value: '94.2%',
            change: 5.7,
            changeType: 'increase',
            icon: <Target className="w-6 h-6" />,
            color: 'bg-orange-500'
        },
        {
            title: 'Tempo Médio de Projeto',
            value: '18 dias',
            change: -12.3,
            changeType: 'decrease',
            icon: <Clock className="w-6 h-6" />,
            color: 'bg-indigo-500'
        },
        {
            title: 'Avaliação Média',
            value: '4.8/5',
            change: 2.1,
            changeType: 'increase',
            icon: <Star className="w-6 h-6" />,
            color: 'bg-yellow-500'
        }
    ];

    // Mock data for charts
    const revenueData: ChartData[] = [
        { name: 'Jan', value: 85000 },
        { name: 'Fev', value: 92000 },
        { name: 'Mar', value: 78000 },
        { name: 'Abr', value: 105000 },
        { name: 'Mai', value: 118000 },
        { name: 'Jun', value: 125430 }
    ];

    const projectsByCategory: ChartData[] = [
        { name: 'Edição de Vídeo', value: 35, color: '#3B82F6' },
        { name: 'Motion Graphics', value: 25, color: '#8B5CF6' },
        { name: 'Filmagem', value: 20, color: '#10B981' },
        { name: 'Áudio', value: 12, color: '#F59E0B' },
        { name: 'Outros', value: 8, color: '#EF4444' }
    ];

    const talentsByLocation: ChartData[] = [
        { name: 'São Paulo', value: 18 },
        { name: 'Rio de Janeiro', value: 12 },
        { name: 'Belo Horizonte', value: 8 },
        { name: 'Porto Alegre', value: 5 },
        { name: 'Outros', value: 4 }
    ];

    const projectsTimeline = [
        { month: 'Jan', completed: 8, inProgress: 3, cancelled: 1 },
        { month: 'Fev', completed: 12, inProgress: 4, cancelled: 0 },
        { month: 'Mar', completed: 10, inProgress: 5, cancelled: 2 },
        { month: 'Abr', completed: 15, inProgress: 6, cancelled: 1 },
        { month: 'Mai', completed: 18, inProgress: 7, cancelled: 0 },
        { month: 'Jun', completed: 14, inProgress: 9, cancelled: 1 }
    ];

    const topTalents = [
        { name: 'Ana Silva', projects: 12, rating: 4.9, revenue: 28500, specialty: 'Edição de Vídeo' },
        { name: 'Carlos Mendes', projects: 8, rating: 4.8, revenue: 32000, specialty: 'Cinematografia' },
        { name: 'Mariana Costa', projects: 10, rating: 4.7, revenue: 18000, specialty: 'Motion Graphics' },
        { name: 'Pedro Santos', projects: 6, rating: 4.6, revenue: 13200, specialty: 'Áudio' },
        { name: 'Julia Oliveira', projects: 9, rating: 4.8, revenue: 21600, specialty: 'Design' }
    ];

    const recentActivities = [
        { type: 'project_completed', message: 'Projeto "Campanha Nike" foi concluído', time: '2 horas atrás', icon: <Briefcase className="w-4 h-4" /> },
        { type: 'talent_hired', message: 'Ana Silva foi contratada para novo projeto', time: '4 horas atrás', icon: <Users className="w-4 h-4" /> },
        { type: 'payment_received', message: 'Pagamento de R$ 8.500 foi recebido', time: '6 horas atrás', icon: <DollarSign className="w-4 h-4" /> },
        { type: 'project_started', message: 'Novo projeto "Institucional Banco" iniciado', time: '1 dia atrás', icon: <Zap className="w-4 h-4" /> },
        { type: 'review_received', message: 'Avaliação 5 estrelas recebida do cliente', time: '2 dias atrás', icon: <Star className="w-4 h-4" /> }
    ];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const getDateRangeLabel = (range: string) => {
        switch (range) {
            case '7d': return 'Últimos 7 dias';
            case '30d': return 'Últimos 30 dias';
            case '90d': return 'Últimos 90 dias';
            case '1y': return 'Último ano';
            default: return 'Período personalizado';
        }
    };

    const refreshData = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    const exportReport = () => {
        // Mock export functionality
        alert('Relatório exportado com sucesso!');
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-600">Acompanhe o desempenho da sua empresa</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="7d">Últimos 7 dias</option>
                        <option value="30d">Últimos 30 dias</option>
                        <option value="90d">Últimos 90 dias</option>
                        <option value="1y">Último ano</option>
                    </select>
                    
                    <button
                        onClick={refreshData}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Atualizar
                    </button>
                    
                    <button
                        onClick={exportReport}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {metrics.map((metric, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className={`w-10 h-10 ${metric.color} rounded-lg flex items-center justify-center text-white`}>
                                {metric.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${
                                metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {metric.changeType === 'increase' ? 
                                    <ArrowUp className="w-3 h-3" /> : 
                                    <ArrowDown className="w-3 h-3" />
                                }
                                {Math.abs(metric.change)}%
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                            <p className="text-sm text-gray-600">{metric.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Receita Mensal</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            +12.5% vs período anterior
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        {revenueData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 w-8">{item.name}</span>
                                <div className="flex-1 mx-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${(item.value / Math.max(...revenueData.map(d => d.value))) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-900 w-20 text-right">
                                    {formatCurrency(item.value)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects by Category */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Projetos por Categoria</h3>
                        <PieChart className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="space-y-3">
                        {projectsByCategory.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div 
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-sm text-gray-700">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="h-2 rounded-full transition-all duration-500"
                                            style={{ 
                                                width: `${item.value}%`,
                                                backgroundColor: item.color 
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Timeline de Projetos</h3>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Concluídos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">Em Andamento</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-gray-600">Cancelados</span>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-6 gap-4">
                    {projectsTimeline.map((month, index) => (
                        <div key={index} className="text-center">
                            <p className="text-sm text-gray-600 mb-2">{month.month}</p>
                            <div className="space-y-1">
                                <div className="h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium">
                                    {month.completed}
                                </div>
                                <div className="h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                                    {month.inProgress}
                                </div>
                                <div className="h-3 bg-red-500 rounded flex items-center justify-center text-white text-xs">
                                    {month.cancelled}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Talents */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Top Talentos</h3>
                        <Award className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="space-y-4">
                        {topTalents.map((talent, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-semibold text-blue-600">
                                            {talent.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{talent.name}</p>
                                        <p className="text-sm text-gray-600">{talent.specialty}</p>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="text-center">
                                            <p className="font-medium text-gray-900">{talent.projects}</p>
                                            <p className="text-gray-600">Projetos</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                <span className="font-medium text-gray-900">{talent.rating}</span>
                                            </div>
                                            <p className="text-gray-600">Rating</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-medium text-gray-900">{formatCurrency(talent.revenue)}</p>
                                            <p className="text-gray-600">Receita</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Atividades Recentes</h3>
                        <Activity className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-0.5">
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900 mb-1">{activity.message}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Ver todas as atividades
                        </button>
                    </div>
                </div>
            </div>

            {/* Talents by Location */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Talentos por Localização</h3>
                    <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {talentsByLocation.map((location, index) => (
                        <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900 mb-1">{location.value}</p>
                            <p className="text-sm text-gray-600">{location.name}</p>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(location.value / Math.max(...talentsByLocation.map(l => l.value))) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyAnalyticsView;