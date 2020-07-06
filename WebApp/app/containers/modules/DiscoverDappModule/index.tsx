/**
 *
 * DiscoverDappModule
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, Dispatch } from 'redux';

interface OwnProps {}

interface DispatchProps {}

interface StateProps {}

type Props = StateProps & DispatchProps & OwnProps;

const DiscoverDappModule: React.SFC<Props> = (props: Props) => {
  // TODO Fetch dapp
  return <Fragment>DiscoverDappModule</Fragment>;
};

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    dispatch: dispatch,
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DiscoverDappModule);
