import { all, fork } from 'redux-saga/effects';
import saga from './sagas';

export default function* overviewSaga() {
  yield all([fork(saga)]);
}