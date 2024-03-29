import { TYPES } from "./actionTypes";
import type { payloadTypes } from "./types";

export const getListOrganization = () => ({
  type: TYPES.LIST_DEPARTMENT_REQUEST,
});

export const getMembersOrganization = (payload: payloadTypes) => ({
  type: TYPES.GET_MEMBERS_REQUEST,
  payload,
});

export const putOrganization = (id: string, payload: payloadTypes) => ({
  type: TYPES.PUT_ORGANIZATION_REQUEST,
  payload: {
    id,
    data: payload,
  },
});

export const deleteOrganization = (id: string) => ({
  type: TYPES.DELETE_ORGANIZATION_REQUEST,
  payload: id,
});

export const postOrganization = (payload: payloadTypes) => ({
  type: TYPES.POST_ORGANIZATION_REQUEST,
  payload,
});

export const clearOrganizationID = () => ({
  type: TYPES.POST_ORGANIZATION_FAILED,
});

export const putMembers = (
  id: string,
  memberId: string,
  payload: payloadTypes
) => ({
  type: TYPES.PUT_ORGANIZATION_MEMBERS_REQUEST,
  payload: {
    id,
    memberId,
    data: payload,
  },
});

export const deleteMembers = (id: string, memberId: string) => ({
  type: TYPES.DELETE_ORGANIZATION_MEMBERS_REQUEST,
  payload: {
    id,
    memberId,
  },
});

export const postMembers = (id, payload: any) => ({
  type: TYPES.POST_ORGANIZATION_MEMBERS_REQUEST,
  payload: {
    id,
    data: payload,
  },
});

export const getOrgDetails = (payload: any) => ({
  type: TYPES.GET_ORGANIZATION_DETAILS_REQUEST,
  payload,
});
