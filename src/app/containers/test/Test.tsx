import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookshelvesActions from '../../actions/bookshelves';
import { Dispatch } from '../../constants/action-types';

type TestComponentProps = typeof bookshelvesActions;

const TestComponent = (props: TestComponentProps) => {
  const getBookshelves = () => {
    props.fetchBookshelves();
  };

  return <button onClick={getBookshelves}>Get Bookshelves</button>;
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(bookshelvesActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(TestComponent);
