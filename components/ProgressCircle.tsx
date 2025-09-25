
import React, { useState, useEffect } from 'react';

interface ProgressCircleProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percentage, size = 120, strokeWidth = 10 }) => {
    const [offset, setOffset] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffset = ((100 - percentage) / 100) * circumference;
        setOffset(progressOffset);
    }, [percentage, circumference]);

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="absolute top-0 left-0" width={size} height={size}>
                <circle
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-teal-500"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{ transition: 'stroke-dashoffset 1s ease-out', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
            </svg>
            <span className="text-2xl font-bold text-gray-700">{percentage}%</span>
        </div>
    );
};

export default ProgressCircle;
