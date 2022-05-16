import api from '../index';
import {DASHBOARD} from '../constants';

const dashboard_service = {
  getDashboard: () => api.get(`${DASHBOARD}`),
};

export default dashboard_service;
