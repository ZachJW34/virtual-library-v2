import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bookshelf } from '../../models/google-bookshelves';
import { Volume } from '../../models/google-volumes';
import { getVolumesByBookshelfId, State } from '../../reducers';

type Props = {
  bookshelf: Bookshelf;
  volumes: Volume[];
};

const BookshelfTile: React.FC<Props> = props => {
  console.log(props);

  return (
    <Link to={`/home/bookshelves/${props.bookshelf.id}`}>
      <button>{props.bookshelf.title}</button>
    </Link>
  );
};

const mapStateToProps = (
  state: State,
  ownProps: { bookshelf: Bookshelf }
) => ({
  volumes: getVolumesByBookshelfId(state, ownProps.bookshelf.id),
  ...ownProps
});

export default connect(mapStateToProps, null)(BookshelfTile);
