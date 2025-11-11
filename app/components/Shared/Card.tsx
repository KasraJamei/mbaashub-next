// app/components/Shared/Card.tsx
import React from 'react';

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
    <div
        className={`bg-white p-4 md:p-6 rounded-lg shadow-md ${className}`}
        dir="rtl"
    >
        {children}
    </div>
);
