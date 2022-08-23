import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from 'views/public/Login';
import EnterOTP from 'views/public/EnterOtpScreen';
import ForgotPassword from 'views/public/ForgotScreen';
import ResetPassword from 'views/public/ResetPasswordScreen';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/otp" component={EnterOTP} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Navigation;
