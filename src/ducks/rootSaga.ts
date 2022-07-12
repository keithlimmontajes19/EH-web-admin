import { all } from "redux-saga/effects";

import lmsSaga from "./lms/sagas";
import teamSaga from "./teams/sagas";
import formSaga from "./forms/sagas";
import pageSaga from "./pages/sagas";
import alertSaga from "./alert/sagas";
import authSaga from "./authentication/sagas";
import dashboardSaga from "./dashboard/sagas";
import onboardingSaga from "./onboarding/sagas";
import organizatioSaga from "./organization/sagas";
import announncementSaga from "./announcement/sagas";
import authenticationSaga from "./authentication/sagas";

export default function* rootSaga() {
  yield all([
    lmsSaga(),
    pageSaga(),
    teamSaga(),
    authSaga(),
    formSaga(),
    alertSaga(),
    alertSaga(),
    dashboardSaga(),
    onboardingSaga(),
    organizatioSaga(),
    announncementSaga(),
    authenticationSaga(),
  ]);
}
