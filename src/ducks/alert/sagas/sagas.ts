import { takeLatest, put } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';


export function* postAlert({ payload }: never) {
  yield put({
    type: TYPES.ALERT_NOTIFICATION_SUCCESS, payload
  })
}

export default function* watcher() {
  yield takeLatest(TYPES.ALERT_NOTIFICATION_REQUEST, postAlert);
}