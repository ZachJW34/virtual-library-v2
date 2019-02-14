import { State } from '../reducers';
import { AuthState } from '../reducers/auth';

export enum ActionTypes {
  FETCH_AUTHORIZATION_SUCCESS = "FETCH_AUTHORIZATION_SUCCESS",
  FETCH_BOOKSHELVES_REQUEST = 'FETCH_BOOKSHELVES_REQUEST',
  FETCH_BOOKSHELVES_SUCCESS = 'FETCH_BOOKSHELVES_SUCCESS',
  FETCH_BOOKSHELVES_FAILURE = 'FETCH_BOOKSHELVES_FAILURE',
}


export type Action = 
    { type: ActionTypes.FETCH_AUTHORIZATION_SUCCESS; payload: AuthState }
  | { type: ActionTypes.FETCH_BOOKSHELVES_REQUEST }
  | { type: ActionTypes.FETCH_BOOKSHELVES_SUCCESS, payload: any }
  | { type: ActionTypes.FETCH_BOOKSHELVES_FAILURE }

export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: Action) => any;
