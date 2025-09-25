import React from 'react';

interface HeroBannerProps {
    onSelectCourse: (course: { title: string, instructor: string }) => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCourse }) => {
    return (
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-gradient-to-r from-teal-600 to-blue-600 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                    Catálogo EAD
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
                    Explore nossa biblioteca completa de cursos online e acelere seu aprendizado
                </p>
                <button 
                    className="bg-white text-teal-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors"
                    onClick={() => onSelectCourse({ title: "Curso em Destaque", instructor: "Instrutor Principal" })}
                >
                    Começar Agora
                </button>
            </div>
        </div>
    );
};

export default HeroBanner;
