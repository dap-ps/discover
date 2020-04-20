export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export enum DAPP_CATEGORY  {
  EXCHANGES = 'EXCHANGES',
  MARKETPLACES = 'MARKETPLACES',
  COLLECTIBLES = 'COLLECTIBLES',
  GAMES = 'GAMES',
  SOCIAL_NETWORKS = 'SOCIAL_NETWORKS',
  UTILITIES = 'UTILITIES',
  OTHER = 'OTHER',
}

export const DAPP_CATEGORY_STRINGS: {
  [key: string]: string
} = {
  [DAPP_CATEGORY.EXCHANGES]: "Exchanges",
  [DAPP_CATEGORY.MARKETPLACES]: "Marketplaces",
  [DAPP_CATEGORY.COLLECTIBLES]: "Collectibles",
  [DAPP_CATEGORY.GAMES]: "Games",
  [DAPP_CATEGORY.SOCIAL_NETWORKS]: "Social Networks",
  [DAPP_CATEGORY.UTILITIES]: "Utilities",
  [DAPP_CATEGORY.OTHER]: "Other"
}

export enum DAPP_LIST {
  HIGHEST_RATED = `highest-rated`,
  RECENTLY_ADDED = `recently-added`,
}

export enum ROUTE_TYPE {
  CATEGORY = "Category",
  LIST = "List",
}
