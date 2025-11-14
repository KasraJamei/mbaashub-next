// app/main/identity-users/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';
import { Trash2, UserX, Key, Search, Plus, RefreshCw, X } from 'lucide-react';
import { useRoles } from '@/app/contexts/RolesContext';
import { Notification } from '@/app/components/Shared/Notification';
import { useNotification } from '@/hooks/useNotification';
import {
    getAllUsers as authGetAllUsers,
    saveAllUsers as authSaveAllUsers,
    getCurrentUser,
    removeAuthToken,
} from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface User {
    email: string;
    username: string;
    password: string;
    emailNorm: string;
    usernameNorm: string;
    id: number;
    role?: string;
    lastLogin: string;
    createdDate: string;
    status: string;
}

const defaultUsers: User[] = [];

const IdentityUsersPage = () => {
    const router = useRouter();
    const { roles } = useRoles();

    const [users, setUsers] = useState<User[]>(defaultUsers);
    const [hydrated, setHydrated] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [newUser, setNewUser] = useState({
        email: '',
        username: '',
        role: '',
        password: '',
    });

    const [editUser, setEditUser] = useState<User | null>(null);

    const [errors, setErrors] = useState({
        email: '',
        username: '',
        role: '',
        password: '',
    });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = useState<{ email: string; username: string } | null>(null);

    const { notification, showNotification, hideNotification } = useNotification();

    useEffect(() => {
        const baseUsers = authGetAllUsers();
        const mapped: User[] = baseUsers.map((u, index) => ({
            email: u.email,
            username: u.username,
            password: u.password,
            emailNorm: u.emailNorm,
            usernameNorm: u.usernameNorm,
            id: index + 1,
            role: 'کاربر عادی',
            lastLogin: u.lastLogin ?? 'هرگز',
            createdDate: new Date().toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
            status: 'حساب فعال',
        }));
        setUsers(mapped);
        const cu = getCurrentUser();
        if (cu) setCurrentUser(cu);
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        const authUsers = users.map((u) => ({
            email: u.email,
            username: u.username,
            password: u.password,
            emailNorm: u.emailNorm,
            usernameNorm: u.usernameNorm,
        }));
        authSaveAllUsers(authUsers);
    }, [users, hydrated]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (showModal) handleCloseModal();
                if (showEditModal) handleCloseEditModal();
                if (deleteModalOpen) handleCancelDelete();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModal, showEditModal, deleteModalOpen]);

    if (!hydrated) {
        return null;
    }

    const normalize = (value: string | undefined | null) =>
        (value ?? '').trim().toLowerCase();

    const normalizedSearch = normalize(searchTerm);

    const filteredUsers = users.filter((u) => {
        const email = (u.email ?? '').toLowerCase();
        const username = (u.username ?? '').toLowerCase();
        const role = (u.role ?? '').toLowerCase();
        const idStr = (u.id ?? '').toString();

        return (
            email.includes(normalizedSearch) ||
            username.includes(normalizedSearch) ||
            role.includes(normalizedSearch) ||
            idStr.includes(normalizedSearch)
        );
    });

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            showNotification('success', 'لیست کاربران با موفقیت بارگذاری شد');
        }, 1000);
    };

    const validateForm = (isEdit = false) => {
        const e = { email: '', username: '', role: '', password: '' };
        let ok = true;

        const current = isEdit ? editUser : null;

        const email = isEdit ? (current?.email || '') : newUser.email;
        const username = isEdit ? (current?.username || '') : newUser.username;
        const role = isEdit ? (current?.role || '') : newUser.role;
        const password = isEdit ? current?.password || '' : newUser.password;

        const emailNorm = normalize(email);
        const usernameNorm = normalize(username);

        if (!emailNorm) {
            e.email = 'ایمیل الزامی است';
            ok = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNorm)) {
            e.email = 'فرمت ایمیل صحیح نیست';
            ok = false;
        } else {
            const dup = users.some((u) => {
                const uEmailNorm = normalize(u.email);
                if (isEdit && current) {
                    return uEmailNorm === emailNorm && u.email !== current.email;
                }
                return uEmailNorm === emailNorm;
            });
            if (dup) {
                e.email = 'این ایمیل قبلاً ثبت شده است';
                ok = false;
            }
        }

        if (!usernameNorm) {
            e.username = 'نام کاربری الزامی است';
            ok = false;
        } else {
            const dupUser = users.some((u) => {
                const uUsernameNorm = normalize(u.username);
                if (isEdit && current) {
                    return uUsernameNorm === usernameNorm && u.username !== current.username;
                }
                return uUsernameNorm === usernameNorm;
            });
            if (dupUser) {
                e.username = 'این نام کاربری قبلاً ثبت شده است';
                ok = false;
            }
        }

        if (!role) {
            e.role = 'نقش کاربر الزامی است';
            ok = false;
        }

        if (!isEdit) {
            if (!password) {
                e.password = 'رمز عبور الزامی است';
                ok = false;
            } else if (password.length < 8) {
                e.password = 'رمز عبور باید حداقل 8 کاراکتر باشد';
                ok = false;
            }
        }

        setErrors(e);
        return ok;
    };

    const handleAddUser = () => {
        if (!validateForm(false)) return;

        const now = Date.now();

        const email = newUser.email.trim();
        const username = newUser.username.trim();
        const emailNorm = normalize(email);
        const usernameNorm = normalize(username);

        const user: User = {
            id: now,
            email,
            username,
            password: newUser.password,
            emailNorm,
            usernameNorm,
            role: newUser.role,
            lastLogin: 'هرگز',
            createdDate: new Date().toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
            status: 'حساب فعال',
        };

        setUsers((prev) => [...prev, user]);
        handleCloseModal();
        showNotification('success', 'کاربر جدید با موفقیت ایجاد شد');
    };

    const handleEditClick = (user: User) => {
        setEditUser(user);
        setShowEditModal(true);
        setErrors({ email: '', username: '', role: '', password: '' });
    };

    const handleUpdateUser = () => {
        if (!editUser) return;
        if (!validateForm(true)) return;

        const email = editUser.email.trim();
        const username = editUser.username.trim();
        const emailNorm = normalize(email);
        const usernameNorm = normalize(username);

        setUsers((prev) =>
            prev.map((u) =>
                u.id === editUser.id
                    ? { ...editUser, email, username, emailNorm, usernameNorm }
                    : u
            )
        );

        handleCloseEditModal();
        showNotification('success', 'اطلاعات کاربر با موفقیت ویرایش شد');
    };

    const handleDeactivateUser = (userId: number, userEmail: string) => {
        showNotification(
            'warning',
            'عملیات غیرفعال کردن حساب هنوز پیاده‌سازی نشده است.'
        );
    };

    const handleResetPassword = (userEmail: string) => {
        showNotification(
            'warning',
            'تنظیم مجدد رمز عبور هنوز پیاده‌سازی نشده است.'
        );
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewUser({ email: '', username: '', role: '', password: '' });
        setErrors({ email: '', username: '', role: '', password: '' });
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditUser(null);
        setErrors({ email: '', username: '', role: '', password: '' });
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    const handleBackdropClickEdit = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseEditModal();
        }
    };

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    const handleCancelDelete = () => {
        setUserToDelete(null);
        setDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (!userToDelete) return;

        const updated = users.filter((u) => u.id !== userToDelete.id);
        setUsers(updated);

        const isSelf =
            currentUser &&
            (normalize(currentUser.email) === normalize(userToDelete.email) ||
                normalize(currentUser.username) === normalize(userToDelete.username));

        if (isSelf) {
            showNotification(
                'error',
                'حساب کاربری شما حذف شد. برای ادامه نیاز است دوباره ثبت نام کنید.'
            );
            removeAuthToken();
            setTimeout(() => {
                router.push('/auth?view=register');
            }, 1200);
        } else {
            showNotification('success', `کاربر (${userToDelete.email}) با موفقیت حذف شد`);
        }

        setUserToDelete(null);
        setDeleteModalOpen(false);
    };

    return (
        <div className="space-y-6" dir="rtl">
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease;
                }
                .animate-slideDown {
                    animation: slideDown 0.2s ease;
                }
            `}</style>

            {notification.isVisible && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={hideNotification}
                />
            )}

            <IdentityTabs />

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-[#2C3E7C] p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="w-full sm:w-80 relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="جستجو بر اساس ایمیل، نام کاربری یا شناسه..."
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
                                <RefreshCw
                                    className={`w-5 h-5 text-gray-600 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-6">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-right py-3 px-4 font-medium text-gray-700">
                                        شناسه
                                    </th>
                                    <th className="text-right py-3 px-4 font-medium text-gray-700">
                                        ایمیل
                                    </th>
                                    <th className="text-right py-3 px-4 font-medium text-gray-700">
                                        نام کاربری
                                    </th>
                                    <th className="text-right py-3 px-4 font-medium text-gray-700">
                                        نقش
                                    </th>
                                    <th className="text-right py-3 px-4 font-medium text-gray-700">
                                        آخرین ورود
                                    </th>
                                    <th className="text-right py-3 px-4 font-medium text-gray-700">
                                        تاریخ ایجاد
                                    </th>
                                    <th className="text-right py-3 px-4 font-medium text-gray-700">
                                        وضعیت
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr
                                        key={`${user.id}-${index}`}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-gray-900">{user.id}</td>
                                        <td className="py-3 px-4 text-gray-900 font-medium">
                                            {user.email}
                                        </td>
                                        <td className="py-3 px-4 text-gray-900">
                                            {user.username}
                                        </td>
                                        <td className="py-3 px-4 text-gray-900">
                                            {user.role ?? '-'}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">
                                            {user.lastLogin}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">
                                            {user.createdDate}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'حساب فعال'
                                                    ? 'bg-green-100 text-green-700'
                                                    : user.status === 'غیرفعال'
                                                        ? 'bg-gray-100 text-gray-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-left">
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => handleEditClick(user)}
                                                    className="p-2 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors"
                                                    style={{ cursor: 'pointer' }}
                                                    title="ویرایش"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeactivateUser(
                                                            user.id,
                                                            user.email
                                                        )
                                                    }
                                                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                                                    style={{ cursor: 'pointer' }}
                                                    title={
                                                        user.status === 'حساب فعال'
                                                            ? 'غیرفعال کردن'
                                                            : 'فعال کردن'
                                                    }
                                                >
                                                    <UserX className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleResetPassword(user.email)
                                                    }
                                                    className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                                                    style={{ cursor: 'pointer' }}
                                                    title="تنظیم مجدد رمز"
                                                >
                                                    <Key className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(user)
                                                    }
                                                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                                                    style={{ cursor: 'pointer' }}
                                                    title="حذف"
                                                >
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
                        {filteredUsers.map((user, index) => (
                            <div
                                key={`${user.id}-${index}`}
                                className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500">شناسه</p>
                                        <p className="font-medium text-gray-900">{user.id}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'حساب فعال'
                                            ? 'bg-green-100 text-green-700'
                                            : user.status === 'غیرفعال'
                                                ? 'bg-gray-100 text-gray-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">ایمیل</p>
                                    <p className="text-gray-900 break-all">{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">نام کاربری</p>
                                    <p className="text-gray-900 break-all">{user.username}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">نقش</p>
                                        <p className="text-gray-900">{user.role ?? '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">تاریخ ایجاد</p>
                                        <p className="text-gray-900 text-sm">
                                            {user.createdDate}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">آخرین ورود</p>
                                    <p className="text-gray-900 text-sm">{user.lastLogin}</p>
                                </div>
                                <div className="flex gap-2 pt-2 border-t">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="flex-1 text-sm text-purple-600 hover:text-purple-700 py-2 px-3 rounded-lg hover:bg-purple-50 transition-colors"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        ویرایش
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeactivateUser(user.id, user.email)
                                        }
                                        className="flex-1 text-sm text-blue-600 hover:text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {user.status === 'حساب فعال'
                                            ? 'غیرفعال'
                                            : 'فعال'}
                                    </button>
                                    <button
                                        onClick={() => handleResetPassword(user.email)}
                                        className="flex-1 text-sm text-green-600 hover:text-green-700 py-2 px-3 rounded-lg hover:bg-green-50 transition-colors"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        تنظیم رمز
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(user)}
                                        className="flex-1 text-sm text-red-600 hover:text-red-700 py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
                                        style={{ cursor: 'pointer' }}
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
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/60 animate-fadeIn backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
                        <div className="flex justify-between items-center mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                                    افزودن کاربر جدید
                                </h2>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition-all group"
                                style={{ cursor: 'pointer' }}
                            >
                                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </button>
                        </div>

                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                                    ایمیل <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            email: e.target.value,
                                        })
                                    }
                                    className={`w-full p-2 border-2 rounded-md bg-white ${errors.email
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                                    نام کاربری <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newUser.username}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            username: e.target.value,
                                        })
                                    }
                                    className={`w-full p-2 border-2 rounded-md bg-white ${errors.username
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200'
                                        }`}
                                />
                                {errors.username && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.username}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                                    نقش کاربر <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            role: e.target.value,
                                        })
                                    }
                                    className={`w-full p-2 border-2 rounded-md bg-white ${errors.role
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200'
                                        }`}
                                >
                                    <option value="">انتخاب کنید</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                                    رمز عبور <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            password: e.target.value,
                                        })
                                    }
                                    className={`w-full p-2 border-2 rounded-md bg-white ${errors.password
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200'
                                        }`}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100">
                            <button
                                onClick={handleAddUser}
                                className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl transition-all font-semibold text-sm shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                style={{ cursor: 'pointer' }}
                            >
                                <Plus className="w-4 h-4" />
                                افزودن کاربر
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all font-semibold text-sm active:scale-95"
                                style={{ cursor: 'pointer' }}
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && editUser && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/60 animate-fadeIn backdrop-blur-sm"
                    onClick={handleBackdropClickEdit}
                >
                    <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
                        <div className="flex justify بین items-center mb-6 sm:mb-۸ pb-3 sm:pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                                    ویرایش کاربر
                                </h2>
                            </div>
                            <button
                                onClick={handleCloseEditModal}
                                className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition-all group"
                                style={{ cursor: 'pointer' }}
                            >
                                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </button>
                        </div>

                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                                    ایمیل <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={editUser.email}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            email: e.target.value,
                                        })
                                    }
                                    className={`w-full p-2 border-2 rounded-md bg-white ${errors.email
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                                    نام کاربری <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={editUser.username}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            username: e.target.value,
                                        })
                                    }
                                    className={`w-full p-2 border-2 rounded-md bg-white ${errors.username
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200'
                                        }`}
                                />
                                {errors.username && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.username}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                                    نقش کاربر <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={editUser.role ?? ''}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            role: e.target.value,
                                        })
                                    }
                                    className={`w-full p-2 border-2 rounded-md bg-white ${errors.role
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200'
                                        }`}
                                >
                                    <option value="">انتخاب کنید</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.role}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100">
                            <button
                                onClick={handleUpdateUser}
                                className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all font-semibold text-sm shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                style={{ cursor: 'pointer' }}
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                ذخیره تغییرات
                            </button>
                            <button
                                onClick={handleCloseEditModal}
                                className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all font-semibold text-sm active:scale-95"
                                style={{ cursor: 'pointer' }}
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteModalOpen && userToDelete && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/60 animate-fadeIn backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) handleCancelDelete();
                    }}
                >
                    <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
                        <div className="flex justify-between items-center mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                                    حذف کاربر
                                </h2>
                            </div>
                            <button
                                onClick={handleCancelDelete}
                                className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition-all group"
                                style={{ cursor: 'pointer' }}
                            >
                                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </button>
                        </div>

                        <div className="space-y-3 text-center">
                            {currentUser &&
                                (normalize(currentUser.email) ===
                                    normalize(userToDelete.email) ||
                                    normalize(currentUser.username) ===
                                    normalize(userToDelete.username)) ? (
                                <>
                                    <p className="text-base text-gray-700">
                                        شما در حال حذف حساب کاربری خودتان هستید. بعد از حذف،
                                        دسترسی شما به سامانه قطع خواهد شد.
                                    </p>
                                    <p className="text-sm text-red-600 font-semibold">
                                        این عملیات غیرقابل بازگشت است و برای ادامه باید دوباره
                                        ثبت نام کنید.
                                    </p>
                                </>
                            ) : (
                                <p className="text-base text-gray-700">
                                    آیا از حذف کاربر {userToDelete.email} اطمینان دارید؟
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-8">
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl transition-all font-semibold text-sm shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                style={{ cursor: 'pointer' }}
                            >
                                <Trash2 className="w-4 h-4" />
                                بله، حذف کن
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all font-semibold text-sm active:scale-95"
                                style={{ cursor: 'pointer' }}
                            >
                                خیر، انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IdentityUsersPage;
