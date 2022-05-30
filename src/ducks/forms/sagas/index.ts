import { all, fork } from 'redux-saga/effects'
import listSaga from './listSagas'

export default function* overviewSaga() {
    yield all([fork(listSaga)])
}