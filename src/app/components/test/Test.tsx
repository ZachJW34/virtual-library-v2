import React, { FunctionComponent } from 'react';
// import { connect } from 'react-redux';
// import { State } from '../../reducers';

// type Props = {
//   accessToken: string;
// }

// const TestComponent: FunctionComponent<Props> = props => {
//   const headers = {
//     Authorization: `Bearer ${props.accessToken}`
//   };

//   fetch("drive", { headers }).then(res => res.json()).then(res => console.log(res))

//   return (
//     <p>Testing Google Drive API</p>
//   );
// };

// const mapStateToProps = (state: State, ownProps: any) => {
//   return {
//     accessToken: state.auth.access_token,
//     ...ownProps
//   };
// };

// export default connect(
//   mapStateToProps,
//   null
// )(TestComponent);
