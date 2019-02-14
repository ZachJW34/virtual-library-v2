import React from 'react';
import { bindActionCreators } from 'redux';
import { Dispatch } from '../../constants/action-types';
import * as bookshelvesActions from '../../actions/bookshelves';
import { connect } from 'react-redux';

const TestComponent = (props: any) => {
  props.fetchBookshelves();

  return(
    <p>Test Component worked</p>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(bookshelvesActions, dispatch);

export default connect(null, mapDispatchToProps)(TestComponent);
