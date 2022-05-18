import { TYPES } from './actionTypes'

export const getPages = () => ({
    type: TYPES.LIST_PAGE_REQUEST,
});
export const getOnePage = (payload: string) => ({
    type: TYPES.GET_ONE_PAGE_REQUEST,
    payload,
})
export const addPage = (payload: any) => ({
    type: TYPES.ADD_PAGE_REQUEST,
    payload,
})
export const editPage = (payload: string) => ({
    type: TYPES.EDIT_PAGE_REQUEST,
    payload
})