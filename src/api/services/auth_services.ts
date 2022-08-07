import api from "api/index";
import { AUTHENTICATION, USER } from "api/constants";

const auth_services = {
  tokenChecker: () => api.get(`${USER}/token`),

  getAllUser: () => api.get(`/users`),
  getUserDetails: () => api.get(`${USER}/getOne`),
  getUser: (userId: string) => api.get(`/users/${userId}`),

  postLogin: (params) => api.post(`${AUTHENTICATION}/login`, params),
  postSignup: (params) => api.post(`${AUTHENTICATION}/signup`, params),

  putUser: (userId: string, payload: any) =>
    api.patch(`/users/${userId}`, payload),
  updateAvatar: (userId: string) => api.patch(`users/${userId}/avatar`),
};

export default auth_services;
