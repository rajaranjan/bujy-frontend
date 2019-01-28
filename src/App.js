import React, { Component } from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './store';
import { connect } from 'react-redux';
import { allRoutes } from './routes';
import RequiredAuth from './components/RequiredAuth';
import NotRequiredAuth from './components/NotRequiredAuth';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {allRoutes.filter(route => route.visible).map((route, index) => {
            return !route.isPublic ? (
              <Route
                exact={route.exact}
                path={route.path}
                key={index}
                component={RequiredAuth(route.component)}
              />
            ) : (
              <Route
                component={NotRequiredAuth(route.component)}
                exact={route.exact}
                path={route.path}
                key={index}
              />
            );
          })}
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(App);
