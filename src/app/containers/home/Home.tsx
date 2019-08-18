import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import styles from "./Home.module.css";
import * as bookshelvesActions from "../../actions/bookshelves";
import * as driveActions from '../../actions/drive';
import { LOADING_TYPES } from "../../constants/action-types";
import { getUpdateState, State } from "../../reducers";
import { isAccessTokenValid } from "../../utils/tokenHelper";
import Bookshelves from "../bookshelves/Bookshelves";
import { RouteComponentProps } from "react-router";
import Volume from '../volume/volume';
import { createDriveRoot } from "../../utils/driveHelper";

const HomeComponent: FunctionComponent<RouteComponentProps> = props => {
  if (!isAccessTokenValid()) {
    props.history.push('/login');
  }

  const [initialLoad, setInitialLoad] = useState(true);

  const updateState = useSelector((state: State) =>
    getUpdateState(state, [LOADING_TYPES.FETCH_BOOKSHELVES, LOADING_TYPES.FETCH_ROOT_FOLDER])
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bookshelvesActions.fetchBookshelves());
    dispatch(driveActions.fetchRootFolder())
    setInitialLoad(false)
  }, []);

  const redirect = !isAccessTokenValid() ? <Redirect to="/login" /> : null;

  const home = (
    <div>
      <Link to={props.match.path + "/bookshelves"}>
        <button>Bookshelves</button>
      </Link>
    </div>
  );

  return (
    <div className={styles.container}>
      {(updateState.isLoading || initialLoad) ? (
        <CircularProgress />
      ) : updateState.isError ? (
        "Error"
      ) : (
        <Switch>
          <Route exact={true} path={props.match.path} render={() => home} />
          <Route
            path={props.match.path + "/bookshelves"}
            component={Bookshelves}
          />
          <Route path={props.match.path + '/volume/:id'} component={Volume}/>
        </Switch>
      )}
    </div>
    // <div className={styles.container}>
    //   {redirect}
    //   {updateState.isLoading ? (
    //     <CircularProgress />
    //   ) : updateState.isError ? (
    //     "Error"
    //   ) : (
    //     <Switch>
    //       <Route path="/home/bookshelves" component={Bookshelves} />
    //     </Switch>
    //     // <Bookshelves startTab={startTab} bookshelves={bookshelves} />
    //   )}
    //   {/* <Test></Test> */}
    // </div>
  );
};

export default HomeComponent;
