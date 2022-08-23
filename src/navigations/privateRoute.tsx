import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from 'views/private/Home';
import Learn from 'views/private/Learn/Learn';
import Topics from 'views/private/Learn/Topics';
import Courses from 'views/private/Learn/Courses';
import Lessons from 'views/private/Learn/Lessons';
import Quizzes from 'views/private/Learn/Quizzes';
import Reports from 'views/private/Learn/Reports';

import Forms from 'compositions/Forms';
import Pages from 'views/private/Team/Pages';
import EditForm from 'compositions/EditForm';
import QuizzesTab from 'compositions/QuizzesTab';
import Homepage from 'views/private/Team/Homepage';
import Dashboards from 'views/private/Team/Dashboards';
import Announcements from 'views/private/Team/Announcements';
import AddOnboardingScreen from 'compositions/AddOnboardingScreen';
import OnboardingScreens from 'views/private/Team/OnboardingScreens';
import EditOnboardingScreen from 'compositions/EditOnboardingScreen';

import ProfileUser from 'compositions/ProfileUser';
import ProfileAccount from 'compositions/ProfileAccount';
import ProfileOrg from 'compositions/ProfileOrganization';
import ProfileDetails from 'compositions/ProfileDetails';

const Navigation = () => {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route exact path="/" component={Home} />

      {/**
       * =============
       * PROFILE ROUTE
       * =============
       */}
      <Route exact path="/profile/user" component={ProfileUser} />
      <Route exact path="/profile/account" component={ProfileAccount} />
      <Route exact path="/profile/organization" component={ProfileOrg} />
      <Route
        exact
        component={ProfileDetails}
        path="/profile/organization/:id?/:name?"
      />

      {/**
       * =============
       * LEARN ROUTE
       * =============
       */}
      <Route exact path="/learn" component={Learn} />
      <Route path="/learn/topics/:page?/:subpage?" component={Topics} />
      <Route path="/learn/courses/:page?/:subpage?" component={Courses} />
      <Route path="/learn/lessons/:page?/:subpage?" component={Lessons} />
      <Route
        path="/learn/quizzes/:page?/:subpage?/:item?"
        component={Quizzes}
      />
      <Route path="/learn/reports/:page?/:subpage?" component={Reports} />

      {/**
       * =============
       * TEAM ROUTE
       * =============
       */}
      <Route exact path="/team" component={Homepage} />
      <Route exact path="/team/forms" component={Forms} />
      <Route path="/team/pages/:page?/:subpage?" component={Pages} />
      <Route exact path="/team/announcements" component={Announcements} />
      <Route exact path="/team/onboarding" component={OnboardingScreens} />
      <Route path="/team/dashboards/:page?/:subpage?" component={Dashboards} />
      <Route
        exact
        component={QuizzesTab}
        path="/team/forms/createforms/:formName"
      />
      <Route
        exact
        component={EditForm}
        path="/team/forms/editforms/:formName"
      />
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
