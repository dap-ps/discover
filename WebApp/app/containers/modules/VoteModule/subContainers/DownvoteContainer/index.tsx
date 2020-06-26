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
  dappID: string
}

interface DispatchProps {}

interface StateProps {
  dapp: IDapp | undefined
}

type Props = StateProps & DispatchProps & OwnProps;

const DownvoteContainer: React.SFC<Props> = ({
  dapp
}: Props) => {
  return dapp ? <DownvoteView
    dapp={dapp}
  /> :
  <></>
};

const mapStateToProps = (state: ApplicationRootState, props: OwnProps) => createStructuredSelector<RootState, StateProps>({
  dapp: makeSelectDapp(props.dappID)
})

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
