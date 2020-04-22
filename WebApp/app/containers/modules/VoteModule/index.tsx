/**
 *
 * VoteModule
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, Dispatch } from 'redux';
import { makeSelectModalState } from 'domain/App/selectors';
import { MODAL_COMPONENTS } from 'domain/App/constants';
import VoteModuleView from 'components/module-markup/voteModule/VoteModuleView';
import { setModalAction } from 'domain/App/actions';

interface OwnProps {}

interface DispatchProps {
  setModal(
    component: MODAL_COMPONENTS
  ): void;
}

interface StateProps {
  modalState: MODAL_COMPONENTS
}

type Props = StateProps & DispatchProps & OwnProps;

const VoteModule: React.SFC<Props> = (props: Props) => {
  const {
    modalState,
    setModal
  } = props;
  return <VoteModuleView setModal={setModal} modalState={modalState} />
};

const mapStateToProps = createStructuredSelector({
  modalState: makeSelectModalState
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    setModal:(component: MODAL_COMPONENTS) => {
      dispatch(setModalAction(component))
    }
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VoteModule);
