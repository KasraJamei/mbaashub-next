'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    FileText,
    Megaphone,
    MessageSquare,
    Database,
    Cloud,
    ShieldCheck,
    Mail,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { Notification } from '@/app/components/Shared/Notification';
import { useNotification } from '@/hooks/useNotification';
import { removeAuthToken } from '@/lib/auth';

const sidebarNavItems = [
    { label: 'بررسی کلی پروژه', icon: FileText, href: '/main/dashboard' },
    { label: 'کمپین های اعلان', icon: Megaphone, href: '/main/campaigns' },
    { label: 'کمپین های پیام درون برنامه‌ای', icon: MessageSquare, href: '/main/in-app-messages' },
    { label: 'پایگاه داده', icon: Database, href: '/main/database' },
    { label: 'کدنویسی ابری', icon: Cloud, href: '/main/cloud-functions' },
    { label: 'احراز هویت', icon: ShieldCheck, href: '/main/identity' },
    { label: 'پیام رسان', icon: Mail, href: '/main/messaging' },
    { label: 'تحلیل ها', icon: BarChart3, href: '/main/analytics' },
    { label: 'تنظیمات', icon: Settings, href: '/main/settings' }
];

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { notification, showNotification, hideNotification } = useNotification();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const handleLogout = () => {
        removeAuthToken();
        showNotification("success", "با موفقیت از حساب خارج شدید");
        setTimeout(() => {
            router.push('/auth?view=login');
        }, 1000);
    };

    return (
        <>
            {notification.isVisible && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={hideNotification}
                />
            )}
            <button
                onClick={toggleMobileMenu}
                className="fixed top-4 right-4 z-60 p-2 rounded-lg bg-white border border-gray-200 shadow-sm md:hidden hover:bg-gray-50 transition-colors"
                style={{ cursor: 'pointer' }}
            >
                {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-gray-700" />
                ) : (
                    <Menu className="w-6 h-6 text-gray-700" />
                )}
            </button>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-45 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            <aside
                className={`fixed right-0 top-0 h-full w-64 bg-white border-l border-gray-200 flex-col z-50 shadow-lg overflow-y-auto transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
                    } md:flex`}
                dir="rtl"
            >
                <div className="p-6 flex items-center justify-center">
                    <h1 className="text-2xl font-bold">
                        <span className="text-indigo-600">M</span>
                        <span className="text-gray-800">BaaS</span>
                        <span className="text-indigo-600"> HUB</span>
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {sidebarNavItems.map((item) => {
                        const isActive = item.href === '/main/dashboard'
                            ? pathname === item.href
                            : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className={`flex items-center p-3 rounded-lg text-sm transition-all duration-200 ${isActive
                                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ml-3 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />
                                <span className="flex-1 text-right">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-3 rounded-lg text-sm text-gray-700 transition-all duration-200 hover:bg-gray-50"
                        style={{ cursor: 'pointer' }}
                    >
                        <LogOut className="w-5 h-5 ml-3 text-gray-500" />
                        <span className="flex-1 text-right">خروج از حساب</span>
                    </button>
                </div>
            </aside>
        </>
    );
};
