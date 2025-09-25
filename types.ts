export enum AppView {
  ACCESS = 'ACCESS',
  INTENSIVE_PORTAL = 'INTENSIVE_PORTAL',
  EAD_PORTAL = 'EAD_PORTAL',
  TEACHER_PORTAL = 'TEACHER_PORTAL',
  PUBLIC_CV = 'PUBLIC_CV',
}

export enum AccessMode {
    CHOICE = 'choice',
    INTENSIVE_LOGIN = 'intensive_login',
    EAD_HUB = 'ead_hub',
    TEACHER_LOGIN = 'teacher_login'
}


export interface User {
  name: string;
  type: 'intensive' | 'ead' | 'teacher';
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