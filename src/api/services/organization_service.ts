import api from "../index";
import { ORGANIZATION } from "../constants";

const organization_services = {
  getListOrganization: () => api.get(`${ORGANIZATION}`),
};

export default organization_services;
