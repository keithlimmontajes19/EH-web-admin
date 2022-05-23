import api from '../index';
import { DASHBOARD } from '../constants';

const dashboard_service = {
  getDashboard: () => api.get(`${DASHBOARD}`),
  getOneDashboard: (payload: string) => api.get(`${DASHBOARD}/${payload}`),
};

export default dashboard_service;
