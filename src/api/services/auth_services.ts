import api from 'api/index';
import { AUTHENTICATION, USER } from 'api/constants';

const auth_services = {
  tokenChecker: () => api.get(`${USER}/token`),

  getAllUser: () => api.get(`/users`),
  getUserDetails: () => api.get(`${USER}/getOne`),
  getUser: (userId: string) => api.get(`/users/${userId}`),

  postLogin: (params) => api.post(`${AUTHENTICATION}/login`, params),
  postSignup: (params) => api.post(`${AUTHENTICATION}/signup`, params),

  updateAvatar: (userId: string) => api.patch(`users/${userId}/avatar`),
  putUser: (userId: string, payload: any) =>
    api.patch(`/users/${userId}`, payload),

  postOtp: (payload: any) => api.post('/api/v1/otp', payload),
  verifyOtp: (payload: any) => api.post('/api/v1/otp/verify', payload),
  register: (payload: any) => api.post('/api/v1/auth/register', payload),
};

export default auth_services;
