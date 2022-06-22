import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";

import form_service from "api/services/form_service";

export function* deleteForms({ payload }: any) {
  try {
    const response = yield call(form_service.deleteForms, payload);
    yield put({
      type: TYPES.DELETE_FORMS_SUCCESS,
      payload: response?.data,
    });

    yield put({ type: TYPES.LIST_FORMS_REQUEST });
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.DELETE_FORMS_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.DELETE_FORMS_REQUEST, deleteForms);
}
