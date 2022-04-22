import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Home from 'views/private/Home';
import Learn from 'views/private/Learn';
import Dashboards from 'views/private/Team/Dashboards';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/learn" component={Learn} />
      <Route path="/team/dashboards" component={Dashboards} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Navigation;
