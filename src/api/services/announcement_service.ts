import api from '../index';
import { ANNOUNCEMENT } from '../constants';

const annoucement_services = {
  getAnnouncement: () => api.get(`${ANNOUNCEMENT}/mobile/user`),
  getAllAnnouncement: () => api.get(`${ANNOUNCEMENT}`),
  createAnnouncement: (data) => api.post(`${ANNOUNCEMENT}/create`, data),
  deleteAnnouncemnet: (id: string) => api.delete(`${ANNOUNCEMENT}/delete/${id}`),
  editAnnouncement: (data, id) => api.put(`${ANNOUNCEMENT}/edit/${id}`, data)
};

export default annoucement_services;
