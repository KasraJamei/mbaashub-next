// app/main/identity-roles/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IdentityTabs } from '@/app/components/Auth/IdentityTabs';
import { Trash2, Eye, Edit, Search, Plus, X, ChevronDown } from 'lucide-react';
import { useRoles } from '@/app/contexts/RolesContext';

const availablePermissions = ["مشاهده", "ویرایش", "حذف", "ایجاد", "تایید"];

function PermissionsDropdown({ value, setValue, error, setError }: { value: string[], setValue: (vals: string[]) => void, error: string, setError: (err: string) => void }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const togglePermission = (perm: string) => {
        if (value.includes(perm)) {
            setValue(value.filter(p => p !== perm));
        } else {
            setValue([...value, perm]);
        }
        setError('');
    };

    return (
        <div className="relative w-full" ref={ref}>
            <div
                onClick={() => setOpen(v => !v)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 border-2 rounded-xl cursor-pointer bg-white text-sm sm:text-base flex justify-between items-center transition-all
          ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-indigo-300'}`}
            >
                <span className={value.length === 0 ? 'text-gray-400' : 'text-gray-900'}>
                    {value.length === 0 ? 'انتخاب کنید' : value.length === 5 ? 'همه مجوزها' : value.join('، ')}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} />
            </div>

            {open && (
                <div className="absolute top-full right-0 left-0 mt-1 bg-white border-2 border-indigo-200 rounded-xl shadow-lg z-50 animate-slideDown overflow-hidden max-h-60 overflow-auto">
                    {availablePermissions.map(permission => (
                        <label
                            key={permission}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0 text-sm"
                            onClick={e => e.stopPropagation()}
                        >
                            <input
                                type="checkbox"
                                checked={value.includes(permission)}
                                onChange={() => togglePermission(permission)}
                                className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            />
                            <span className="font-medium text-gray-700">{permission}</span>
                        </label>
                    ))}
                </div>
            )}
            {error && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1 animate-slideDown">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {error}
                </p>
            )}
        </div>
    );
}

const IdentityRolesPage = () => {
    const { roles, addRole } = useRoles();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newRole, setNewRole] = useState({ name: '', accessLevel: '', permissions: [] as string[] });
    const [errors, setErrors] = useState({ name: '', accessLevel: '', permissions: '' });

    const filteredRoles = roles.filter(role =>
        role.name.includes(searchTerm) ||
        role.id.toString().includes(searchTerm) ||
        role.accessLevel.includes(searchTerm)
    );

    const validateForm = () => {
        const e = { name: '', accessLevel: '', permissions: '' };
        let ok = true;

        if (!newRole.name.trim()) {
            e.name = 'نام نقش الزامی است';
            ok = false;
        } else if (roles.some(role => role.name.toLowerCase() === newRole.name.toLowerCase())) {
            e.name = 'این نقش قبلاً ثبت شده است';
            ok = false;
        }

        if (!newRole.accessLevel) {
            e.accessLevel = 'سطح دسترسی الزامی است';
            ok = false;
        }

        if (newRole.permissions.length === 0) {
            e.permissions = 'حداقل یک مجوز انتخاب کنید';
            ok = false;
        }

        setErrors(e);
        return ok;
    };

    const handleAddRole = () => {
        if (!validateForm()) return;
        addRole(newRole);
        setNewRole({ name: '', accessLevel: '', permissions: [] });
        setErrors({ name: '', accessLevel: '', permissions: '' });
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewRole({ name: '', accessLevel: '', permissions: [] });
        setErrors({ name: '', accessLevel: '', permissions: '' });
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
                                placeholder="جستجو بر اساس نام یا شناسه نقش..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pr-10 pl-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all text-sm font-medium whitespace-nowrap"
                            style={{ cursor: 'pointer' }}
                        >
                            <Plus className="w-4 h-4" />
                            افزودن نقش جدید
                        </button>
                    </div>
                </div>

                <div className="p-4 md:p-6">
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
                                {filteredRoles.map((role) => (
                                    <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 text-gray-900">{role.id}</td>
                                        <td className="py-3 px-4 text-gray-900 font-medium">{role.name}</td>
                                        <td className="py-3 px-4 text-gray-900">{role.accessLevel}</td>
                                        <td className="py-3 px-4 text-gray-900">{role.userCount}</td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">{role.permissions.join('، ')}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${role.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {role.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 text-sm">{role.lastUpdate}</td>
                                        <td className="py-3 px-4 text-left">
                                            <div className="flex gap-2 justify-end">
                                                <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" style={{ cursor: 'pointer' }} title="مشاهده">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors" style={{ cursor: 'pointer' }} title="ویرایش">
                                                    <Edit className="w-4 h-4" />
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
                        {filteredRoles.map((role) => (
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
                                    <p className="text-gray-900 text-sm">{role.permissions.join('، ')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">آخرین به‌روزرسانی</p>
                                    <p className="text-gray-900 text-sm">{role.lastUpdate}</p>
                                </div>
                                <div className="flex gap-2 pt-2 border-t">
                                    <button className="flex-1 text-sm text-blue-600 hover:text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors" style={{ cursor: 'pointer' }}>مشاهده</button>
                                    <button className="flex-1 text-sm text-green-600 hover:text-green-700 py-2 px-3 rounded-lg hover:bg-green-50 transition-colors" style={{ cursor: 'pointer' }}>ویرایش</button>
                                    <button className="flex-1 text-sm text-red-600 hover:text-red-700 py-2 px-3 rounded-lg hover:bg-red-50 transition-colors" style={{ cursor: 'pointer' }}>حذف</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredRoles.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <Search className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">نقشی یافت نشد</p>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/60 animate-fadeIn backdrop-blur-sm" onClick={handleBackdropClick}>
                    <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
                        <div className="flex justify-between items-center mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">افزودن نقش جدید</h2>
                            </div>
                            <button onClick={handleCloseModal} className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition-all group" style={{ cursor: 'pointer' }}>
                                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </button>
                        </div>

                        <form className="space-y-4 sm:space-y-5" onSubmit={(e) => { e.preventDefault(); handleAddRole(); }}>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                                    نام نقش
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newRole.name}
                                    onChange={(e) => { setNewRole({ ...newRole, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 transition-all text-sm sm:text-base ${errors.name
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50'
                                            : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-gray-300'
                                        }`}
                                    placeholder="مثال: مدیر محتوا"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-xs text-red-600 flex items-center gap-1 animate-slideDown">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                                    سطح دسترسی
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={newRole.accessLevel}
                                        onChange={(e) => { setNewRole({ ...newRole, accessLevel: e.target.value }); setErrors({ ...errors, accessLevel: '' }); }}
                                        className={`w-full px-4 py-3 pl-10 border-2 rounded-xl focus:ring-2 focus:ring-offset-2 cursor-pointer transition-all appearance-none bg-white text-sm sm:text-base ${errors.accessLevel
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50'
                                                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-300'
                                            }`}
                                    >
                                        <option value="">انتخاب کنید</option>
                                        <option value="دسترسی کامل">دسترسی کامل</option>
                                        <option value="دسترسی محدود">دسترسی محدود</option>
                                        <option value="فقط خواندن">فقط خواندن</option>
                                    </select>
                                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.accessLevel && (
                                    <p className="mt-2 text-xs text-red-600 flex items-center gap-1 animate-slideDown">
                                        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                        {errors.accessLevel}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                                    مجوزها
                                    <span className="text-red-500">*</span>
                                </label>
                                <PermissionsDropdown
                                    value={newRole.permissions}
                                    setValue={(vals) => setNewRole((prev) => ({ ...prev, permissions: vals }))}
                                    error={errors.permissions}
                                    setError={(msg) => setErrors((prev) => ({ ...prev, permissions: msg }))}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all font-semibold text-sm shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Plus className="w-4 h-4" />
                                    افزودن نقش
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all font-semibold text-sm active:scale-95"
                                    style={{ cursor: 'pointer' }}
                                >
                                    انصراف
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IdentityRolesPage;
