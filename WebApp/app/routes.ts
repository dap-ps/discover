import { ROUTE_LINKS } from 'routeLinks';

import StarIcon from './images/icons/star.svg';
import ClockIcon from './images/icons/clock.svg';
import {
  ROUTE_TYPE,
  DAPP_CATEGORY,
  DAPP_CATEGORY_ICONS,
} from 'utils/constants';
import DAppManagementContainer from 'containers/modules/DAppManagementContainer';
import VoteModule from 'containers/modules/VoteModule';
import { FunctionComponent, ReactNode, ComponentType } from 'react';
import HowToVoteModule from 'containers/modules/HowToVoteModule';
import DiscoverDappModule from 'containers/modules/DiscoverDappModule';
import Landing from 'components/views/pages/Landing';
import WithdrawModule from 'containers/modules/WithdrawModule';
import CategoryModule from 'containers/modules/CategoryModule';

export interface AppRoute {
  name: string;
  path: string;
  component: ComponentType<any>;
  isProtected: boolean;
  isNavRequired: boolean;
  routeNavLinkIcon?: FunctionComponent<ReactNode>; // Should be provided if Nav is required
  routeType?: ROUTE_TYPE;
  modalComponent?: FunctionComponent<any>;
}

const routes: AppRoute[] = [
  {
    name: 'Home',
    path: ROUTE_LINKS.Home,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
  },

  {
    name: 'Create DApp',
    path: ROUTE_LINKS.CreateDApp,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    modalComponent: DAppManagementContainer,
  },

  {
    name: 'Discover DApp',
    path: ROUTE_LINKS.Discover(':dappname'),
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    modalComponent: DiscoverDappModule,
  },

  {
    name: 'Update DApp',
    path: ROUTE_LINKS.UpdateDApp(':dappname'),
    component: Landing,
    isProtected: true, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    modalComponent: DAppManagementContainer,
  },

  {
    name: 'Withdraw',
    path: ROUTE_LINKS.Withdraw(':dappname'),
    component: Landing,
    isProtected: true, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    modalComponent: WithdrawModule,
  },

  {
    name: 'Vote on DApp',
    path: ROUTE_LINKS.Vote(':dappname', ':voteType'),
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    modalComponent: VoteModule,
  },

  {
    name: 'How to vote',
    path: ROUTE_LINKS.HowToVote,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    modalComponent: HowToVoteModule,
  },

  // Categories
  {
    name: 'All ÐApps',
    path: ROUTE_LINKS.categories.All,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    modalComponent: CategoryModule,
  },
  {
    name: 'Exchanges',
    path: ROUTE_LINKS.categories.EXCHANGES,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.EXCHANGES].minimal,
    modalComponent: CategoryModule,
  },
  {
    name: 'Marketplaces',
    path: ROUTE_LINKS.categories.MARKETPLACES,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.MARKETPLACES].minimal,
    modalComponent: CategoryModule,
  },
  {
    name: 'Collectibles',
    path: ROUTE_LINKS.categories.COLLECTIBLES,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.COLLECTIBLES].minimal,
    modalComponent: CategoryModule,
  },
  {
    name: 'Games',
    path: ROUTE_LINKS.categories.GAMES,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: false, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.GAMES].minimal,
    modalComponent: CategoryModule,
  },
  {
    name: 'Social Networks',
    path: ROUTE_LINKS.categories.SOCIAL_NETWORKS,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon:
    DAPP_CATEGORY_ICONS[DAPP_CATEGORY.SOCIAL_NETWORKS].minimal,
    modalComponent: CategoryModule,
  },
  {
    name: 'Utilities',
    path: ROUTE_LINKS.categories.UTILITIES,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.UTILITIES].minimal,
    modalComponent: CategoryModule,
  },
  {
    name: 'Other',
    path: ROUTE_LINKS.categories.OTHER,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.CATEGORY,
    routeNavLinkIcon: DAPP_CATEGORY_ICONS[DAPP_CATEGORY.OTHER].minimal,
    modalComponent: CategoryModule,
  },
  // List
  {
    name: 'Highest rated',
    path: ROUTE_LINKS.lists.highestRated,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.LIST,
    routeNavLinkIcon: StarIcon,
  },
  {
    name: 'Recently added',
    path: ROUTE_LINKS.lists.recentlyAdded,
    component: Landing,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
    routeType: ROUTE_TYPE.LIST,
    routeNavLinkIcon: ClockIcon,
  },
];

export default routes;
