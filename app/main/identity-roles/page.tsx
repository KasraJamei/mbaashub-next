// app/main/identity-roles/page.tsx
'use client';

import React, { useState } from 'react';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';

interface Role {
    id: number;
    name: string;
    accessLevel: string;
    userCount: number;
    permissions: string;
    status: string;
    lastUpdate: string;
}

const IdentityRolesPage = () => {
    const [roles] = useState<Role[]>([
        {
            id: 101,
            name: 'ادمین سیستم',
            accessLevel: 'دسترسی کامل',
            userCount: 7,
            permissions: 'مشاهده، ویرایش',
            status: 'فعال',
            lastUpdate: '1404/08/12'
        },
        {
            id: 102,
            name: 'کاربر عادی',
            accessLevel: 'دسترسی محدود',
            userCount: 10,
            permissions: 'مشاهده',
            status: 'فعال',
            lastUpdate: '1404/08/10'
        },
        {
            id: 103,
            name: 'ناظر',
            accessLevel: 'دسترسی محدود',
            userCount: 5,
            permissions: 'مشاهده، ویرایش',
            status: 'غیرفعال',
            lastUpdate: '1404/08/18'
        },
        {
            id: 104,
            name: 'مهمان',
            accessLevel: 'فقط خواندن',
            userCount: 20,
            permissions: 'مشاهده',
            status: 'فعال',
            lastUpdate: '1404/08/19'
        }
    ]);

    return (
        <div className="space-y-6" dir="rtl">
            <IdentityTabs />

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900">مدیریت نقش ها</h2>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        افزودن نقش جدید
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-right py-3 px-4 font-medium text-gray-700">شناسه نقش</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">نام نقش</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">سطح دسترسی</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">تعداد کاربران</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">مجوزها</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">وضعیت نقش</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">آخرین به‌روزرسانی</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-900">{role.id}</td>
                                    <td className="py-3 px-4 text-gray-900 font-medium">{role.name}</td>
                                    <td className="py-3 px-4 text-gray-900">{role.accessLevel}</td>
                                    <td className="py-3 px-4 text-gray-900">{role.userCount}</td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{role.permissions}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${role.status === 'فعال'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {role.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{role.lastUpdate}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-2">
                                            <button className="text-sm text-blue-600 hover:text-blue-700">
                                                مشاهده
                                            </button>
                                            <button className="text-sm text-green-600 hover:text-green-700">
                                                ویرایش
                                            </button>
                                            <button className="text-sm text-red-600 hover:text-red-700">
                                                حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default IdentityRolesPage;
