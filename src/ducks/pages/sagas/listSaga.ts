import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from '../actionTypes'
import page_service from 'api/services/pages_service'
import { toast } from "react-toastify";

export function* listPages(): any {
    try {
        const response = yield call(page_service.getPages);
        yield put({
            type: TYPES.LIST_PAGE_SUCCESS,
            payload: response?.data,
        })
        return Promise.resolve(response);
    } catch (error) {
        yield put({
            type: TYPES.LIST_PAGE_FAILED,
        })
        return Promise.reject(error)
    }
}
export function* getOnepage(payload): any {
    try {
        const resoponse = yield call(page_service.getOnePage, payload);
        yield put({
            type: TYPES.GET_ONE_PAGE_SUCCESS,
            payload: resoponse?.data,
        })
        return Promise.resolve(resoponse)
    } catch (error) {
        yield put({
            type: TYPES.GET_ONE_PAGE_FAILED,
        })
        return Promise.reject(error)
    }
}

export function* addPage({ payload }: any) {
    try {
        const response = yield call(page_service.addPage, payload);
        yield put({
            type: TYPES.ADD_PAGE_SUCCESS,
            payload: response?.data,
        })
        toast.success("Page Added Successfully")
        return Promise.resolve(response);
    } catch (error) {
        yield put({
            type: TYPES.ADD_PAGE_FAILED,
        })
        toast.error("Failed to page add")
        return Promise.reject(error)
    }

}
export function* editPage(payload): any {
    try {
        const response = yield call(page_service.editPage, payload);
        yield put({
            type: TYPES.EDIT_PAGE_SUCCESS,
            payload: response?.data
        })
        toast.error("page Edited sucessfully")
        return Promise.resolve(response);
    } catch (error) {
        toast.error(error)
        return Promise.reject(error)
    }
}
export function* deletePage(pageId): any {
    try {
        const response = yield call(page_service.deletePage, pageId);
        yield put({
            type: TYPES.DELETE_PAGE_SUCCESS,
            payload: response?.data
        })
        return Promise.resolve(response);
    }
    catch (error) {
        return Promise.reject(error)
    }
}


export default function* watcher() {
    yield takeLatest(TYPES.LIST_PAGE_REQUEST, listPages)
    yield takeLatest(TYPES.ADD_PAGE_REQUEST, addPage)
    yield takeLatest(TYPES.EDIT_PAGE_REQUEST, editPage)
    yield takeLatest(TYPES.DELETE_PAGE_REQUEST, deletePage)
    yield takeLatest(TYPES.GET_ONE_PAGE_REQUEST, getOnepage)
}