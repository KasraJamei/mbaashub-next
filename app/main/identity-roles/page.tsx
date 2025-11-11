// app/main/identity-roles/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';
import { Button } from '@/app/components/Shared/Button';
import { MoreVertical, Trash2, Eye, Edit } from 'lucide-react';

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
        { id: 101, name: 'ادمین سیستم', accessLevel: 'دسترسی کامل', userCount: 7, permissions: 'مشاهده، ویرایش', status: 'فعال', lastUpdate: '1404/08/12' },
        { id: 102, name: 'کاربر عادی', accessLevel: 'دسترسی محدود', userCount: 10, permissions: 'مشاهده', status: 'فعال', lastUpdate: '1404/08/10' },
        { id: 103, name: 'ناظر', accessLevel: 'دسترسی محدود', userCount: 5, permissions: 'مشاهده، ویرایش', status: 'غیرفعال', lastUpdate: '1404/08/18' },
        { id: 104, name: 'مهمان', accessLevel: 'فقط خواندن', userCount: 20, permissions: 'مشاهده', status: 'فعال', lastUpdate: '1404/08/19' }
    ]);

    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.op-menu') && !target.closest('.op-trigger')) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    return (
        <div className="space-y-6" dir="rtl">
            <style jsx>{`
        @keyframes slideDown { from {opacity:0; transform:translateY(-8px)} to {opacity:1; transform:translateY(0)} }
        .animate-slideDown { animation: slideDown .2s ease-out }
      `}</style>

            <IdentityTabs />

            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-4">
                    <h2 className="text-lg font-bold text-gray-900">مدیریت نقش ها</h2>
                    <Button variant="primary">افزودن نقش جدید</Button>
                </div>

                <div className="hidden md:block overflow-x-auto">
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
                                <th className="text-left py-3 px-4 font-medium text-gray-700">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 text-gray-900">{role.id}</td>
                                    <td className="py-3 px-4 text-gray-900 font-medium">{role.name}</td>
                                    <td className="py-3 px-4 text-gray-900">{role.accessLevel}</td>
                                    <td className="py-3 px-4 text-gray-900">{role.userCount}</td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{role.permissions}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${role.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {role.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{role.lastUpdate}</td>
                                    <td className="py-3 px-4 text-left">
                                        <div className="relative inline-block">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenMenuId(openMenuId === role.id ? null : role.id);
                                                }}
                                                className="op-trigger p-2 rounded-lg hover:bg-gray-100 transition-all"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <MoreVertical className="w-5 h-5 text-gray-600 hover:text-indigo-600 transition-colors" />
                                            </button>

                                            {openMenuId === role.id && (
                                                <>
                                                    <div className="fixed inset-0 z-[999]" />
                                                    <div className="op-menu absolute left-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-[1000] animate-slideDown">
                                                        <button
                                                            className="w-full text-right px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { console.log('view', role.id); setOpenMenuId(null); }}
                                                        >
                                                            <Eye className="w-4 h-4 text-gray-500" />
                                                            <span>مشاهده</span>
                                                        </button>
                                                        <button
                                                            className="w-full text-right px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { console.log('edit', role.id); setOpenMenuId(null); }}
                                                        >
                                                            <Edit className="w-4 h-4 text-gray-500" />
                                                            <span>ویرایش</span>
                                                        </button>
                                                        <div className="border-t border-gray-200 my-1" />
                                                        <button
                                                            className="w-full text-right px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { console.log('delete', role.id); setOpenMenuId(null); }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span className="font-medium">حذف</span>
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden space-y-4">
                    {roles.map((role) => (
                        <div key={role.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">شناسه</p>
                                    <p className="font-medium text-gray-900">{role.id}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${role.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {role.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">نام نقش</p>
                                <p className="font-medium text-gray-900">{role.name}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">سطح دسترسی</p>
                                    <p className="text-gray-900 text-sm">{role.accessLevel}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">تعداد کاربران</p>
                                    <p className="text-gray-900 text-sm">{role.userCount} نفر</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">مجوزها</p>
                                <p className="text-gray-900 text-sm">{role.permissions}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">آخرین به‌روزرسانی</p>
                                <p className="text-gray-900 text-sm">{role.lastUpdate}</p>
                            </div>
                            <div className="flex gap-2 pt-2 border-t">
                                <button
                                    className="flex-1 text-sm text-blue-600 hover:text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                                    style={{ cursor: 'pointer' }}
                                >
                                    مشاهده
                                </button>
                                <button
                                    className="flex-1 text-sm text-green-600 hover:text-green-700 py-2 px-3 rounded-lg hover:bg-green-50 transition-colors"
                                    style={{ cursor: 'pointer' }}
                                >
                                    ویرایش
                                </button>
                                <button
                                    className="flex-1 text-sm text-red-600 hover:text-red-700 py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
                                    style={{ cursor: 'pointer' }}
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IdentityRolesPage;
