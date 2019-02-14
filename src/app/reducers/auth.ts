import { Action, ActionTypes } from "../constants/action-types";
import { GoogleLoginResponse } from "react-google-login";

const googleLoginResponse = ({} as GoogleLoginResponse).getAuthResponse;
export type AuthState = ReturnType<typeof googleLoginResponse>;

const INITIAL_STATE = <AuthState>{}

export const auth = (state: AuthState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_AUTHORIZATION_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
