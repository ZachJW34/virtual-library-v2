import { push } from 'connected-react-router';
import {
  Action,
  ActionTypes,
  Dispatch,
  ThunkAction
  } from '../constants/action-types';
import { Volume } from '../models/google-volumes';
import { BookshelvesState } from '../reducers/bookshelves';
import { addQueryParams } from '../utils/fetchHelper';
import { getAuthHeader, isAccessTokenValid } from '../utils/tokenHelper';

export const fetchBookshelves = (): ThunkAction => {
  return async (dispatch: Dispatch) => {
    if (!isAccessTokenValid()) {
      return dispatch(push('/login'));
    }
    dispatch(fetchBookShelvesRequest());
    const headers = getAuthHeader();    
    const response = await fetch("/bookshelves", { headers });
    const body = await response.json();
    return dispatch(fetchBookShelvesSuccess(body));
  };
};

export const fetchAddVolumeToBookshelf = (
  bookshelfId: string,
  volume: Volume
): ThunkAction => {
  return async (dispatch: Dispatch) => {
    if (!isAccessTokenValid()) {
      return dispatch(push('/login'));
    }
    dispatch(fetchAddVolumeToBookshelfRequest());
    const headers = getAuthHeader();
    const response = await fetch(
      `/bookshelves/add-volume${addQueryParams({
        bookshelfId,
        volumeId: volume.id
      })}`,
      { headers }
    );
    const body: { didSucceed: boolean } = await response.json();
    return body.didSucceed
      ? dispatch(fetchAddVolumeToBookshelfSuccess({ bookshelfId, volume }))
      : dispatch(fetchAddVolumeToBookshelfFailure());
  };
};

export const fetchDeleteVolumeFromBookshelf = (
  bookshelfId: string,
  volume: Volume
): ThunkAction => {
  return async (dispatch: Dispatch) => {
    if (!isAccessTokenValid()) {
      return dispatch(push('/login'));
    }
    dispatch(fetchDeleteVolumeFromBookshelfRequest());
    const headers = getAuthHeader();    
    const response = await fetch(
      `/bookshelves/delete-volume${addQueryParams({
        bookshelfId,
        volumeId: volume.id
      })}`,
      { headers }
    );
    const body: { didSucceed: boolean } = await response.json();
    return body.didSucceed
      ? dispatch(fetchDeleteVolumeFromBookshelfSuccess({ bookshelfId, volume }))
      : dispatch(fetchDeleteVolumeFromBookshelfFailure());
  };
};

const fetchBookShelvesRequest = (): Action => ({
  type: ActionTypes.FETCH_BOOKSHELVES_REQUEST
});

const fetchBookShelvesSuccess = (payload: BookshelvesState): Action => ({
  type: ActionTypes.FETCH_BOOKSHELVES_SUCCESS,
  payload
});

const fetchBookShelvesFailure = (): Action => ({
  type: ActionTypes.FETCH_BOOKSHELVES_FAILURE
});

const fetchAddVolumeToBookshelfRequest = (): Action => ({
  type: ActionTypes.FETCH_ADD_VOLUME_TO_BOOKSHELF_REQUEST
});

const fetchAddVolumeToBookshelfSuccess = (payload: {
  bookshelfId: string;
  volume: Volume;
}): Action => ({
  type: ActionTypes.FETCH_ADD_VOLUME_TO_BOOKSHELF_SUCCESS,
  payload
});

const fetchAddVolumeToBookshelfFailure = (): Action => ({
  type: ActionTypes.FETCH_ADD_VOLUME_TO_BOOKSHELF_FAILURE
});

const fetchDeleteVolumeFromBookshelfRequest = (): Action => ({
  type: ActionTypes.FETCH_DELETE_VOLUME_FROM_BOOKSHELF_REQUEST
});

const fetchDeleteVolumeFromBookshelfSuccess = (payload: {
  bookshelfId: string;
  volume: Volume;
}): Action => ({
  type: ActionTypes.FETCH_DELETE_VOLUME_FROM_BOOKSHELF_SUCCESS,
  payload
});

const fetchDeleteVolumeFromBookshelfFailure = (): Action => ({
  type: ActionTypes.FETCH_DELETE_VOLUME_FROM_BOOKSHELF_FAILURE
});
