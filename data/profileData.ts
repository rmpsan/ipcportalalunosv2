import { ProfileData } from '../types';

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
};
