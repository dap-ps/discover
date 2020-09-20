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
import { makeSelectDappByName } from 'domain/Dapps/selectors';
import DiscoverDappView from 'components/views/modules/DiscoverDappView';
import { fetchDappsAction } from 'domain/Dapps/actions';

interface OwnProps {}

interface DispatchProps {
  fetchDapps: () => void;
}

interface RouteParams {
  dappname: string;
}

type Props = DispatchProps & OwnProps;

const DiscoverDappModule: React.FC<Props> = ({}: Props) => {
  const match: match<RouteParams> | null = useRouteMatch({
    path: ROUTE_LINKS.Discover(':dappname'),
    strict: true,
    sensitive: true,
  });
  const dapp = useSelector(
    makeSelectDappByName(match?.params.dappname as string),
  );
  return <DiscoverDappView dapp={dapp} />;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    fetchDapps: () => {
      dispatch(fetchDappsAction.request());
    },
  };
};

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect)(DiscoverDappModule);
