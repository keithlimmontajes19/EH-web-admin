import api from '../index';
import { SCHEDULES } from '../constants';

const auth_services = {
  getSchedules: () => api.get(`${SCHEDULES}`),
  postSchedules: (payload: any) => api.post(`${SCHEDULES}`, payload),
  deleteSchedules: (id: string) => api.delete(`${SCHEDULES}/${id}`),

  patchFileSchedule: (schedID: string) =>
    api.patch(`${SCHEDULES}/${schedID}/file`),
  postToSchedules: (schedID: string, payload: any) =>
    api.post(`${SCHEDULES}/${schedID}/schedules`, payload),
  postToOrganizations: (schedID: string, payload: any) =>
    api.post(`${SCHEDULES}/${schedID}/organizations`, payload),
};

export default auth_services;
