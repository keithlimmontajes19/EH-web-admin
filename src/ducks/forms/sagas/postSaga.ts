import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import { TYPES as ALERT_TYPES } from "ducks/alert/actionTypes";

import form_service from "api/services/form_service";

export function* postForms({ payload }: any) {
  try {
    const response = yield call(form_service.postForms, payload);
    yield put({
      type: TYPES.POST_FORMS_SUCCESS,
      payload: response?.data,
    });

    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "success",
        message: "Add form success!",
      },
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.POST_FORMS_FAILED,
    });

    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "error",
        message: "Add form failed!",
      },
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.POST_FORMS_REQUEST, postForms);
}
