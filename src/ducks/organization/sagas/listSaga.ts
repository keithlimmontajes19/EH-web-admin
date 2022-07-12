import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";

import organization_service from "api/services/organization_service";

export function* listOrganizations(): any {
  try {
    const response = yield call(organization_service.getListOrganization);

    yield put({
      type: TYPES.LIST_DEPARTMENT_SUCCESS,
      payload: response?.data?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.LIST_DEPARTMENT_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.LIST_DEPARTMENT_REQUEST, listOrganizations);
}
