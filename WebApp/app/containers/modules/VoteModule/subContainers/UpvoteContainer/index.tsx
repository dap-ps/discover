/**
 *
 * UpvoteContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, Dispatch } from 'redux';
import UpvoteView from 'components/views/modules/voteModule/UpvoteView';
import { ApplicationRootState } from 'types';
import { RootState } from 'domain/App/types';
import { IDapp } from 'domain/Dapps/types';
import { TOKENS } from 'utils/constants';
import { upvoteDappAction } from 'domain/Dapps/actions';

interface OwnProps {
  dapp: IDapp;
}

interface DispatchProps {
  upvote: (dapp: IDapp, amount: number, token: TOKENS) => void;
}

interface StateProps {}

type Props = StateProps & DispatchProps & OwnProps;

const UpvoteContainer: React.FC<Props> = ({ dapp, upvote }: Props) => {
  return <UpvoteView upvote={upvote} dapp={dapp} />;
};

const mapStateToProps = (state: ApplicationRootState, props: OwnProps) =>
  createStructuredSelector<RootState, StateProps>({});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    upvote: (dapp: IDapp, amount: number, token: TOKENS) => {
      dispatch(
        upvoteDappAction.request({
          desc: dapp.desc,
          amount: amount,
          token: token,
          icon: dapp.icon,
          id: dapp.id,
          name: dapp.name,
        }),
      );
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UpvoteContainer);
