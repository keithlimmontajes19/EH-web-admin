import api from '../index';
import { DASHBOARD } from '../constants';

const dashboard_service = {
  getDashboard: () => api.get(`${DASHBOARD}`),
  getOneDashboard: (payload: string) => api.get(`${DASHBOARD}/${payload}`),
  createDashboard: (payload: any) => api.post(`${DASHBOARD}/create`, payload),
  updateDashboard: (dashboardId: string, payload: any) =>
    api.put(`${DASHBOARD}/edit/${dashboardId}`, payload),
  deleteDashboard: (dashboardId: string) =>
    api.delete(`${DASHBOARD}/delete/${dashboardId}`),

  getHueeStates: () => api.get(`/huee/stats`),
};

export default dashboard_service;
