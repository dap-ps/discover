/**
 *
 * VoteModule
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, Dispatch } from 'redux';
import VoteModuleView from 'components/views/modules/voteModule/VoteModuleView';

interface OwnProps {
  upvote: boolean
}

interface DispatchProps {
}

interface StateProps {
}

type Props = StateProps & DispatchProps & OwnProps;

const VoteModule: React.SFC<Props> = ({
  upvote
}: Props) => {
  return <VoteModuleView upvote={upvote} />
};

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VoteModule);
