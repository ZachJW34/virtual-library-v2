import { ConnectedRouter, ConnectedRouterProps } from 'connected-react-router';
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { State } from '../../reducers';
import { history } from '../../reducers/history';
import { PrivateRouteComponent } from '../private-routes/PrivateRoutes';
import { PublicRoutesComponent } from '../public-routes/PublicRoutes';

type RouteComponentProps = {
  accessToken: string;
} & ConnectedRouterProps;

const RoutesComponent: FunctionComponent<RouteComponentProps> = props => {
  return (
    <ConnectedRouter history={history}>
      <BrowserRouter>
        {props.accessToken ? (
          <PrivateRouteComponent />
        ) : (
          <>
            <PublicRoutesComponent />
            <Redirect to="/login" />
          </>
        )}
      </BrowserRouter>
    </ConnectedRouter>
  );
};

const mapStateToProps = (state: State, ownProps: any) => {
  return {
    accessToken: state.auth.access_token,
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  null
)(RoutesComponent);
