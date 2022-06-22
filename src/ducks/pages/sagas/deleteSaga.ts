import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import page_service from "api/services/pages_service";

export function* deletePage({ payload }: any) {
  const { pageId, callback = () => {} } = payload;

  try {
    const response = yield call(page_service.deletePage, pageId);
    yield put({
      type: TYPES.DELETE_PAGE_SUCCESS,
      payload: response?.data,
    });

    callback(response?.data);
    yield put({
      type: TYPES.LIST_PAGE_REQUEST,
      payload: response?.data,
    });
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.DELETE_PAGE_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.DELETE_PAGE_REQUEST, deletePage);
}
