import api from 'api/index';
import {AUTHENTICATION, USER} from 'api/constants';

const auth_services = {
  postLogin: (params) => api.post(`${AUTHENTICATION}/login`, params),
  postSignup: (params) => api.post(`${AUTHENTICATION}/signup`, params),
  tokenChecker: () => api.get(`${USER}/token`),
  getUserDetails: () => api.get(`${USER}/getOne`),

  getUser: (userId: string) => api.get(`/users/${userId}`),
};

export default auth_services;
