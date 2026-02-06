'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import { User, ApiResponse } from '@/types';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      const response = await api.get<ApiResponse<User>>('users/me');
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        setUser(null);
      }
    } catch (error: any) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const publicRoutes = ['/login', '/register', '/'];
    if (!loading && !user && !publicRoutes.includes(pathname)) {
      router.push('/login');
    }
    if (!loading && user && (pathname === '/login' || pathname === '/register')) {
      router.push('/dashboard');
    }
  }, [user, loading, pathname, router]);

  const login = async (data: any) => {
    try {
      const response = await api.post<ApiResponse<any>>('auth/login', data);
      if (response.data.success) {

        await checkAuth();
        toast.success('Login successful!');
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const signup = async (data: any) => {
    try {
      const response = await api.post<ApiResponse<any>>('auth/register', data);
      if (response.data.success) {

        await checkAuth();
        toast.success('Account created successfully!');
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await api.post('auth/logout');
      setUser(null);

      toast.success('Logged out');
      router.push('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
