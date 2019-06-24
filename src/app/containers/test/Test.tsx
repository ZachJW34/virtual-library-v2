import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 } from 'uuid';
import { getAuthHeader } from '../../utils/tokenHelper';

const Test: React.FC<any> = props => {
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
    for (const file of acceptedFiles) {
      resumableUpload(file);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const resumableUpload = async (file: File) => {
    try {
      const fileContent = await readFile(file);
      const body = JSON.stringify({
        name: file.name,
        mimeType: file.type
      });
      const response = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
        {
          method: "POST",
          headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json"
          },
          body
        }
      );
      if (response.status === 200) {
        const location = response.headers.get("location") as string;
        // const chunks = chunkify(file, new Uint8Array(fileContent));
        const complete = await sendChunks(
          location,
          file,
          new Uint8Array(fileContent)
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const readFile = (file: File): Promise<ArrayBuffer> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onabort = reader.onerror = e => reject(e);
      reader.onload = event =>
        reader.result ? resolve(reader.result as ArrayBuffer) : reject(event);
      reader.readAsArrayBuffer(file);
    });
  };

  const sendChunks = async (
    location: string,
    file: File,
    buffer: Uint8Array
  ) => {
    try {
      let flag = true;
      let startByte = 0;
      while (flag) {
        const chunk = getChunk(startByte, buffer);
        const response = await fetch(location, {
          method: "PUT",
          headers: {
            "Content-Length": chunk.contentLength,
            "Content-Range": chunk.contentRange,
            "Content-Type": file.type
          },
          body: chunk.value
        });
        switch (response.status) {
          case 200:
            flag = false;
            break;
          case 308:
            const range = response.headers.get("range") as string;
            startByte = Number.parseInt(range.slice(6).split("-")[1]) + 1;
            break;
          default:
            console.log(response.status);
            throw new Error();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getChunk = (startByte: number, buffer: Uint8Array) => {
    const chunkSize = 256 * 4 * 5 * 1024;
    const endByte =
      startByte + chunkSize > buffer.length
        ? buffer.length
        : startByte + chunkSize;
    const chunk = buffer.slice(startByte, endByte);
    return {
      value: chunk,
      contentLength: chunk.length.toString(),
      contentRange: `bytes ${startByte}-${endByte - 1}/${buffer.length}`
    };
  };

  const uploadFile = async (file: File) => {
    try {
      const fileContent = await readFile(file);
      console.log(fileContent);
      const fileBlob = new Blob([fileContent], { type: file.type });
      const form = new FormData();
      const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: ["root"]
      };
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      form.append("file", fileBlob);
      const result = await fetch(
        `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id`,
        {
          headers: getAuthHeader(),
          method: "POST",
          body: form
        }
      );
      const json = await result.json();
      console.log(json);
    } catch (e) {}
  };
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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Test;
