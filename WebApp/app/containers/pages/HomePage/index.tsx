/**
 *
 * DashboardPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import Landing from 'components/views/pages/Landing';

interface OwnProps {}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps;

const HomePage: React.SFC<Props> = (props: Props) => {
  const {
  } = props;

  return <Landing />;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {

  };
};

const withConnect = connect(
  mapDispatchToProps,
  null,
);

export default compose(withConnect)(HomePage);
