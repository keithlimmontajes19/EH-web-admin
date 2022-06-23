import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';

import dashboard_service from 'api/services/dashboard_service';

export const dashboardId = async () => await localStorage.getItem('dashboardId');

function filterDashboardData(data) {
  const {name, isPublish, boards=[], organization=[]} = data
  const filteredData = {
    name, 
    isPublish, 
    boards: boards.map(obj => {
      const board_items = [...obj.board_items].map(item => {
        if('_id' in item) delete item._id
        return item
      })
      const board_tmp = {...obj, board_items}
      if('_id' in board_tmp) delete board_tmp._id
      return board_tmp
    }) ,
    organization: organization.map(obj => typeof(obj) === 'string' ? obj : obj._id)
  }
  return filteredData
}

export function* postDashboard({payload}: any): any {
  const {data, callback} = payload
  
  try {
    const response = yield call(
        dashboard_service.createDashboard,
        filterDashboardData(data)
    );

    yield put({
      type: TYPES.POST_DASHBOARD_SUCCESS,
      payload: response?.data,
    });

    callback(response?.data)
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.POST_DASHBOARD_FAILED,
    });

    callback(false)
    return Promise.reject(error);
  }
}

export function* updateDashboard({payload}: any): any {
  const idDashboard = yield call(dashboardId)
  const {data, callback} = payload

  try {
    const response = yield call(
        dashboard_service.updateDashboard,
        idDashboard,
        filterDashboardData(data)
    );

    yield put({
      type: TYPES.PUT_UPDATE_DASHBOARD_SUCCESS,
      payload: response?.data,
    });

    callback(response?.data)
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.PUT_UPDATE_DASHBOARD_FAILED,
    });

    callback(false)
    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.POST_DASHBOARD_REQUEST, postDashboard);
  yield takeLatest(TYPES.PUT_UPDATE_DASHBOARD_REQUEST, updateDashboard);
}
