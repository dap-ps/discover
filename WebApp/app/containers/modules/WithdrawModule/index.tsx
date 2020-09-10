/**
 *
 * WithdrawModule
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { useRouteMatch, match, Redirect } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import WithdrawModuleView from 'components/views/modules/WithdrawModuleView';

interface OwnProps {}

interface DispatchProps {}

interface RouteParams {
  dappname: string;
  voteType: string;
}

type Props = DispatchProps & RouteParams & OwnProps;

const WithdrawModule: React.SFC<Props> = (props: Props) => {
  const match: match<RouteParams> | null = useRouteMatch({
    path: ROUTE_LINKS.Withdraw(':dappname'),
    strict: true,
    sensitive: true,
  });

  return match?.params.dappname ? (
    <WithdrawModuleView dappname={match?.params.dappname} />
  ) : (
    <Redirect to={ROUTE_LINKS.Home} />
  );
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

export default compose()(WithdrawModule);
