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

export const postDashboard = (payload) =>
  store.dispatch({
    type: TYPES.POST_DASHBOARD_REQUEST,
    payload,
  })

export const updateDashboard = (payload) => 
  store.dispatch({
    type: TYPES.PUT_UPDATE_DASHBOARD_REQUEST,
    payload,
  })

export const deleteDashboard = (payload) => 
  store.dispatch({
    type: TYPES.DELETE_DASHBOARD_REQUEST,
    payload
  })