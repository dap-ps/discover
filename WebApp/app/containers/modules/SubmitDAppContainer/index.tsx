/**
 *
 * SubmitDAppContainer
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

interface OwnProps {}

interface DispatchProps {}

type Props = DispatchProps & OwnProps;

const SubmitDAppContainer: React.SFC<Props> = (props: Props) => {
  return <Fragment>SubmitDAppContainer</Fragment>;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    dispatch: dispatch,
  };
};

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect)(SubmitDAppContainer);
