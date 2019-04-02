import { ActionTypes } from '../constants/action-types';
import { User } from '../models/user';

export const fetchUserSuccess = (payload: User) => ({
  type: ActionTypes.FETCH_USER_SUCCESS,
  payload
});