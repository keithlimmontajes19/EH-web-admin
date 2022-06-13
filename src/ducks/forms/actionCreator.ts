import { TYPES } from './actionTypes';

export const getForms = () => ({
  type: TYPES.LIST_FORMS_REQUEST,
});

export const getOneForm = (payload) => ({
  type: TYPES.GET_ONE_FORMS_REQUEST,
  payload,
});

export const postForm = (payload) => ({
  type: TYPES.POST_FORMS_REQUEST,
  payload,
});

export const putForm = (id, payload) => ({
  type: TYPES.PUT_FORMS_REQUEST,
  payload: {
    id,
    payload,
  },
});

export const deleteForm = (payload) => ({
  type: TYPES.DELETE_FORMS_REQUEST,
  payload,
});
