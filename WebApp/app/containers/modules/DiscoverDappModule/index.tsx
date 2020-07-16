/**
 *
 * DiscoverDappModule
 *
 */

import React from 'react';
import { connect, useSelector } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { useRouteMatch, match } from 'react-router-dom';
import { ROUTE_LINKS } from 'routeLinks';
import { makeSelectDapp } from 'domain/Dapps/selectors';
import DiscoverDappView from 'components/views/modules/DiscoverDappView';

interface OwnProps {
}

interface DispatchProps {}

interface RouteParams {
  dappID: string;
}

type Props = DispatchProps & OwnProps;

const DiscoverDappModule: React.SFC<Props> = ({}: Props) => {
  const match: match<RouteParams> | null = useRouteMatch({
    path: ROUTE_LINKS.Discover(':dappID'),
    strict: true,
    sensitive: true,
  })
  const dapp = useSelector(makeSelectDapp(match?.params.dappID as string))

  return dapp ? <DiscoverDappView dapp={dapp} /> : <></>
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
  };
};

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect)(DiscoverDappModule);
