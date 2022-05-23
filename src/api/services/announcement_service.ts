import api from '../index';
import { ANNOUNCEMENT } from '../constants';

const annoucement_services = {
  getAnnouncement: () => api.get(`${ANNOUNCEMENT}/mobile/user`),
  getAllAnnouncement: () => api.get(`${ANNOUNCEMENT}`)
};

export default annoucement_services;
