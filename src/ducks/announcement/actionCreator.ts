import { TYPES } from "./actionTypes";

export const getAnnouncements = () => ({
  type: TYPES.LIST_ANNOUNCEMENT_REQUEST,
});

export const postAnnouncements = (payload) => ({
  type: TYPES.POST_ANNOUNCEMENT_REQUEST,
  payload,
});

export const getOrganizations = () => ({
  type: TYPES.GET_ORGANIZATIONS_REQUEST,
});

export const putAnnouncements = (id, data) => ({
  type: TYPES.PUT_ANNOUNCEMENT_REQUEST,
  payload: {
    id,
    data,
  },
});

export const deleteAnnouncements = (payload) => ({
  type: TYPES.DELETE_ANNOUNCEMENT_REQUEST,
  payload,
});
