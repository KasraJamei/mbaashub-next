// app/main/identity-config/page.tsx
'use client';

import React, { useState } from 'react';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';
import { Button } from '@/app/components/Shared/Button';

const IdentityConfigPage = () => {
    const [formData, setFormData] = useState({
        providerName: '',
        clientId: '',
        clientSecret: '',
        issuerUrl: ''
    });

    const [connectionHistory] = useState([
        { id: 1, status: 'success', message: 'اتصال با موفقیت انجام شد.', date: '10/16/2025، ساعت 14:42:05' },
        { id: 2, status: 'success', message: 'اتصال با موفقیت انجام شد.', date: '10/16/2025، ساعت 10:59:05' }
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log('Saving config:', formData);
    };

    const handleTest = () => {
        console.log('Testing connection');
    };

    return (
        <div className="space-y-6" dir="rtl">
            <IdentityTabs />

            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">تنظیم OpenID</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                            نام ارائه‌دهنده <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="providerName"
                            value={formData.providerName}
                            onChange={handleChange}
                            placeholder="وارد کردن نام ارائه‌دهنده"
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                            Client ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="clientId"
                            value={formData.clientId}
                            onChange={handleChange}
                            placeholder="وارد کردن Client ID"
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                            Client Secret <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="clientSecret"
                            value={formData.clientSecret}
                            onChange={handleChange}
                            placeholder="وارد کردن Client Secret"
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                            Issuer URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="issuerUrl"
                            value={formData.issuerUrl}
                            onChange={handleChange}
                            placeholder="وارد کردن Issuer URL"
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-6">
                    <Button onClick={handleSave} variant="success" className="w-full sm:w-auto">
                        ذخیره پیکربندی
                    </Button>
                    <Button onClick={handleTest} variant="secondary" className="w-full sm:w-auto">
                        تست اتصال
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4">تاریخچه اتصال</h3>
                <div className="space-y-3">
                    {connectionHistory.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-slate-800 text-slate-100"
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-slate-200">{item.id}</span>
                                <span className={item.status === 'success' ? 'text-white text-sm md:text-base' : 'text-rose-400 text-sm md:text-base'}>
                                    {item.message}
                                </span>
                            </div>
                            <span className="text-xs md:text-sm text-slate-300">{item.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IdentityConfigPage;
