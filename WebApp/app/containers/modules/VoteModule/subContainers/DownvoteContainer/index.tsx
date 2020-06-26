/**
 *
 * DownvoteContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, Dispatch } from 'redux';
import DownvoteView from 'components/views/modules/voteModule/DownvoteView';

interface OwnProps {}

interface DispatchProps {}

interface StateProps {}

type Props = StateProps & DispatchProps & OwnProps;

const DownvoteContainer: React.SFC<Props> = (props: Props) => {
  return <DownvoteView />
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DownvoteContainer);
