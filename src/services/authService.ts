import { api } from './api';

export const authService = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  updateMe: async (data: { name?: string; email?: string }) => {
    const response = await api.patch('/auth/me', data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.patch('/auth/me/password', data);
    return response.data;
  },
};
