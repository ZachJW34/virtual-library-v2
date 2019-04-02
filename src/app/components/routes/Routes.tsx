import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
  } from 'react-router-dom';
import HomeComponent from '../../containers/home/Home';
import LoginComponent from '../../containers/login/Login';
import { history } from '../../reducers/history';

const RoutesComponent: React.FC<{}> = () => {

  return (
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginComponent} />
          <Route path="/home" component={HomeComponent} />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </ConnectedRouter>
  );
};

export default RoutesComponent;
