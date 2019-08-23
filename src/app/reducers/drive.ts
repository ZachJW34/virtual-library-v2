import { combineReducers } from 'redux';
import { Action, ActionTypes } from '../constants/action-types';
import { FileResponse } from '../models/google-drive';

export type DriveState = {
  rootFolder: FileResponse;
  volumeFoldersById: { [id: string]: FileResponse };
  filesByVolumeId: { [id: string]: string[] };
  filesById: { [id: string]: FileResponse };
  objectURLsById: { [id: string]: string };
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

const filesByVolumeId = (
  state: { [id: string]: string[] } = {},
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SIMPLE_FILE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: [
          ...(state[action.payload.id] || []),
          action.payload.file.id
        ]
      };
    case ActionTypes.GET_FILE_LIST_METADATA_SUCCESS:
      const fileSet = Array.from(
        new Set([
          ...(state[action.payload.id] || []),
          ...Object.keys(action.payload.files)
        ])
      );
      return {
        ...state,
        [action.payload.id]: fileSet
      };
    default:
      return state;
  }
};

const filesById = (
  state: { [id: string]: FileResponse } = {},
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SIMPLE_FILE_SUCCESS:
      return { ...state, [action.payload.file.id]: action.payload.file };
    case ActionTypes.GET_FILE_LIST_METADATA_SUCCESS:
      return { ...state, ...action.payload.files };
    default:
      return state;
  }
};

const objectURLsById = (
  state: { [id: string]: string } = {},
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SIMPLE_FILE_SUCCESS:
      return { ...state, [action.payload.file.id]: action.payload.objectURL };
    case ActionTypes.GET_SIMPLE_FILE_DATA_SUCCESS:
      return { ...state, [action.payload.id]: action.payload.objectURL };
    default:
      return state;
  }
};

export const drive = combineReducers({
  rootFolder,
  volumeFoldersById,
  filesByVolumeId,
  filesById,
  objectURLsById
});

export const getRootFolder = ({ rootFolder }: DriveState) => rootFolder;

export const getVolumeFolderById = (
  { volumeFoldersById }: DriveState,
  id: string
) => volumeFoldersById[id];

export const getFilesByVolumeId = (
  { filesByVolumeId, filesById }: DriveState,
  id: string
) => (filesByVolumeId[id] || []).map(fileId => filesById[fileId]);

export const getObjectURLById = ({ objectURLsById }: DriveState, id: string) =>
  objectURLsById[id];
