import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';
import { TYPES as ALERT_TYPES } from 'ducks/alert/actionTypes';

import form_service from 'api/services/form_service';

export function* putForms({ payload }: any) {
  payload.callback({ loading: true, success: null });

  try {
    const response = yield call(
      form_service.putForms,
      payload?.id,
      payload?.data
    );

    yield put({
      type: TYPES.PUT_FORMS_SUCCESS,
      payload: response?.data,
    });

    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: 'success',
        message: 'Edit form success!',
      },
    });

    payload.callback({ loading: false, success: true, data: response?.data });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.PUT_FORMS_FAILED,
    });

    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: 'error',
        message: 'Edit form failed!',
      },
    });

    payload.callback({ loading: false, success: false });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.PUT_FORMS_REQUEST, putForms);
}
