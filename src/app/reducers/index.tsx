import { combineReducers } from 'redux';
import { auth, AuthState } from './auth';
import { bookshelves, BookshelvesState } from './bookshelves';
import { error, loading } from './common';
import { router } from './history';

export type State = {
  auth: AuthState;
  router: any;
  laoding: { [key: string]: boolean };
  error: { [key: string]: boolean };
  bookshelves: BookshelvesState;
};

export const rootReducer = combineReducers({
  router,
  auth,
  loading,
  error,
  bookshelves
});
