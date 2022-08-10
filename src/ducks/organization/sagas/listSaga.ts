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

export function* getMembers({ payload }: any): any {
  try {
    const response = yield call(
      organization_service.getMembersOrganization,
      payload
    );

    yield put({
      type: TYPES.GET_MEMBERS_SUCCESS,
      payload: response?.data?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_MEMBERS_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getOrgDetails({ payload }: any): any {
  yield put({
    type: TYPES.GET_ORGANIZATION_DETAILS_SUCCESS,
    payload: payload,
  });
}

export default function* watcher() {
  yield takeLatest(TYPES.GET_MEMBERS_REQUEST, getMembers);
  yield takeLatest(TYPES.LIST_DEPARTMENT_REQUEST, listOrganizations);
  yield takeLatest(TYPES.GET_ORGANIZATION_DETAILS_REQUEST, getOrgDetails);
}
