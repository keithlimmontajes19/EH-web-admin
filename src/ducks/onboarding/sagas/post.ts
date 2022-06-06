import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import { TYPES as ALERT_TYPES } from "ducks/alert/actionTypes";

import onboarding_serive from "api/services/onboaring_service";

export function* postOnboardingYou({ payload }: never) {
  try {
    const response = yield call(onboarding_serive.postOnboardingYou, payload);

    if (response.data.code === 110) {
      yield put({
        type: TYPES.POST_ONBOARDING_YOU_FAILED,
        payload: response.data.data,
      });
    } else {
      yield put({
        type: TYPES.POST_ONBOARDING_YOU_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (e) {
    yield put({
      type: TYPES.POST_ONBOARDING_YOU_FAILED,
      payload: e.response.data,
    });
  }
}

export function* postCreativeProvider({ payload }: never) {
  try {
    const response = yield call(
      onboarding_serive.postCreativeProvider,
      payload
    );

    if (response.data.code === 110) {
      yield put({ type: TYPES.POST_CREATIVE_PROVIDER_SUCCESS });
    } else {
      yield put({ type: TYPES.POST_CREATIVE_PROVIDER_FAILED });
    }
  } catch (e) {
    yield put({
      type: TYPES.POST_ONBOARDING_YOU_FAILED,
      payload: e.response.data,
    });
  }
}

export function* deleteOnboarding({ payload }: never) {
  try {
    yield call(onboarding_serive.deleteOnboading, payload);
  } catch (e) {
    return e;
  }
}

export function* editOnboarding({ payload }: any) {
  try {
    yield call(onboarding_serive.editOnboading, payload?.id, payload?.values);
  } catch (e) {
    yield put({
      type: TYPES.POST_ONBOARDING_YOU_FAILED,
    });
  }
}

export function* postOnboarding({ payload }: any) {
  try {
    yield call(onboarding_serive.postOnboarding, payload);
  } catch (e) {
    yield put({
      type: TYPES.POST_ONBOARDING_FAILED,
    });
  }
}

export function* publishOnboarding({ payload }: any) {
  const data = [];

  payload.map((item, index) =>
    data.push({ id: item, isPublish: true, position: index + 1 })
  );

  try {
    yield call(onboarding_serive.publishOnboading, {
      onboarding: data,
    });

    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "success",
        message: "Published Success!",
      },
    });
  } catch (e) {
    yield put({
      type: ALERT_TYPES.ALERT_NOTIFICATION_REQUEST,
      payload: {
        onShow: true,
        type: "error",
        message: "Published failed!",
      },
    });
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.EDIT_ONBOARDING_REQUEST, editOnboarding);
  yield takeLatest(TYPES.POST_ONBOARDING_REQUEST, postOnboarding);
  yield takeLatest(TYPES.DELETE_ONBOARDING_REQUEST, deleteOnboarding);
  yield takeLatest(TYPES.PUBLISH_ONBOARDING_REQUEST, publishOnboarding);
  yield takeLatest(TYPES.POST_ONBOARDING_YOU_REQUEST, postOnboardingYou);
  yield takeLatest(TYPES.POST_CREATIVE_PROVIDER_REQUEST, postCreativeProvider);
}
