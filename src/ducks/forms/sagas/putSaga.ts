import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';

import form_service from 'api/services/form_service';

export function* putForms({ payload }: any) {
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

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.PUT_FORMS_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.PUT_FORMS_REQUEST, putForms);
}
