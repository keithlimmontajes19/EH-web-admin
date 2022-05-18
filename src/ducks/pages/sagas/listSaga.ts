import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from '../actionTypes'

import page_service from 'api/services/pages_service'

export function* listPages(): any {
    try {
        const response = yield call(page_service.getPages);
        yield put({
            type: TYPES.LIST_PAGE_SUCCESS,
            payload: response?.data,
        })
    } catch (error) {
        yield put({
            type: TYPES.LIST_PAGE_FAILED,
        })
        return Promise.reject(error)
    }
}

export function* addPage(payload: any): any {
    try {
        const response = yield call(page_service.addPage, payload);
        yield put({
            type: TYPES.ADD_PAGE_SUCCESS,
            payload: response?.data,
        })

    } catch (error) {
        yield put({
            type: TYPES.ADD_PAGE_FAILED,
        })
        return Promise.reject(error)
    }

}
// export function* editPage({ payload, pageID }: never) {
//     try {
//         const response = yield call(page_service.editPage, { payload, pageID });

//     } catch (error) {

//     }
// }

export default function* watcher() {
    yield takeLatest(TYPES.LIST_PAGE_REQUEST, listPages)
    yield takeLatest(TYPES.ADD_PAGE_REQUEST, addPage)
    // yield takeLatest(TYPES.EDIT_PAGE_REQUEST, editPage)
}