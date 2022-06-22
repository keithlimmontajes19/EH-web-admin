import api from '../index'
import { PAGES } from '../constants'

const page_services = {
    getPages: () => api.get(`${PAGES}`),
    getOnePage: (pageID: string) => api.get(`${PAGES}/${pageID}`),
    addPage: (data: any) => api.post(`/pages/create`, data),
    editPage: (data: any, pageId: string) => api.put(`${PAGES}/edit/${pageId}`, data),
    deletePage: (pageId: string) => api.delete(`/pages/delete/${pageId}`)
}

export default page_services;