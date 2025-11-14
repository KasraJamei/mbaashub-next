// lib/auth.ts
interface User {
    email: string;
    username: string;
    password: string;
    emailNorm: string;
    usernameNorm: string;
    lastLogin?: string;
}

const STORAGE_KEY = 'users';
const TOKEN_KEY = 'authToken';
const CURRENT_USER_KEY = 'currentUser';

const normalize = (value: string | undefined | null) =>
    (value ?? '').trim().toLowerCase();

export const getAllUsers = (): User[] => {
    if (typeof window !== 'undefined') {
        const usersStr = localStorage.getItem(STORAGE_KEY);
        try {
            return usersStr ? JSON.parse(usersStr) : [];
        } catch {
            return [];
        }
    }
    return [];
};

export const saveAllUsers = (users: User[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
};

export const registerUser = (email: string, username: string, password: string): boolean => {
    if (typeof window === 'undefined') return false;

    const users = getAllUsers();

    const emailNorm = normalize(email);
    const usernameNorm = normalize(username);

    const emailTaken = users.some((u) => u.emailNorm === emailNorm);
    const usernameTaken = users.some((u) => u.usernameNorm === usernameNorm);

    if (emailTaken || usernameTaken) {
        return false;
    }

    const newUser: User = {
        email: email.trim(),
        username: username.trim(),
        password,
        emailNorm,
        usernameNorm,
        lastLogin: 'هرگز',
    };

    users.push(newUser);
    saveAllUsers(users);
    return true;
};

export const userExists = (emailOrUsername: string): boolean => {
    if (typeof window === 'undefined') return false;

    const users = getAllUsers();
    const norm = normalize(emailOrUsername);

    return users.some((u) => u.emailNorm === norm || u.usernameNorm === norm);
};

export const loginUser = (emailOrUsername: string, password: string): boolean => {
    if (typeof window === 'undefined') return false;

    const users = getAllUsers();
    const norm = normalize(emailOrUsername);

    const index = users.findIndex(
        (u) => (u.emailNorm === norm || u.usernameNorm === norm) && u.password === password
    );

    if (index === -1) return false;

    const nowFa = new Date().toLocaleString('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    users[index] = {
        ...users[index],
        lastLogin: nowFa,
    };

    saveAllUsers(users);

    const user = users[index];

    const token = `token_${Date.now()}_${user.username}`;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify({ email: user.email, username: user.username })
    );

    return true;
};

export const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
};

export const removeAuthToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CURRENT_USER_KEY);
    }
};

export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};

export const getCurrentUser = (): { email: string; username: string } | null => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem(CURRENT_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }
    return null;
};
