import api from '../index';
import { ORGANIZATION } from '../constants';

interface payloadTypes {
  name?: string;
  description?: string;
}

const organization_services = {
  getListOrganization: () => api.get(`${ORGANIZATION}`),

  getUserOrganization: (userId: string) =>
    api.get(`/users/${userId}/organizations`),

  postOrganization: (payload: payloadTypes) =>
    api.post(`${ORGANIZATION}`, payload),

  putOrganization: (orgId: string, payload: payloadTypes) =>
    api.patch(`${ORGANIZATION}/${orgId}`, payload),

  deleteOrganization: (orgId: string) => api.delete(`${ORGANIZATION}/${orgId}`),

  patchAvatarOrganization: (orgId: string) =>
    api.put(`${ORGANIZATION}/${orgId}/avatar`),

  getMembersOrganization: (orgId: string) =>
    api.get(`${ORGANIZATION}/${orgId}/members`),

  postMembers: (orgId: string, payload: any) =>
    api.post(`${ORGANIZATION}/${orgId}/members`, payload),

  putMembers: (orgId: string, memberId: string, payload: any) =>
    api.patch(`${ORGANIZATION}/${orgId}/members/${memberId}`, payload),

  deleteMembers: (orgId: string, memberId: string) =>
    api.delete(`${ORGANIZATION}/${orgId}/members/${memberId}`),
};

export default organization_services;
