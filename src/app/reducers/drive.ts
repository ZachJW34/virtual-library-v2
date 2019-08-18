import { FileResponse } from "../models/google-drive";
import { Action, ActionTypes } from "../constants/action-types";
import { combineReducers } from "redux";

export type DriveState = {
  rootFolder: FileResponse;
  volumeFoldersById: { [id: string]: FileResponse };
};

const rootFolder = (
  state: FileResponse = {} as FileResponse,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_ROOT_FOLDER_SUCCESS:
      return action.payload.file;
    default:
      return state;
  }
};

const volumeFoldersById = (
  state: { [id: string]: FileResponse } = {},
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_VOLUME_FOLDER_SUCCESS:
      return { ...state, [action.payload.id]: action.payload.file };
    default:
      return state;
  }
};

export const drive = combineReducers({
  rootFolder,
  volumeFoldersById
});

export const getRootFolder = ({ rootFolder }: DriveState) => rootFolder;

export const getVolumeFolderById = (
  { volumeFoldersById }: DriveState,
  id: string
) => volumeFoldersById[id];
