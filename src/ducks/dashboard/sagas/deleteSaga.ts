import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';

import dashboard_service from 'api/services/dashboard_service';

export const dashboardId = async () => await localStorage.getItem('dashboardId');

export function* deleteDashboard({payload}: any): any {
  const idDashboard = yield call(dashboardId);
  const {callback} = payload;
  
  try {
    const response = yield call(
        dashboard_service.deleteDashboard,
        idDashboard
    );

    yield put({
      type: TYPES.DELETE_DASHBOARD_SUCCESS,
      payload: response?.data,
    });

    callback()
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.DELETE_DASHBOARD_FAILED,
    });

    callback()
    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.DELETE_DASHBOARD_REQUEST, deleteDashboard);
}
