import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import CoursePage from './components/CoursePage/CoursePage.js';
import CreatePage from './components/CreatePage/CreatePage.js'
import PlayerCountPage from './components/PlayerCountPage/PlayerCountPage.js';
import RulesPage from './components/RulesPage/RulesPage.js';
import TipsPage from './components/TipsPage/TipsPage.js';
import ScoreCardPage from './components/ScoreCardPage/ScoreCardPage.js';
import PlayerWinPage from './components/PlayerWinPage/PlayerWinPage.js';
import MyInfoOnCoursePage from './components/MyInfoOnCoursePage/MyInfoOnCoursePage.js'

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/course"
          component={CoursePage}
        />
        <Route
          path="/createCourse"
          component={CreatePage}
        />
        <Route
          path="/playerCount"
          component={PlayerCountPage}
        />
        <Route
          path="/rules"
          component={RulesPage}
        />
        <Route
          path="/tips"
          component={TipsPage}
        />
        <Route
          path="/score"
          component={ScoreCardPage}
        />
        <Route
          path="/tally"
          component={PlayerWinPage}
        />
        <Route
          path="/myInfoOnCourse/:id"
          component={MyInfoOnCoursePage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
