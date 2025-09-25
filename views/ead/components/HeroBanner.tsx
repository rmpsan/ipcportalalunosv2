import React from 'react';

interface HeroBannerProps {
    onSelectCourse: (course: { title: string, instructor: string }) => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCourse }) => {
    return (
        <div className="h-[60vh] relative flex items-end p-6 md:p-10 text-white bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/hero-ai/1200/800')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="relative z-10 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                    IA Audiovisual: Domine a Tecnologia do Futuro
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                    Aprenda na primeira escola de IA audiovisual para periferias do mundo e prepare-se para um salário projetado de R$ 8.000.
                </p>
                <button 
                    onClick={() => onSelectCourse({ title: 'Trilha Completa de IA Audiovisual', instructor: 'Equipe de Inovação IPC' })}
                    className="mt-6 bg-white text-gray-900 font-bold py-3 px-8 rounded-md hover:bg-gray-200 transition-colors text-lg"
                >
                    Começar a Trilha
                </button>
            </div>
        </div>
    );
};

export default HeroBanner;
