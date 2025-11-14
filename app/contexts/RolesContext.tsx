// app/contexts/RolesContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the structure of a Role object
export interface Role {
    id: number;
    name: string;
    accessLevel: string;
    userCount: number;
    permissions: string[];
    status: string;
    lastUpdate: string;
}

// Define the shape of the context data and functions
interface RolesContextType {
    roles: Role[];
    addRole: (role: Omit<Role, 'id' | 'userCount' | 'status' | 'lastUpdate'>) => void;
    updateRole: (roleId: number, updatedData: Partial<Omit<Role, 'id'>>) => void;
    deleteRole: (roleId: number) => void;
}

// Create the context with an undefined default value
const RolesContext = createContext<RolesContextType | undefined>(undefined);

// Define default roles as a fallback
const defaultRoles: Role[] = [
    { id: 101, name: 'ادمین سیستم', accessLevel: 'دسترسی کامل', userCount: 7, permissions: ['مشاهده', 'ویرایش', 'حذف', 'ایجاد', 'تایید'], status: 'فعال', lastUpdate: '1404/08/12' },
    { id: 102, name: 'کاربر عادی', accessLevel: 'دسترسی محدود', userCount: 10, permissions: ['مشاهده'], status: 'فعال', lastUpdate: '1404/08/10' },
    { id: 103, name: 'ناظر', accessLevel: 'دسترسی محدود', userCount: 5, permissions: ['مشاهده', 'ویرایش'], status: 'غیرفعال', lastUpdate: '1404/08/18' },
    { id: 104, name: 'مهمان', accessLevel: 'فقط خواندن', userCount: 20, permissions: ['مشاهده'], status: 'فعال', lastUpdate: '1404/08/19' }
];

// Helper function to safely load initial state from localStorage on the client
const getInitialRoles = (): Role[] => {
    if (typeof window === 'undefined') {
        return defaultRoles;
    }
    try {
        const storedRoles = localStorage.getItem('roles');
        return storedRoles ? JSON.parse(storedRoles) : defaultRoles;
    } catch (error) {
        console.error('Error parsing roles from localStorage:', error);
        return defaultRoles;
    }
};

// Define the provider component
export const RolesProvider = ({ children }: { children: ReactNode }) => {
    const [roles, setRoles] = useState<Role[]>(getInitialRoles);

    // Effect to save roles to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('roles', JSON.stringify(roles));
        } catch (error) {
            console.error('Error saving roles to localStorage:', error);
        }
    }, [roles]);

    // Function to add a new role
    const addRole = (role: Omit<Role, 'id' | 'userCount' | 'status' | 'lastUpdate'>) => {
        const newRole: Role = {
            ...role,
            id: Date.now(), // Use timestamp for a more unique ID
            userCount: 0,
            status: 'فعال',
            lastUpdate: new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        };
        setRoles(prev => [...prev, newRole]);
    };

    // Function to update an existing role
    const updateRole = (roleId: number, updatedData: Partial<Omit<Role, 'id'>>) => {
        setRoles(prev => prev.map(role =>
            role.id === roleId
                ? {
                    ...role,
                    ...updatedData,
                    lastUpdate: new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })
                }
                : role
        ));
    };

    // Function to delete a role
    const deleteRole = (roleId: number) => {
        setRoles(prev => prev.filter(role => role.id !== roleId));
    };

    return (
        <RolesContext.Provider value={{ roles, addRole, updateRole, deleteRole }}>
            {children}
        </RolesContext.Provider>
    );
};

// Custom hook to use the RolesContext
export const useRoles = () => {
    const context = useContext(RolesContext);
    if (!context) {
        throw new Error('useRoles must be used within a RolesProvider');
    }
    return context;
};
