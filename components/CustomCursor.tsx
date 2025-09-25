
import React from 'react';
import { useCustomCursor } from '../hooks/useCustomCursor';

const CustomCursor: React.FC = () => {
    const { cursorDotRef, cursorOutlineRef } = useCustomCursor();

    return (
        <>
            <div ref={cursorDotRef} className="fixed w-2 h-2 bg-teal-500 rounded-full pointer-events-none z-[9999] transition-transform duration-75"></div>
            <div ref={cursorOutlineRef} className="fixed w-10 h-10 border-2 border-teal-500 rounded-full pointer-events-none z-[9999] opacity-50 transition-all duration-200"></div>
        </>
    );
};

export default CustomCursor;
