import { ConnectedRouterProps } from 'connected-react-router';
import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user';
import { Dispatch } from '../../constants/action-types';
import { setAccessToken } from '../../utils/tokenHelper';

type Props = {
  fetchUserSuccess: typeof userActions.fetchUserSuccess
} & ConnectedRouterProps;

const LoginComponent = (props: Props) => {
  const scope =
    "email profile openid https://www.googleapis.com/auth/books https://www.googleapis.com/auth/drive";

  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const auth = res as GoogleLoginResponse;
    if (auth.getAuthResponse) {
      const { access_token, expires_at } = auth.getAuthResponse();
      setAccessToken(access_token, expires_at);

      const userProfile = auth.getBasicProfile();
      props.fetchUserSuccess({
        name: userProfile.getName(),
        email: userProfile.getEmail(),
        imageUrl: userProfile.getImageUrl(),
        id: userProfile.getId()
      });
      props.history.push("/home");
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

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(userActions, dispatch);

export default connect(null, mapDispatchToProps)(LoginComponent);
