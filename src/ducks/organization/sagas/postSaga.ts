import { takeLatest, put, call, all } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import { getMembers } from "./listSaga";
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

function* doSomethingWithItem(item, payload) {
  try {
    const resposne = yield call(organization_service.postMembers, payload?.id, {
      userEmail: item,
      position: "staff",
    });

    return Promise.resolve(resposne);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function* postMembers({ payload }: any): any {
  try {
    yield all(
      (payload.data || []).map((item) => {
        return call(doSomethingWithItem, item, payload);
      })
    );

    return Promise.resolve();
  } catch (error) {
    yield put({
      type: TYPES.POST_ORGANIZATION_MEMBERS_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.POST_ORGANIZATION_REQUEST, postOrganization);
  yield takeLatest(TYPES.POST_ORGANIZATION_MEMBERS_REQUEST, postMembers);
}
