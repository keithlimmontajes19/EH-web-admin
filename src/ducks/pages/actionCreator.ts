import { TYPES } from './actionTypes'
import { store } from 'ducks/store'

export const getPages = (payload: any = {}) => store.dispatch({
    type: TYPES.LIST_PAGE_REQUEST,
    payload
});
export const getOnePage = (payload: any) => store.dispatch({
    type: TYPES.GET_ONE_PAGE_REQUEST,
    payload,
})
export const addPage = (payload: any) => store.dispatch({
    type: TYPES.ADD_PAGE_REQUEST,
    payload,
})
export const editPage = (payload: any,) => store.dispatch({
    type: TYPES.EDIT_PAGE_REQUEST,
    payload
})

export const deletePage = (pageId: any) => store.dispatch({
    type: TYPES.DELETE_PAGE_REQUEST,
    pageId,
})

