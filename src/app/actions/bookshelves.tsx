import {
  Action,
  ActionTypes,
  Dispatch,
  GetState,
  ThunkAction
  } from '../constants/action-types';
import { BookshelvesState } from '../reducers/bookshelves';

export const fetchBookshelves = (): ThunkAction => {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(fetchBookShelvesRequest());
    const headers = {
      Authorization: `Bearer ${getState().auth.access_token}`
    };
    const response = await fetch("bookshelves", { headers });
    const body = await response.json();
    dispatch(fetchBookShelvesSuccess(body));
    try {
    } catch (e) {
      dispatch(fetchBookShelvesFailure());
    }
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
