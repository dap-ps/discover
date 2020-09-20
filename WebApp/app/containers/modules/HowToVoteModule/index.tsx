/**
 *
 * HowToVoteModule
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import HowToVotePage from 'components/views/pages/HowToVotePage';

interface OwnProps {}

interface DispatchProps {}

type Props = DispatchProps & OwnProps;

const HowToVoteModule: React.FC<Props> = (props: Props) => {
  return <HowToVotePage />;
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

export default compose(withConnect)(HowToVoteModule);
