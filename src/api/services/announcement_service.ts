import api from '../index';
import {ANNOUNCEMENT} from '../constants';

const annoucement_services = {
  getAnnouncement: () => api.get(`${ANNOUNCEMENT}/mobile/user`),
};

export default annoucement_services;
