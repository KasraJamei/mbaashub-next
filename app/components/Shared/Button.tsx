// app/components/Shared/Button.tsx
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'pink';
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseClasses = "flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 text-sm h-10 px-6 transform hover:scale-[1.02] active:scale-[0.98] !cursor-pointer disabled:!cursor-not-allowed disabled:opacity-50";

    let variantClasses = '';

    switch (variant) {
        case 'success':
            variantClasses = 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg focus:ring-green-500';
            break;
        case 'secondary':
            variantClasses = 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 hover:shadow-md hover:border-gray-400 focus:ring-gray-300';
            break;
        case 'danger':
            variantClasses = 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg focus:ring-red-500';
            break;
        case 'pink':
            variantClasses = 'bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg focus:ring-pink-500';
            break;
        case 'primary':
        default:
            variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg focus:ring-blue-500';
            break;
    }

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
