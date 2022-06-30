import { all, fork } from "redux-saga/effects";
import listSaga from "./listSaga";
import postSaga from "./postSaga";
import putsaga from "./putSaga";

export default function* overviewSaga() {
  yield all([fork(listSaga), fork(postSaga), fork(putsaga)]);
}
