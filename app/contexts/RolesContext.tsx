// app/contexts/RolesContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Role {
    id: number;
    name: string;
    accessLevel: string;
    userCount: number;
    permissions: string[];
    status: string;
    lastUpdate: string;
}

interface RolesContextType {
    roles: Role[];
    addRole: (role: Omit<Role, 'id' | 'userCount' | 'status' | 'lastUpdate'>) => void;
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

const defaultRoles: Role[] = [
    { id: 101, name: 'ادمین سیستم', accessLevel: 'دسترسی کامل', userCount: 7, permissions: ['مشاهده', 'ویرایش', 'حذف'], status: 'فعال', lastUpdate: '1404/08/12' },
    { id: 102, name: 'کاربر عادی', accessLevel: 'دسترسی محدود', userCount: 10, permissions: ['مشاهده'], status: 'فعال', lastUpdate: '1404/08/10' },
    { id: 103, name: 'ناظر', accessLevel: 'دسترسی محدود', userCount: 5, permissions: ['مشاهده', 'ویرایش'], status: 'غیرفعال', lastUpdate: '1404/08/18' },
    { id: 104, name: 'مهمان', accessLevel: 'فقط خواندن', userCount: 20, permissions: ['مشاهده'], status: 'فعال', lastUpdate: '1404/08/19' }
];

export const RolesProvider = ({ children }: { children: ReactNode }) => {
    const [roles, setRoles] = useState<Role[]>(defaultRoles);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            const storedRoles = localStorage.getItem('roles');
            if (storedRoles) {
                try {
                    setRoles(JSON.parse(storedRoles));
                } catch (error) {
                    console.error('Error loading roles:', error);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted]);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('roles', JSON.stringify(roles));
        }
    }, [roles, mounted]);

    const addRole = (role: Omit<Role, 'id' | 'userCount' | 'status' | 'lastUpdate'>) => {
        const newRole: Role = {
            ...role,
            id: Math.floor(Math.random() * 10000),
            userCount: 0,
            status: 'فعال',
            lastUpdate: new Date().toLocaleDateString('fa-IR')
        };
        setRoles(prev => [...prev, newRole]);
    };

    return (
        <RolesContext.Provider value={{ roles, addRole }}>
            {children}
        </RolesContext.Provider>
    );
};

export const useRoles = () => {
    const context = useContext(RolesContext);
    if (!context) {
        throw new Error('useRoles must be used within RolesProvider');
    }
    return context;
};
