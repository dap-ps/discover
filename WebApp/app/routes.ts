import HomePage from 'containers/pages/HomePage';
import { ROUTE_LINKS } from 'routeLinks';


import StarIcon from './images/icons/star.svg';
import ClockIcon from './images/icons/clock.svg';
import { ROUTE_TYPE, DAPP_CATEGORY, DAPP_CATEGORY_ICONS } from 'utils/constants';
import DAppManagementContainer from 'containers/modules/DAppManagementContainer';

export interface AppRoute {
  name: string;
  path: string;
  component: React.ComponentType<any>;
  isProtected: boolean;
  isNavRequired: boolean;
  routeNavLinkIcon?: React.FunctionComponent<React.ReactNode>; // Should be provided if Nav is required
  routeType?: ROUTE_TYPE
  ModalComponent?: React.ComponentType<any>;
}

const routes: AppRoute[] = [
  {
    name: 'Home',
    path: ROUTE_LINKS.Home,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
  },

  {
    name: 'Create DApp',
    path: ROUTE_LINKS.CreateDApp,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    ModalComponent: DAppManagementContainer
  },

  {
    name: 'Update DApp',
    path: ROUTE_LINKS.UpdateDApp,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    ModalComponent: DAppManagementContainer
  },

  {
    name: 'Upvote DApp',
    path: ROUTE_LINKS.UpvoteDApp,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
  },

  {
    name: 'Downvote DApp',
    path: ROUTE_LINKS.DownvoteDApp,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
  },

  // Categories
  {
    name: 'All ÐApps',
    path: ROUTE_LINKS.categories.All,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
  },
  {
    name: 'Exchanges',
    path: ROUTE_LINKS.categories.EXCHANGES,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.EXCHANGES].minimal
  },
  {
    name: 'Marketplaces',
    path: ROUTE_LINKS.categories.MARKETPLACES,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.MARKETPLACES].minimal
  },
  {
    name: 'Collectibles',
    path: ROUTE_LINKS.categories.COLLECTIBLES,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.COLLECTIBLES].minimal
  },
  {
    name: 'Games',
    path: ROUTE_LINKS.categories.GAMES,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.GAMES].minimal
  },
  {
    name: 'Social Networks',
    path: ROUTE_LINKS.categories.SOCIAL_NETWORKS,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.SOCIAL_NETWORKS].minimal
  },
  {
    name: 'Utilities',
    path: ROUTE_LINKS.categories.UTILITIES,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.UTILITIES].minimal
  },
  {
    name: 'Other',
    path: ROUTE_LINKS.categories.OTHER,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.OTHER].minimal
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
