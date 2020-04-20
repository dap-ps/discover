import { DAPP_CATEGORY_STRINGS, DAPP_CATEGORY, DAPP_LIST } from "utils/constants";

export const ROUTE_LINKS = {
  Home: `/`,
  categories: {
    Exchanges: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.EXCHANGES]}`.toLowerCase(),
    Marketplaces: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.MARKETPLACES]}`.toLowerCase(),
    Collectibles: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.COLLECTIBLES]}`.toLowerCase(),
    Games: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.GAMES]}`.toLowerCase(),
    SocialNetworks: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.SOCIAL_NETWORKS]}`.replace(' ', '-').toLowerCase(),
    Utilities: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.UTILITIES]}`.toLowerCase(),
    Other: `/category/${DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.OTHER]}`.toLowerCase(),
  },
  lists: {
    // highestRated: `/list/highest-rated`,
    // recentlyAdded: `/list/recently-added`,
    highestRated: `/#${DAPP_LIST.HIGHEST_RATED}`,
    recentlyAdded: `/#${DAPP_LIST.RECENTLY_ADDED}`,
  }
}
