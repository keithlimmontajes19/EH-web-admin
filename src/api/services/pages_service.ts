import api from '../index'
import { PAGES } from '../constants'

const page_services = {
    getPages: () => api.get(`${PAGES}`),
    getOnePage: (pageID: string) => api.get(`${PAGES}/${pageID}`),
    addPage: (data: string) => api.post(`/pages/create`, data),
    editPage: (payload, pageId: string) => api.put(`${PAGES}/edit/${pageId}`, payload),
    deletePage: (pageId: string) => api.delete(`/pages/delete/${pageId}`)
}

export default page_services;