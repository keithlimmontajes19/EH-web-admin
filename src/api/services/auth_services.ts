import api from 'api/index';
import { AUTHENTICATION, USER } from 'api/constants';

const auth_services = {
  postLogin: (params) => api.post(`${AUTHENTICATION}/login`, params),
  postSignup: (params) => api.post(`${AUTHENTICATION}/signup`, params),
  tokenChecker: () => api.get(`${USER}/token`),
  getUserDetails: () => api.get(`${USER}/getOne`),

  updateAvatar: (userId: string) => api.patch(`users/${userId}/avatar`),
  getUser: (userId: string) => api.get(`/users/${userId}`),
  putUser: (userId: string, payload: any) =>
    api.patch(`/users/${userId}`, payload),
};

export default auth_services;
