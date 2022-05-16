import { TYPES } from './actionTypes';

export const getFolders = () => ({
  type: TYPES.LIST_FOLDERS_REQUEST,
});

export const getPages = () => ({
  type: TYPES.LIST_PAGES_REQUEST,
});

export const getOneFolder = (payload: string) => ({
  type: TYPES.GET_ONE_FOLDER_REQUEST,
  payload,
});

export const getPageDetails = (payload: Object) => ({
  type: TYPES.GET_PAGE_DETAILS_REQUEST,
  payload,
});
