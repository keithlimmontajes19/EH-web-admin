import { all, fork } from 'redux-saga/effects';
import listSaga from './listSaga';

export default function* overviewSaga() {
  yield all([fork(listSaga)]);
}
