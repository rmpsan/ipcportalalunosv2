import React, { useState } from 'react';
import { 
    ArrowLeft, 
    Briefcase, 
    MapPin, 
    DollarSign, 
    Calendar, 
    Clock,
    Users,
    GraduationCap,
    FileText,
    Plus,
    X,
    AlertCircle,
    Building2,
    Globe,
    Star,
    Eye,
    FolderPlus
} from 'lucide-react';
import { CompanyView } from '../../types';

interface CompanyPostJobViewProps {
    onViewChange?: (view: CompanyView) => void;
}

interface JobPosting {
    title: string;
    company: string;
    description: string;
    requirements: string[];
    benefits: string[];
    location: string;
    workType: 'remote' | 'hybrid' | 'onsite';
    contractType: 'full-time' | 'part-time' | 'freelance' | 'internship';
    experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
    salary: {
        min: string;
        max: string;
        currency: string;
        period: 'hour' | 'month' | 'year';
    };
    skills: string[];
    applicationDeadline: string;
    startDate: string;
    category: string;
    isUrgent: boolean;
    contactEmail: string;
    contactPhone: string;
}

const CompanyPostJobView: React.FC<CompanyPostJobViewProps> = ({ onViewChange }) => {
    const [formData, setFormData] = useState<JobPosting>({
        title: '',
        company: '',
        description: '',
        requirements: [''],
        benefits: [''],
        location: '',
        workType: 'hybrid',
        contractType: 'full-time',
        experienceLevel: 'mid',
        salary: {
            min: '',
            max: '',
            currency: 'BRL',
            period: 'month'
        },
        skills: [],
        applicationDeadline: '',
        startDate: '',
        category: '',
        isUrgent: false,
        contactEmail: '',
        contactPhone: ''
    });

    const [skillInput, setSkillInput] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        'Produção Audiovisual',
        'Edição de Vídeo',
        'Fotografia',
        'Motion Graphics',
        'Direção',
        'Roteiro',
        'Som e Áudio',
        'Iluminação',
        'Marketing Digital',
        'Social Media',
        'Design Gráfico',
        'Desenvolvimento Web',
        'Gestão de Projetos',
        'Outro'
    ];

    const workTypeLabels = {
        remote: 'Remoto',
        hybrid: 'Híbrido',
        onsite: 'Presencial'
    };

    const contractTypeLabels = {
        'full-time': 'Tempo Integral',
        'part-time': 'Meio Período',
        'freelance': 'Freelancer',
        'internship': 'Estágio'
    };

    const experienceLevelLabels = {
        entry: 'Iniciante',
        mid: 'Pleno',
        senior: 'Sênior',
        lead: 'Líder/Especialista'
    };

    const handleInputChange = (field: string, value: any) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof JobPosting] as any,
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
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

    const handleArrayChange = (field: 'requirements' | 'benefits', index: number, value: string) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData(prev => ({
            ...prev,
            [field]: newArray
        }));
    };

    const addArrayItem = (field: 'requirements' | 'benefits') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field: 'requirements' | 'benefits', index: number) => {
        if (formData[field].length > 1) {
            const newArray = formData[field].filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                [field]: newArray
            }));
        }
    };

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()]
            }));
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) newErrors.title = 'Título da vaga é obrigatório';
        if (!formData.company.trim()) newErrors.company = 'Nome da empresa é obrigatório';
        if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
        if (!formData.location.trim()) newErrors.location = 'Localização é obrigatória';
        if (!formData.category) newErrors.category = 'Categoria é obrigatória';
        if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email de contato é obrigatório';
        if (!formData.applicationDeadline) newErrors.applicationDeadline = 'Prazo de inscrição é obrigatório';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            alert('Vaga publicada com sucesso!');
            setIsSubmitting(false);
            // Reset form or redirect
        }, 2000);
    };

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
                            <h1 className="text-2xl font-bold text-gray-900">Postar Nova Vaga</h1>
                            <p className="text-gray-600">Crie uma nova oportunidade de trabalho</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={() => onViewChange?.(CompanyView.VIEW_JOBS)}
                            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Vagas
                        </button>
                        <button 
                            onClick={() => onViewChange?.(CompanyView.NEW_PROJECT)}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FolderPlus className="w-4 h-4 mr-2" />
                            Novo Projeto
                        </button>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                            Informações Básicas
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título da Vaga *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.title ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Ex: Editor de Vídeo Sênior"
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
                                    Nome da Empresa *
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => handleInputChange('company', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.company ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Nome da sua empresa"
                                    />
                                </div>
                                {errors.company && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.company}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categoria *
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.category ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categories.map(category => (
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

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descrição da Vaga *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={4}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.description ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Descreva as responsabilidades, objetivos e o que a pessoa fará no dia a dia..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <Users className="w-5 h-5 mr-2 text-blue-600" />
                            Detalhes da Vaga
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Localização *
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.location ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Ex: São Paulo, SP"
                                    />
                                </div>
                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.location}
                                    </p>
                                )}
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo de Contrato
                                </label>
                                <select
                                    value={formData.contractType}
                                    onChange={(e) => handleInputChange('contractType', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {Object.entries(contractTypeLabels).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nível de Experiência
                                </label>
                                <select
                                    value={formData.experienceLevel}
                                    onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {Object.entries(experienceLevelLabels).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Prazo para Inscrições *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        value={formData.applicationDeadline}
                                        onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.applicationDeadline ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    />
                                </div>
                                {errors.applicationDeadline && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.applicationDeadline}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data de Início
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isUrgent"
                                    checked={formData.isUrgent}
                                    onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isUrgent" className="ml-2 block text-sm text-gray-700">
                                    Marcar como vaga urgente
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Salary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                            Remuneração
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Salário Mínimo
                                </label>
                                <input
                                    type="text"
                                    value={formData.salary.min}
                                    onChange={(e) => handleInputChange('salary.min', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ex: 3000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Salário Máximo
                                </label>
                                <input
                                    type="text"
                                    value={formData.salary.max}
                                    onChange={(e) => handleInputChange('salary.max', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ex: 5000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Moeda
                                </label>
                                <select
                                    value={formData.salary.currency}
                                    onChange={(e) => handleInputChange('salary.currency', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="BRL">BRL (R$)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Período
                                </label>
                                <select
                                    value={formData.salary.period}
                                    onChange={(e) => handleInputChange('salary.period', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="hour">Por Hora</option>
                                    <option value="month">Por Mês</option>
                                    <option value="year">Por Ano</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Requirements and Benefits */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                            Requisitos e Benefícios
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Requisitos
                                </label>
                                {formData.requirements.map((requirement, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            value={requirement}
                                            onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Ex: Experiência com Adobe Premiere"
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Benefícios
                                </label>
                                {formData.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            value={benefit}
                                            onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Ex: Vale alimentação, Plano de saúde"
                                        />
                                        {formData.benefits.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('benefits', index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayItem('benefits')}
                                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Adicionar Benefício
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Habilidades Desejadas
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
                                    {formData.skills.map((skill, index) => (
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
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <Globe className="w-5 h-5 mr-2 text-blue-600" />
                            Informações de Contato
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email de Contato *
                                </label>
                                <input
                                    type="email"
                                    value={formData.contactEmail}
                                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.contactEmail ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="contato@empresa.com"
                                />
                                {errors.contactEmail && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.contactEmail}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Telefone de Contato
                                </label>
                                <input
                                    type="tel"
                                    value={formData.contactPhone}
                                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="(11) 99999-9999"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Salvar Rascunho
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Publicando...
                                </>
                            ) : (
                                'Publicar Vaga'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyPostJobView;