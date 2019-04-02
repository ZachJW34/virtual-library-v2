import { combineReducers } from 'redux';
import { Action, ActionTypes } from '../constants/action-types';
import { Bookshelf } from '../models/google-bookshelves';
import { Volume } from '../models/google-volumes';

export type BookshelvesState = {
  bookshelvesById: { [id: string]: Bookshelf };
  volumesByBookshelfId: { [id: string]: string[] };
  volumesById: { [id: string]: Volume };
};

const bookshelvesById = (
  state: { [id: string]: Bookshelf } = {},
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BOOKSHELVES_SUCCESS:
      return { ...state, ...action.payload.bookshelvesById };

    default:
      return state;
  }
};

const volumesByBookshelfId = (
  state: { [id: string]: string[] } = {},
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BOOKSHELVES_SUCCESS:
      return { ...state, ...action.payload.volumesByBookshelfId };

    case ActionTypes.FETCH_ADD_VOLUME_TO_BOOKSHELF_SUCCESS:
      return {
        ...state,
        [action.payload.bookshelfId]: [
          ...state[action.payload.bookshelfId],
          action.payload.volume.id
        ]
      };

    case ActionTypes.FETCH_DELETE_VOLUME_FROM_BOOKSHELF_SUCCESS:
      const filteredBookshelf = state[action.payload.bookshelfId].filter(
        id => id !== action.payload.volume.id
      );
      return {
        ...state,
        [action.payload.bookshelfId]: filteredBookshelf
      };

    default:
      return state;
  }
};

const volumesById = (state: { [id: string]: Volume } = {}, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_BOOKSHELVES_SUCCESS:
      return { ...state, ...action.payload.volumesById };

    case ActionTypes.FETCH_ADD_VOLUME_TO_BOOKSHELF_SUCCESS:
      return {
        ...state,
        [action.payload.volume.id]: action.payload.volume
      };

    // TODO: Only delete volume if it doesn't belong to an existing bookshelf
    // case ActionTypes.FETCH_DELETE_VOLUME_FROM_BOOKSHELF_SUCCESS:
    //   const { [action.payload.volume.id]: toDelete, ...nextState } = state;
    //   return nextState;

    default:
      return state;
  }
};

export const bookshelves = combineReducers({
  bookshelvesById,
  volumesByBookshelfId,
  volumesById
});

export const getBookshelves = ({
  bookshelvesById
}: BookshelvesState): Bookshelf[] => Object.values(bookshelvesById);

export const getBookshelfById = (
  { bookshelvesById }: BookshelvesState,
  id: string
) => bookshelvesById[id];

export const getVolumesByBookshelfId = (
  { volumesByBookshelfId, volumesById }: BookshelvesState,
  id: string
): Volume[] => (volumesByBookshelfId[id] || []).map(volumeId => volumesById[volumeId]);
