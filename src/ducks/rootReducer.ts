import {combineReducers} from 'redux';

import lms from './lms/reducer';
import team from './teams/reducer';
import alert from './alert/reducer';
import dashboard from './dashboard/reducer';
import onboarding from './onboarding/reducer';
import announcement from './announcement/reducer';
import authentication from './authentication/reducer';

const rootReducer = combineReducers({
  lms,
  team,
  alert,
  dashboard,
  onboarding,
  announcement,
  authentication,
});

export default rootReducer;
