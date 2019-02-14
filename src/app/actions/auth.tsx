import { Action, ActionTypes } from '../constants/action-types';
import { AuthState } from '../reducers/auth';

export const fetchAuthSuccess = (payload: AuthState): Action => {
  return {
    type: ActionTypes.FETCH_AUTHORIZATION_SUCCESS,
    payload
  };
};
