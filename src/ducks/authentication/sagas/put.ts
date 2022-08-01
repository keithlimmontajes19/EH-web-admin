import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';
import { TYPES as ALERT_TYPES } from 'ducks/alert/actionTypes';

import auth_services from 'api/services/auth_services';

export function* postLogin({ payload }: any) {
  try {
    yield call(auth_services.putUser, payload.userId, payload.data);
    yield put({ type: TYPES.GET_USER_DETAILS_REQUEST });

    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: 'success',
        message: 'Success edit profile!',
      },
    });

    return Promise.resolve();
  } catch (e) {
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: 'error',
        message: 'Failed to edit profile!',
      },
    });

    return Promise.reject(e);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.PATCH_USER_PROFILE_REQUEST, postLogin);
}
