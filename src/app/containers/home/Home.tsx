import { CircularProgress } from "@material-ui/core";
import { ConnectedRouterProps, push } from "connected-react-router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import styles from "./Home.module.css";
import * as bookshelvesActions from "../../actions/bookshelves";
import { Dispatch, LOADING_TYPES } from "../../constants/action-types";
import { getUpdateState, State, getBookshelves } from "../../reducers";
import { isAccessTokenValid } from "../../utils/tokenHelper";
import BookshelvesComponent from "../bookshelves/Bookshelves";
import { Bookshelf } from "../../models/google-bookshelves";

type Props = {
  push: typeof push;
  fetchBookshelves: typeof bookshelvesActions.fetchBookshelves;
  updateState: { isLoading: boolean; isError: boolean };
  bookshelves: Bookshelf[];
} & ConnectedRouterProps;

const HomeComponent: FunctionComponent<Props> = props => {
  const redirect = !isAccessTokenValid() ? <Redirect to="/login" /> : null;
  const [startTab, setStartTab] = useState(
    ((res: RegExpMatchArray | null) => (res ? res[1] : undefined))(
      props.history.location.pathname.match(/\/home\/bookshelves\/(\d+)/)
    )
  );

  useEffect(() => {
    props.fetchBookshelves();
  }, []);

  return (
    <div className={styles.container}>
      {redirect}
      {props.updateState.isLoading ? (
        <CircularProgress />
      ) : props.updateState.isError ? (
        "Error"
      ) : (
        <BookshelvesComponent
          startTab={startTab}
          bookshelves={props.bookshelves}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: any) => ({
  updateState: getUpdateState(state, [LOADING_TYPES.FETCH_BOOKSHELVES]),
  bookshelves: getBookshelves(state),
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...bookshelvesActions, push }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
