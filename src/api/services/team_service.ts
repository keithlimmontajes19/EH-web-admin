import api from '../index';
import {PAGES, FOLDERS} from '../constants';

const auth_services = {
  getFolders: () => api.get(`${FOLDERS}`),
  getOneFolder: (folderID: string) => api.get(`${FOLDERS}/${folderID}`),
  getPages: () => api.get(`${PAGES}`),
  getOnePage: (pageID: string) => api.get(`${PAGES}/${pageID}`),
};

export default auth_services;
