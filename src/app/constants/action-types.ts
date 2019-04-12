import { RouterAction } from 'connected-react-router';
import { Volume } from '../models/google-volumes';
import { User } from '../models/user';
import { State } from '../reducers';
import { BookshelvesState } from '../reducers/bookshelves';

export enum ActionTypes {
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_BOOKSHELVES_REQUEST = "FETCH_BOOKSHELVES_REQUEST",
  FETCH_BOOKSHELVES_SUCCESS = "FETCH_BOOKSHELVES_SUCCESS",
  FETCH_BOOKSHELVES_FAILURE = "FETCH_BOOKSHELVES_FAILURE",
  FETCH_ADD_VOLUME_TO_BOOKSHELF_REQUEST = "FETCH_ADD_VOLUME_TO_BOOKSHELF_REQUEST",
  FETCH_ADD_VOLUME_TO_BOOKSHELF_SUCCESS = "FETCH_ADD_VOLUME_TO_BOOKSHELF_SUCCESS",
  FETCH_ADD_VOLUME_TO_BOOKSHELF_FAILURE = "FETCH_ADD_VOLUME_TO_BOOKSHELF_FAILURE",
  FETCH_DELETE_VOLUME_FROM_BOOKSHELF_REQUEST = "FETCH_DELETE_VOLUME_FROM_BOOKSHELF_REQUEST",
  FETCH_DELETE_VOLUME_FROM_BOOKSHELF_SUCCESS = "FETCH_DELETE_VOLUME_FROM_BOOKSHELF_SUCCESS",
  FETCH_DELETE_VOLUME_FROM_BOOKSHELF_FAILURE = "FETCH_DELETE_VOLUME_FROM_BOOKSHELF_FAILURE",
}

export type Action =
  | { type: ActionTypes.FETCH_USER_SUCCESS; payload: User }
  | { type: ActionTypes.FETCH_BOOKSHELVES_REQUEST }
  | { type: ActionTypes.FETCH_BOOKSHELVES_SUCCESS; payload: BookshelvesState }
  | { type: ActionTypes.FETCH_BOOKSHELVES_FAILURE }
  | { type: ActionTypes.FETCH_ADD_VOLUME_TO_BOOKSHELF_REQUEST }
  | {
      type: ActionTypes.FETCH_ADD_VOLUME_TO_BOOKSHELF_SUCCESS;
      payload: { bookshelfId: string; volume: Volume };
    }
  | { type: ActionTypes.FETCH_ADD_VOLUME_TO_BOOKSHELF_FAILURE }
  | { type: ActionTypes.FETCH_DELETE_VOLUME_FROM_BOOKSHELF_REQUEST }
  | {
      type: ActionTypes.FETCH_DELETE_VOLUME_FROM_BOOKSHELF_SUCCESS;
      payload: { bookshelfId: string; volume: Volume };
    }
  | { type: ActionTypes.FETCH_DELETE_VOLUME_FROM_BOOKSHELF_FAILURE }
  | RouterAction;

export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: Action) => any;

export enum LOADING_TYPES {
  FETCH_BOOKSHELVES = "FETCH_BOOKSHELVES",
  FETCH_ADD_VOLUME_TO_BOOKSHELF = "FETCH_ADD_VOLUME_TO_BOOKSHELF",
  FETCH_DELETE_VOLUME_FROM_BOOKSHELF = "FETCH_DELETE_VOLUME_FROM_BOOKSHELF"
}
