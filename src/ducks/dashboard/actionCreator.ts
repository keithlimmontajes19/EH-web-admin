import { TYPES } from './actionTypes';
import {store} from 'ducks/store';

export const getDashboard = () => 
  store.dispatch({
    type: TYPES.LIST_DASHBOARD_REQUEST,
});