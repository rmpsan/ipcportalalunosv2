import React, { useState } from 'react';
import { AppView, ProfileData, Job } from '../../types';

const jobs: Job[] = [
    {
        id: 1,
        title: "Editor(a) de Vídeo Jr.",
        company: "Produtora Filmes S.A.",
        location: "São Paulo, SP",
        type: "Tempo Integral",
        description: "Buscamos um(a) editor(a) de vídeo júnior apaixonado(a) por contar histórias para se juntar à nossa equipe de pós-produção. O candidato ideal tem conhecimento em Adobe Premiere Pro e After Effects.",
        responsibilities: [
            "Realizar a decupagem e organização de material bruto.",
            "Editar vídeos para diversas plataformas (redes sociais, institucionais).",
            "Aplicar correções de cor e som básicas.",
            "Criar motion graphics simples e legendas."
        ],
        qualifications: [
            "Formação no Instituto Paulista de Cinema ou similar.",
            "Portfólio com projetos de edição.",
            "Conhecimento do Pacote Adobe (Premiere, After Effects).",
            "Ser proativo e colaborativo."
        ],
        isNew: true,
    },
    {
        id: 2,
        title: "Assistente de Câmera",
        company: "Estúdios Globo",
        location: "Rio de Janeiro, RJ",
        type: "Tempo Integral",
        description: "Oportunidade para atuar como assistente de câmera em produções de grande porte. O profissional dará suporte direto ao diretor de fotografia e à equipe de câmera.",
        responsibilities: [
            "Montagem e desmontagem de equipamentos de câmera.",
            "Preparação e troca de lentes e acessórios.",
            "Garantir o bom funcionamento do equipamento durante as filmagens.",
            "Auxiliar na movimentação de câmera (sliders, dollies)."
        ],
        qualifications: [
            "Experiência prática com câmeras de cinema digital.",
            "Conhecimento técnico de lentes, filtros e acessórios.",
            "Capacidade de trabalhar em um ambiente dinâmico e sob pressão.",
            "Disponibilidade para horários flexíveis."
        ],
    },
    {
        id: 3,
        title: "Roteirista para Mídias Sociais",
        company: "Agência Digital Buzz",
        location: "Remoto",
        type: "Meio Período",
        description: "Criar roteiros curtos e impactantes para campanhas em plataformas como TikTok, Instagram Reels e YouTube Shorts. Foco em criatividade e engajamento.",
        responsibilities: [
            "Desenvolver conceitos criativos para vídeos curtos.",
            "Escrever roteiros e diálogos ágeis.",
            "Pesquisar tendências e formatos virais.",
            "Colaborar com a equipe de produção."
        ],
        qualifications: [
            "Portfólio com roteiros para mídias digitais.",
            "Excelente habilidade de escrita.",
            "Conhecimento profundo das plataformas de vídeo curto.",
            "Criatividade e agilidade."
        ],
        isNew: true,
    },
    {
        id: 4,
        title: "Técnico de Som Direto",
        company: "Som Imersivo Produções",
        location: "São Paulo, SP",
        type: "Freelance",
        description: "Responsável pela captação de som direto em sets de filmagem para projetos de publicidade e cinema.",
        responsibilities: [
            "Operar microfones (boom, lapela) e gravadores.",
            "Monitorar a qualidade do áudio durante a gravação.",
            "Solucionar problemas técnicos de áudio no set.",
            "Trabalhar em conjunto com a equipe de direção e fotografia."
        ],
        qualifications: [
            "Experiência comprovada em captação de som direto.",
            "Conhecimento de equipamentos de áudio profissional (mixers, gravadores, microfones).",
            "Atenção aos detalhes e audição crítica.",
        ],
    },
];

const JobCard: React.FC<{job: Job; onSelect: (job: Job) => void}> = ({job, onSelect}) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex justify-between items-center">
        <div>
            <h4 className="font-bold text-gray-800">{job.title} {job.isNew && <span className="text-xs bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full ml-2">Nova</span>}</h4>
            <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
        </div>
        <button onClick={() => onSelect(job)} className="bg-teal-500 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-teal-600 transition-colors">
            Ver Vaga
        </button>
    </div>
);

const endorsers = [
    { id: 1, name: 'Raphael Martinez', title: 'Fundador & Coordenador Geral', avatar: 'https://gov.institutopaulistadecinema.com.br/images/raphael_bio.png' },
    { id: 2, name: 'Dr. Fernando Guimarães', title: 'Coordenador (Trilha de Roteiro)', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { id: 3, name: 'Ana Oliveira', title: 'Supervisora (Trilha de IA)', avatar: 'https://randomuser.me/api/portraits/women/46.jpg' },
];

const endorsementTexts = [
    "Demonstrou uma capacidade excepcional de liderança e colaboração. Sua visão criativa e dedicação técnica o tornam um ativo inestimável para qualquer equipe de produção. Recomendo fortemente.",
    "Um talento nato para o storytelling. Sua habilidade em construir narrativas coesas e personagens cativantes é impressionante. Ele está mais do que preparado para os desafios do mercado.",
    "Sua proficiência com ferramentas de IA e sua rápida adaptação a novas tecnologias são notáveis. Ele não apenas entende a técnica, mas também a aplica de forma inovadora para aprimorar a narrativa.",
    "Trabalha com um nível de profissionalismo e comprometimento que é raro de se ver. Eleva a qualidade de qualquer projeto em que se envolve e é um prazer tê-lo em uma equipe."
];

interface CareerViewProps {
    onNavigate: (view: AppView) => void;
    profileData: ProfileData;
    setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
    onSelectJob: (job: Job) => void;
}

const CareerView: React.FC<CareerViewProps> = ({ onNavigate, profileData, setProfileData, onSelectJob }) => {
    const [pendingRequests, setPendingRequests] = useState<number[]>([]);

    const handleRequestEndorsement = (endorserId: number) => {
        setPendingRequests(prev => [...prev, endorserId]);

        setTimeout(() => {
            const endorser = endorsers.find(e => e.id === endorserId);
            if (endorser) {
                const newEndorsement = {
                    id: Date.now(),
                    endorserName: endorser.name,
                    endorserTitle: endorser.title,
                    endorserAvatar: endorser.avatar,
                    text: endorsementTexts[Math.floor(Math.random() * endorsementTexts.length)],
                };
                setProfileData(prevData => ({
                    ...prevData,
                    endorsements: [...prevData.endorsements, newEndorsement],
                }));
            }
            setPendingRequests(prev => prev.filter(id => id !== endorserId));
        }, 2500); // Simulate network delay
    };

    return (
        <div className="animate-[fadeInUp_0.5s_ease-out] space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Carreira e Empregabilidade</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-teal-600">Empregabilidade</h2>
                    <p className="text-gray-700">Garantia de 90% de empregabilidade em um mercado com mais de <span className="font-bold">50.000 vagas</span>.</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-teal-600">Certificação DRT</h2>
                    <p className="text-gray-700">Receba seu Registro Profissional Oficial (DRT) ao final do curso.</p>
                </div>
                <div className="bg-teal-50 border-l-4 border-teal-500 text-teal-800 p-6 rounded-r-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Perfil Público Verificado</h2>
                    <p className="mb-4">Seu currículo validado pelo instituto, pronto para compartilhar com o mercado.</p>
                    <button onClick={() => onNavigate(AppView.PUBLIC_CV)} className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
                        Ver/Compartilhar Perfil
                    </button>
                </div>
            </div>
            
            {/* Endorsements Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Endossos: Valide suas Conquistas</h2>
                <p className="text-gray-600 mb-6">Solicite validações da equipe do instituto para fortalecer seu perfil público.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {endorsers.map(endorser => {
                        const isApproved = profileData.endorsements.some(e => e.endorserName === endorser.name);
                        const isPending = pendingRequests.includes(endorser.id);

                        return (
                            <div key={endorser.id} className="bg-gray-50 p-4 rounded-lg border text-center">
                                <img src={endorser.avatar} alt={endorser.name} className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-md object-cover"/>
                                <h4 className="font-bold text-gray-800">{endorser.name}</h4>
                                <p className="text-xs text-gray-500 mb-4">{endorser.title}</p>
                                {isApproved ? (
                                    <button disabled className="w-full bg-green-500 text-white text-sm font-semibold py-2 px-3 rounded-md flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Aprovado
                                    </button>
                                ) : isPending ? (
                                    <button disabled className="w-full bg-yellow-400 text-yellow-800 text-sm font-semibold py-2 px-3 rounded-md animate-pulse">Pendente...</button>
                                ) : (
                                    <button onClick={() => handleRequestEndorsement(endorser.id)} className="w-full bg-gray-700 text-white text-sm font-semibold py-2 px-3 rounded-md hover:bg-gray-800 transition-colors">Solicitar</button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Mural de Vagas Exclusivas</h2>
                <div className="space-y-4">
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} onSelect={onSelectJob} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CareerView;