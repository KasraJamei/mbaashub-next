// app/main/identity-users/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';
import { Button } from '@/app/components/Shared/Button';
import { MoreVertical, Trash2, UserX, Key, Search, Plus, RefreshCw, X } from 'lucide-react';

interface User {
    id: number;
    email: string;
    role: string;
    lastLogin: string;
    createdDate: string;
    status: string;
}

const IdentityUsersPage = () => {
    const [users, setUsers] = useState<User[]>([
        { id: 3215, email: 'test@gmail.com', role: 'ادمین', lastLogin: '15:34 ، 1404/08/17', createdDate: '1404/06/17', status: 'حساب فعال' },
        { id: 2654, email: 'test2@gmail.com', role: 'کاربر عادی', lastLogin: '10:34 ، 1404/08/05', createdDate: '1404/06/21', status: 'در انتظار تایید' }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [newUser, setNewUser] = useState({ email: '', role: '', password: '' });
    const [errors, setErrors] = useState({ email: '', role: '', password: '' });

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

    const filteredUsers = users.filter(u =>
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id.toString().includes(searchTerm) ||
        u.role.includes(searchTerm)
    );

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const validateForm = () => {
        const e = { email: '', role: '', password: '' };
        let ok = true;

        if (!newUser.email) { e.email = 'ایمیل الزامی است'; ok = false; }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) { e.email = 'فرمت ایمیل صحیح نیست'; ok = false; }

        if (!newUser.role) { e.role = 'نقش کاربر الزامی است'; ok = false; }

        if (!newUser.password) { e.password = 'رمز عبور الزامی است'; ok = false; }
        else if (newUser.password.length < 8) { e.password = 'رمز عبور باید حداقل 8 کاراکتر باشد'; ok = false; }

        setErrors(e);
        return ok;
    };

    const handleAddUser = () => {
        if (!validateForm()) return;
        const user: User = {
            id: Math.floor(Math.random() * 10000),
            email: newUser.email,
            role: newUser.role,
            lastLogin: 'هرگز',
            createdDate: new Date().toLocaleDateString('fa-IR'),
            status: 'حساب فعال'
        };
        setUsers(prev => [...prev, user]);
        setNewUser({ email: '', role: '', password: '' });
        setErrors({ email: '', role: '', password: '' });
        setShowModal(false);
    };

    return (
        <div className="space-y-6" dir="rtl">
            <style jsx>{`
        @keyframes slideDown { from {opacity:0; transform:translateY(-8px)} to {opacity:1; transform:translateY(0)} }
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        @keyframes scaleIn { from {opacity:0; transform:scale(0.95)} to {opacity:1; transform:scale(1)} }
        .animate-slideDown { animation: slideDown .2s ease-out }
        .animate-fadeIn { animation: fadeIn .2s ease-out }
        .animate-scaleIn { animation: scaleIn .25s cubic-bezier(.22,.8,.33,1) }
      `}</style>

            <IdentityTabs />

            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center mb-6 gap-3">
                    <div className="w-full sm:w-80 relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="جستجو بر اساس ایمیل یا شناسه..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-out"
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={() => setShowModal(true)} variant="primary" className="op-trigger flex-1 sm:flex-none">
                            <Plus className="w-5 h-5 ml-2" />
                            افزودن کاربر
                        </Button>
                        <button
                            onClick={handleRefresh}
                            className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 ease-out"
                            style={{ cursor: 'pointer' }}
                            title="بارگذاری مجدد"
                        >
                            <RefreshCw className={`w-5 h-5 text-gray-600 transition-transform duration-500 ease-in-out ${isRefreshing ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-right py-3 px-4 font-medium text-gray-700">شناسه</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">ایمیل</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">نقش کاربر</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">آخرین ورود</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">تاریخ ایجاد</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">وضعیت</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 text-gray-900">{user.id}</td>
                                    <td className="py-3 px-4 text-gray-900 font-medium">{user.email}</td>
                                    <td className="py-3 px-4 text-gray-900">{user.role}</td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{user.lastLogin}</td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{user.createdDate}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'حساب فعال' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-left">
                                        <div className="relative inline-block">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenMenuId(openMenuId === user.id ? null : user.id);
                                                }}
                                                className="op-trigger p-2 rounded-lg hover:bg-gray-100 transition-all"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <MoreVertical className="w-5 h-5 text-gray-600 hover:text-indigo-600 transition-colors" />
                                            </button>

                                            {openMenuId === user.id && (
                                                <>
                                                    <div className="fixed inset-0 z-[999]" />
                                                    <div className="op-menu absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-[1000] animate-slideDown">
                                                        <button
                                                            className="w-full text-right px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { console.log('deactivate', user.id); setOpenMenuId(null); }}
                                                        >
                                                            <UserX className="w-4 h-4 text-gray-500" />
                                                            <span>غیرفعال کردن حساب</span>
                                                        </button>
                                                        <button
                                                            className="w-full text-right px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { console.log('reset-pass', user.id); setOpenMenuId(null); }}
                                                        >
                                                            <Key className="w-4 h-4 text-gray-500" />
                                                            <span>تنظیم مجدد رمز عبور</span>
                                                        </button>
                                                        <button
                                                            className="w-full text-right px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { console.log('delete', user.id); setOpenMenuId(null); }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span className="font-medium">حذف حساب کاربری</span>
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
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">شناسه</p>
                                    <p className="font-medium text-gray-900">{user.id}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'حساب فعال' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {user.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">ایمیل</p>
                                <p className="text-gray-900">{user.email}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">نقش</p>
                                    <p className="text-gray-900">{user.role}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">تاریخ ایجاد</p>
                                    <p className="text-gray-900 text-sm">{user.createdDate}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">آخرین ورود</p>
                                <p className="text-gray-900 text-sm">{user.lastLogin}</p>
                            </div>
                            <div className="flex gap-2 pt-2 border-t">
                                <button
                                    className="flex-1 text-sm text-blue-600 hover:text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => console.log('deactivate', user.id)}
                                >
                                    غیرفعال
                                </button>
                                <button
                                    className="flex-1 text-sm text-green-600 hover:text-green-700 py-2 px-3 rounded-lg hover:bg-green-50 transition-colors"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => console.log('reset', user.id)}
                                >
                                    تنظیم رمز
                                </button>
                                <button
                                    className="flex-1 text-sm text-red-600 hover:text-red-700 py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => console.log('delete', user.id)}
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <Search className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">کاربری یافت نشد</p>
                    </div>
                )}
            </div>

            {showModal && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 z-[200] animate-fadeIn"
                        onClick={() => { setShowModal(false); setErrors({ email: '', role: '', password: '' }); }}
                    />
                    <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">افزودن کاربر جدید</h2>
                                <button
                                    onClick={() => { setShowModal(false); setErrors({ email: '', role: '', password: '' }); }}
                                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-all active:scale-95"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">ایمیل *</label>
                                    <input
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => { setNewUser({ ...newUser, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                                            }`}
                                        placeholder="example@email.com"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-600 animate-slideDown">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">نقش کاربر *</label>
                                    <select
                                        value={newUser.role}
                                        onChange={(e) => { setNewUser({ ...newUser, role: e.target.value }); setErrors({ ...errors, role: '' }); }}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 cursor-pointer transition-all ${errors.role ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                                            }`}
                                    >
                                        <option value="">انتخاب کنید</option>
                                        <option value="ادمین">ادمین</option>
                                        <option value="کاربر عادی">کاربر عادی</option>
                                        <option value="ناظر">ناظر</option>
                                    </select>
                                    {errors.role && <p className="mt-1 text-xs text-red-600 animate-slideDown">{errors.role}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">رمز عبور *</label>
                                    <input
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) => { setNewUser({ ...newUser, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 transition-all ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                                            }`}
                                        placeholder="حداقل 8 کاراکتر"
                                    />
                                    {errors.password && <p className="mt-1 text-xs text-red-600 animate-slideDown">{errors.password}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <Button onClick={handleAddUser} variant="primary" className="flex-1">
                                    افزودن کاربر
                                </Button>
                                <Button
                                    onClick={() => { setShowModal(false); setErrors({ email: '', role: '', password: '' }); }}
                                    variant="secondary"
                                    className="flex-1"
                                >
                                    انصراف
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default IdentityUsersPage;
