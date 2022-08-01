import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import putSaga from './put';

export default function* overviewSaga() {
  yield all([fork(postSaga), putSaga()]);
}
