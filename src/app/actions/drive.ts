import { Action, ActionTypes, ThunkAction } from '../constants/action-types';
import { FileResponse } from '../models/google-drive';
import * as fromRoot from '../reducers/index';
import {
  createDriveRoot,
  createVolumeRoot,
  doSimpleUpload,
  downloadSimpleFile,
  getList,
  ProgressCallback
  } from '../utils/driveHelper';

export const fetchRootFolder = (): ThunkAction => async dispatch => {
  dispatch(fetchRootFolderRequest());
  try {
    const file = await createDriveRoot();
    return dispatch(fetchRootFolderSuccess({ file }));
  } catch (e) {
    dispatch(fetchRootFolderFailure());
  }
};

export const fetchVolumeFolder = (id: string): ThunkAction => async (
  dispatch,
  getState
) => {
  dispatch(fetchVolumeFolderRequest());
  try {
    const state = getState();
    const file = await createVolumeRoot(id, fromRoot.getRootFolder(state).id);
    const success = dispatch(fetchVolumeFolderSuccess({ id, file }));
    dispatch(getFileListMetaData(id, "1"));
    return success;
  } catch (e) {
    dispatch(fetchVolumeFolderFailure());
  }
};

export const addSimpleFile = (
  volumeId: string,
  file: File
): ThunkAction => async (dispatch, getState) => {
  dispatch(addFileRequest());
  try {
    const state = getState();
    const parent = fromRoot.getVolumeFolderById(state, volumeId);
    const fileResponse = await doSimpleUpload(file, parent.id);
    const objectURL = URL.createObjectURL(file);
    return dispatch(
      addSimpleFileSuccess({ id: volumeId, file: fileResponse, objectURL })
    );
  } catch (e) {
    return dispatch(addFileFailure());
  }
};

export const getFileListMetaData = (
  volumeId: string,
  pageToken: string
): ThunkAction => async (dispatch, getState) => {
  dispatch(getFileListMetaDataRequest());
  const state = getState();
  const parent = fromRoot.getVolumeFolderById(state, volumeId);
  try {
    const filesMetaData = await getList({
      q: `'${parent.id}' in parents`,
      pageToken
    });
    const filesMetaDataById = filesMetaData.files.reduce(
      (acc, file) => ({ ...acc, [file.id]: file }),
      {} as { [id: string]: FileResponse }
    );
    return dispatch(
      getFileListMetaDataSuccess({ id: volumeId, files: filesMetaDataById })
    );
  } catch (e) {
    return dispatch(getFileListMetaDataFailure());
  }
};

export const getSimpleFileData = (fileId: string): ThunkAction => async (
  dispatch,
  getState
) => {
  if (fromRoot.getObjectURLById(getState(), fileId)) {
    return;
  }
  dispatch(getFileDataRequest(fileId));
  try {
    const blob = await downloadSimpleFile(fileId);
    const objectURL = URL.createObjectURL(blob);
    return dispatch(getFileDataSuccess(fileId, objectURL));
  } catch (e) {
    return dispatch(getFileDataFailure(fileId));
  }
};

const fetchRootFolderRequest = (): Action => ({
  type: ActionTypes.FETCH_ROOT_FOLDER_REQUEST
});

const fetchRootFolderSuccess = (payload: { file: FileResponse }): Action => ({
  type: ActionTypes.FETCH_ROOT_FOLDER_SUCCESS,
  payload: payload
});

const fetchRootFolderFailure = (): Action => ({
  type: ActionTypes.FETCH_ROOT_FOLDER_FAILURE
});

const fetchVolumeFolderRequest = (): Action => ({
  type: ActionTypes.FETCH_VOLUME_FOLDER_REQUEST
});

const fetchVolumeFolderSuccess = (payload: {
  id: string;
  file: FileResponse;
}): Action => ({
  type: ActionTypes.FETCH_VOLUME_FOLDER_SUCCESS,
  payload: payload
});

const fetchVolumeFolderFailure = (): Action => ({
  type: ActionTypes.FETCH_VOLUME_FOLDER_FAILURE
});

const addFileRequest = (): Action => ({
  type: ActionTypes.ADD_SIMPLE_FILE_REQUEST
});

const addSimpleFileSuccess = (payload: {
  id: string;
  file: FileResponse;
  objectURL: string;
}): Action => ({
  type: ActionTypes.ADD_SIMPLE_FILE_SUCCESS,
  payload
});

const addFileFailure = (): Action => ({
  type: ActionTypes.ADD_SIMPLE_FILE_FAILURE
});

const getFileListMetaDataRequest = (): Action => ({
  type: ActionTypes.GET_FILE_LIST_METADATA_REQUEST
});

const getFileListMetaDataSuccess = (payload: {
  id: string;
  files: {
    [id: string]: FileResponse;
  };
}): Action => ({
  type: ActionTypes.GET_FILE_LIST_METADATA_SUCCESS,
  payload
});

const getFileListMetaDataFailure = (): Action => ({
  type: ActionTypes.GET_FILE_LIST_METADATA_FAILURE
});

const getFileDataRequest = (fileId: string): Action => ({
  type: ActionTypes.GET_SIMPLE_FILE_DATA_REQUEST,
  payload: { loadingId: fileId }
});

const getFileDataSuccess = (fileId: string, objectURL: string): Action => ({
  type: ActionTypes.GET_SIMPLE_FILE_DATA_SUCCESS,
  payload: { id: fileId, objectURL, loadingId: fileId }
});

const getFileDataFailure = (fileId: string): Action => ({
  type: ActionTypes.GET_SIMPLE_FILE_DATA_FAILURE,
  payload: { loadingId: fileId }
});
