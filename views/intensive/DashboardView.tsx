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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-12 lg:space-y-16 animate-[fadeInUp_0.5s_ease-out]">
            {/* Hero Section - Featured Course */}
            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] bg-gradient-to-r from-gray-900 via-gray-800 to-transparent overflow-hidden rounded-xl shadow-2xl">
                <img 
                    src="https://picsum.photos/seed/hero-course/1920/600" 
                    alt="Featured Course" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/30"></div>
                <div className="relative z-10 flex items-center h-full px-6 sm:px-8 md:px-10 lg:px-12">
                    <div className="w-full max-w-3xl">
                        <span className="inline-block bg-red-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-bold mb-3 md:mb-4 uppercase tracking-wide">
                            CURSO EM DESTAQUE
                        </span>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 leading-tight text-white">
                            Masterclass de Direção Cinematográfica
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                            Aprenda as técnicas avançadas de direção com os melhores profissionais do mercado. 
                            Uma jornada completa do roteiro à pós-produção.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            <button 
                                onClick={() => onSelectCourse({ title: 'Masterclass de Direção Cinematográfica', instructor: 'Prof. Ricardo Almeida' })}
                                className="bg-white text-black px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 5v10l7-5z"/>
                                </svg>
                                Assistir Agora
                            </button>
                            <button className="bg-gray-700/80 backdrop-blur-sm text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold hover:bg-gray-600/80 transition-all duration-200 text-sm md:text-base touch-manipulation border border-gray-600/50 hover:border-gray-500/50">
                                + Minha Lista
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8 sm:space-y-10 md:space-y-12">
                {/* Continue Assistindo */}
                <section className="mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Continue Assistindo</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {continueWatching.map((course, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 touch-manipulation cursor-pointer group w-full"
                                onClick={() => onSelectCourse({ title: course.title, instructor: course.instructor })}
                            >
                                    <div className="relative">
                                        <img 
                                            src={course.thumbnail} 
                                            alt={course.title}
                                            className="w-full h-36 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className="bg-white/95 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors shadow-lg">
                                                Continuar
                                            </button>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded-md text-xs font-medium">
                                            {course.progress}%
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 md:p-6">
                                        <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-1">{course.instructor}</p>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs sm:text-sm text-gray-500">{course.duration}</span>
                                            <span className="text-xs sm:text-sm font-medium text-blue-600">{course.progress}% concluído</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Cards das Principais Funcionalidades */}
                <section>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Explore outras funcionalidades</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {/* Catálogo */}
                        <div 
                            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 sm:p-8 cursor-pointer hover:scale-105 transition-all duration-300 group touch-manipulation shadow-lg hover:shadow-2xl min-h-[160px] flex flex-col justify-between"
                            onClick={() => setActiveView('catalog')}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-2">Catálogo de Cursos</h3>
                                <p className="text-blue-100 text-sm leading-relaxed">Explore todos os cursos disponíveis</p>
                            </div>
                        </div>

                        {/* Oportunidades */}
                        <div 
                            className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 sm:p-8 cursor-pointer hover:scale-105 transition-all duration-300 group touch-manipulation shadow-lg hover:shadow-2xl min-h-[160px] flex flex-col justify-between"
                            onClick={() => setActiveView('opportunities-hub')}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                    </svg>
                                </div>
                                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-2">Oportunidades</h3>
                                <p className="text-green-100 text-sm leading-relaxed">Vagas e projetos disponíveis</p>
                            </div>
                        </div>

                        {/* Hub IA */}
                        <div 
                            className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 sm:p-8 cursor-pointer hover:scale-105 transition-all duration-300 group touch-manipulation shadow-lg hover:shadow-2xl min-h-[160px] flex flex-col justify-between"
                            onClick={() => setActiveView('ia-hub')}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.423l-.548-.547z" />
                                    </svg>
                                </div>
                                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-2">Hub de IA</h3>
                                <p className="text-purple-100 text-sm leading-relaxed">Ferramentas de inteligência artificial</p>
                            </div>
                        </div>

                        {/* Ferramentas */}
                        <div 
                            className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-6 sm:p-8 cursor-pointer hover:scale-105 transition-all duration-300 group touch-manipulation shadow-lg hover:shadow-2xl min-h-[160px] flex flex-col justify-between"
                            onClick={() => setActiveView('tools-and-career')}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Ferramentas</h3>
                            <p className="text-orange-100 text-sm">Recursos para sua carreira</p>
                        </div>

                        {/* Agendamento */}
                        <div 
                            className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform group touch-manipulation"
                            onClick={() => setActiveView('equipment-scheduling')}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Agendamentos</h3>
                            <p className="text-red-100 text-sm">Reserve equipamentos e salas</p>
                        </div>

                        {/* Produção */}
                        <div 
                            className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform group touch-manipulation"
                            onClick={() => setActiveView('production')}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Produção</h3>
                            <p className="text-indigo-100 text-sm">Gerencie seus projetos</p>
                        </div>

                        {/* Networking */}
                        <div 
                            className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform group touch-manipulation"
                            onClick={() => setActiveView('networking')}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Networking</h3>
                            <p className="text-pink-100 text-sm">Conecte-se com profissionais</p>
                        </div>

                        {/* Sistema de Pontos */}
                        <div 
                            className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform group touch-manipulation"
                            onClick={() => setActiveView('points-system')}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Sistema de Pontos</h3>
                            <p className="text-yellow-100 text-sm">Acompanhe seu progresso</p>
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
                <section className="mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Novos Cursos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {newCourses.map((course, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 touch-manipulation cursor-pointer group w-full"
                                onClick={() => onSelectCourse({ title: course.title, instructor: course.instructor })}
                            >
                                    <div className="relative">
                                        <img 
                                            src={course.thumbnail} 
                                            alt={course.title}
                                            className="w-full h-36 sm:h-40 md:h-48 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors shadow-lg">
                                                Começar
                                            </button>
                                        </div>
                                        <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md">
                                            Novo
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 md:p-6">
                                        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900">{course.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.instructor}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">{course.instructor}</span>
                                            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{course.releaseDate}</span>
                                        </div>
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
