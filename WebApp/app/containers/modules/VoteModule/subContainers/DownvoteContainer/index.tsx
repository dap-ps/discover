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
import { ApplicationRootState } from 'types';
import { RootState } from 'domain/App/types';
import { IDapp } from 'domain/Dapps/types';
import { downvoteDappAction } from 'domain/Dapps/actions';

interface OwnProps {
  dapp: IDapp;
}

interface DispatchProps {
  downvote: (dapp: IDapp) => void;
}

interface StateProps {}

type Props = StateProps & DispatchProps & OwnProps;

const DownvoteContainer: React.FC<Props> = ({ dapp, downvote }: Props) => {
  return <DownvoteView downvote={downvote} dapp={dapp} />;
};

const mapStateToProps = (state: ApplicationRootState, props: OwnProps) =>
  createStructuredSelector<RootState, StateProps>({});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    downvote: (dapp: IDapp) => {
      dispatch(
        downvoteDappAction.request({
          desc: dapp.desc,
          icon: dapp.icon,
          id: dapp.id,
          name: dapp.name,
        }),
      );
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DownvoteContainer);
