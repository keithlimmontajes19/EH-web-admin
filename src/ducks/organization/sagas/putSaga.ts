import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import { TYPES as ALERT_TYPES } from "ducks/alert/actionTypes";

import organization_service from "api/services/organization_service";

export function* putOrganization({ payload }: any): any {
  
  try {
    const response = yield call(
      organization_service.putOrganization,
      payload?.id,
      payload?.data
    );

    yield put({
      type: TYPES.PUT_ORGANIZATION_SUCCESS,
    });

    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "success",
        message: `Edit organization name success!`,
      },
    });
    
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.PUT_ORGANIZATION_FAILED,
    });

    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "error",
        message: "You are now allowed access to this organization.",
      },
    });

    return Promise.reject(error);
  }
}

export function* putMembers({ payload }: any): any {
  try {
    const response = yield call(
      organization_service.putMembers,
      payload?.id,
      payload?.memberId,
      payload?.data
    );

    yield put({
      type: TYPES.PUT_ORGANIZATION_MEMBERS_SUCCESS,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.PUT_ORGANIZATION_MEMBERS_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.PUT_ORGANIZATION_REQUEST, putOrganization);
  yield takeLatest(TYPES.PUT_ORGANIZATION_MEMBERS_REQUEST, putMembers);
}
