import React, { useState } from 'react';
import { 
    Settings, 
    User, 
    Building, 
    CreditCard, 
    Bell, 
    Shield, 
    Users, 
    Globe, 
    Palette, 
    Save, 
    Eye, 
    EyeOff, 
    Upload, 
    Trash2, 
    Edit, 
    Plus, 
    X,
    Check,
    AlertTriangle,
    Mail,
    Phone,
    MapPin,
    Calendar,
    DollarSign,
    Lock,
    Key,
    Smartphone,
    Monitor,
    Moon,
    Sun,
    Volume2,
    VolumeX,
    Download,
    FileText,
    Camera,
    Link
} from 'lucide-react';

interface CompanyProfile {
    name: string;
    description: string;
    website: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    cnpj: string;
    logo?: string;
    banner?: string;
    socialMedia: {
        linkedin?: string;
        instagram?: string;
        youtube?: string;
        facebook?: string;
    };
}

interface NotificationSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    projectUpdates: boolean;
    talentApplications: boolean;
    paymentAlerts: boolean;
    systemUpdates: boolean;
    marketingEmails: boolean;
}

interface SecuritySettings {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    sessionTimeout: number;
    allowedIPs: string[];
    passwordExpiry: number;
}

const CompanySettingsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock data
    const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
        name: 'Empresa Audiovisual Ltda',
        description: 'Empresa especializada em produção audiovisual, oferecendo serviços de alta qualidade para diversos segmentos do mercado.',
        website: 'https://empresa-audiovisual.com.br',
        email: 'contato@empresa-audiovisual.com.br',
        phone: '(11) 99999-9999',
        address: 'Rua das Empresas, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        cnpj: '12.345.678/0001-90',
        socialMedia: {
            linkedin: 'https://linkedin.com/company/empresa-audiovisual',
            instagram: '@empresa_audiovisual',
            youtube: 'https://youtube.com/empresa-audiovisual'
        }
    });

    const [notifications, setNotifications] = useState<NotificationSettings>({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        projectUpdates: true,
        talentApplications: true,
        paymentAlerts: true,
        systemUpdates: true,
        marketingEmails: false
    });

    const [security, setSecurity] = useState<SecuritySettings>({
        twoFactorAuth: false,
        loginAlerts: true,
        sessionTimeout: 30,
        allowedIPs: [],
        passwordExpiry: 90
    });

    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('pt-BR');
    const [timezone, setTimezone] = useState('America/Sao_Paulo');

    const tabs = [
        { id: 'profile', label: 'Perfil da Empresa', icon: <Building className="w-4 h-4" /> },
        { id: 'account', label: 'Conta', icon: <User className="w-4 h-4" /> },
        { id: 'billing', label: 'Faturamento', icon: <CreditCard className="w-4 h-4" /> },
        { id: 'notifications', label: 'Notificações', icon: <Bell className="w-4 h-4" /> },
        { id: 'security', label: 'Segurança', icon: <Shield className="w-4 h-4" /> },
        { id: 'team', label: 'Equipe', icon: <Users className="w-4 h-4" /> },
        { id: 'preferences', label: 'Preferências', icon: <Settings className="w-4 h-4" /> }
    ];

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleProfileChange = (field: keyof CompanyProfile, value: string) => {
        setCompanyProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleSocialMediaChange = (platform: string, value: string) => {
        setCompanyProfile(prev => ({
            ...prev,
            socialMedia: { ...prev.socialMedia, [platform]: value }
        }));
    };

    const handleNotificationChange = (setting: keyof NotificationSettings) => {
        setNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
    };

    const handleSecurityChange = (setting: keyof SecuritySettings, value: any) => {
        setSecurity(prev => ({ ...prev, [setting]: value }));
    };

    const renderProfileTab = () => (
        <div className="space-y-6">
            {/* Company Logo */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo da Empresa</label>
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Upload className="w-4 h-4" />
                            Fazer Upload
                        </button>
                        <p className="text-xs text-gray-500">PNG, JPG até 2MB. Recomendado: 200x200px</p>
                    </div>
                </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Empresa</label>
                    <input
                        type="text"
                        value={companyProfile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ</label>
                    <input
                        type="text"
                        value={companyProfile.cnpj}
                        onChange={(e) => handleProfileChange('cnpj', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                    value={companyProfile.description}
                    onChange={(e) => handleProfileChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={companyProfile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                        type="tel"
                        value={companyProfile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                    type="url"
                    value={companyProfile.website}
                    onChange={(e) => handleProfileChange('website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Address */}
            <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Endereço</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                    <input
                        type="text"
                        value={companyProfile.address}
                        onChange={(e) => handleProfileChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                        <input
                            type="text"
                            value={companyProfile.city}
                            onChange={(e) => handleProfileChange('city', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                        <select
                            value={companyProfile.state}
                            onChange={(e) => handleProfileChange('state', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="RS">Rio Grande do Sul</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                        <input
                            type="text"
                            value={companyProfile.zipCode}
                            onChange={(e) => handleProfileChange('zipCode', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Redes Sociais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                        <input
                            type="url"
                            value={companyProfile.socialMedia.linkedin || ''}
                            onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                            placeholder="https://linkedin.com/company/sua-empresa"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                        <input
                            type="text"
                            value={companyProfile.socialMedia.instagram || ''}
                            onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                            placeholder="@sua_empresa"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                        <input
                            type="url"
                            value={companyProfile.socialMedia.youtube || ''}
                            onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                            placeholder="https://youtube.com/sua-empresa"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                        <input
                            type="url"
                            value={companyProfile.socialMedia.facebook || ''}
                            onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                            placeholder="https://facebook.com/sua-empresa"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationsTab = () => (
        <div className="space-y-6">
            <div>
                <h4 className="font-medium text-gray-900 mb-4">Canais de Notificação</h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-600" />
                            <div>
                                <p className="font-medium text-gray-900">Email</p>
                                <p className="text-sm text-gray-600">Receber notificações por email</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications.emailNotifications}
                                onChange={() => handleNotificationChange('emailNotifications')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <div>
                                <p className="font-medium text-gray-900">Push</p>
                                <p className="text-sm text-gray-600">Notificações push no navegador</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications.pushNotifications}
                                onChange={() => handleNotificationChange('pushNotifications')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-gray-600" />
                            <div>
                                <p className="font-medium text-gray-900">SMS</p>
                                <p className="text-sm text-gray-600">Notificações por mensagem de texto</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications.smsNotifications}
                                onChange={() => handleNotificationChange('smsNotifications')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-medium text-gray-900 mb-4">Tipos de Notificação</h4>
                <div className="space-y-3">
                    {[
                        { key: 'projectUpdates', label: 'Atualizações de Projetos', desc: 'Quando houver mudanças nos seus projetos' },
                        { key: 'talentApplications', label: 'Candidaturas de Talentos', desc: 'Quando alguém se candidatar às suas vagas' },
                        { key: 'paymentAlerts', label: 'Alertas de Pagamento', desc: 'Lembretes e confirmações de pagamento' },
                        { key: 'systemUpdates', label: 'Atualizações do Sistema', desc: 'Novidades e manutenções da plataforma' },
                        { key: 'marketingEmails', label: 'Emails de Marketing', desc: 'Dicas, novidades e promoções' }
                    ].map(item => (
                        <div key={item.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">{item.label}</p>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications[item.key as keyof NotificationSettings] as boolean}
                                    onChange={() => handleNotificationChange(item.key as keyof NotificationSettings)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSecurityTab = () => (
        <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                        Mantenha sua conta segura ativando a autenticação de dois fatores
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <div>
                            <p className="font-medium text-gray-900">Autenticação de Dois Fatores</p>
                            <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={security.twoFactorAuth}
                            onChange={() => handleSecurityChange('twoFactorAuth', !security.twoFactorAuth)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div>
                            <p className="font-medium text-gray-900">Alertas de Login</p>
                            <p className="text-sm text-gray-600">Receba notificações de novos logins</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={security.loginAlerts}
                            onChange={() => handleSecurityChange('loginAlerts', !security.loginAlerts)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timeout da Sessão (minutos)</label>
                    <select
                        value={security.sessionTimeout}
                        onChange={(e) => handleSecurityChange('sessionTimeout', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value={15}>15 minutos</option>
                        <option value={30}>30 minutos</option>
                        <option value={60}>1 hora</option>
                        <option value={120}>2 horas</option>
                        <option value={480}>8 horas</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiração da Senha (dias)</label>
                    <select
                        value={security.passwordExpiry}
                        onChange={(e) => handleSecurityChange('passwordExpiry', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value={30}>30 dias</option>
                        <option value={60}>60 dias</option>
                        <option value={90}>90 dias</option>
                        <option value={180}>180 dias</option>
                        <option value={365}>1 ano</option>
                    </select>
                </div>
            </div>

            <div>
                <h4 className="font-medium text-gray-900 mb-4">Ações de Segurança</h4>
                <div className="space-y-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Key className="w-4 h-4" />
                        Alterar Senha
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Download className="w-4 h-4" />
                        Baixar Dados da Conta
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        Excluir Conta
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPreferencesTab = () => (
        <div className="space-y-6">
            <div>
                <h4 className="font-medium text-gray-900 mb-4">Aparência</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'light', label: 'Claro', icon: <Sun className="w-4 h-4" /> },
                                { value: 'dark', label: 'Escuro', icon: <Moon className="w-4 h-4" /> },
                                { value: 'system', label: 'Sistema', icon: <Monitor className="w-4 h-4" /> }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setTheme(option.value)}
                                    className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                                        theme === option.value
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {option.icon}
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fuso Horário</label>
                    <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                        <option value="America/New_York">New York (GMT-5)</option>
                        <option value="Europe/London">London (GMT+0)</option>
                    </select>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
                    <p className="text-gray-600">Gerencie as configurações da sua empresa</p>
                </div>
                
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <p className="text-sm text-green-800">Configurações salvas com sucesso!</p>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'profile' && renderProfileTab()}
                    {activeTab === 'notifications' && renderNotificationsTab()}
                    {activeTab === 'security' && renderSecurityTab()}
                    {activeTab === 'preferences' && renderPreferencesTab()}
                    
                    {/* Placeholder for other tabs */}
                    {['account', 'billing', 'team'].includes(activeTab) && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Settings className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {tabs.find(t => t.id === activeTab)?.label}
                            </h3>
                            <p className="text-gray-600">
                                Esta seção está em desenvolvimento
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanySettingsView;