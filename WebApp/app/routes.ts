import { SvgIconProps } from '@material-ui/core/SvgIcon';
import HomePage from 'containers/pages/HomePage';
import { ROUTE_LINKS } from 'routeLinks';
import MarketplacesIcon from './images/icons/categories/marketplaces.svg';
import CollectiblesIcon from './images/icons/categories/collectibles.svg';
import ExchangesIcon from './images/icons/categories/exchanges.svg';
import GamesIcon from './images/icons/categories/games.svg';
import SocialNetworksIcon from './images/icons/categories/social-networks.svg';
import UtilitiesIcon from './images/icons/categories/utilities.svg';
import OtherIcon from './images/icons/categories/other.svg';

enum ROUTE_TYPE {
  CATEGORY = "Category",
  LIST = "List",
}

export interface AppRoute {
  name: string;
  path: string;
  component: React.ComponentType<any>;
  isProtected: boolean;
  isNavRequired: boolean;
  routeNavLinkIcon?: React.ComponentType<SvgIconProps>; // Should be provided if Nav is required
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
  },
  {
    name: 'Recently added',
    path: ROUTE_LINKS.lists.recentlyAdded,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.LIST,
  },
];

export default routes;
