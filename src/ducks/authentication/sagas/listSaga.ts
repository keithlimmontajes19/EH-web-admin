import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";

import auth_services from "api/services/auth_services";

export function* getAllUsers() {
  try {
    const response = yield call(auth_services.getAllUser);

    yield put({
      type: TYPES.GET_USER_ALL_DETAILS_SUCCESS,
      payload: response?.data?.data,
    });

    return Promise.resolve();
  } catch (e) {
    yield put({
      type: TYPES.GET_USER_ALL_DETAILS_FAILED,
    });

    return Promise.reject(e);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.GET_USER_ALL_DETAILS_REQUEST, getAllUsers);
}
