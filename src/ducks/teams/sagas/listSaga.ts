import {takeLatest, put, call} from 'redux-saga/effects';
import {TYPES} from '../actionTypes';

import team_service from 'api/services/team_service';

export function* listFolders(): any {
  try {
    const response = yield call(team_service.getFolders);
    yield put({
      type: TYPES.LIST_FOLDERS_SUCCESS,
      payload: response?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.LIST_FOLDERS_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* listPages(): any {
  try {
    const response = yield call(team_service.getPages);
    yield put({
      type: TYPES.LIST_PAGES_SUCCESS,
      payload: response?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.LIST_PAGES_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getOneFolder({payload}: any): any {
  yield put({
    type: TYPES.GET_ONE_FOLDER_SUCCESS,
    payload: payload,
  });
}

export function* getPageDetails({payload}: any): any {
  yield put({
    type: TYPES.GET_PAGE_DETAILS_SUCCESS,
    payload,
  });
}

export default function* watcher() {
  yield takeLatest(TYPES.LIST_FOLDERS_REQUEST, listFolders);
  yield takeLatest(TYPES.LIST_PAGES_REQUEST, listPages);
  yield takeLatest(TYPES.GET_ONE_FOLDER_REQUEST, getOneFolder);
  yield takeLatest(TYPES.GET_PAGE_DETAILS_REQUEST, getPageDetails);
}
