import { all, fork } from "redux-saga/effects";
import postSaga from "./post";
import listSaga from "./list";

export default function* overviewSaga() {
  yield all([fork(postSaga), fork(listSaga)]);
}
