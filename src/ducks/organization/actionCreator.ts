import { TYPES } from './actionTypes';

export const getListOrganization = () => ({
  type: TYPES.LIST_DEPARTMENT_REQUEST,
});

export const getMembersOrganization = (payload: string) => ({
  type: TYPES.GET_MEMBERS_REQUEST,
  payload,
});
