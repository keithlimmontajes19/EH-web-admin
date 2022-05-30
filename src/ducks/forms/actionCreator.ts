import { store } from 'ducks/store'
import { TYPES } from './actionTypes'

export const getAllfroms = () => store.dispatch({
    type: TYPES.GET_ALL_FORM_REQUEST,
})
export const getOneform = () => store.dispatch({
    type: TYPES.GET_ONE_FORM_REQUEST,
})
export const createForm = (payload: any) => store.dispatch({
    type: TYPES.CREATE_FORM_REQUEST,
    payload
})

export const deleteForm = (id: any) => store.dispatch({
    type: TYPES.DELETE_FORM_REQUEST,
    id
})

export const editForm = (payload: any) => store.dispatch({
    type: TYPES.EDIT_FORM_REQUEST,
    payload
})