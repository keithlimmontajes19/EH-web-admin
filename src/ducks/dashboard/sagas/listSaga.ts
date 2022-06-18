import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';

import dashboard_service from 'api/services/dashboard_service';

export function* listDashboard(): any {
  try {
    const response = yield call(dashboard_service.getDashboard);

    yield put({
      type: TYPES.LIST_DASHBOARD_SUCCESS,
      payload: response?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.LIST_DASHBOARD_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getOneDashboard({ payload }: any): any {
  const { dashboardId, callback=()=>{}} = payload
  
  try {
    const response = yield call(dashboard_service.getOneDashboard, dashboardId);

    yield put({
      type: TYPES.GET_ONE_DASHBOARD_SUCCESS,
      payload: response?.data,
    });

    callback(response?.data)
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_ONE_DASHBOARD_FAILED,
    });

    callback(false)
    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.LIST_DASHBOARD_REQUEST, listDashboard);
  yield takeLatest(TYPES.GET_ONE_DASHBOARD_REQUEST, getOneDashboard);
}
