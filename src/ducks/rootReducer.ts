import { combineReducers } from 'redux';

import lms from './lms/reducer';
import team from './teams/reducer';
import alert from './alert/reducer';
import forms from './forms/reducer';
import pages from './pages/reducer';
import rewards from './leaderboard/reducer';
import dashboard from './dashboard/reducer';
import onboarding from './onboarding/reducer';
import organization from './organization/reducer';
import announcement from './announcement/reducer';
import authentication from './authentication/reducer';
const rootReducer = combineReducers({
  lms,
  team,
  forms,
  alert,
  pages,
  rewards,
  dashboard,
  onboarding,
  organization,
  announcement,
  authentication,
});

export default rootReducer;
