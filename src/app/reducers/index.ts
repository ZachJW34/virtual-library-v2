import { RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import * as fromBookshelves from './bookshelves';
import { error, loading } from './common';
import * as fromLoading from './common';
import * as fromDrive from './drive';
import { router } from './history';
import { user } from './user';
import { Bookshelf } from '../models/google-bookshelves';
import { Volume } from '../models/google-volumes';
import { User } from '../models/user';
import { isImage } from '../utils/utils';

export type State = {
  user: User;
  router: RouterState;
  loading: { [key: string]: boolean };
  error: { [key: string]: boolean };
  bookshelves: fromBookshelves.BookshelvesState;
  drive: fromDrive.DriveState;
};

export const rootReducer = combineReducers({
  user,
  router,
  loading,
  error,
  bookshelves: fromBookshelves.bookshelves,
  drive: fromDrive.drive
});

export const getUpdateState = ({ loading, error }: State, ids: string[]) => ({
  isLoading: fromLoading.getIsLoading(loading, ids),
  isError: fromLoading.getIsError(error, ids)
});

export const getUpdateStates = ({ loading, error }: State, ids: string[]) =>
  ids.reduce(
    (acc, id) => ({
      ...acc,
      [id]: {
        isLoading: fromLoading.getIsLoading(loading, [id]),
        isError: fromLoading.getIsError(error, [id])
      }
    }),
    {} as { [id: string]: { isLoading: boolean; isError: boolean } }
  );

export const getBookshelves = ({ bookshelves }: State): Bookshelf[] =>
  fromBookshelves.getBookshelves(bookshelves);

export const getBookshelfById = (
  { bookshelves }: State,
  id: string
): Bookshelf => fromBookshelves.getBookshelfById(bookshelves, id);

export const getVolumesByBookshelfId = (
  { bookshelves }: State,
  id: string
): Volume[] => fromBookshelves.getVolumesByBookshelfId(bookshelves, id);

export const getVolumeById = (id: string) => ({ bookshelves }: State) =>
  fromBookshelves.getVolumeById(bookshelves, id);

export const getRootFolder = ({ drive }: State) =>
  fromDrive.getRootFolder(drive);

export const getVolumeFolderById = ({ drive }: State, id: string) =>
  fromDrive.getVolumeFolderById(drive, id);

export const getFilesByVolumeId = ({ drive }: State, id: string) =>
  fromDrive.getFilesByVolumeId(drive, id);

export const getImageFilesByVolumeId = (state: State, id: string) =>
  getFilesByVolumeId(state, id).filter(({ mimeType }) => isImage(mimeType));

export const getObjectURLById = ({ drive }: State, id: string) =>
  fromDrive.getObjectURLById(drive, id);

export const getObjectURLsByIds = ({ drive }: State, ids: string[]) =>
  ids.reduce(
    (acc, id) => ({ ...acc, [id]: fromDrive.getObjectURLById(drive, id) }),
    {} as { [id: string]: string }
  );
