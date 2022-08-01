import api from '../index';
import { REWARDS } from '../constants';

const rewards_service = {
  getLeaderBoard: () => api.get(`${REWARDS}`),
};

export default rewards_service;
