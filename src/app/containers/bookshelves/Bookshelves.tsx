import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Bookshelf } from '../../models/google-bookshelves';
import { getBookshelves, State } from '../../reducers';
import BookshelfVolumes from '../bookshelf-volumes/BookshelfVolumes';

type Props = {
  bookshelves: Bookshelf[];
};

const BookshelvesComponent: FunctionComponent<Props> = props => {

  return (
    <div>
      {props.bookshelves.map(bookshelf => (
        <Link key={bookshelf.id} to={`/home/bookshelves/${bookshelf.id}`}>
          <button>{bookshelf.title}</button>
        </Link>
      ))}
      <Route path="/home/bookshelves/:bookshelfId" component={BookshelfVolumes} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  bookshelves: getBookshelves(state)
});

export default connect(
  mapStateToProps,
  null
)(BookshelvesComponent);
