import api from "../index";
import { FORMS } from "../constants";

const form_services = {
  getForms: () => api.get(`${FORMS}`),
  getOneForms: (id: string) => api.get(`${FORMS}/${id}`),
  postForms: (payload: any) => api.post(`${FORMS}/create`, payload),
  deleteForms: (payload: any) => api.patch(`${FORMS}/delete`, payload),
  putForms: (id: string, payload: any) =>
    api.patch(`${FORMS}/edit/${id}`, payload),
};

export default form_services;
