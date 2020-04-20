import HomePage from 'containers/pages/HomePage';
import { ROUTE_LINKS } from 'routeLinks';
import MarketplacesIcon from './images/icons/categories/marketplaces-minimal.svg';
import CollectiblesIcon from './images/icons/categories/collectibles-minimal.svg';
import ExchangesIcon from './images/icons/categories/exchanges-minimal.svg';
import GamesIcon from './images/icons/categories/games-minimal.svg';
import SocialNetworksIcon from './images/icons/categories/social-networks-minimal.svg';
import UtilitiesIcon from './images/icons/categories/utilities-minimal.svg';
import OtherIcon from './images/icons/categories/other-minimal.svg';

import StarIcon from './images/icons/star.svg';
import ClockIcon from './images/icons/clock.svg';
import { ROUTE_TYPE } from 'utils/constants';

export interface AppRoute {
  name: string;
  path: string;
  component: React.ComponentType<any>;
  isProtected: boolean;
  isNavRequired: boolean;
  routeNavLinkIcon?: React.FunctionComponent<React.ReactNode>; // Should be provided if Nav is required
  routeType?: ROUTE_TYPE
}

const routes: AppRoute[] = [
  {
    name: 'Home',
    path: ROUTE_LINKS.Home,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
  },
  // Categories
  {
    name: 'All Dapps',
    path: ROUTE_LINKS.categories.Exchanges,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
  },
  {
    name: 'Exchanges',
    path: ROUTE_LINKS.categories.Exchanges,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: ExchangesIcon
  },
  {
    name: 'Marketplaces',
    path: ROUTE_LINKS.categories.Marketplaces,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: MarketplacesIcon
  },
  {
    name: 'Collectibles',
    path: ROUTE_LINKS.categories.Collectibles,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: CollectiblesIcon
  },
  {
    name: 'Games',
    path: ROUTE_LINKS.categories.Games,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: GamesIcon
  },
  {
    name: 'Social Networks',
    path: ROUTE_LINKS.categories.SocialNetworks,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: SocialNetworksIcon
  },
  {
    name: 'Utilities',
    path: ROUTE_LINKS.categories.Utilities,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: UtilitiesIcon
  },
  {
    name: 'Other',
    path: ROUTE_LINKS.categories.Other,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: OtherIcon
  },
  // List
  {
    name: 'Highest rated',
    path: ROUTE_LINKS.lists.highestRated,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.LIST,
    routeNavLinkIcon: StarIcon
  },
  {
    name: 'Recently added',
    path: ROUTE_LINKS.lists.recentlyAdded,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.LIST,
    routeNavLinkIcon: ClockIcon
  },
];

export default routes;
