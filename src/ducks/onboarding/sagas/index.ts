import {all, fork} from 'redux-saga/effects';
import postSaga from './post';

export default function* overviewSaga() {
  yield all([fork(postSaga)]);
}