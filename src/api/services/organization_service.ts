import api from '../index';
import { ORGANIZATION } from '../constants';

const organization_services = {
  getListOrganization: () => api.get(`${ORGANIZATION}`),
  getMembersOrganization: (orgId: string) =>
    api.get(`${ORGANIZATION}/${orgId}/members`),
};

export default organization_services;
