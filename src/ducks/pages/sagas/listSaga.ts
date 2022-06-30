import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import page_service from "api/services/pages_service";

export function* getPages({ payload }: any): any {
  const { callback = () => {} } = payload;

  try {
    const response = yield call(page_service.getPages);
    yield put({
      type: TYPES.LIST_PAGE_SUCCESS,
      payload: response?.data,
    });

    callback(response?.data);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.LIST_PAGE_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}
export function* getOnePage({ payload }: any): any {
  const { pageId, callback = () => {} } = payload;

  try {
    const response = yield call(page_service.getOnePage, pageId);
    yield put({
      type: TYPES.GET_ONE_PAGE_SUCCESS,
      payload: response?.data[0],
    });

    callback(response?.data[0]);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_ONE_PAGE_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.LIST_PAGE_REQUEST, getPages);
  yield takeLatest(TYPES.GET_ONE_PAGE_REQUEST, getOnePage);
}
