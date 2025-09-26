import React, { useState } from 'react';
import { 
    ArrowLeft, 
    FolderPlus, 
    Calendar, 
    DollarSign, 
    Users,
    Clock,
    Target,
    FileText,
    Plus,
    X,
    AlertCircle,
    Upload,
    Image,
    Video,
    Music,
    File,
    Tag,
    MapPin,
    Star,
    Briefcase,
    Eye
} from 'lucide-react';
import { CompanyView } from '../../types';

interface CompanyNewProjectViewProps {
    onViewChange?: (view: CompanyView) => void;
}

interface ProjectData {
    title: string;
    description: string;
    category: string;
    subcategory: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    budget: {
        min: string;
        max: string;
        currency: string;
        type: 'fixed' | 'hourly' | 'negotiable';
    };
    timeline: {
        startDate: string;
        endDate: string;
        estimatedHours: string;
        milestones: string[];
    };
    team: {
        size: string;
        roles: string[];
        skills: string[];
    };
    deliverables: string[];
    requirements: string[];
    location: string;
    workType: 'remote' | 'hybrid' | 'onsite';
    tags: string[];
    attachments: File[];
    contactInfo: {
        email: string;
        phone: string;
        preferredContact: 'email' | 'phone' | 'both';
    };
}

const CompanyNewProjectView: React.FC<CompanyNewProjectViewProps> = ({ onViewChange }) => {
    const [formData, setFormData] = useState<ProjectData>({
        title: '',
        description: '',
        category: '',
        subcategory: '',
        priority: 'medium',
        budget: {
            min: '',
            max: '',
            currency: 'BRL',
            type: 'fixed'
        },
        timeline: {
            startDate: '',
            endDate: '',
            estimatedHours: '',
            milestones: ['']
        },
        team: {
            size: '',
            roles: [''],
            skills: []
        },
        deliverables: [''],
        requirements: [''],
        location: '',
        workType: 'hybrid',
        tags: [],
        attachments: [],
        contactInfo: {
            email: '',
            phone: '',
            preferredContact: 'email'
        }
    });

    const [tagInput, setTagInput] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const categories = {
        'Produção Audiovisual': ['Documentário', 'Comercial', 'Institucional', 'Evento', 'Música', 'Filme'],
        'Edição de Vídeo': ['Edição Simples', 'Motion Graphics', 'Correção de Cor', 'Finalização'],
        'Fotografia': ['Produto', 'Evento', 'Retrato', 'Arquitetônica', 'Publicitária'],
        'Design Gráfico': ['Identidade Visual', 'Material Impresso', 'Digital', 'Embalagem'],
        'Marketing Digital': ['Campanha', 'Conteúdo', 'SEO', 'Redes Sociais'],
        'Desenvolvimento Web': ['Site Institucional', 'E-commerce', 'Sistema', 'App Mobile']
    };

    const priorityLabels = {
        low: 'Baixa',
        medium: 'Média',
        high: 'Alta',
        urgent: 'Urgente'
    };

    const priorityColors = {
        low: 'bg-gray-100 text-gray-800',
        medium: 'bg-blue-100 text-blue-800',
        high: 'bg-yellow-100 text-yellow-800',
        urgent: 'bg-red-100 text-red-800'
    };

    const workTypeLabels = {
        remote: 'Remoto',
        hybrid: 'Híbrido',
        onsite: 'Presencial'
    };

    const budgetTypeLabels = {
        fixed: 'Valor Fixo',
        hourly: 'Por Hora',
        negotiable: 'A Negociar'
    };

    const handleInputChange = (field: string, value: any) => {
        const keys = field.split('.');
        if (keys.length === 1) {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        } else if (keys.length === 2) {
            setFormData(prev => ({
                ...prev,
                [keys[0]]: {
                    ...prev[keys[0] as keyof ProjectData] as any,
                    [keys[1]]: value
                }
            }));
        }
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleArrayChange = (field: string, index: number, value: string) => {
        const keys = field.split('.');
        if (keys.length === 1) {
            const newArray = [...(formData[field as keyof ProjectData] as string[])];
            newArray[index] = value;
            setFormData(prev => ({
                ...prev,
                [field]: newArray
            }));
        } else if (keys.length === 2) {
            const parent = formData[keys[0] as keyof ProjectData] as any;
            const newArray = [...parent[keys[1]]];
            newArray[index] = value;
            setFormData(prev => ({
                ...prev,
                [keys[0]]: {
                    ...parent,
                    [keys[1]]: newArray
                }
            }));
        }
    };

    const addArrayItem = (field: string) => {
        const keys = field.split('.');
        if (keys.length === 1) {
            const currentArray = formData[field as keyof ProjectData] as string[];
            setFormData(prev => ({
                ...prev,
                [field]: [...currentArray, '']
            }));
        } else if (keys.length === 2) {
            const parent = formData[keys[0] as keyof ProjectData] as any;
            const currentArray = parent[keys[1]];
            setFormData(prev => ({
                ...prev,
                [keys[0]]: {
                    ...parent,
                    [keys[1]]: [...currentArray, '']
                }
            }));
        }
    };

    const removeArrayItem = (field: string, index: number) => {
        const keys = field.split('.');
        if (keys.length === 1) {
            const currentArray = formData[field as keyof ProjectData] as string[];
            if (currentArray.length > 1) {
                const newArray = currentArray.filter((_, i) => i !== index);
                setFormData(prev => ({
                    ...prev,
                    [field]: newArray
                }));
            }
        } else if (keys.length === 2) {
            const parent = formData[keys[0] as keyof ProjectData] as any;
            const currentArray = parent[keys[1]];
            if (currentArray.length > 1) {
                const newArray = currentArray.filter((_: any, i: number) => i !== index);
                setFormData(prev => ({
                    ...prev,
                    [keys[0]]: {
                        ...parent,
                        [keys[1]]: newArray
                    }
                }));
            }
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const addSkill = () => {
        if (skillInput.trim() && !formData.team.skills.includes(skillInput.trim())) {
            setFormData(prev => ({
                ...prev,
                team: {
                    ...prev.team,
                    skills: [...prev.team.skills, skillInput.trim()]
                }
            }));
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            team: {
                ...prev.team,
                skills: prev.team.skills.filter(skill => skill !== skillToRemove)
            }
        }));
    };

    const validateStep = (step: number) => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!formData.title.trim()) newErrors.title = 'Título do projeto é obrigatório';
            if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
            if (!formData.category) newErrors.category = 'Categoria é obrigatória';
        } else if (step === 2) {
            if (!formData.budget.min && formData.budget.type !== 'negotiable') {
                newErrors['budget.min'] = 'Orçamento mínimo é obrigatório';
            }
            if (!formData.timeline.startDate) newErrors['timeline.startDate'] = 'Data de início é obrigatória';
            if (!formData.timeline.endDate) newErrors['timeline.endDate'] = 'Data de término é obrigatória';
        } else if (step === 3) {
            if (!formData.contactInfo.email.trim()) newErrors['contactInfo.email'] = 'Email de contato é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            alert('Projeto criado com sucesso!');
            setIsSubmitting(false);
            // Reset form or redirect
        }, 2000);
    };

    const getFileIcon = (file: File) => {
        const type = file.type;
        if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
        if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
        if (type.startsWith('audio/')) return <Music className="w-4 h-4" />;
        return <File className="w-4 h-4" />;
    };

    const StepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                    }`}>
                        {step}
                    </div>
                    {step < 4 && (
                        <div className={`w-16 h-1 mx-2 ${
                            step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                    )}
                </div>
            ))}
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <FolderPlus className="w-5 h-5 mr-2 text-blue-600" />
                    Informações Básicas
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Título do Projeto *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.title ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Ex: Produção de vídeo institucional"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição do Projeto *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={4}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.description ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Descreva detalhadamente o que precisa ser feito, objetivos, público-alvo, etc."
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categoria *
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => {
                                    handleInputChange('category', e.target.value);
                                    handleInputChange('subcategory', '');
                                }}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.category ? 'border-red-300' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Selecione uma categoria</option>
                                {Object.keys(categories).map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subcategoria
                            </label>
                            <select
                                value={formData.subcategory}
                                onChange={(e) => handleInputChange('subcategory', e.target.value)}
                                disabled={!formData.category}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            >
                                <option value="">Selecione uma subcategoria</option>
                                {formData.category && categories[formData.category as keyof typeof categories]?.map(subcategory => (
                                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prioridade
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) => handleInputChange('priority', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {Object.entries(priorityLabels).map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo de Trabalho
                            </label>
                            <select
                                value={formData.workType}
                                onChange={(e) => handleInputChange('workType', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {Object.entries(workTypeLabels).map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Localização
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ex: São Paulo, SP"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    Orçamento e Cronograma
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Tipo de Orçamento
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(budgetTypeLabels).map(([value, label]) => (
                                <label key={value} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="budgetType"
                                        value={value}
                                        checked={formData.budget.type === value}
                                        onChange={(e) => handleInputChange('budget.type', e.target.value)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {formData.budget.type !== 'negotiable' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Orçamento Mínimo *
                                </label>
                                <input
                                    type="text"
                                    value={formData.budget.min}
                                    onChange={(e) => handleInputChange('budget.min', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors['budget.min'] ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Ex: 5000"
                                />
                                {errors['budget.min'] && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors['budget.min']}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Orçamento Máximo
                                </label>
                                <input
                                    type="text"
                                    value={formData.budget.max}
                                    onChange={(e) => handleInputChange('budget.max', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ex: 10000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Moeda
                                </label>
                                <select
                                    value={formData.budget.currency}
                                    onChange={(e) => handleInputChange('budget.currency', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="BRL">BRL (R$)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Data de Início *
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="date"
                                    value={formData.timeline.startDate}
                                    onChange={(e) => handleInputChange('timeline.startDate', e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors['timeline.startDate'] ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                            </div>
                            {errors['timeline.startDate'] && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors['timeline.startDate']}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Data de Término *
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="date"
                                    value={formData.timeline.endDate}
                                    onChange={(e) => handleInputChange('timeline.endDate', e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors['timeline.endDate'] ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                            </div>
                            {errors['timeline.endDate'] && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors['timeline.endDate']}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Horas Estimadas
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.timeline.estimatedHours}
                                    onChange={(e) => handleInputChange('timeline.estimatedHours', e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ex: 40"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Marcos do Projeto
                        </label>
                        {formData.timeline.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={milestone}
                                    onChange={(e) => handleArrayChange('timeline.milestones', index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ex: Aprovação do roteiro"
                                />
                                {formData.timeline.milestones.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('timeline.milestones', index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('timeline.milestones')}
                            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Adicionar Marco
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Equipe e Requisitos
                </h2>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tamanho da Equipe
                            </label>
                            <input
                                type="text"
                                value={formData.team.size}
                                onChange={(e) => handleInputChange('team.size', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ex: 3-5 pessoas"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Funções Necessárias
                        </label>
                        {formData.team.roles.map((role, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => handleArrayChange('team.roles', index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ex: Editor de vídeo"
                                />
                                {formData.team.roles.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('team.roles', index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('team.roles')}
                            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Adicionar Função
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Habilidades Técnicas Necessárias
                        </label>
                        <div className="flex items-center space-x-2 mb-3">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Digite uma habilidade e pressione Enter"
                            />
                            <button
                                type="button"
                                onClick={addSkill}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.team.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Entregáveis Esperados
                        </label>
                        {formData.deliverables.map((deliverable, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={deliverable}
                                    onChange={(e) => handleArrayChange('deliverables', index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ex: Vídeo final em 4K"
                                />
                                {formData.deliverables.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('deliverables', index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('deliverables')}
                            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Adicionar Entregável
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Requisitos Específicos
                        </label>
                        {formData.requirements.map((requirement, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={requirement}
                                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ex: Experiência mínima de 2 anos"
                                />
                                {formData.requirements.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('requirements', index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('requirements')}
                            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Adicionar Requisito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Finalização e Contato
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Tags do Projeto
                        </label>
                        <div className="flex items-center space-x-2 mb-3">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Digite uma tag e pressione Enter"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Tag className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-2 text-gray-600 hover:text-gray-800"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Anexos (Briefing, Referências, etc.)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                id="file-upload"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        const newFiles = Array.from(e.target.files);
                                        setFormData(prev => ({
                                            ...prev,
                                            attachments: [...prev.attachments, ...newFiles]
                                        }));
                                    }
                                }}
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Selecionar Arquivos
                            </label>
                        </div>
                        {formData.attachments.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {formData.attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            {getFileIcon(file)}
                                            <span className="ml-2 text-sm text-gray-700">{file.name}</span>
                                            <span className="ml-2 text-xs text-gray-500">
                                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    attachments: prev.attachments.filter((_, i) => i !== index)
                                                }));
                                            }}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email de Contato *
                            </label>
                            <input
                                type="email"
                                value={formData.contactInfo.email}
                                onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors['contactInfo.email'] ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="contato@empresa.com"
                            />
                            {errors['contactInfo.email'] && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors['contactInfo.email']}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Telefone de Contato
                            </label>
                            <input
                                type="tel"
                                value={formData.contactInfo.phone}
                                onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="(11) 99999-9999"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Forma Preferida de Contato
                        </label>
                        <div className="flex space-x-4">
                            {[
                                { value: 'email', label: 'Email' },
                                { value: 'phone', label: 'Telefone' },
                                { value: 'both', label: 'Ambos' }
                            ].map(option => (
                                <label key={option.value} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="preferredContact"
                                        value={option.value}
                                        checked={formData.contactInfo.preferredContact === option.value}
                                        onChange={(e) => handleInputChange('contactInfo.preferredContact', e.target.value)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Summary */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Resumo do Projeto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="font-medium text-blue-800">Título:</span>
                        <span className="ml-2 text-blue-700">{formData.title || 'Não informado'}</span>
                    </div>
                    <div>
                        <span className="font-medium text-blue-800">Categoria:</span>
                        <span className="ml-2 text-blue-700">{formData.category || 'Não informado'}</span>
                    </div>
                    <div>
                        <span className="font-medium text-blue-800">Prioridade:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${priorityColors[formData.priority]}`}>
                            {priorityLabels[formData.priority]}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-blue-800">Tipo de Trabalho:</span>
                        <span className="ml-2 text-blue-700">{workTypeLabels[formData.workType]}</span>
                    </div>
                    <div>
                        <span className="font-medium text-blue-800">Orçamento:</span>
                        <span className="ml-2 text-blue-700">
                            {formData.budget.type === 'negotiable' 
                                ? 'A negociar' 
                                : `${formData.budget.currency} ${formData.budget.min}${formData.budget.max ? ` - ${formData.budget.max}` : ''}`
                            }
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-blue-800">Prazo:</span>
                        <span className="ml-2 text-blue-700">
                            {formData.timeline.startDate && formData.timeline.endDate
                                ? `${new Date(formData.timeline.startDate).toLocaleDateString('pt-BR')} - ${new Date(formData.timeline.endDate).toLocaleDateString('pt-BR')}`
                                : 'Não informado'
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => onViewChange?.(CompanyView.DASHBOARD)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Criar Novo Projeto</h1>
                            <p className="text-gray-600">Defina os detalhes do seu projeto</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={() => onViewChange?.(CompanyView.VIEW_PROJECTS)}
                            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Projetos
                        </button>
                        <button 
                            onClick={() => onViewChange?.(CompanyView.POST_JOB)}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Briefcase className="w-4 h-4 mr-2" />
                            Publicar Vaga
                        </button>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto p-6">
                <form onSubmit={handleSubmit}>
                    <StepIndicator />

                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>

                        {currentStep < 4 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Próximo
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Criando Projeto...
                                    </>
                                ) : (
                                    'Criar Projeto'
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyNewProjectView;