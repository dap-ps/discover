export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export enum DappCategories {
  Exchanges = "Exchanges",
  Marketplaces = "Marketplaces",
  Collectibles = "Collectibles",
  Games = "Games",
  SocialNetworks = "Social Networks",
  Utilities = "Utilities",
  Other = "Other"
}

export enum DappLists {
  highestRated = `highest-rated`,
  recentlyAdded = `recently-added`,
}
