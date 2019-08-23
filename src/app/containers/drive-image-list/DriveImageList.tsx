import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSimpleFileData } from '../../actions/drive';
import { ActionTypes, LOADING_TYPES } from '../../constants/action-types';
import SimpleFile from '../../containers/simple-file/SimpleFile';
import { FileResponse } from '../../models/google-drive';
import * as fromRoot from '../../reducers/index';

type Props = {
  volumeId: string;
};

const DriveImageList: React.FC<Props> = props => {
  const imageFiles = useSelector((state: fromRoot.State) =>
    fromRoot.getImageFilesByVolumeId(state, props.volumeId)
  );
  const dispatch = useDispatch();
  const updateStates = useSelector((state: fromRoot.State) =>
    fromRoot.getUpdateStates(
      state,
      imageFiles.map(file => LOADING_TYPES.GET_SIMPLE_FILE_DATA + file.id)
    )
  );
  console.log(updateStates);
  const objectURLsById = useSelector((state: fromRoot.State) =>
    fromRoot.getObjectURLsByIds(state, imageFiles.map(file => file.id))
  );
  console.log(objectURLsById);

  useEffect(() => {
    for (const file of imageFiles) {
      dispatch(getSimpleFileData(file.id));
    }
  }, []);

  return (
    <div>
      {imageFiles.map(file =>
        !updateStates[LOADING_TYPES.GET_SIMPLE_FILE_DATA + file.id] ||
        updateStates[LOADING_TYPES.GET_SIMPLE_FILE_DATA + file.id].isLoading ? (
          <span key={file.id}>Loading</span>
        ) : (
          <img key={file.id} src={objectURLsById[file.id]} />
        )
      )}
    </div>
  );
};

export default DriveImageList;
