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
import { makeSelectDapp } from 'domain/Dapps/selectors';
import { ApplicationRootState } from 'types';
import { RootState } from 'domain/App/types';
import { IDapp } from 'domain/Dapps/types';

interface OwnProps {
  dappID: string;
}

interface DispatchProps {
  downvote: (dappId: string) => void
}

interface StateProps {
  dapp: IDapp | undefined;
}

type Props = StateProps & DispatchProps & OwnProps;

const DownvoteContainer: React.SFC<Props> = ({ dapp, downvote }: Props) => {
  return dapp ? <DownvoteView downvote={downvote} dapp={dapp} /> : <></>;
};

const mapStateToProps = (state: ApplicationRootState, props: OwnProps) =>
  createStructuredSelector<RootState, StateProps>({
    dapp: makeSelectDapp(props.dappID),
  });

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    downvote: (dappId: string) => {
      // TODO: wire to saga
      console.log('downvote', dappId)
    }
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DownvoteContainer);
