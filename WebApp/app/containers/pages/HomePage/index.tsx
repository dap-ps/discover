/**
 *
 * DashboardPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import Landing from 'components/views/Landing';

interface OwnProps {}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps;

const HomePage: React.SFC<Props> = (props: Props) => {
  const {
  } = props;

  // handle logic to recognize the connector currently being activated
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
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
