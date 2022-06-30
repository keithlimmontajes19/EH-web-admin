import {all} from 'redux-saga/effects';

import lmsSaga from './lms/sagas';
import teamSaga from './teams/sagas';
import alertSaga from './alert/sagas';
import formSaga from './forms/sagas';
import dashboardSaga from './dashboard/sagas';
import pageSaga from './pages/sagas';
import authSaga from './authentication/sagas';
import onboardingSaga from './onboarding/sagas';
import announncementSaga from './announcement/sagas';
import authenticationSaga from './authentication/sagas';

export default function* rootSaga() {
  yield all([
    lmsSaga(),
    teamSaga(),
    authSaga(),
    formSaga(),
    alertSaga(),
    alertSaga(),
    dashboardSaga(),
    pageSaga(),
    onboardingSaga(),
    announncementSaga(),
    authenticationSaga(),
  ]);
}