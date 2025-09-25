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
            <div className="flex gap-4 overflow-x-auto pb-4 -mb-4">
                {items.map(item => (
                    <CourseCard key={item.id} item={item} onSelect={onSelectCourse} />
                ))}
            </div>
        </div>
    );
};

export default ContentRow;
