import form_service from "api/services/form_services";
import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from '../actionTypes'


export function* listforms(): any {
    try {
        const response = yield call(form_service.getForms);
        yield put({
            type: TYPES.GET_ALL_FORM_SUCCESS,
            payload: response?.data,
        });
        return Promise.resolve(response)
    } catch (error) {
        yield put({
            type: TYPES.GET_ALL_FORM_FAILED
        })
        return Promise.reject(error)
    }
}
export function* deleteform(formId): any {
    try {
        const response = yield call(form_service.deleteForm, formId);
        yield put({
            type: TYPES.DELETE_FORM_SUCCESS,
            payload: response?.data,
        })
    } catch (error) {

    }
}


export default function* watcher() {
    yield takeLatest(TYPES.GET_ALL_FORM_REQUEST, listforms)
}