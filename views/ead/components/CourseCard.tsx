import React from 'react';

interface Course {
    id: number;
    title: string;
    instructor: string;
    img: string;
    progress: number;
}

interface CourseCardProps {
    item: Course;
    onSelect: (course: { title: string, instructor: string }) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ item, onSelect }) => {
    return (
        <div 
            className="group w-64 flex-shrink-0 rounded-lg overflow-hidden relative cursor-pointer transform hover:scale-105 hover:z-10 transition-transform duration-300" 
            onClick={() => onSelect({ title: item.title, instructor: item.instructor })}
        >
            <img src={item.img} alt={item.title} className="w-full h-36 object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-3 text-white w-full">
                <h3 className="font-bold truncate group-hover:whitespace-normal group-hover:line-clamp-2">{item.title}</h3>
                <p className="text-xs text-gray-300">{item.instructor}</p>
            </div>

            {item.progress > 0 && (
                <div className="absolute top-2 right-2 text-xs bg-teal-500 text-white font-bold px-2 py-1 rounded-full">{item.progress === 100 ? 'Concluído' : 'Em progresso'}</div>
            )}
            
            {item.progress > 0 && item.progress < 100 && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-500/50">
                    <div className="h-1 bg-teal-500" style={{ width: `${item.progress}%` }}></div>
                </div>
            )}

            {/* Hover State */}
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-white font-bold text-lg">
                    {item.progress > 0 ? 'Continuar Assistindo' : 'Assistir Agora'}
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
