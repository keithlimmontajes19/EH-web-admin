import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import { TYPES as ALERT_TYPES} from "ducks/alert/actionTypes"
import page_service from "api/services/pages_service";

function filterPageData(data) {
  const { title, details, forms, isPublish, videoURL, imageURL } = data;
  const filteredData = {
    title,
    details,
    isPublish,
    videoURL,
    imageURL,
    forms: forms.map((obj) => (typeof obj === "string" ? obj : obj?._id)),
  };
  return filteredData;
}

export function* addPage({ payload }: any) {
  const { data, callback = () => {} } = payload;
  try {
    const response = yield call(page_service.addPage, filterPageData(data));
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "success",
        message: `${response?.data?.title} successfully created`,
      },
    });

    callback(response?.data);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "error",
        message: `${data?.title} failed to create`,
      },
    });

    callback(false);
    return Promise.reject(error);
  }
}
export function* editPage({ payload }: any) {
  const { data, pageId, callback = () => {} } = payload;

  try {
    const response = yield call(
      page_service.editPage,
      filterPageData(data),
      pageId
    );
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "success",
        message: `${response?.data?.title} successfully updated`,
      },
    });

    callback(response?.data);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "error",
        message: `${data?.title} failed to update`,
      },
    });

    callback(false);
    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.ADD_PAGE_REQUEST, addPage);
  yield takeLatest(TYPES.EDIT_PAGE_REQUEST, editPage);
}
