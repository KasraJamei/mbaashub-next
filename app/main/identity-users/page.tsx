// app/main/identity-users/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';
import { Trash2, UserX, Key, Search, Plus, RefreshCw, X, ChevronDown } from 'lucide-react';
import { useRoles } from '@/app/contexts/RolesContext';

interface User {
    id: number;
    email: string;
    role: string;
    lastLogin: string;
    createdDate: string;
    status: string;
}

const defaultUsers: User[] = [
    { id: 3215, email: 'test@gmail.com', role: 'ادمین سیستم', lastLogin: '15:34 ، 1404/08/17', createdDate: '1404/06/17', status: 'حساب فعال' },
    { id: 2654, email: 'test2@gmail.com', role: 'کاربر عادی', lastLogin: '10:34 ، 1404/08/05', createdDate: '1404/06/21', status: 'در انتظار تایید' }
];

const IdentityUsersPage = () => {
    const { roles } = useRoles();
    const [users, setUsers] = useState<User[]>(defaultUsers);
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [newUser, setNewUser] = useState({ email: '', role: '', password: '' });
    const [errors, setErrors] = useState({ email: '', role: '', password: '' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            const storedUsers = localStorage.getItem('users');
            if (storedUsers) {
                try {
                    setUsers(JSON.parse(storedUsers));
                } catch (error) {
                    console.error('Error loading users:', error);
                }
            }
        }
    }, [mounted]);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }, [users, mounted]);

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

        if (!newUser.email) {
            e.email = 'ایمیل الزامی است';
            ok = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
            e.email = 'فرمت ایمیل صحیح نیست';
            ok = false;
        } else if (users.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
            e.email = 'این ایمیل قبلاً ثبت شده است';
            ok = false;
        }

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

    const handleCloseModal = () => {
        setShowModal(false);
        setNewUser({ email: '', role: '', password: '' });
        setErrors({ email: '', role: '', password: '' });
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showModal) {
                handleCloseModal();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [showModal]);

    return (
        <div className="space-y-6" dir="rtl">
            <style jsx>{`
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        @keyframes scaleIn { from {opacity:0; transform:scale(0.9)} to {opacity:1; transform:scale(1)} }
        @keyframes slideDown { from {opacity:0; transform:translateY(-8px)} to {opacity:1; transform:translateY(0)} }
        .animate-fadeIn { animation: fadeIn 0.3s ease }
        .animate-scaleIn { animation: scaleIn 0.3s ease }
        .animate-slideDown { animation: slideDown 0.2s ease }
      `}</style>

            <IdentityTabs />

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-[#2C3E7C] p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="w-full sm:w-80 relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="جستجو بر اساس ایمیل یا شناسه..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pr-10 pl-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all text-sm font-medium flex-1 sm:flex-none whitespace-nowrap"
                                style={{ cursor: 'pointer' }}
                            >
                                <Plus className="w-4 h-4" />
                                افزودن کاربر
                            </button>
                            <button
                                onClick={handleRefresh}
                                className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all"
                                style={{ cursor: 'pointer' }}
                                title="بارگذاری مجدد"
                            >
                                <RefreshCw className={`w-5 h-5 text-gray-600 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-6">
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
                                            <div className="flex gap-2 justify-end">
                                                <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" style={{ cursor: 'pointer' }} title="غیرفعال کردن">
                                                    <UserX className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors" style={{ cursor: 'pointer' }} title="تنظیم مجدد رمز">
                                                    <Key className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors" style={{ cursor: 'pointer' }} title="حذف">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
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
                                    <p className="text-gray-900 break-all">{user.email}</p>
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
                                    <button className="flex-1 text-sm text-blue-600 hover:text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors" style={{ cursor: 'pointer' }}>غیرفعال</button>
                                    <button className="flex-1 text-sm text-green-600 hover:text-green-700 py-2 px-3 rounded-lg hover:bg-green-50 transition-colors" style={{ cursor: 'pointer' }}>تنظیم رمز</button>
                                    <button className="flex-1 text-sm text-red-600 hover:text-red-700 py-2 px-3 rounded-lg hover:bg-red-50 transition-colors" style={{ cursor: 'pointer' }}>حذف</button>
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
            </div>

            {showModal && (
                <div className="fixed inset-0 z-200 flex items-center justify-center p-3 sm:p-4 bg-black/60 animate-fadeIn backdrop-blur-sm" onClick={handleBackdropClick}>
                    <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
                        <div className="flex justify-between items-center mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">افزودن کاربر جدید</h2>
                            </div>
                            <button onClick={handleCloseModal} className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition-all group" style={{ cursor: 'pointer' }}>
                                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </button>
                        </div>

                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                    ایمیل
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => { setNewUser({ ...newUser, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 transition-all text-sm sm:text-base ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-300'
                                        }`}
                                    placeholder="example@email.com"
                                />
                                {errors.email && <p className="mt-2 text-xs text-red-600 flex items-center gap-1 animate-slideDown"><span className="w-1 h-1 bg-red-600 rounded-full"></span>{errors.email}</p>}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                    نقش کاربر
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={newUser.role}
                                        onChange={(e) => { setNewUser({ ...newUser, role: e.target.value }); setErrors({ ...errors, role: '' }); }}
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 cursor-pointer transition-all appearance-none bg-white text-sm sm:text-base ${errors.role ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500 hover:border-blue-300'
                                            }`}
                                    >
                                        <option value="">انتخاب کنید</option>
                                        {roles.map(role => (<option key={role.id} value={role.name}>{role.name}</option>))}
                                    </select>
                                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.role && <p className="mt-2 text-xs text-red-600 flex items-center gap-1 animate-slideDown"><span className="w-1 h-1 bg-red-600 rounded-full"></span>{errors.role}</p>}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                    رمز عبور
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => { setNewUser({ ...newUser, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 transition-all text-sm sm:text-base ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-300'
                                        }`}
                                    placeholder="حداقل 8 کاراکتر"
                                />
                                {errors.password && <p className="mt-2 text-xs text-red-600 flex items-center gap-1 animate-slideDown"><span className="w-1 h-1 bg-red-600 rounded-full"></span>{errors.password}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100">
                            <button onClick={handleAddUser} className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl transition-all font-semibold text-sm shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2" style={{ cursor: 'pointer' }}>
                                <Plus className="w-4 h-4" />
                                افزودن کاربر
                            </button>
                            <button onClick={handleCloseModal} className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all font-semibold text-sm active:scale-95" style={{ cursor: 'pointer' }}>
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IdentityUsersPage;
