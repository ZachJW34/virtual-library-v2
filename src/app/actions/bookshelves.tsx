import { Action, ActionTypes, Dispatch, GetState, ThunkAction } from '../constants/action-types';
import { any } from 'prop-types';

export const fetchBookshelves = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    console.log(getState());
    dispatch(fetchBookShelvesRequest());
  }
}

const fetchBookShelvesRequest = (): Action => ({
  type: ActionTypes.FETCH_BOOKSHELVES_REQUEST
})

const fetchBookShelvesSuccess = (): Action => ({
  type: ActionTypes.FETCH_BOOKSHELVES_SUCCESS,
  payload: any
})

const fetchBookShelvesFailure = (): Action => ({
  type: ActionTypes.FETCH_BOOKSHELVES_FAILURE
})
