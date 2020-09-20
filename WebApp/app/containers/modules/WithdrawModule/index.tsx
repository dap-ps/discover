/**
 *
 * WithdrawModule
 *
 */

import React from 'react';
import { compose } from 'redux';
import { useRouteMatch, match, Redirect } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import WithdrawModuleView from 'components/views/modules/WithdrawModuleView';

interface RouteParams {
  dappname: string;
  voteType: string;
}

type Props = RouteParams;

const WithdrawModule: React.FC<Props> = (props: Props) => {
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

export default compose()(WithdrawModule);
