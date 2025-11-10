// app/main/identity-config/page.tsx
'use client';

import React, { useState } from 'react';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';

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

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">تنظیم OpenID</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            نام ارائه‌دهنده *
                        </label>
                        <input
                            type="text"
                            name="providerName"
                            value={formData.providerName}
                            onChange={handleChange}
                            placeholder="وارد کردن نام ارائه‌دهنده"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Client ID *
                        </label>
                        <input
                            type="text"
                            name="clientId"
                            value={formData.clientId}
                            onChange={handleChange}
                            placeholder="وارد کردن Client ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Client Secret *
                        </label>
                        <input
                            type="password"
                            name="clientSecret"
                            value={formData.clientSecret}
                            onChange={handleChange}
                            placeholder="وارد کردن Client Secret"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Issuer URL *
                        </label>
                        <input
                            type="text"
                            name="issuerUrl"
                            value={formData.issuerUrl}
                            onChange={handleChange}
                            placeholder="وارد کردن Issuer URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={handleSave}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        ذخیره پیکربندی
                    </button>
                    <button
                        onClick={handleTest}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        تست اتصال
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">تاریخچه اتصال</h3>
                <div className="space-y-3">
                    {connectionHistory.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-700 font-medium">{item.id}</span>
                                <span className="text-green-600">{item.message}</span>
                            </div>
                            <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IdentityConfigPage;
