import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import { TYPES as ALERT_TYPES } from "ducks/alert/actionTypes";

import announcement_service from "api/services/announcement_service";

export function* putAnnouncement({ payload }: any) {
  try {
    const response = yield call(
      announcement_service.putAnnouncement,
      payload?.id,
      payload?.data
    );

    yield put({ type: TYPES.LIST_ANNOUNCEMENT_REQUEST });
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "success",
        message: "Success edit announcement!",
      },
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "error",
        message: "Failed to edit announcement!",
      },
    });

    return Promise.reject(error);
  }
}

export function* deleteAnnouncement({ payload }: any) {
  try {
    const response = yield call(
      announcement_service.deleteAnnouncement,
      payload
    );

    yield put({ type: TYPES.LIST_ANNOUNCEMENT_REQUEST });
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "success",
        message: "Success delete announcement!",
      },
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "error",
        message: "Failed to delete announcement!",
      },
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.PUT_ANNOUNCEMENT_REQUEST, putAnnouncement);
  yield takeLatest(TYPES.DELETE_ANNOUNCEMENT_REQUEST, deleteAnnouncement);
}
