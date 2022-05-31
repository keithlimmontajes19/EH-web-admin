import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";
import onboarding_serive from "api/services/onboaring_service";

export function* getOnboardingList() {
  try {
    const response = yield call(onboarding_serive.getAll);
    yield put({
      type: TYPES.GET_ONBOARDING_LIST_SUCCESS,
      payload: response?.data,
    });
  } catch (e) {
    yield put({ type: TYPES.GET_ONBOARDING_LIST_FAILED });
  }
}

export function* getOneOnboarding({ payload }: never) {
  yield put({
    type: TYPES.GET_ONE_ONBOARDING_SUCCESS,
    payload,
  });
}

export default function* watcher() {
  yield takeLatest(TYPES.GET_ONBOARDING_LIST_REQUEST, getOnboardingList);
  yield takeLatest(TYPES.GET_ONE_ONBOARDING_REQUEST, getOnboardingList);
}
