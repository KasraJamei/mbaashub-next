// lib/auth.ts
interface User {
    email: string;
    username: string;
    password: string;
}

export const registerUser = (email: string, username: string, password: string): boolean => {
    if (typeof window !== 'undefined') {
        const users = getAllUsers();

        if (users.find(u => u.email === email)) {
            return false;
        }

        if (users.find(u => u.username === username)) {
            return false;
        }

        users.push({ email, username, password });
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    return false;
};

export const loginUser = (emailOrUsername: string, password: string): boolean => {
    if (typeof window !== 'undefined') {
        const users = getAllUsers();
        const user = users.find(
            u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
        );

        if (user) {
            const token = `token_${Date.now()}_${user.username}`;
            localStorage.setItem('authToken', token);
            localStorage.setItem('currentUser', JSON.stringify({ email: user.email, username: user.username }));
            return true;
        }
    }
    return false;
};

export const getAllUsers = (): User[] => {
    if (typeof window !== 'undefined') {
        const usersStr = localStorage.getItem('users');
        return usersStr ? JSON.parse(usersStr) : [];
    }
    return [];
};

export const userExists = (emailOrUsername: string): boolean => {
    if (typeof window !== 'undefined') {
        const users = getAllUsers();
        return users.some(u => u.email === emailOrUsername || u.username === emailOrUsername);
    }
    return false;
};

export const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

export const removeAuthToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
    }
};

export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};

export const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }
    return null;
};