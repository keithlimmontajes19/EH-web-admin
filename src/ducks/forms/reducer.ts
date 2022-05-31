
import { TYPES } from './actionTypes'
const INITIAL_STATE = {
    data: [],
    loading: false,
    error: false,
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        /**
     * ================
     * Announcement reducer
     * ================
     * **/

        case TYPES.GET_ALL_FORM_REQUEST:
            return {
                ...state,
                data: [],
                loading: true,
                error: false,
            }
                ;
        case TYPES.GET_ALL_FORM_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false,
            }

        case TYPES.GET_ALL_FORM_FAILED:
            return {
                ...state,
                data: [],
                loading: false,
                error: true,
            }
        case TYPES.GET_ONE_FORM_REQUEST:
            return {
                ...state,
                data: [],
                loading: true,
                error: false,
            }
        case TYPES.GET_ALL_FORM_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false,
            }
        case TYPES.GET_ONE_FORM_FAILED:
            return {
                ...state,
                data: [],
                loading: false,
                error: true
            }
        case TYPES.DELETE_FORM_REQUEST:
            return {
                ...state,
                loading: true,
                error: true

            }
        case TYPES.DELETE_FORM_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            }
        case TYPES.DELETE_FORM_FAILED:
            return {
                ...state,
                loading: false,
                error: false
            }
        default:
            return { ...state }
    }
}

export default reducer;