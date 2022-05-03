import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "views/private/Home";
import Learn from "views/private/Learn";
import Dashboards from "views/private/Team/Dashboards";
import CreateDashboard from "views/private/Team/Dashboards/CreateDashboard";
import AddBoard from "views/private/Team/Dashboards/AddBoard";
import Pages from "views/private/Pages";

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/learn" component={Learn} />
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
