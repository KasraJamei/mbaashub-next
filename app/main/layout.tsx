// app/main/layout.tsx
import React from 'react';
import { Sidebar } from '@/app/components/Layout/Sidebar';
import { Header } from '@/app/components/Layout/Header';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />

            <div className="flex-1 flex flex-col md:mr-64">
                <Header />

                <main className="flex-1 pt-20">
                    <div className="bg-blue-100 min-h-[calc(100vh-5rem)] p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
