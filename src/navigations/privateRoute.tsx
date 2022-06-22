import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "views/private/Home";
import Learn from "views/private/Learn/Learn";
import Topics from "views/private/Learn/Topics";
import Courses from "views/private/Learn/Courses";
import Lessons from "views/private/Learn/Lessons";
import Quizzes from "views/private/Learn/Quizzes";

import Forms from "compositions/Forms";
import Pages from "views/private/Team/Pages";
import Dashboards from "views/private/Team/Dashboards";
import Announcements from "views/private/Team/Announcements";

import OnBoardingScreen from "compositions/OnBoardingScreen";
import AddOnboardingScreen from "compositions/AddOnboardingScreen";
import OnboardingScreens from "views/private/Team/OnboardingScreens";
import EditOnboardingScreen from "compositions/EditOnboardingScreen";

import QuizzesTab from "compositions/QuizzesTab";
import BuilderQuiz from "compositions/BuilderQuiz";

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/team" component={() => <></>} />

      <Route path="/home" component={Home} />
      <Route exact path="/" component={Home} />
      <Route exact path="/learn" component={Learn} />

      <Route path="/learn/topics/:page?/:subpage?" component={Topics} />
      <Route path="/learn/courses/:page?/:subpage?" component={Courses} />
      <Route path="/learn/lessons/:page?/:subpage?" component={Lessons} />
      <Route path="/learn/topics/:page?/:subpage?" component={Topics} />
      <Route path="/learn/quizzes/:page?/:subpage?/:item?" component={Quizzes} />

      <Route exact path="/team" component={() => <h1>team index page here</h1>} />
      
      <Route
        exact
        component={QuizzesTab}
        path="/team/forms/createforms/:formName"
      />
      
      <Route exact path="/team/forms" component={Forms} />
      <Route path="/team/pages/:page?/:subpage?" component={Pages} />
      <Route path="/team/dashboards/:page?/:subpage?" component={Dashboards} />
      <Route exact path="/team/announcements" component={Announcements} />
      <Route exact path="/team/onboarding" component={OnboardingScreens} />

      <Route
        exact
        path="/team/onboarding/create/:screenname"
        component={AddOnboardingScreen}
      />

      <Route
        exact
        path="/team/onboarding/edit/:screenname"
        component={EditOnboardingScreen}
      />

      <Redirect to="/" />
    </Switch>
  );
};

export default Navigation;
