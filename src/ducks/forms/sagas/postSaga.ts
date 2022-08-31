import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import { TYPES as ALERT_TYPES } from "ducks/alert/actionTypes";

import form_service from "api/services/form_service";

export function* postForms({ payload }: any) {
  payload.callback({ loading: true, success: null })
  try {
    const response = yield call(form_service.postForms, payload.data);
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

    payload.callback({ loading: false, success: true })
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

    payload.callback({ loading: false, success: false })
    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.POST_FORMS_REQUEST, postForms);
}
