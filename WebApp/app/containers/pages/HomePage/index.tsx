/**
 *
 * DashboardPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import Landing from 'components/views/pages/Landing';
import { makeSelectDapps } from 'domain/Dapps/selectors';
import { RootState } from 'domain/App/types';
import { createStructuredSelector } from 'reselect';
import { IDapp } from 'domain/Dapps/types';

interface OwnProps {}

interface DispatchProps {}

interface StateProps {
  dapps: IDapp[];
}

type Props = DispatchProps & StateProps & OwnProps;

const HomePage: React.SFC<Props> = ({ dapps }: Props) => {
  return <Landing dapps={dapps} />;
};

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  dapps: makeSelectDapps(),
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {};
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);
