import { all, fork } from "redux-saga/effects";
import putSaga from "./putSaga";
import postSaga from "./postSaga";
import listSaga from "./listSaga";

export default function* overviewSaga() {
  yield all([fork(postSaga), fork(putSaga), fork(listSaga)]);
}
