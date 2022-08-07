import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";

import organization_service from "api/services/organization_service";

export function* postOrganization({ payload }: never): any {
  try {
    const response = yield call(organization_service.postOrganization, payload);

    yield put({
      type: TYPES.POST_ORGANIZATION_SUCCESS,
      payload: response?.data?.data?._id || null,
    });

    yield put({ type: TYPES.LIST_DEPARTMENT_REQUEST });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.POST_ORGANIZATION_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.POST_ORGANIZATION_REQUEST, postOrganization);
}
