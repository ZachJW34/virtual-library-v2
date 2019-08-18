import { LinearProgress, CircularProgress } from "@material-ui/core";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  doResumableChunkedUpload,
  doSimpleResumableUpload,
  doSimpleUpload,
  getUploadType,
  ProgressCallback,
  UploadTypes
} from "../../utils/driveHelper";
import { useDispatch, useSelector } from "react-redux";
import * as fromRoot from "../../reducers/index";
import * as driveActions from "../../actions/drive";
import { RouteComponentProps } from "react-router";
import { LOADING_TYPES } from "../../constants/action-types";

const Volume: React.FC<
  RouteComponentProps<{ [key: string]: string }>
> = props => {
  const [initialLoad, setInitialLoad] = useState(true);
  const volumeId = props.match.params["id"];
  const volume = useSelector(fromRoot.getVolumeById(volumeId));
  const volumeFolder = useSelector((state: fromRoot.State) =>
    fromRoot.getVolumeFolderById(state, volumeId)
  );
  const updateState = useSelector((state: fromRoot.State) =>
    fromRoot.getUpdateState(state, [LOADING_TYPES.FETCH_VOLUME_FOLDER])
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(driveActions.fetchVolumeFolder(volumeId));
    setInitialLoad(false);
  }, []);

  const [completed, setCompleted] = useState(0);
  const [bufferCompleted, setBufferCompleted] = useState(0);

  const progressCallback: ProgressCallback = useCallback(
    (percentComplete, bufferPercentComplete) => {
      setCompleted(percentComplete);
      setBufferCompleted(bufferPercentComplete);
    },
    []
  );

  const onDrop = async (acceptedFiles: File[], rejectedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const uploadType = getUploadType(file.size);
      console.log(uploadType);
      let result;
      switch (uploadType) {
        case UploadTypes.SIMPLE:
          result = await doSimpleUpload(file, volumeFolder.id);
          break;
        case UploadTypes.SIMPLE_RESUMABLE:
          result = await doSimpleResumableUpload(file, volumeFolder.id);
          break;
        case UploadTypes.RESUMABLE_CHUNKED:
          result = await doResumableChunkedUpload(
            file,
            volumeFolder.id,
            progressCallback
          );
          break;
        default:
          return;
      }
      console.log(result);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // useEffect(() => {
  //   console.log("Hello world");
  //   const sound = new Howl({
  //     src: "https://drive.google.com/open?id=1WPeGALRq6r0ix-HMXR_4r8nGNzhqf22Z",
  //     format: "mp3",
  //     html5: true
  //   });
  //   sound.play();
  //   console.log(sound);
  //   sound.volume(1);
  // }, []);

  // const authToken = getAccessToken();
  // customAjax("https://www.googleapis.com/drive/v3/about?fields=*", {
  //   method: "GET",
  //   responseType: "json",
  //   requestHeaders: { ...getAuthHeader() }
  // }).then(response => console.log(response));
  // fetch("https://www.googleapis.com/drive/v3/about?fields=*", {
  //   headers: { ...getAuthHeader() },
  //   method: "GET"
  // })
  //   .then(res => res.json())
  //   .then(res => console.log(res))
  //   .catch(e => console.log(e));

  // useEffect(() => {
  //   fetch("https://www.googleapis.com/drive/v3/about?fields=*", {
  //     headers: { ...getAuthHeader() },
  //     method: "GET"
  //   })
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(e => console.log(e));
  // }, []);

  // Create a Directory
  // useEffect(() => {
  //   const form = new FormData();
  //   // const file = new Blob([JSON.stringify({ hello: "world" })], {
  //   //   type: "application/json"
  //   // });
  //   const metadata = {
  //     name: "config",
  //     mimeType: "application/vnd.google-apps.folder",
  //     parents: ["root"]
  //   };
  //   form.append(
  //     "metadata",
  //     new Blob([JSON.stringify(metadata)], { type: "application/json" })
  //   );
  //   fetch(
  //     `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id`,
  //     {
  //       headers: getAuthHeader(),
  //       method: "POST",
  //       body: form
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(val => console.log(val));
  // }, []);

  // useEffect(() => {
  //   fetch(
  //     "https://www.googleapis.com/drive/v3/files/1MvBR1Ph4zOIOYCELp2sivXjvzhB6ySdlfvC1BAcDMuGJuNjtEA",
  //     {
  //       method: "GET",
  //       headers: getAuthHeader()
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(val => console.log(val));
  // }, []);

  //id: "1MvBR1Ph4zOIOYCELp2sivXjvzhB6ySdlfvC1BAcDMuGJuNjtEA"

  // useEffect(() => {
  //   fetch(
  //     "https://www.googleapis.com/drive/v3/files/1MvBR1Ph4zOIOYCELp2sivXjvzhB6ySdlfvC1BAcDMuGJuNjtEA",
  //     {
  //       method: "GET",
  //       headers: getAuthHeader()
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(val => console.log(val));
  // }, []);

  // const createBody = (data: { [key: string]: any }) => {
  //   const form =  new FormData();

  // }

  // customAjax("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", {
  //   method: "Post",
  //   responseType: "json",
  //   requestHeaders: { ...getAuthHeader() },
  //   data: {
  //     id: v4(),
  //     mimeType: "application/json",
  //     name: "config.json",
  //     parents: ["appDataFolder"]
  //   }
  // })

  return (
    <div>
      {updateState.isLoading || initialLoad ? (
        <CircularProgress />
      ) : updateState.isError ? (
        "Error"
      ) : (
        <>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          <LinearProgress
            variant="buffer"
            value={completed}
            valueBuffer={bufferCompleted}
          />
          <img />
        </>
      )}
    </div>
  );
};

export default Volume;
