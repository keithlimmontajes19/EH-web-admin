import api from "api/index";
import { HOME, ONBOARDING_ALL } from "api/constants";

const onboarding_service = {
  getAll: () => api.get(ONBOARDING_ALL),
  postOnboardingYou: (params) => api.post(`${HOME}/onboarding-website`, params),
  postCreativeProvider: (params) =>
    api.post(`${HOME}/onboarding-creative`, params),

  publishOnboading: () => api.patch(`${ONBOARDING_ALL}/publish`),
  deleteOnboading: (id: string) => api.delete(`${ONBOARDING_ALL}/delete/${id}`),
  editOnboading: (id: string, payload: any) =>
    api.put(`${ONBOARDING_ALL}/edit/${id}`, payload),
};

export default onboarding_service;
