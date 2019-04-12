import { push } from 'connected-react-router';
import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import BookshelfTile from '../../components/bookshelf-tile/BookshelfTile';
import { Dispatch } from '../../constants/action-types';
import { Bookshelf } from '../../models/google-bookshelves';
import { getBookshelves, State } from '../../reducers';
import BookshelfVolumes from '../bookshelf-volumes/BookshelfVolumes';

type Props = {
  bookshelves: Bookshelf[];
  push: typeof push;
};

const BookshelvesComponent: FunctionComponent<Props> = props => {
  return (
    <div>
      {props.bookshelves.map(bookshelf => (
        <BookshelfTile key={bookshelf.id} bookshelf={bookshelf} />
      ))}
      <Route
        path="/home/bookshelves/:bookshelfId"
        component={BookshelfVolumes}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  bookshelves: getBookshelves(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ push }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookshelvesComponent);
