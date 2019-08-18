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

export const addVolumeToBookshelf = (
  bookshelfId: string,
  volume: Volume
): ThunkAction => {
  return async (dispatch: Dispatch) => {
    if (!isAccessTokenValid()) {
      return dispatch(push('/login'));
    }
    dispatch(addVolumeToBookshelfRequest());
    try {
      const response = await fetch('/bookshelves/add-volume', {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
          'Content-type': 'application/json'
        },
        body: JSON.stringify({bookshelfId, volume})
      })
      // const body: { didSucceed: boolean } = await response.json();
      console.log(response);
      if (response.ok) {
        const body: Volume = await response.json();
        console.log(body);
        return dispatch(addVolumeToBookshelfSuccess({ bookshelfId, volume: body }))
      } else {
        return dispatch(addVolumeToBookshelfFailure());
      }
    } catch(e) {
      return dispatch(addVolumeToBookshelfFailure());
    }
  };
};

export const deleteVolumeFromBookshelf = (
  bookshelfId: string,
  volume: Volume
): ThunkAction => {
  return async (dispatch: Dispatch) => {
    if (!isAccessTokenValid()) {
      return dispatch(push('/login'));
    }
    dispatch(deleteVolumeFromBookshelfRequest());
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
      ? dispatch(deleteVolumeFromBookshelfSuccess({ bookshelfId, volume }))
      : dispatch(deleteVolumeFromBookshelfFailure());
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

const addVolumeToBookshelfRequest = (): Action => ({
  type: ActionTypes.ADD_VOLUME_TO_BOOKSHELF_REQUEST
});

const addVolumeToBookshelfSuccess = (payload: {
  bookshelfId: string;
  volume: Volume;
}): Action => ({
  type: ActionTypes.ADD_VOLUME_TO_BOOKSHELF_SUCCESS,
  payload
});

const addVolumeToBookshelfFailure = (): Action => ({
  type: ActionTypes.ADD_VOLUME_TO_BOOKSHELF_FAILURE
});

const deleteVolumeFromBookshelfRequest = (): Action => ({
  type: ActionTypes.DELETE_VOLUME_FROM_BOOKSHELF_REQUEST
});

const deleteVolumeFromBookshelfSuccess = (payload: {
  bookshelfId: string;
  volume: Volume;
}): Action => ({
  type: ActionTypes.DELETE_VOLUME_FROM_BOOKSHELF_SUCCESS,
  payload
});

const deleteVolumeFromBookshelfFailure = (): Action => ({
  type: ActionTypes.DELETE_VOLUME_FROM_BOOKSHELF_FAILURE
});
