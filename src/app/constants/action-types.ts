import { RouterAction } from "connected-react-router";
import { Volume } from "../models/google-volumes";
import { User } from "../models/user";
import { State } from "../reducers";
import { BookshelvesState } from "../reducers/bookshelves";
import { FileResponse } from "../models/google-drive";

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
  ADD_FILE_REQUEST = "ADD_FILE_REQUEST",
  ADD_FILE_SUCCESS = "ADD_FILE_SUCCESS",
  ADD_FILE_FAILURE = "ADD_FILE_FAILURE"
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
      payload: { id: string, file: FileResponse };
    }
  | { type: ActionTypes.FETCH_VOLUME_FOLDER_FAILURE }
  | { type: ActionTypes.ADD_FILE_REQUEST}
  | { type: ActionTypes.ADD_FILE_SUCCESS, payload: { volumeId: string, file: FileResponse }}
  | { type: ActionTypes.ADD_FILE_FAILURE}
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
  FETCH_VOLUME_FOLDER = "FETCH_VOLUME_FOLDER"
}
