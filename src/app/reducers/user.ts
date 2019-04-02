import { Action, ActionTypes } from '../constants/action-types';
import { User } from '../models/user';

export const user = (state = <User>{}, action: Action) => {
  switch(action.type) {
    case ActionTypes.FETCH_USER_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}