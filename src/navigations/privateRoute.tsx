import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "views/private/Home";

import Learn from "views/private/Learn/Learn";
import Courses from "views/private/Learn/Courses";
import Lessons from "views/private/Learn/Lessons";
import Topics from "views/private/Learn/Topics";
import Quizzes from "views/private/Learn/Quizzes";

import Dashboards from "views/private/Team/Dashboards";
import Pages from "views/private/Team/Pages";
import Createpage from "compositions/Createpage";
import Announcements from "views/private/Team/Announcements";
import Forms from "compositions/Forms";

import OnboardingScreens from "views/private/Team/OnboardingScreens";
import OnBoardingScreen from "compositions/OnBoardingScreen";
import AddOnboardingScreen from "compositions/AddOnboardingScreen";
import EditOnboardingScreen from "compositions/EditOnboardingScreen";

import BuilderQuiz from "compositions/BuilderQuiz";
import QuizzesTab from "compositions/QuizzesTab";

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

      <Route exact path="/team" component={() => <h1>team index page here</h1>} />
      <Route path="/team/dashboards/:page?/:subpage?" component={Dashboards} />
      <Route exact path="/team/pages" component={Pages} />
      <Route exact path="/team/pages/createpage" component={Createpage} />
      <Route
        exact
        path="/team/forms/createforms/:quizees?"
        component={QuizzesTab}
      />
      <Route exact path="/team/forms" component={Forms} />
      <Route exact path="/team/announcements" component={Announcements} />

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
      <Route exact path="/team/onboarding" component={OnboardingScreens} />

      <Redirect to="/" />
    </Switch>
  );
};

export default Navigation;
