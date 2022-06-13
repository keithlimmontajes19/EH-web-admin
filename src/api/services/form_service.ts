import api from '../index';
import { FORMS } from '../constants';

const form_services = {
  getForms: () => api.get(`${FORMS}`),
  getOneForms: (id: string) => api.get(`${FORMS}/${id}`),
  deleteForms: (id: string) => api.delete(`${FORMS}/${id}`),
  postForms: (payload: any) => api.post(`${FORMS}`, payload),
  putForms: (id: string, payload: any) => api.put(`${FORMS}/${id}`, payload),
};

export default form_services;
