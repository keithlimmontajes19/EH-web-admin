import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';

import form_service from 'api/services/form_service';

export function* postForms({ payload }: any) {
  try {
    const response = yield call(form_service.postForms, payload);
    yield put({
      type: TYPES.POST_FORMS_SUCCESS,
      payload: response?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.POST_FORMS_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.POST_FORMS_REQUEST, postForms);
}
