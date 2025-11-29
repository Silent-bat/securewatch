'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface User {
    id: string;
    email: string;
    name?: string;
    role: string;
    walletAddress?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load token from localStorage on mount
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            // TODO: Validate token and fetch user data
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        });

        const { access_token, user: userData } = response.data;
        setToken(access_token);
        setUser(userData);
        localStorage.setItem('token', access_token);
    };

    const register = async (email: string, password: string, name?: string) => {
        const response = await axios.post(`${API_URL}/auth/register`, {
            email,
            password,
            name,
        });

        const { access_token, user: userData } = response.data;
        setToken(access_token);
        setUser(userData);
        localStorage.setItem('token', access_token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
