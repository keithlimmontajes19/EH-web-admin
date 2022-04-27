import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Home from 'views/private/Home';
import Courses from 'views/private/Learn/Courses';
import Learn from 'views/private/Learn/Learn';
import Team from 'views/private/Team/Team';
import Dashboards from 'views/private/Team/Dashboards';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route exact path="/learn" component={Learn} />
      <Route path="/learn/courses/:page?/:subpage?" component={Courses} />
      <Route exact path="/team" component={Team} />
      <Route path="/team/dashboards" component={Dashboards} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Navigation;
