import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";

import organization_service from "api/services/organization_service";

export function* deleteOrganization({ payload }: any): any {
  try {
    const response = yield call(
      organization_service.deleteOrganization,
      payload
    );

    yield put({
      type: TYPES.DELETE_ORGANIZATION_SUCCESS,
      payload: response?.data?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.DELETE_ORGANIZATION_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* deleteMembers({ payload }: any): any {
  try {
    const response = yield call(
      organization_service.deleteMembers,
      payload?.id,
      payload?.memberId
    );

    yield put({
      type: TYPES.DELETE_ORGANIZATION_MEMBERS_SUCCESS,
      payload: response?.data?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.DELETE_ORGANIZATION_MEMBERS_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.DELETE_ORGANIZATION_REQUEST, deleteOrganization);
  yield takeLatest(TYPES.DELETE_ORGANIZATION_MEMBERS_REQUEST, deleteMembers);
}
