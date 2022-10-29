import { TYPES } from './actionTypes';

export const getForms = () => ({
  type: TYPES.LIST_FORMS_REQUEST,
});

export const getOneForm = (payload) => ({
  type: TYPES.GET_ONE_FORMS_REQUEST,
  payload,
});

export const postForm = (payload, callback) => ({
  type: TYPES.POST_FORMS_REQUEST,
  payload: {
    data: payload,
    callback,
  },
});

export const putForm = (id, data, callback) => ({
  type: TYPES.PUT_FORMS_REQUEST,
  payload: {
    id,
    data,
    callback,
  },
});

export const deleteForm = (payload) => ({
  type: TYPES.DELETE_FORMS_REQUEST,
  payload,
});

export const getAllResults = () => ({
  type: TYPES.GET_ALL_RESULTS_REQUEST,
});
