import { ConnectedRouterProps } from "connected-react-router";
import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import * as userActions from "../../actions/user";
import { useDispatch } from "../../types/redux-hooks";
import { setAccessToken } from "../../utils/tokenHelper";

type Props = ConnectedRouterProps;

const LoginComponent = (props: Props) => {
  const dispatch = useDispatch();

  const scope =
    "email profile openid https://www.googleapis.com/auth/books https://www.googleapis.com/auth/drive";

  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const auth = res as GoogleLoginResponse;
    if (auth.getAuthResponse) {
      const { access_token, expires_at } = auth.getAuthResponse();
      setAccessToken(access_token, expires_at);

      const userProfile = auth.getBasicProfile();
      dispatch(
        userActions.fetchUserSuccess({
          name: userProfile.getName(),
          email: userProfile.getEmail(),
          imageUrl: userProfile.getImageUrl(),
          id: userProfile.getId()
        })
      );
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

export default LoginComponent;
