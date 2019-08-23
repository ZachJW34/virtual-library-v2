import { RouterAction } from 'connected-react-router';
import { FileResponse } from '../models/google-drive';
import { Volume } from '../models/google-volumes';
import { User } from '../models/user';
import { State } from '../reducers';
import { BookshelvesState } from '../reducers/bookshelves';

export enum ActionTypes {
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_BOOKSHELVES_REQUEST = "FETCH_BOOKSHELVES_REQUEST",
  FETCH_BOOKSHELVES_SUCCESS = "FETCH_BOOKSHELVES_SUCCESS",
  FETCH_BOOKSHELVES_FAILURE = "FETCH_BOOKSHELVES_FAILURE",
  ADD_VOLUME_TO_BOOKSHELF_REQUEST = "ADD_VOLUME_TO_BOOKSHELF_REQUEST",
  ADD_VOLUME_TO_BOOKSHELF_SUCCESS = "ADD_VOLUME_TO_BOOKSHELF_SUCCESS",
  ADD_VOLUME_TO_BOOKSHELF_FAILURE = "ADD_VOLUME_TO_BOOKSHELF_FAILURE",
  DELETE_VOLUME_FROM_BOOKSHELF_REQUEST = "DELETE_VOLUME_FROM_BOOKSHELF_REQUEST",
  DELETE_VOLUME_FROM_BOOKSHELF_SUCCESS = "DELETE_VOLUME_FROM_BOOKSHELF_SUCCESS",
  DELETE_VOLUME_FROM_BOOKSHELF_FAILURE = "DELETE_VOLUME_FROM_BOOKSHELF_FAILURE",
  FETCH_ROOT_FOLDER_REQUEST = "FETCH_ROOT_FOLDER_REQUEST",
  FETCH_ROOT_FOLDER_SUCCESS = "FETCH_ROOT_FOLDER_SUCCESS",
  FETCH_ROOT_FOLDER_FAILURE = "FETCH_ROOT_FOLDER_FAILURE",
  FETCH_VOLUME_FOLDER_REQUEST = "FETCH_VOLUME_FOLDER_REQUEST",
  FETCH_VOLUME_FOLDER_SUCCESS = "FETCH_VOLUME_FOLDER_SUCCESS",
  FETCH_VOLUME_FOLDER_FAILURE = "FETCH_VOLUME_FOLDER_FAILURE",
  ADD_SIMPLE_FILE_REQUEST = "ADD_SIMPLE_FILE_REQUEST",
  ADD_SIMPLE_FILE_SUCCESS = "ADD_SIMPLE_FILE_SUCCESS",
  ADD_SIMPLE_FILE_FAILURE = "ADD_SIMPLE_FILE_FAILURE",
  GET_FILE_LIST_METADATA_REQUEST = "GET_FILE_LIST_METADATA_REQUEST",
  GET_FILE_LIST_METADATA_SUCCESS = "GET_FILE_LIST_METADATA_SUCCESS",
  GET_FILE_LIST_METADATA_FAILURE = "GET_FILE_LIST_METADATA_FAILURE",
  GET_SIMPLE_FILE_DATA_REQUEST = "GET_SIMPLE_FILE_DATA_REQUEST",
  GET_SIMPLE_FILE_DATA_SUCCESS = "GET_SIMPLE_FILE_DATA_SUCCESS",
  GET_SIMPLE_FILE_DATA_FAILURE = "GET_SIMPLE_FILE_DATA_FAILURE"
}

export type Action =
  | { type: ActionTypes.FETCH_USER_SUCCESS; payload: User }
  | { type: ActionTypes.FETCH_BOOKSHELVES_REQUEST }
  | { type: ActionTypes.FETCH_BOOKSHELVES_SUCCESS; payload: BookshelvesState }
  | { type: ActionTypes.FETCH_BOOKSHELVES_FAILURE }
  | { type: ActionTypes.ADD_VOLUME_TO_BOOKSHELF_REQUEST }
  | {
      type: ActionTypes.ADD_VOLUME_TO_BOOKSHELF_SUCCESS;
      payload: { bookshelfId: string; volume: Volume };
    }
  | { type: ActionTypes.ADD_VOLUME_TO_BOOKSHELF_FAILURE }
  | { type: ActionTypes.DELETE_VOLUME_FROM_BOOKSHELF_REQUEST }
  | {
      type: ActionTypes.DELETE_VOLUME_FROM_BOOKSHELF_SUCCESS;
      payload: { bookshelfId: string; volume: Volume };
    }
  | { type: ActionTypes.DELETE_VOLUME_FROM_BOOKSHELF_FAILURE }
  | { type: ActionTypes.FETCH_ROOT_FOLDER_REQUEST }
  | {
      type: ActionTypes.FETCH_ROOT_FOLDER_SUCCESS;
      payload: { file: FileResponse };
    }
  | { type: ActionTypes.FETCH_ROOT_FOLDER_FAILURE }
  | { type: ActionTypes.FETCH_VOLUME_FOLDER_REQUEST }
  | {
      type: ActionTypes.FETCH_VOLUME_FOLDER_SUCCESS;
      payload: { id: string; file: FileResponse };
    }
  | { type: ActionTypes.FETCH_VOLUME_FOLDER_FAILURE }
  | { type: ActionTypes.ADD_SIMPLE_FILE_REQUEST }
  | {
      type: ActionTypes.ADD_SIMPLE_FILE_SUCCESS;
      payload: { id: string; file: FileResponse; objectURL: string };
    }
  | { type: ActionTypes.ADD_SIMPLE_FILE_FAILURE }
  | { type: ActionTypes.GET_FILE_LIST_METADATA_REQUEST }
  | {
      type: ActionTypes.GET_FILE_LIST_METADATA_SUCCESS;
      payload: { id: string; files: { [id: string]: FileResponse } };
    }
  | { type: ActionTypes.GET_FILE_LIST_METADATA_FAILURE }
  | {
      type: ActionTypes.GET_SIMPLE_FILE_DATA_REQUEST;
      payload: { loadingId: string };
    }
  | {
      type: ActionTypes.GET_SIMPLE_FILE_DATA_SUCCESS;
      payload: { id: string; objectURL: string; loadingId: string };
    }
  | {
      type: ActionTypes.GET_SIMPLE_FILE_DATA_FAILURE;
      payload: { loadingId: string };
    }
  | RouterAction;

export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: Action | ThunkAction) => any;

export enum LOADING_TYPES {
  FETCH_BOOKSHELVES = "FETCH_BOOKSHELVES",
  FETCH_ADD_VOLUME_TO_BOOKSHELF = "FETCH_ADD_VOLUME_TO_BOOKSHELF",
  FETCH_DELETE_VOLUME_FROM_BOOKSHELF = "FETCH_DELETE_VOLUME_FROM_BOOKSHELF",
  FETCH_ROOT_FOLDER = "FETCH_ROOT_FOLDER",
  FETCH_VOLUME_FOLDER = "FETCH_VOLUME_FOLDER",
  GET_FILE_LIST_METADATA = "GET_FILE_LIST_METADATA",
  GET_SIMPLE_FILE_DATA = "GET_SIMPLE_FILE_DATA"
}
