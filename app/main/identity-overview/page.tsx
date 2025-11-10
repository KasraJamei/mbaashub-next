// app/main/identity-overview/page.tsx
'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';

const IdentityOverviewPage = () => {
    const router = useRouter();
    const handleConfigClick = () => router.push('/main/identity-config');

    return (
        <div className="space-y-6" dir="rtl">
            <IdentityTabs />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6 order-2 lg:order-1">
                    <p className="text-sm text-gray-600 mb-4 text-center">وضعیت فعلی سیستم</p>
                    <div className="flex justify-center gap-12">
                        <div className="flex items-center gap-3 text-center">
                            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                <Check className="h-4 w-4 text-white" strokeWidth={3} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700">فعال</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-center">
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                                <X className="h-4 w-4 text-white" strokeWidth={3} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-400">غیر فعال</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 order-1 lg:order-2">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
                        <div className="flex h-full">
                            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                                <p className="text-sm text-gray-600 mb-3">تعداد کاربران فعال</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-4xl font-bold text-gray-900">20</p>
                                    <p className="text-sm text-gray-500">نفر</p>
                                </div>
                            </div>

                            <div className="border-l border-gray-200"></div>

                            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                                <p className="text-sm text-gray-600 mb-3">آخرین وضعیت ورود</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-4xl font-bold text-gray-900">4</p>
                                    <p className="text-sm text-gray-500">روز گذشته</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <p className="text-gray-700 text-lg mb-6">هیچ ارائه‌دهنده‌ای برای OpenID تنظیم نشده است.</p>
                <button
                    onClick={handleConfigClick}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-base"
                >
                    تنظیم OIDC
                </button>
            </div>
        </div>
    );
};

export default IdentityOverviewPage;
