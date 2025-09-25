import React from 'react';
import { IntensiveView } from '../../types';

interface DashboardViewProps {
    setActiveView: (view: IntensiveView) => void;
    onSelectCourse: (course: { title: string, instructor: string }) => void;
}

const continueWatching = [
    { 
        title: 'Técnicas de Roteiro para Cinema', 
        instructor: 'Dr. Lúcia Borges (USP)', 
        progress: 65, 
        thumbnail: 'https://picsum.photos/seed/roteiro/400/225',
        duration: '2h 15m restantes'
    },
    { 
        title: 'Edição Avançada no DaVinci Resolve', 
        instructor: 'Prof. Carlos Silva', 
        progress: 30, 
        thumbnail: 'https://picsum.photos/seed/davinci/400/225',
        duration: '4h 30m restantes'
    },
    { 
        title: 'Motion Graphics com After Effects', 
        instructor: 'Ana Costa', 
        progress: 85, 
        thumbnail: 'https://picsum.photos/seed/motion/400/225',
        duration: '45m restantes'
    }
];

const recommendedCourses = [
    { 
        title: 'IA para Criação de Conteúdo', 
        instructor: 'Dr. Roberto Lima', 
        thumbnail: 'https://picsum.photos/seed/ia-content/400/225',
        rating: 4.9,
        students: 1250
    },
    { 
        title: 'Storytelling Digital', 
        instructor: 'Marina Santos', 
        thumbnail: 'https://picsum.photos/seed/storytelling/400/225',
        rating: 4.8,
        students: 890
    },
    { 
        title: 'Produção de Podcasts', 
        instructor: 'João Ferreira', 
        thumbnail: 'https://picsum.photos/seed/podcast/400/225',
        rating: 4.7,
        students: 650
    },
    { 
        title: 'Fotografia Cinematográfica', 
        instructor: 'Carla Mendes', 
        thumbnail: 'https://picsum.photos/seed/cinema-photo/400/225',
        rating: 4.9,
        students: 1100
    }
];

const newCourses = [
    { 
        title: 'ChatGPT para Roteiristas', 
        instructor: 'Prof. André Oliveira', 
        thumbnail: 'https://picsum.photos/seed/chatgpt/400/225',
        isNew: true,
        releaseDate: 'Lançado hoje'
    },
    { 
        title: 'Criação de NFTs Audiovisuais', 
        instructor: 'Dra. Fernanda Costa', 
        thumbnail: 'https://picsum.photos/seed/nft/400/225',
        isNew: true,
        releaseDate: 'Novo'
    },
    { 
        title: 'Realidade Virtual para Cinema', 
        instructor: 'Prof. Lucas Martins', 
        thumbnail: 'https://picsum.photos/seed/vr-cinema/400/225',
        isNew: true,
        releaseDate: 'Esta semana'
    }
];

const DashboardView: React.FC<DashboardViewProps> = ({ setActiveView, onSelectCourse }) => {
    const formationProgress = 35; 
    
    return (
        <div className="space-y-6 sm:space-y-8 animate-[fadeInUp_0.5s_ease-out] bg-gray-900 min-h-screen text-white">
            {/* Hero Section - Featured Course */}
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-r from-gray-900 via-gray-800 to-transparent overflow-hidden">
                <img 
                    src="https://picsum.photos/seed/hero-course/1920/600" 
                    alt="Featured Course" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
                <div className="relative z-10 flex items-center h-full px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="max-w-xl sm:max-w-2xl">
                        <span className="inline-block bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs font-bold mb-2 sm:mb-3 md:mb-4">
                            CURSO EM DESTAQUE
                        </span>
                        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">Masterclass de Direção Cinematográfica</h1>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-300 mb-3 sm:mb-4 md:mb-6 line-clamp-2 sm:line-clamp-3">
                            Aprenda as técnicas avançadas de direção com os melhores profissionais do mercado. 
                            Uma jornada completa do roteiro à pós-produção.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                            <button 
                                onClick={() => onSelectCourse({ title: 'Masterclass de Direção Cinematográfica', instructor: 'Prof. Ricardo Almeida' })}
                                className="bg-white text-black px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 5v10l7-5z"/>
                                </svg>
                                Assistir Agora
                            </button>
                            <button className="bg-gray-600/80 text-white px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold hover:bg-gray-600 transition-colors text-xs sm:text-sm md:text-base">
                                + Minha Lista
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-3 sm:px-4 md:px-6 lg:px-8 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
                {/* Continue Assistindo */}
                <section>
                    <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Continue de onde parou</h2>
                        <div className="hidden sm:flex gap-2">
                            <button 
                                onClick={() => {
                                    const container = document.getElementById('continue-watching-carousel');
                                    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                }}
                                className="p-1.5 sm:p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                onClick={() => {
                                    const container = document.getElementById('continue-watching-carousel');
                                    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                }}
                                className="p-1.5 sm:p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="continue-watching-carousel" className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-3 sm:pb-4 scrollbar-hide carousel-smooth">
                        {continueWatching.map((course, index) => (
                            <div 
                                key={index}
                                className="flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group"
                                onClick={() => onSelectCourse({ title: course.title, instructor: course.instructor })}
                            >
                                <div className="relative">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8 5v10l7-5z"/>
                                        </svg>
                                    </div>
                                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 right-1 sm:right-2">
                                        <div className="bg-red-600 h-0.5 sm:h-1 rounded-full">
                                            <div className="bg-red-400 h-0.5 sm:h-1 rounded-full" style={{width: `${course.progress}%`}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-3 md:p-4">
                                    <h3 className="font-bold text-white mb-1 text-xs sm:text-sm md:text-base line-clamp-2">{course.title}</h3>
                                    <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">{course.instructor}</p>
                                    <p className="text-gray-500 text-xs">{course.duration}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Cards das Principais Funcionalidades */}
                <section>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">Explore outras funcionalidades</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                        {/* Catálogo */}
                        <div 
                            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform group"
                            onClick={() => setActiveView('catalog')}
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">Catálogo de Cursos</h3>
                            <p className="text-blue-100 text-xs sm:text-sm">Explore todos os cursos disponíveis</p>
                        </div>

                        {/* Oportunidades */}
                        <div 
                            className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform group"
                            onClick={() => setActiveView('opportunities')}
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                    </svg>
                                </div>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">Oportunidades</h3>
                            <p className="text-green-100 text-xs sm:text-sm">Vagas e projetos disponíveis</p>
                        </div>

                        {/* Hub IA */}
                        <div 
                            className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform group"
                            onClick={() => setActiveView('ia-hub')}
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">Hub de IA</h3>
                            <p className="text-purple-100 text-xs sm:text-sm">Ferramentas de inteligência artificial</p>
                        </div>

                        {/* Ferramentas e Carreira */}
                        <div 
                            className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform group"
                            onClick={() => setActiveView('tools-career')}
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">Ferramentas</h3>
                            <p className="text-orange-100 text-xs sm:text-sm">Recursos para sua carreira</p>
                        </div>

                        {/* Agendamento */}
                        <div 
                            className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform group"
                            onClick={() => setActiveView('equipment-scheduling')}
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">Agendamentos</h3>
                            <p className="text-red-100 text-xs sm:text-sm">Reserve equipamentos e salas</p>
                        </div>

                        {/* Produção */}
                        <div 
                            className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform group"
                            onClick={() => setActiveView('production')}
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">Produção</h3>
                            <p className="text-indigo-100 text-xs sm:text-sm">Gerencie seus projetos</p>
                        </div>

                        {/* Meus Uploads */}
                        <div 
                            className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform group"
                            onClick={() => setActiveView('my-uploads')}
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">Meus Uploads</h3>
                            <p className="text-teal-100 text-xs sm:text-sm">Gerencie seus arquivos</p>
                        </div>

                        {/* Portal Intensivo */}
                        <div 
                            className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-xl p-4 sm:p-6 cursor-pointer hover:scale-105 transition-transform group"
                            onClick={() => setActiveView('intensive-portal')}
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">Portal Intensivo</h3>
                            <p className="text-pink-100 text-xs sm:text-sm">Cursos intensivos especiais</p>
                        </div>
                    </div>
                </section>

                {/* Recomendados para Você */}
                <section>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Recomendados para você</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                        {recommendedCourses.map((course, index) => (
                            <div 
                                key={index}
                                className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group"
                                onClick={() => onSelectCourse({ title: course.title, instructor: course.instructor })}
                            >
                                <div className="relative">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-24 sm:h-32 lg:h-36 object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8 5v10l7-5z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-2 sm:p-3 lg:p-4">
                                    <h3 className="font-bold text-white mb-1 text-xs sm:text-sm line-clamp-2">{course.title}</h3>
                                    <p className="text-gray-400 text-xs mb-2 line-clamp-1">{course.instructor}</p>
                                    <div className="flex items-center gap-1 sm:gap-2 text-xs">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                            <span className="text-yellow-400">{course.rating}</span>
                                        </div>
                                        <span className="text-gray-500 hidden sm:inline">•</span>
                                        <span className="text-gray-400 hidden sm:inline">{course.students} alunos</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Novos Cursos */}
                <section>
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold">Novos cursos</h2>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => {
                                    const container = document.getElementById('new-courses-carousel');
                                    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                }}
                                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                onClick={() => {
                                    const container = document.getElementById('new-courses-carousel');
                                    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                }}
                                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="new-courses-carousel" className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide carousel-smooth">
                        {newCourses.map((course, index) => (
                            <div 
                                key={index}
                                className="flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group"
                                onClick={() => onSelectCourse({ title: course.title, instructor: course.instructor })}
                            >
                                <div className="relative">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-24 sm:h-28 md:h-32 lg:h-36 object-cover" />
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                                            {course.releaseDate}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8 5v10l7-5z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-3 sm:p-4">
                                    <h3 className="font-bold text-white mb-1 text-xs sm:text-sm line-clamp-2">{course.title}</h3>
                                    <p className="text-gray-400 text-xs line-clamp-1">{course.instructor}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sua Trilha de Especialização */}
                <section>
                    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
                            <div className="flex-1">
                                <h2 className="text-xl sm:text-2xl font-bold mb-2">Sua Trilha de Especialização</h2>
                                <p className="text-teal-100 text-base sm:text-lg mb-3 sm:mb-4">IA Audiovisual</p>
                                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white/30 rounded-full h-1.5 sm:h-2 md:h-3 mb-1 sm:mb-2">
                                    <div className="bg-white h-1.5 sm:h-2 md:h-3 rounded-full" style={{width: `${formationProgress}%`}}></div>
                                </div>
                                <p className="text-xs sm:text-sm text-teal-100">{formationProgress}% concluída • Continue sua jornada!</p>
                            </div>
                            <div className="w-full lg:w-auto">
                                <button 
                                    onClick={() => setActiveView(IntensiveView.TRAINING)}
                                    className="w-full lg:w-auto bg-white text-teal-600 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors text-sm sm:text-base"
                                >
                                    Continuar Trilha
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Oportunidades de Carreira */}
                <section>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold">Oportunidades de Carreira</h2>
                        <button 
                            onClick={() => setActiveView(IntensiveView.OPPORTUNITIES)}
                            className="text-teal-400 font-semibold hover:text-teal-300 transition-colors text-xs sm:text-sm"
                        >
                            Ver Todas →
                        </button>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-center">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">🎬 Mostra de Curtas IPC 2024</h3>
                        <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">Inscrições abertas! Mostre seu talento e concorra a prêmios incríveis.</p>
                        <button 
                            onClick={() => setActiveView(IntensiveView.OPPORTUNITIES)}
                            className="bg-white text-purple-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors text-sm sm:text-base"
                        >
                            Inscrever-se Agora
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DashboardView;