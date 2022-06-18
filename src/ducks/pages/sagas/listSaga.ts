import { takeLatest, put, call, takeEvery } from "redux-saga/effects";
import { TYPES } from '../actionTypes'
import page_service from 'api/services/pages_service'
import { toast } from "react-toastify";
import { AnyAction } from "redux";

export function* getPages({payload}: any): any {
    const { callback=()=>{} } = payload

    try {
        const response = yield call(page_service.getPages);
        yield put({
            type: TYPES.LIST_PAGE_SUCCESS,
            payload: response?.data,
        })

        callback(response?.data)
        return Promise.resolve(response);
    } catch (error) {
        yield put({
            type: TYPES.LIST_PAGE_FAILED,
        })

        callback(false)
        return Promise.reject(error)
    }
}
export function* getOnePage({payload}: any): any {
    const { pageId, callback=()=>{} } = payload

    try {
        const response = yield call(
            page_service.getOnePage, 
            pageId
        );
        yield put({
            type: TYPES.GET_ONE_PAGE_SUCCESS,
            payload: response?.data,
        })

        callback(response?.data)
        return Promise.resolve(response)
    } catch (error) {
        yield put({
            type: TYPES.GET_ONE_PAGE_FAILED,
        })

        callback(false)
        return Promise.reject(error)
    }
}

export function* addPage(payload: any) {
    try {
        const response = yield call(page_service.addPage, payload.payload);
        yield put({
            type: TYPES.ADD_PAGE_SUCCESS,
            payload: response?.data,
        }
        )
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
export function* editPage({ payload }: AnyAction) {
    try {
        const response = yield call(page_service.editPage,
            {
                title: payload.title,
                details: payload.details,
                forms: payload.forms,
                isPublish: payload.isPublish,
                videoURL: payload.videoURL,
                imageURL: payload.imageURL
            }, payload.pageId);
        yield put({
            type: TYPES.EDIT_PAGE_SUCCESS,
            payload: response?.data
        })
        toast.success(`Page Edited sucessfully`)
        return Promise.resolve(response);
    } catch (error) {

        yield put({
            type: TYPES.EDIT_PAGE_FAILED
        })
        toast.error(error)
        return Promise.reject(error)
    }
}
export function* deletePage(pageId): any {
    try {
        const response = yield call(page_service.deletePage, pageId.pageId);
        yield put({
            type: TYPES.DELETE_PAGE_SUCCESS,
            payload: response?.data
        })
        toast.success("page deleted sucessfully")
        yield put({
            type: TYPES.LIST_PAGE_REQUEST,
            payload: response?.data
        })
        return Promise.resolve(response);
    }
    catch (error) {
        yield put({
            type: TYPES.DELETE_PAGE_FAILED
        })
        return Promise.reject(error)
    }
}


export default function* watcher() {
    yield takeLatest(TYPES.LIST_PAGE_REQUEST, getPages)
    yield takeLatest(TYPES.ADD_PAGE_REQUEST, addPage)
    yield takeEvery(TYPES.EDIT_PAGE_REQUEST, editPage)
    yield takeLatest(TYPES.DELETE_PAGE_REQUEST, deletePage)
    yield takeLatest(TYPES.GET_ONE_PAGE_REQUEST, getOnePage)
}