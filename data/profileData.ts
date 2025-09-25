import { ProfileData } from '../types';
import { Trophy, Star, Target, Award, TrendingUp, Calendar, Users, BookOpen, Zap, Medal } from 'lucide-react';

export const initialProfileData: ProfileData = {
    name: 'Aluno Exemplo',
    title: 'Cineasta & Inovador Audiovisual',
    avatar: 'https://i.pravatar.cc/150?u=alunoexemplo',
    bio: 'Cineasta emergente com paixão por storytelling visual e inovação tecnológica. Especializado em Direção de Fotografia e Pós-produção, com experiência prática em projetos para clientes reais, utilizando tecnologias de IA para otimizar o fluxo de trabalho criativo.',
    skills: [
        { name: 'Roteiro', level: 85 },
        { name: 'Fotografia', level: 95 },
        { name: 'Edição', level: 90 },
        { name: 'IA Generativa', level: 80 },
        { name: 'Produção', level: 75 },
        { name: 'Motion', level: 70 },
    ],
    projects: [
        { id: 1, title: 'Campanha TechCorp', description: 'Direção de fotografia para campanha de lançamento de produto de tecnologia.', img: 'https://picsum.photos/seed/techcorp/600/400' },
        { id: 2, title: 'Documentário ONG Viver', description: 'Edição e colorização para documentário institucional de alto impacto social.', img: 'https://picsum.photos/seed/ongviver/600/400' },
        { id: 3, title: 'Curta-metragem "Futuro"', description: 'Roteiro e direção de curta-metragem de ficção científica, explorando o uso de IA na narrativa.', img: 'https://picsum.photos/seed/futuro/600/400' },
    ],
    endorsements: [],
    gameStats: {
        level: 12,
        points: 2850,
        coursesCompleted: 8,
        projectsCompleted: 15,
        averageGrade: 8.7,
        attendanceRate: 92,
        streak: 23,
        totalHoursStudied: 156,
        badges: [
            { 
                id: 'first-project', 
                name: 'Primeiro Projeto', 
                icon: Star, 
                description: 'Completou seu primeiro projeto', 
                rarity: 'common' as const, 
                earnedAt: '2024-01-15' 
            },
            { 
                id: 'perfect-attendance', 
                name: 'Presença Perfeita', 
                icon: Calendar, 
                description: '100% de presença no mês', 
                rarity: 'rare' as const, 
                earnedAt: '2024-02-01' 
            },
            { 
                id: 'team-leader', 
                name: 'Líder de Equipe', 
                icon: Users, 
                description: 'Liderou uma equipe com sucesso', 
                rarity: 'epic' as const, 
                earnedAt: '2024-02-15' 
            },
            { 
                id: 'innovation-master', 
                name: 'Mestre da Inovação', 
                icon: Zap, 
                description: 'Criou solução inovadora reconhecida', 
                rarity: 'legendary' as const, 
                earnedAt: '2024-03-01' 
            }
        ],
        achievements: [
            { id: '1', title: 'Maratonista EAD', description: 'Complete 10 cursos online', progress: 8, maxProgress: 10, reward: 500, category: 'academic' },
            { id: '2', title: 'Diretor Iniciante', description: 'Dirija 5 projetos', progress: 3, maxProgress: 5, reward: 300, category: 'project' },
            { id: '3', title: 'Networking Pro', description: 'Conecte-se com 20 colegas', progress: 15, maxProgress: 20, reward: 200, category: 'social' },
            { id: '4', title: 'Tech Savvy', description: 'Domine 3 softwares diferentes', progress: 2, maxProgress: 3, reward: 400, category: 'technical' }
        ]
    }
};
