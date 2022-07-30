import {takeLatest, put, call} from 'redux-saga/effects';
import {TYPES} from '../actionTypes';

import rewards_service from 'api/services/rewards_service';

export function* listLeaderboard(): any {
  try {
    const response = yield call(rewards_service.getLeaderBoard);
    yield put({
      type: TYPES.GET_LEADERBOARDS_SUCCESS,
      payload: response?.data?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_LEADERBOARDS_FAILED,
    });

    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.GET_LEADERBOARDS_REQUEST, listLeaderboard);
}
