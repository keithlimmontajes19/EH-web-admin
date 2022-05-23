import { TYPES } from './actionTypes';
import { store } from 'ducks/store';

export const getDashboard = () =>
  store.dispatch({
    type: TYPES.LIST_DASHBOARD_REQUEST,
  });

export const getOneDashboard = (payload) =>
  store.dispatch({
    type: TYPES.GET_ONE_DASHBOARD_REQUEST,
    payload,
  });
