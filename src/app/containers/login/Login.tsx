import { ConnectedRouterProps } from 'connected-react-router';
import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/auth';
import { Dispatch } from '../../constants/action-types';
import { AuthState } from '../../reducers/auth';

type Props = typeof authActions & ConnectedRouterProps

const LoginComponent = (props: Props) => {
  console.log(props);
  const scope = 'email profile openid https://www.googleapis.com/auth/books';

  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ((res as GoogleLoginResponse).getAuthResponse) {
      props.fetchAuthSuccess((res as GoogleLoginResponse).getAuthResponse());
      props.history.push('/home');
      console.log(res);
    }
  };

  const onFailure = (err: any) => {
    console.log(err);
  };

  return (
    <GoogleLogin
      clientId="506773621500-d05th5ift71lr8u88b9u4fn68d2i1d1d.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      scope={scope}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(authActions, dispatch);

export default connect<ConnectedRouterProps, typeof authActions>(
  null,
  mapDispatchToProps
)(LoginComponent);
