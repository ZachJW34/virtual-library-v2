import { CircularProgress } from '@material-ui/core';
import { ConnectedRouterProps, push } from 'connected-react-router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './Home.module.css';
import * as bookshelvesActions from '../../actions/bookshelves';
import { LOADING_TYPES } from '../../constants/action-types';
import { getBookshelves, getUpdateState, State } from '../../reducers';
import { isAccessTokenValid } from '../../utils/tokenHelper';
import BookshelvesComponent from '../bookshelves/Bookshelves';
import Test from '../test/Test';

type Props = {
  push: typeof push;
} & ConnectedRouterProps;

const HomeComponent: FunctionComponent<Props> = props => {
  const bookshelves = useSelector(getBookshelves);
  const updateState = useSelector((state: State) =>
    getUpdateState(state, [LOADING_TYPES.FETCH_BOOKSHELVES])
  );
  const dispatch = useDispatch();

  const redirect = !isAccessTokenValid() ? <Redirect to="/login" /> : null;
  const [startTab, setStartTab] = useState(
    ((res: RegExpMatchArray | null) => (res ? res[1] : undefined))(
      props.history.location.pathname.match(/\/home\/bookshelves\/(\d+)/)
    )
  );

  useEffect(() => {
    dispatch(bookshelvesActions.fetchBookshelves());
  }, []);

  return (
    <div className={styles.container}>
      {redirect}
      {updateState.isLoading ? (
        <CircularProgress />
      ) : updateState.isError ? (
        "Error"
      ) : (
        <BookshelvesComponent startTab={startTab} bookshelves={bookshelves} />
      )}
      <Test></Test>
    </div>
  );
};

export default HomeComponent;
