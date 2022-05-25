import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';
import announcement_service from 'api/services/announcement_service';
import organization_services from 'api/services/organizations_service';
import { toast } from 'react-toastify';


export function* listAnnouncement(): any {
  try {
    const response = yield call(announcement_service.getAnnouncement);
    yield put({
      type: TYPES.LIST_ANNOUNCEMENT_SUCCESS,
      payload: response?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.LIST_ANNOUNCEMENT_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* listAnnouncements() {
  try {
    const response = yield call(announcement_service.getAllAnnouncement);
    yield put({
      type: TYPES.LIST_ANNOUNCEMENTS_SUCCESS,
      payload: response?.data,
    })
    return Promise.resolve(response)
  } catch (error) {
    yield put({
      type: TYPES.LIST_ANNOUNCEMENTS_FAILED
    })
    return Promise.reject(error)
  }
}

export function* createAnnoucement(payload: any) {
  try {
    const response = yield call(announcement_service.createAnnoucement, payload.payload)
    yield put({
      type: TYPES.CREATE_ANNOUNCEMENTS_SUCCESS,
      payload: response?.data,
    })
    toast.success("anncoucemnent created!!")
    return Promise.resolve(response)
  } catch (error) {
    yield put({
      type: TYPES.CREATE_ANNOUNCEMENTS_FAILED
    })
    return Promise.reject(error)
  }
}

export function* listOrganizations() {
  try {
    const response = yield call(organization_services.getOrganizations);
    yield put({
      type: TYPES.LIST_ORGANIZATIONS_SUCCESS,
      payload: response?.data
    })
    return Promise.resolve(response)
  } catch (error) {
    yield put({
      type: TYPES.LIST_ORGANIZATIONS_FAILED
    })
    return Promise.reject(error)
  }
}


export default function* watcher() {
  yield takeLatest(TYPES.LIST_ANNOUNCEMENT_REQUEST, listAnnouncement);
  yield takeLatest(TYPES.LIST_ANNOUNCEMENTS_REQUEST, listAnnouncements);
  yield takeLatest(TYPES.LIST_ORGANIZATIONS_REQUEST, listOrganizations);
  yield takeLatest(TYPES.CREATE_ANNOUNCEMENTS_REQUEST, createAnnoucement)
}
