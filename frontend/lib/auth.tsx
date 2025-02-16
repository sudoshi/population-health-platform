'use client';

import axios from 'axios';
import { auth as authApi } from '@/services/api';
import type { User } from '@/services/api';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.login(credentials);
      setUser(response.data.user);
      router.push('/dashboard');
    } catch (err) {
      const message = axios.isAxiosError(err) 
        ? err.response?.data?.message || err.message
        : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
