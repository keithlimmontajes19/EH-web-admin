import api from '../index'
import { PAGES } from '../constants'

const page_services = {
    getPages: () => api.get(`${PAGES}`),
    getOnePage: (pageID: string) => api.get(`${PAGES}/${pageID}`),
    addPage: (data: string) => api.post(`/pages/create`, data),
    editPage: (payload) => api.post(`${PAGES}/editpage/${payload.pageId}`, payload),
    deletePage: (pageId: string) => api.delete(`/pages/delete/${pageId}`)
}

export default page_services;