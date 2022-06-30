import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import { TYPES as ALERT_TYPES } from "ducks/alert/actionTypes";

import announcement_service from "api/services/announcement_service";

export function* postAnnouncement({ payload }: any) {
  try {
    const response = yield call(announcement_service.postAnnouncement, payload);

    yield put({ type: TYPES.LIST_ANNOUNCEMENT_REQUEST });
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "success",
        message: "Success create announcement!",
      },
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "error",
        message: "Failed to create announcement!",
      },
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.POST_ANNOUNCEMENT_REQUEST, postAnnouncement);
}
