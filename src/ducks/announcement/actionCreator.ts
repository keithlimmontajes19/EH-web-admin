import { store } from 'ducks/store';
import { TYPE } from 'react-toastify/dist/utils';
import { TYPES } from './actionTypes';

export const getAnnouncements = () => store.dispatch({
  type: TYPES.LIST_ANNOUNCEMENT_REQUEST,
});
export const getAllAnnouncement = () => store.dispatch({
  type: TYPES.LIST_ANNOUNCEMENTS_REQUEST
})
export const getAllOrganizations = () => store.dispatch({
  type: TYPES.LIST_ORGANIZATIONS_REQUEST
})

export const createAnnoucement = (payload: any) => store.dispatch({
  type: TYPES.CREATE_ANNOUNCEMENTS_REQUEST,
  payload
})
export const deleteAnnouncemnet = (id: any) => store.dispatch({
  type: TYPES.DELETE_ANNOUNCEMENT_REQUEST,
  id
})
export const editAnnoucement = (payload: any) => store.dispatch({
  type: TYPES.EDIT_ANNOUNCEMENT_REQUEST,
  payload
})