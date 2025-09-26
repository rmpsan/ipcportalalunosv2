export enum AppView {
  ACCESS = 'ACCESS',
  INTENSIVE_PORTAL = 'INTENSIVE_PORTAL',
  EAD_PORTAL = 'EAD_PORTAL',
  TEACHER_PORTAL = 'TEACHER_PORTAL',
  COMPANY_PORTAL = 'COMPANY_PORTAL',
  PUBLIC_CV = 'PUBLIC_CV',
}

export enum AccessMode {
    CHOICE = 'choice',
    INTENSIVE_LOGIN = 'intensive_login',
    EAD_HUB = 'ead_hub',
    TEACHER_LOGIN = 'teacher_login',
    COMPANY_LOGIN = 'company_login'
}


export interface User {
  name: string;
  type: 'intensive' | 'ead' | 'teacher' | 'company';
}

export enum TeacherView {
    DASHBOARD = 'dashboard',
    IA_HUB = 'ia-hub',
    PRODUCTION = 'production',
    TRAINING = 'training',
    CAREER = 'career',
    EQUIPMENT = 'equipment',
    CATALOG = 'catalog',
    COURSE_DETAIL = 'course-detail',
    STUDENTS = 'students',
    STUDENT_DETAIL = 'student-detail',
    GRADES = 'grades',
    NETWORKING = 'networking',
    POINTS = 'points',
    ADMIN = 'admin',
    STOCK = 'stock',
    FINANCIAL = 'financial',
    ANALYTICS = 'analytics',
    COMMUNICATION = 'communication',
}

export enum IntensiveView {
    DASHBOARD = 'dashboard',
    IA_HUB = 'ia-hub',
    PRODUCAO = 'producao',
    FORMACAO = 'formacao',
    CARREIRA = 'carreira',
    EQUIPMENT = 'equipment',
    CATALOG = 'catalog',
    COURSE_DETAIL = 'course-detail',
    ADMIN = 'admin',
    STOCK = 'stock',
    FINANCEIRO = 'financeiro',
    JOB_DETAIL = 'job-detail',
    OPPORTUNITIES = 'opportunities',
    OPPORTUNITY_DETAIL = 'opportunity-detail',
    GRADES_FEEDBACK = 'grades-feedback',
    NETWORKING = 'networking',
    POINTS = 'points',
}

export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    responsibilities: string[];
    qualifications: string[];
    isNew?: boolean;
}

export interface CommercialProject {
    id: number;
    type: 'commercial';
    client: string;
    clientLogo: string;
    image: string;
    title: string;
    description: string;
    roles: string[];
    deadline: string;
    budget: string;
}

export interface InternalCall {
    id: number;
    type: 'internal';
    title: string;
    image: string;
    description: string;
    submissionCriteria: string[];
    prizes: string[];
    deadline: string;
}

export type Opportunity = CommercialProject | InternalCall;


export enum FinancialSubView {
    SCHOLARSHIP = 'scholarship',
    PROJECTS = 'projects',
    STOCK = 'stock',
}

export enum StockSubView {
    GALLERY = 'gallery',
    UPLOADS = 'uploads',
    EARNINGS = 'earnings',
}

export enum AdminSubView {
    DATA = 'data',
    PAYMENTS = 'payments',
    PROJECTS = 'projects',
}

export enum EadView {
    CATALOG = 'catalog',
    COURSE_DETAIL = 'course-detail',
    TOOLS_CAREER = 'tools-career',
}

export enum IAHubSubView {
    PLAYGROUND = 'ia-playground',
    TRILHA = 'ia-trilha',
    RECURSOS = 'ia-recursos',
    VIDEO_AI = 'video-ai',
    TEMPLATES = 'templates',
}

export enum LlmProvider {
    CLAUDE = 'claude',
    CHATGPT = 'chatgpt',
    GEMINI = 'gemini',
    LLAMA = 'llama',
    MISTRAL = 'mistral',
    PERPLEXITY = 'perplexity',
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  provider?: LlmProvider;
}

export interface Endorsement {
    id: number;
    endorserName: string;
    endorserTitle: string;
    endorserAvatar: string;
    text: string;
}

export interface GameStats {
    level: number;
    points: number;
    coursesCompleted: number;
    projectsCompleted: number;
    averageGrade: number;
    attendanceRate: number;
    streak: number;
    totalHoursStudied: number;
    badges: GameBadge[];
    achievements: GameAchievement[];
}

export interface GameBadge {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<any>;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    earnedAt?: string;
}

export interface GameAchievement {
    id: string;
    title: string;
    description: string;
    progress: number;
    maxProgress: number;
    reward: number;
    category: 'academic' | 'project' | 'social' | 'technical';
}

export interface ProfileData {
    name: string;
    title: string;
    avatar: string;
    bio: string;
    skills: { name: string; level: number }[];
    projects: { id: number; title: string; description: string; img: string }[];
    endorsements: Endorsement[];
    gameStats?: GameStats;
}

// ===== COMPANY PORTAL TYPES =====

export enum CompanyView {
    DASHBOARD = 'dashboard',
    STOCK_FOOTAGE = 'stock-footage',
    PROJECTS = 'projects',
    JOBS = 'jobs',
    TALENT_SEARCH = 'talent-search',
    ANALYTICS = 'analytics',
    PRODUCTION_REQUESTS = 'production-requests',
    PROJECT_TRACKING = 'project-tracking',
    JOB_MANAGEMENT = 'job-management',
    TALENT_BANK = 'talent-bank',
    STUDENT_HISTORY = 'student-history',
    FEEDBACK_SYSTEM = 'feedback-system',
    VIDEO_REVIEW = 'video-review',
    NEW_PRODUCTION_REQUEST = 'new-production-request',
    POST_JOB = 'post-job',
    VIEW_JOBS = 'view-jobs',
    NEW_PROJECT = 'new-project',
    VIEW_PROJECTS = 'view-projects',
    SETTINGS = 'settings',
    SUPPORT = 'support',
}

export interface Company {
    id: string;
    name: string;
    email: string;
    cnpj: string;
    segment: string;
    size: 'small' | 'medium' | 'large';
    type: 'supporter' | 'client' | 'both';
    logo?: string;
    website?: string;
    description?: string;
    createdAt: Date;
}

export interface StockFootage {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: number;
    resolution: string;
    price: number;
    license: 'standard' | 'extended' | 'exclusive';
    tags: string[];
    previewUrl: string;
    downloadUrl: string;
    thumbnailUrl: string;
    createdAt: Date;
    downloads: number;
}

export interface ProductionRequest {
    id: string;
    companyId: string;
    title: string;
    description: string;
    budget: number;
    deadline: Date;
    status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
    attachments: string[];
    createdAt: Date;
    updatedAt: Date;
    estimatedDuration?: number;
    projectType: 'commercial' | 'corporate' | 'documentary' | 'event' | 'other';
}

export interface CompanyJob {
    id: string;
    companyId: string;
    title: string;
    description: string;
    requirements: string[];
    salary?: number;
    location: string;
    type: 'full_time' | 'part_time' | 'internship' | 'freelance';
    status: 'active' | 'paused' | 'closed';
    createdAt: Date;
    applicants: string[];
    category: string;
}

export interface Talent {
    id: string;
    name: string;
    email: string;
    skills: string[];
    experience: string;
    portfolio: string[];
    academicHistory: AcademicRecord[];
    points: number;
    availability: boolean;
    location: string;
    profileImage?: string;
    bio?: string;
    specializations: string[];
}

export interface AcademicRecord {
    id: string;
    studentId: string;
    course: string;
    grade: number;
    semester: string;
    year: number;
    professor: string;
    status: 'completed' | 'in_progress' | 'failed';
}

export interface StudentFeedback {
    id: string;
    studentId: string;
    companyId: string;
    jobId: string;
    rating: number;
    technicalSkills: number;
    softSkills: number;
    punctuality: number;
    communication: number;
    comments: string;
    createdAt: Date;
    improvements?: string[];
    strengths?: string[];
}