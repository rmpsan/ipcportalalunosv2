import React from 'react';

interface EditableFieldProps {
    isEditing: boolean;
    value: string;
    onChange: (value: string) => void;
    as?: 'input' | 'textarea';
    className?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ isEditing, value, onChange, as = 'input', className = '' }) => {
    
    const commonClasses = "w-full bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors";

    if (isEditing) {
        if (as === 'textarea') {
            return (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${className} ${commonClasses} p-2 min-h-[120px]`}
                />
            );
        }
        return (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${className} ${commonClasses} p-1`}
            />
        );
    }

    return (
        <p className={className}>
            {value}
        </p>
    );
};

export default EditableField;
