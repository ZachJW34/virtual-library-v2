export interface BookshelvesResponse {
  kind: string;
  items: Bookshelf[];
}

export interface Bookshelf {
  kind: string;
  id: string;
  selfLink: string;
  title: string;
  access: string;
  updated: string;
  created: string;
  volumeCount: number;
  volumesLastUpdated: string;
}

export type AddVolumeToBookshelfParams = {
  volumeId: string,
  bookshelfId: string
}
