import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Login from 'views/public/Login';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Navigation;
