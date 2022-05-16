import {takeLatest, put, call} from 'redux-saga/effects';
import {TYPES} from '../actionTypes';

import announcement_service from 'api/services/announcement_service';

export function* listAnnouncement(): any {
  try {
    const response = yield call(announcement_service.getAnnouncement);

    yield put({
      type: TYPES.LIST_ANNOUNCEMENT_SUCCESS,
      payload: response?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.LIST_ANNOUNCEMENT_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.LIST_ANNOUNCEMENT_REQUEST, listAnnouncement);
}
