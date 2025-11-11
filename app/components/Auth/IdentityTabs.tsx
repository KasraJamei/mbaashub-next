// app/components/Auth/IdentityTabs.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
    {
        name: 'overview',
        label: 'بررسی کلی',
        path: '/main/identity-overview',
        title: 'تنظیم احراز هویت',
        description: 'مدیریت ورود کاربران از طریق OpenID Connect'
    },
    {
        name: 'config',
        label: 'تنظیمات OpenID',
        path: '/main/identity-config',
        title: 'تنظیم OpenID',
        description: 'تنظیم یا ویرایش اتصال به ارائه‌دهنده OpenID Connect'
    },
    {
        name: 'users',
        label: 'کاربران',
        path: '/main/identity-users',
        title: 'اطلاعات کاربران',
        description: 'مشاهده و مدیریت کاربران ثبت‌شده'
    },
    {
        name: 'roles',
        label: 'نقش ها',
        path: '/main/identity-roles',
        title: 'مدیریت نقش ها',
        description: 'مدیریت و تعیین سطح دسترسی کاربران و تعریف نقش ها'
    },
];

export const IdentityTabs = () => {
    const pathname = usePathname();
    const activeTab = tabs.find(tab => tab.path === pathname);

    const displayTitle = activeTab?.title || 'تنظیم احراز هویت';
    const displayDescription = activeTab?.description || 'مدیریت ورود کاربران از طریق OpenID Connect';

    return (
        <div className="mb-6 bg-blue-100 -mx-4 md:-mx-6 -mt-6 px-4 md:px-6 pt-4 md:pt-6 pb-0">
            <div className="mb-4">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{displayTitle}</h1>
                <p className="text-sm md:text-base text-gray-600">{displayDescription}</p>
            </div>
            <div className="flex gap-0 border-b border-gray-200 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.path;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.path}
                            className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${isActive
                                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
