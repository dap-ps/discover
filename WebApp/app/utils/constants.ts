export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

import MarketplacesMinimalIcon from '../images/icons/categories/marketplaces-minimal.svg';
import MarketplacesIcon from '../images/icons/categories/marketplaces.svg';
import CollectiblesMinimalIcon from '../images/icons/categories/collectibles-minimal.svg';
import CollectiblesIcon from '../images/icons/categories/collectibles.svg';
import ExchangesMinimalIcon from '../images/icons/categories/exchanges-minimal.svg';
import ExchangesIcon from '../images/icons/categories/exchanges.svg';
import GamesMinimalIcon from '../images/icons/categories/games-minimal.svg';
import GamesIcon from '../images/icons/categories/games.svg';
import SocialNetworksMinimalIcon from '../images/icons/categories/social-networks-minimal.svg';
import SocialNetworksIcon from '../images/icons/categories/social-networks.svg';
import UtilitiesMinimalIcon from '../images/icons/categories/utilities-minimal.svg';
import UtilitiesIcon from '../images/icons/categories/utilities.svg';
import OtherMinimalIcon from '../images/icons/categories/other-minimal.svg';
import OtherIcon from '../images/icons/categories/other.svg';

// While this is quite monolythic, enums for types seem to only compile properly from here for an unknown reason
// TODO: Resolve monolythic structure

export enum TRANSACTION_STATUS {
  SUCCESS = 'success',
  FAILURE = 'failure',
  PENDING = 'pending',
}

export enum ERROR_CODES {
  Void = 'Void',
}

export enum DB_TABLES {
  DB_NAME = 'status_discover',
  DB_STORE_DAPPS = 'store_dapps',
}

export enum DAPP_STATUS {
  NEW = 'NEW',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

export enum DAPP_CATEGORY {
  EXCHANGES = 'EXCHANGES',
  MARKETPLACES = 'MARKETPLACES',
  COLLECTIBLES = 'COLLECTIBLES',
  GAMES = 'GAMES',
  SOCIAL_NETWORKS = 'SOCIAL_NETWORKS',
  UTILITIES = 'UTILITIES',
  OTHER = 'OTHER',
}

export const DAPP_CATEGORY_ICONS: {
  [key: string]: {
    base: any;
    minimal: any;
  };
} = {
  [DAPP_CATEGORY.EXCHANGES]: {
    base: ExchangesIcon,
    minimal: ExchangesMinimalIcon,
  },
  [DAPP_CATEGORY.MARKETPLACES]: {
    base: MarketplacesIcon,
    minimal: MarketplacesMinimalIcon,
  },
  [DAPP_CATEGORY.COLLECTIBLES]: {
    base: CollectiblesIcon,
    minimal: CollectiblesMinimalIcon,
  },
  [DAPP_CATEGORY.GAMES]: {
    base: GamesIcon,
    minimal: GamesMinimalIcon,
  },
  [DAPP_CATEGORY.SOCIAL_NETWORKS]: {
    base: SocialNetworksIcon,
    minimal: SocialNetworksMinimalIcon,
  },
  [DAPP_CATEGORY.UTILITIES]: {
    base: UtilitiesIcon,
    minimal: UtilitiesMinimalIcon,
  },
  [DAPP_CATEGORY.OTHER]: {
    base: OtherIcon,
    minimal: OtherMinimalIcon,
  },
};

export const DAPP_CATEGORY_STRINGS: {
  [key: string]: string;
} = {
  [DAPP_CATEGORY.EXCHANGES]: 'Exchanges',
  [DAPP_CATEGORY.MARKETPLACES]: 'Marketplaces',
  [DAPP_CATEGORY.COLLECTIBLES]: 'Collectibles',
  [DAPP_CATEGORY.GAMES]: 'Games',
  [DAPP_CATEGORY.SOCIAL_NETWORKS]: 'Social Networks',
  [DAPP_CATEGORY.UTILITIES]: 'Utilities',
  [DAPP_CATEGORY.OTHER]: 'Other',
};

export enum DAPP_LIST {
  HIGHEST_RATED = `highest-rated`,
  RECENTLY_ADDED = `recently-added`,
}

export enum ROUTE_TYPE {
  CATEGORY = 'Category',
  LIST = 'List',
}

export enum TOKENS {
  SNT = 'SNT',
  DAI = 'DAI',
}
