import api from '../index'
import { FORMS } from '../constants'

const form_service = {
    getForms: () => api.get(`${FORMS}`),
    getOneForm: (formId: string) => api.get(`${FORMS}/${formId}`),
    addForm: (data) => api.post(`/${FORMS}/create`, data),
    editForm: (data, formId) => api.put(`${FORMS}/edit/${formId}`),
    deleteForm: (formId) => api.delete(`${FORMS}/delete/${formId}`)
}

export default form_service;