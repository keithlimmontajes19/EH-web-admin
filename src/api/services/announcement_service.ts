import api from '../index';
import { ANNOUNCEMENT } from '../constants';

const annoucement_services = {
  getAnnouncement: () => api.get(`${ANNOUNCEMENT}/mobile/user`),
  getAllAnnouncement: () => api.get(`${ANNOUNCEMENT}`),
  createAnnoucement: (data) => api.post(`${ANNOUNCEMENT}/create`, data)
};

export default annoucement_services;
