// app/main/identity-overview/page.tsx
'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';
import { Button } from '@/app/components/Shared/Button';

const IdentityOverviewPage = () => {
    const router = useRouter();
    const handleConfigClick = () => router.push('/main/identity-config');

    return (
        <div className="space-y-6" dir="rtl">
            <IdentityTabs />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-4 md:p-6 order-2 lg:order-1">
                    <p className="text-xs md:text-sm text-gray-600 mb-4 text-center">وضعیت فعلی سیستم</p>
                    <div className="flex justify-center gap-6 md:gap-12">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center">
                            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" strokeWidth={3} />
                            </div>
                            <div>
                                <p className="text-xs md:text-sm font-medium text-gray-700">فعال</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center">
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <X className="h-4 w-4 text-white" strokeWidth={3} />
                            </div>
                            <div>
                                <p className="text-xs md:text-sm font-medium text-gray-400">غیر فعال</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 order-1 lg:order-2">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
                        <div className="flex flex-col sm:flex-row h-full">
                            <div className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center text-center">
                                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">تعداد کاربران فعال</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl md:text-4xl font-bold text-gray-900">20</p>
                                    <p className="text-xs md:text-sm text-gray-500">نفر</p>
                                </div>
                            </div>

                            <div className="border-t sm:border-t-0 sm:border-l border-gray-200"></div>

                            <div className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center text-center">
                                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">آخرین وضعیت ورود</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl md:text-4xl font-bold text-gray-900">4</p>
                                    <p className="text-xs md:text-sm text-gray-500">روز گذشته</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 text-center">
                <p className="text-sm md:text-lg text-gray-700 mb-4 md:mb-6">هیچ ارائه‌دهنده‌ای برای OpenID تنظیم نشده است.</p>
                <div className="flex justify-center">
                    <Button onClick={handleConfigClick} variant="success" className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base">
                        تنظیم OIDC
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default IdentityOverviewPage;
