import { SvgIconProps } from '@material-ui/core/SvgIcon';
import HomePage from 'containers/pages/HomePage';
import { ROUTE_LINKS } from 'routeLinks';

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
  },
  {
    name: 'Marketplaces',
    path: ROUTE_LINKS.categories.Marketplaces,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
  },
  {
    name: 'Collectibles',
    path: ROUTE_LINKS.categories.Collectibles,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
  },
  {
    name: 'Games',
    path: ROUTE_LINKS.categories.Games,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
  },
  {
    name: 'Social Networks',
    path: ROUTE_LINKS.categories.SocialNetworks,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
  },
  {
    name: 'Utilities',
    path: ROUTE_LINKS.categories.Utilities,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
  },
  {
    name: 'Other',
    path: ROUTE_LINKS.categories.Other,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
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
