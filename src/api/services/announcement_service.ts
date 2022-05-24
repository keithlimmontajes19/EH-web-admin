import api from '../index';
import { ANNOUNCEMENT } from '../constants';

const annoucement_services = {
  getAnnouncement: () => api.get(`${ANNOUNCEMENT}/mobile/user`),
  getAllAnnouncement: () => api.get(`${ANNOUNCEMENT}`),
  createAnnoucement: () => api.post(`${ANNOUNCEMENT}/create`)
};

export default annoucement_services;
