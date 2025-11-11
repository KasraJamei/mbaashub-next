// app/components/Layout/Header.tsx
'use client';

import React from 'react';

export const Header: React.FC = () => {
    return (
        <header
            className="fixed top-0 h-16 bg-white border-b border-gray-200 flex items-center justify-start px-6 md:px-8 shadow-sm md:right-64 md:w-[calc(100%-16rem)] right-0 w-full z-40"
            dir="rtl"
        >
            <div className="md:hidden w-12"></div>

            <h1 className="text-xl font-bold text-gray-900">احراز هویت</h1>
        </header>
    );
};
