import { ActionTypes, Action } from '../constants/action-types';
import { User } from '../models/user';

export const fetchUserSuccess = (payload: User): Action => ({
  type: ActionTypes.FETCH_USER_SUCCESS,
  payload
});