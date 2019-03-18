import { combineReducers } from 'redux';
import { Action, ActionTypes } from '../constants/action-types';
import { Bookshelf } from '../models/google-bookshelves';
import { Volume } from '../models/google-volumes';

export type BookshelvesState = {
  bookshelvesById: { [id: string]: Bookshelf },
  volumesByBookshelfId: { [id: string]: string[] }
  volumesById: { [id: string]: Volume }
}

const INITIAL_STATE: BookshelvesState = <BookshelvesState>{}

const bookshelvesById = (state: BookshelvesState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_BOOKSHELVES_SUCCESS: 
      return { ...state, ...action.payload.bookshelvesById };

    default:
      return state;
  };
};

const volumesByBookshelfId = (state: BookshelvesState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_BOOKSHELVES_SUCCESS:
      return { ...state, ...action.payload.volumesByBookshelfId };

    default:
      return state;
  };
};

const volumesById = (state: BookshelvesState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_BOOKSHELVES_SUCCESS:
      return { ...state, ...action.payload.volumesById };

    default:
      return state;
  };
};


export const bookshelves = combineReducers({
  bookshelvesById,
  volumesByBookshelfId,
  volumesById
});