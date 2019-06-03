export interface BookshelvesResponse {
  kind: string,
  items: Bookshelf[]
}

export interface Bookshelf {
  kind: string;
  id: number | string;
  selfLink: string;
  title: string;
  access: string;
  updated: string;
  created: string;
  volumeCount: number;
  volumesLastUpdated: string;
}
