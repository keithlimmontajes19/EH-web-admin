import form_service from "api/services/form_services";
import { toast } from "react-toastify";
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
        const response = yield call(form_service.deleteForm, formId.id);
        yield put({
            type: TYPES.DELETE_FORM_SUCCESS,
            payload: response?.data,
        })
        yield put({
            type: TYPES.GET_ALL_FORM_REQUEST,
        })
        toast.success("form deleted successfully")
        return Promise.resolve(response)
    } catch (error) {
        yield put({
            type: TYPES.DELETE_FORM_FAILED
        })
        toast.error("failed to delete form")
        return Promise.reject(error)
    }
}

export function* createForm(payload: any) {
    try {
        const response = yield call(form_service.addForm, payload.payload);
        yield put({
            type: TYPES.CREATE_FORM_SUCCESS,
            payload: response?.data
        })
        yield put({
            type: TYPES.GET_ALL_FORM_REQUEST,
        })
        toast.success("form added successfully")
        return Promise.resolve(response)
    } catch (error) {
        yield put({
            type: TYPES.CREATE_FORM_FAILED,
        })
        toast.error("failed to add form")
        return Promise.reject(error)
    }
}


export default function* watcher() {
    yield takeLatest(TYPES.GET_ALL_FORM_REQUEST, listforms)
    yield takeLatest(TYPES.DELETE_FORM_REQUEST, deleteform)
    yield takeLatest(TYPES.CREATE_FORM_REQUEST, createForm)
}