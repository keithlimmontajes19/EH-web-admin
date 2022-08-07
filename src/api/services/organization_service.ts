import api from "../index";
import { ORGANIZATION } from "../constants";

interface payloadTypes {
  name?: string;
  description?: string;
}

const organization_services = {
  getListOrganization: () => api.get(`${ORGANIZATION}`),

  getMembersOrganization: (orgId: string) =>
    api.get(`${ORGANIZATION}/${orgId}/members`),

  postOrganization: (payload: payloadTypes) =>
    api.post(`${ORGANIZATION}`, payload),

  putOrganization: (orgId: string, payload: payloadTypes) =>
    api.put(`${ORGANIZATION}/${orgId}`, payload),

  deleteOrganization: (orgId: string) => api.delete(`${ORGANIZATION}/${orgId}`),

  patchAvatarOrganization: (orgId: string) =>
    api.patch(`${ORGANIZATION}/${orgId}/avatar`),
};

export default organization_services;
