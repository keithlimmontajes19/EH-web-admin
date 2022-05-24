import { store } from 'ducks/store';
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