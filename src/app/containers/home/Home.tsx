import { CircularProgress } from '@material-ui/core';
import { ConnectedRouterProps, push } from 'connected-react-router';
import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as bookshelvesActions from '../../actions/bookshelves';
import { Dispatch, LOADING_TYPES } from '../../constants/action-types';
import { getUpdateState, State } from '../../reducers';
import { isAccessTokenValid } from '../../utils/tokenHelper';
import Bookshelves from '../bookshelves/Bookshelves';

type Props = {
  push: typeof push;
  fetchBookshelves: typeof bookshelvesActions.fetchBookshelves;
  updateState: { isLoading: boolean; isError: boolean };
} & ConnectedRouterProps;

const HomeComponent: FunctionComponent<Props> = props => {
  const redirect = !isAccessTokenValid() ? <Redirect to="/login" /> : null;
  console.log(props.updateState);

  useEffect(() => {
    console.log('Lifecycle test');
    props.fetchBookshelves();
  }, []);

  const mainTemplate = (
    <>
      <Link to="/home/bookshelves">Bookshelves</Link>
      <Route path="/home/bookshelves" component={Bookshelves} />
    </>
  );

  return (
    <div>
      {redirect}
      {props.updateState.isLoading ? (
        <CircularProgress />
      ) : props.updateState.isError ? (
        "Error"
      ) : (
        mainTemplate
      )}
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: any) => ({
  updateState: getUpdateState(state, [LOADING_TYPES.FETCH_BOOKSHELVES]),
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...bookshelvesActions, push }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
