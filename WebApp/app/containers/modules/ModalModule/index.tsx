/**
 *
 * ModalModule
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RootState } from 'domain/App/types';
import { makeSelectModalState } from 'domain/App/selectors';
import { MODAL_COMPONENTS } from 'domain/App/constants';
import ModalView from 'components/module-markup/ModalView';
import SubmitDAppContainer from '../SubmitDAppContainer';
import VoteModule from '../VoteModule';
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

type Props = DispatchProps & StateProps & OwnProps;

const ModalModule: React.SFC<Props> = (props: Props) => {
  const {
    modalState,
    setModal
  } = props;
  return <ModalView setModal={setModal} active={modalState !== MODAL_COMPONENTS.CLEAR}>
    {
      modalState === MODAL_COMPONENTS.SUBMIT_DAPP && <SubmitDAppContainer />
    }
    {
      modalState === MODAL_COMPONENTS.UPVOTE || modalState === MODAL_COMPONENTS.DOWNVOTE && <VoteModule />
    }
  </ModalView>;
};

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

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  modalState: makeSelectModalState
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ModalModule);
