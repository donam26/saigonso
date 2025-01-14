import { create } from 'zustand';
import { api } from '@/config/api';
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  status: string;
  access_token: string;
  user: User;
  message?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? (Cookies.get('token') || null) : null,
  isAuthenticated: typeof window !== 'undefined' ? !!Cookies.get('token') : false,
  
  login: async (email: string, password: string) => {
    try {
      const { data } = await api.post<AuthResponse>('/api/auth/login', { email, password });
      
      if (data.status === 'success' && data.access_token) {
        Cookies.set('token', data.access_token, { 
          expires: 7, 
          secure: true, 
          sameSite: 'strict' 
        });
        set({ token: data.access_token, user: data.user, isAuthenticated: true });
      } else {
        throw new Error('Đăng nhập thất bại');
      }
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const { data } = await api.post<AuthResponse>('/api/auth/logout');
      if (data.status === 'success') {
        Cookies.remove('token');
        set({ token: null, user: null, isAuthenticated: false });
        window.location.href = '/auth/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Vẫn xóa token và chuyển về trang login ngay cả khi API lỗi
      Cookies.remove('token');
      set({ token: null, user: null, isAuthenticated: false });
      window.location.href = '/auth/login';
    }
  },

  setUser: (user: User) => {
    set({ user });
  },
})); 