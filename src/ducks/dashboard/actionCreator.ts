import { TYPES } from './actionTypes';
import { store } from 'ducks/store';

export const getDashboard = () =>
  store.dispatch({
    type: TYPES.LIST_DASHBOARD_REQUEST,
  });

export const getOneDashboard = (payload) => ({
    type: TYPES.GET_ONE_DASHBOARD_REQUEST,
    payload,
  });

export const postDashboard = (payload) => ({
    type: TYPES.POST_DASHBOARD_REQUEST,
    payload,
  })

export const updateDashboard = (payload) => ({
    type: TYPES.PUT_UPDATE_DASHBOARD_REQUEST,
    payload,
  })

export const deleteDashboard = (payload) => ({
    type: TYPES.DELETE_DASHBOARD_REQUEST,
    payload
  })