import {
  DAPP_CATEGORY_STRINGS,
  DAPP_CATEGORY,
  DAPP_LIST,
} from 'utils/constants';

export const urlify = (input: string) =>
  !!input ? input.replace(' ', '-').toLowerCase() : input;

export const ROUTE_LINKS = {
  Home: `/`,
  CreateDApp: `/discover/create`,
  Discover: (dappname: string | ':dappname') => `/discover/${urlify(dappname)}`,
  UpdateDApp: (dappname: string) => `/discover/${urlify(dappname)}/update`,

  Vote: (
    dappname: string | ':dappname',
    voteType: 'upvote' | 'downvote' | ':voteType',
  ) => `/vote/${urlify(dappname)}/${voteType}`,
  HowToVote: '/how-to-vote',
  Withdraw: (dappname: string | ':dappname') =>
    `/discover/${urlify(dappname)}/withdraw`,

  categories: {
    select: `/category/:category`,
    All: `/category/all`,
    [DAPP_CATEGORY.EXCHANGES]: `/category/${
      DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.EXCHANGES]
    }`.toLowerCase(),
    [DAPP_CATEGORY.MARKETPLACES]: `/category/${
      DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.MARKETPLACES]
    }`.toLowerCase(),
    [DAPP_CATEGORY.COLLECTIBLES]: `/category/${
      DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.COLLECTIBLES]
    }`.toLowerCase(),
    [DAPP_CATEGORY.GAMES]: `/category/${
      DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.GAMES]
    }`.toLowerCase(),
    [DAPP_CATEGORY.SOCIAL_NETWORKS]: `/category/${
      DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.SOCIAL_NETWORKS]
    }`
      .replace(' ', '-')
      .toLowerCase(),
    [DAPP_CATEGORY.UTILITIES]: `/category/${
      DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.UTILITIES]
    }`.toLowerCase(),
    [DAPP_CATEGORY.OTHER]: `/category/${
      DAPP_CATEGORY_STRINGS[DAPP_CATEGORY.OTHER]
    }`.toLowerCase(),
  },
  lists: {
    // highestRated: `/list/highest-rated`,
    // recentlyAdded: `/list/recently-added`,
    highestRated: `/#${DAPP_LIST.HIGHEST_RATED}`,
    recentlyAdded: `/#${DAPP_LIST.RECENTLY_ADDED}`,
  },
};
