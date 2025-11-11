// app/components/landing/LandingHeader.tsx
import React from 'react';
import { Button } from '@/app/components/Shared/Button';

export default function LandingHeader() {
    return (
        <header className="w-full flex flex-col sm:flex-row items-center sm:justify-between px-4 sm:px-6 py-4 bg-white shadow-sm sticky top-0 z-50 gap-4">
            <div className="font-bold text-blue-900 text-lg text-right sm:text-right flex-1">
                معاونت علمی فناوری و اقتصاد دانش بنیان
            </div>
            <div className="flex gap-3">
                <Button variant="secondary" className="whitespace-nowrap">
                    ورود
                </Button>
                <Button variant="primary" className="whitespace-nowrap">
                    ثبت نام
                </Button>
            </div>
        </header>
    );
}
