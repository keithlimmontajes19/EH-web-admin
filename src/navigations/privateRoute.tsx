import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "views/private/Home";

import Learn from 'views/private/Learn/Learn';
import Courses from 'views/private/Learn/Courses';
import Lessons from 'views/private/Learn/Lessons';
import Topics from 'views/private/Learn/Topics';
import Quizzes from 'views/private/Learn/Quizzes';

import Dashboards from "views/private/Team/Dashboards";
import CreateDashboard from "views/private/Team/Dashboards/CreateDashboard";
import AddBoard from "views/private/Team/Dashboards/AddBoard";
import Pages from "views/private/Pages";

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />

      <Route exact path="/learn" component={Learn} />
      <Route path="/learn/courses/:page?/:subpage?" component={Courses} />
      <Route path="/learn/lessons/:page?/:subpage?" component={Lessons} />
      <Route path="/learn/topics/:page?/:subpage?" component={Topics} />
      <Route path="/learn/quizzes/:page?/:subpage?/:item?" component={Quizzes} />


      <Route exact path="/team" component={()=><h1>team index view here</h1>} />
      <Route exact path="/team/dashboards" component={Dashboards} />
      <Route
        exact
        path="/team/dashboards/create/addbord"
        component={AddBoard}
      />
      <Route exact path="/team/dashboards/create" component={CreateDashboard} />
      <Route exact path="/team/pages" component={Pages} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Navigation;
