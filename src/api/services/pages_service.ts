import api from '../index'
import { PAGES } from '../constants'

const page_services = {
    getPages: () => api.get(`${PAGES}`),
    getOnePage: (pageID: string) => api.get(`${PAGES}/${pageID}`),
    addPage: (data: string) => api.post(`/pages/create`, data),
    editPage: (pageID: string, data: any) => api.post(`${PAGES}/editpage/${pageID}`, data)
}

export default page_services;