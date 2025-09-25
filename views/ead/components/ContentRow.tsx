import React from 'react';
import CourseCard from './CourseCard';

interface Course {
    id: number;
    title: string;
    instructor: string;
    img: string;
    progress: number;
}

interface ContentRowProps {
    title: string;
    items: Course[];
    onSelectCourse: (course: { title: string, instructor: string }) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, onSelectCourse }) => {
    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {items.map(item => (
                    <CourseCard key={item.id} item={item} onSelect={onSelectCourse} />
                ))}
            </div>
        </div>
    );
};

export default ContentRow;
