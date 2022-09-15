import api from "../index";
import { ANNOUNCEMENT, ORGANIZATION } from "../constants";

const annoucement_services = {
  getAnnouncement: () => api.get(`${ANNOUNCEMENT}`),
  getAnnouncementByUser: () => api.get(`${ANNOUNCEMENT}/mobile/user`),
  getOrganizations: () => api.get(`${ORGANIZATION}`),
  postAnnouncement: (payload: any) =>
    api.post(`${ANNOUNCEMENT}/create`, payload),
  deleteAnnouncement: (id: string) =>
    api.delete(`${ANNOUNCEMENT}/delete/${id}`),
  putAnnouncement: (id: string, payload: any) =>
    api.put(`${ANNOUNCEMENT}/edit/${id}`, payload),
};

export default annoucement_services;
