// export type FileQuery = {
//   name,
//   fullText,
//   mimeType,
//   modifiedTime,
//   viewedByMeTime,
//   trashed,
//   starred,
//   parents,
//   owners3,
//   writers3,
//   readers3,
//   sharedWithMe,
//   properties,
//   appProperties,
//   visibility
// }

export type ListSearch = {
  q: string;
  corpora?: string;
  driveId?: string;
  fields?: string;
  orderBy?: string;
  pageSize?: string;
  pageToken?: string;
  spaces?: string;
};

export type FileResponse = {
    id: string;
    mimeType: string;
    name: string;
    [key: string]: string;
}


export type ListSearchResponse = {
  kind: string;
  incompleteSearch: boolean;
  files: FileResponse[];
};

