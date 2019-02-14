import React from 'react';
import { Route } from 'react-router';
import LoginComponent from '../../containers/login/Login';

export const PublicRoutesComponent = () => {
  return (
    <Route path="/login" component={LoginComponent} />
  )
}