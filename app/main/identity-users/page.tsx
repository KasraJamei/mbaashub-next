// app/main/identity-users/page.tsx
'use client';

import React, { useState } from 'react';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';
import { MoreVertical } from 'lucide-react';

interface User {
    id: number;
    email: string;
    role: string;
    lastLogin: string;
    createdDate: string;
    status: string;
}

const IdentityUsersPage = () => {
    const [users] = useState<User[]>([
        {
            id: 3215,
            email: 'test@gmail.com',
            role: 'ادمین',
            lastLogin: '15:34 ، 1404/08/17',
            createdDate: '1404/06/17',
            status: 'حساب فعال'
        },
        {
            id: 2654,
            email: 'test2@gmail.com',
            role: 'کاربر عادی',
            lastLogin: '10:34 ، 1404/08/05',
            createdDate: '1404/06/21',
            status: 'در انتظار تایید'
        }
    ]);

    return (
        <div className="space-y-6" dir="rtl">
            <IdentityTabs />

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900">اطلاعات کاربران</h2>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        افزودن کاربر
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-right py-3 px-4 font-medium text-gray-700">شناسه کاربر</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">ایمیل</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">نقش کاربر</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">آخرین ورود</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">تاریخ ایجاد حساب</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">وضعیت حساب</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-900">{user.id}</td>
                                    <td className="py-3 px-4 text-gray-900">{user.email}</td>
                                    <td className="py-3 px-4 text-gray-900">{user.role}</td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{user.lastLogin}</td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{user.createdDate}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'حساب فعال'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex gap-2">
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                        حذف حساب کاربری
                    </button>
                    <span className="text-gray-300">|</span>
                    <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                        غیرفعال کردن حساب کاربری
                    </button>
                    <span className="text-gray-300">|</span>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        تنظیم مجدد رمز عبور
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IdentityUsersPage;
