import api from '../index'
import { ORGANIZATION } from '../constants'

const organization_services = {
    getOrganizations: () => api.get(`${ORGANIZATION}`)
}

export default organization_services