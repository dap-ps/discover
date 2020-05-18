import { DAPP_CATEGORY_STRINGS, DAPP_CATEGORY, DAPP_LIST } from "utils/constants";

export const ROUTE_LINKS = {
  Home: `/`,
  Discover: (dappID:string) => `/Discover/${dappID}`, // TODO: Implement single view
  categories: {
    All: `/category/`,
    [DAPP_CATEGORY.EXCHANGES]: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.EXCHANGES]}`.toLowerCase(),
    [DAPP_CATEGORY.MARKETPLACES]: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.MARKETPLACES]}`.toLowerCase(),
    [DAPP_CATEGORY.COLLECTIBLES]: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.COLLECTIBLES]}`.toLowerCase(),
    [DAPP_CATEGORY.GAMES]: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.GAMES]}`.toLowerCase(),
    [DAPP_CATEGORY.SOCIAL_NETWORKS]: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.SOCIAL_NETWORKS]}`.replace(' ', '-').toLowerCase(),
    [DAPP_CATEGORY.UTILITIES]: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.UTILITIES]}`.toLowerCase(),
    [DAPP_CATEGORY.OTHER]: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.OTHER]}`.toLowerCase(),
  },
  lists: {
    // highestRated: `/list/highest-rated`,
    // recentlyAdded: `/list/recently-added`,
    highestRated: `/#${DAPP_LIST.HIGHEST_RATED}`,
    recentlyAdded: `/#${DAPP_LIST.RECENTLY_ADDED}`,
  }
}
