import { TYPES } from "./actionTypes";
import { store } from "ducks/store";

export const getPages = (payload: any = {}) => ({
  type: TYPES.LIST_PAGE_REQUEST,
  payload,
});
export const getOnePage = (payload: any) => ({
  type: TYPES.GET_ONE_PAGE_REQUEST,
  payload,
});
export const postPage = (payload: any) => ({
  type: TYPES.ADD_PAGE_REQUEST,
  payload,
});
export const updatePage = (payload: any) => ({
  type: TYPES.EDIT_PAGE_REQUEST,
  payload,
});

export const deletePage = (payload: any) => ({
  type: TYPES.DELETE_PAGE_REQUEST,
  payload,
});
