// app/main/layout.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/app/components/Layout/Sidebar';
import { Header } from '@/app/components/Layout/Header';
import { RolesProvider } from '@/app/contexts/RolesContext';
import { getAuthToken } from '@/lib/auth';
import { Notification } from '@/app/components/Shared/Notification';
import { useNotification } from '@/hooks/useNotification';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { notification, showNotification, hideNotification } = useNotification();

    useEffect(() => {
        const token = getAuthToken();

        if (!token) {
            showNotification('error', 'شما وارد نشده‌اید. لطفا ابتدا وارد شوید.');
            setTimeout(() => {
                router.replace('/auth?view=login');
            }, 800);
        }
    }, [router, showNotification, pathname]);

    const token = getAuthToken();
    if (!token) {
        return (
            <>
                {notification.isVisible && (
                    <Notification
                        type={notification.type}
                        message={notification.message}
                        onClose={hideNotification}
                    />
                )}
            </>
        );
    }

    return (
        <RolesProvider>
            {notification.isVisible && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={hideNotification}
                />
            )}

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
        </RolesProvider>
    );
}
