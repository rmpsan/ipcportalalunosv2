
import React from 'react';

interface DashboardCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children, className = '' }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className}`}>
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-teal-100 text-teal-600 p-3 rounded-full">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            </div>
            {children}
        </div>
    );
}

export default DashboardCard;
