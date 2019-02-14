import React from 'react';
import { Route } from 'react-router';
import { HomeComponent } from '../home/Home';

export const PrivateRouteComponent = () => {
  return (
    <Route path="/home" component={HomeComponent} />
  )
}