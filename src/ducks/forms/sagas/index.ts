import { all, fork } from 'redux-saga/effects';

import putSaga from './putSaga';
import listSaga from './listSaga';
import postSaga from './postSaga';
import deleteSaga from './deleteSaga';

export default function* overviewSaga() {
  yield all([fork(listSaga), fork(postSaga), fork(putSaga), fork(deleteSaga)]);
}
