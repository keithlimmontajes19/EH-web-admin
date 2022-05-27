import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';
import announcement_service from 'api/services/announcement_service';
import organization_services from 'api/services/organizations_service';
import { toast } from 'react-toastify';
import { AnyAction } from 'redux';


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
    const response = yield call(announcement_service.createAnnouncement, payload.payload)
    yield put({
      type: TYPES.CREATE_ANNOUNCEMENTS_SUCCESS,
      payload: response?.data,
    })

    if (payload.payload.isPublish) {
      toast.success("annoucement publish successfully")
    }
    else {
      toast.success("anncoucemnent created!!")
    }
    yield put({
      type: TYPES.LIST_ANNOUNCEMENTS_REQUEST,
      payload: response?.data,
    })
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

export function* deleteAnnouncement(id: any) {
  console.log(id.id, "id")
  try {
    const response = yield call(announcement_service.deleteAnnouncemnet, id.id);
    yield put({
      type: TYPES.DELETE_ANNOUNCEMENT_SUCCESS,
      payload: response?.data
    })
    toast.success("announcemnet deleted Successfully")
    yield put({
      type: TYPES.LIST_ANNOUNCEMENTS_REQUEST,
      payload: response?.data
    })
    return Promise.resolve(response)
  } catch (error) {
    yield put({
      type: TYPES.DELETE_ANNOUNCEMENT_FAILED
    })
    return Promise.resolve(error)
  }
}

export function* editAnnoucement({ payload }: AnyAction) {
  try {
    const response = yield call(announcement_service.editAnnouncement, {
      title: payload.title,
      description: payload.description,
      organization: payload.organization,
      startDate: payload.startDate,
      endDate: payload.endDate,
      status: payload.status,
      isPublish: payload.isPublish,
      videoURL: payload.videoURL,
      imageURL: payload.imageURL
    }, payload.id)
    yield put({
      type: TYPES.EDIT_ANNOUNCEMENT_SUCCESS,
      payload: response?.data
    })
    if (payload.isPublish) {
      toast.success("annoucement publish successfully")
    }
    else {
      toast.success("announcement edited successfully")
    }
    yield put({
      type: TYPES.LIST_ANNOUNCEMENTS_REQUEST,
      payload: response?.data
    })
    return Promise.resolve(response)
  } catch (error) {
    yield put({
      type: TYPES.EDIT_ANNOUNCEMENT_FAILED,
    })
    return Promise.resolve(error)
  }
}


export default function* watcher() {
  yield takeLatest(TYPES.LIST_ANNOUNCEMENT_REQUEST, listAnnouncement);
  yield takeLatest(TYPES.LIST_ANNOUNCEMENTS_REQUEST, listAnnouncements);
  yield takeLatest(TYPES.LIST_ORGANIZATIONS_REQUEST, listOrganizations);
  yield takeLatest(TYPES.CREATE_ANNOUNCEMENTS_REQUEST, createAnnoucement);
  yield takeLatest(TYPES.DELETE_ANNOUNCEMENT_REQUEST, deleteAnnouncement);
  yield takeEvery(TYPES.EDIT_ANNOUNCEMENT_REQUEST, editAnnoucement)
}
