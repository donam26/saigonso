import api from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

const authService = {
  login: async (data: LoginData) => {
    const response = await api.post('/api/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      localStorage.removeItem('token');
    }
  },

  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  updateProfile: async (data: any) => {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  },

  changePassword: async (data: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) => {
    const response = await api.put('/api/auth/password', data);
    return response.data;
  }
};

export default authService; 