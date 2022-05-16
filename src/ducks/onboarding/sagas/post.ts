import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';
import onboarding_serive from 'api/services/onboaring_service';

export function* postOnboarding({ payload }: never) {
  try {
    const response = yield call(onboarding_serive.postOnboardingYou, payload);

    if (response.data.code === 110) {
      yield put({ type: TYPES.POST_ONBOARDING_YOU_FAILED, payload: response.data.data });
    } else {
      yield put({ type: TYPES.POST_ONBOARDING_YOU_SUCCESS, payload: response.data.data });
    }

  } catch (e) {
    yield put({ type: TYPES.POST_ONBOARDING_YOU_FAILED, payload: e.response.data });
  }
}

export function* postCreativeProvider({ payload }: never) {
  try {
    const response = yield call(onboarding_serive.postCreativeProvider, payload);

    if (response.data.code === 110) {
      yield put({ type: TYPES.POST_CREATIVE_PROVIDER_SUCCESS });
    } else {
      yield put({ type: TYPES.POST_CREATIVE_PROVIDER_FAILED });
    }

  } catch (e) {
    yield put({ type: TYPES.POST_ONBOARDING_YOU_FAILED, payload: e.response.data });
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.POST_ONBOARDING_YOU_REQUEST, postOnboarding);
  yield takeLatest(TYPES.POST_CREATIVE_PROVIDER_REQUEST, postCreativeProvider);
}