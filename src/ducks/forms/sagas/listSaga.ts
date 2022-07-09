import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";

import form_service from "api/services/form_service";

export function* listForms() {
  try {
    const response = yield call(form_service.getForms);
    yield put({
      type: TYPES.LIST_FORMS_SUCCESS,
      payload: response?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.LIST_FORMS_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getOneForm({ payload }: any) {
  yield put({
    type: TYPES.GET_ONE_FORMS_SUCCESS,
    payload,
  });
}

export function* getAllResults() {
  try {
    const response = yield call(form_service.getAllResults);
    yield put({
      type: TYPES.GET_ALL_RESULTS_SUCCESS,
      payload: response?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_ALL_RESULTS_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.LIST_FORMS_REQUEST, listForms);
  yield takeLatest(TYPES.GET_ONE_FORMS_REQUEST, getOneForm);
  yield takeLatest(TYPES.GET_ALL_RESULTS_REQUEST, getAllResults);
}
