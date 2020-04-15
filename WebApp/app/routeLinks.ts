import { DappCategories, DappLists } from "utils/constants";

export const ROUTE_LINKS = {
  Home: `/`,
  categories: {
    Exchanges: `/category/${DappCategories.Exchanges}`.toLowerCase(),
    Marketplaces: `/category/${DappCategories.Marketplaces}`.toLowerCase(),
    Collectibles: `/category/${DappCategories.Collectibles}`.toLowerCase(),
    Games: `/category/${DappCategories.Games}`.toLowerCase(),
    SocialNetworks: `/category/${DappCategories.SocialNetworks}`.replace(' ', '-').toLowerCase(),
    Utilities: `/category/${DappCategories.Utilities}`.toLowerCase(),
    Other: `/category/${DappCategories.Other}`.toLowerCase(),
  },
  lists: {
    // highestRated: `/list/highest-rated`,
    // recentlyAdded: `/list/recently-added`,
    highestRated: `/#${DappLists.highestRated}`,
    recentlyAdded: `/#${DappLists.recentlyAdded}`,
  }
}
