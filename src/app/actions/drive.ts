import { ActionTypes, Action, ThunkAction } from "../constants/action-types";
import { FileResponse } from "../models/google-drive";
import { createDriveRoot, createVolumeRoot, ProgressCallback, doSimpleUpload } from "../utils/driveHelper";
import * as fromRoot from "../reducers/index";

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
    return dispatch(fetchVolumeFolderSuccess({ id, file }));
  } catch (e) {
    dispatch(fetchVolumeFolderFailure());
  }
};

export const addSimpleFile = (volumeId: string, file: File): ThunkAction => async(
  dispatch,
  getState
) => {
  dispatch(addFileRequest());
  try {
    const state = getState();
    const parent = fromRoot.getVolumeFolderById(state, volumeId);
    const fileResponse = await doSimpleUpload(file, parent.id);
    const objectURL = URL.createObjectURL(file);
    return dispatch(addFileSuccess({ volumeId, file }))
  } catch(e) {
    return dispatch(addFileFailure())
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
  type: ActionTypes.ADD_FILE_REQUEST
});

const addFileSuccess = (payload: {
  volumeId: string;
  file: FileResponse;
}): Action => ({
  type: ActionTypes.ADD_FILE_SUCCESS,
  payload
});

const addFileFailure = (): Action => ({
  type: ActionTypes.ADD_FILE_FAILURE
});
