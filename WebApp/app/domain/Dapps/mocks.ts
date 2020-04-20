import { Dapp } from "./types";

import SablierBanner from '../../images/featured/sablier_banner.png'
import SablierLogo from '../../images/featured/sablier_logo.png'
import OasisBanner from '../../images/featured/oasis_banner.png'
import OasisLogo from '../../images/featured/oasis_logo.png'
import ZerionBanner from '../../images/featured/zerion_banner.png'
import ZerionLogo from '../../images/featured/zerion_logo.png'
import { DAPP_CATEGORY } from "utils/constants";

export const FEATURED_DAPPS = ['sablier', 'oasis', 'zerion']

export const DAPPS: {
  [key: string]: Dapp
} = {
  'sablier': {
    name: "Stream money, just like you stream music or videos",
    description: "Stream money, just like you stream music or videos",
    url: 'https://pay.sablier.finance',
    ranking: [],
    reviewed: true,
    votes: 0,
    category: DAPP_CATEGORY.EXCHANGES,
    banner: SablierBanner,
    icon: SablierLogo
  },
  'oasis': {
    name: 'Oasis',
    description: 'Trade tokens, borrow Dai, and earn savings — all in one place',
    url: 'https://oasis.app',
    ranking: [],
    reviewed: true,
    votes: 0,
    category: DAPP_CATEGORY.EXCHANGES,
    banner: OasisBanner,
    icon: OasisLogo
  },
  'zerion': {
    name: 'Zerion',
    description: 'Zerion is the simplest way to invest in DeFi from anywhere in the world',
    url: 'https://app.zerion.io',
    ranking: [],
    reviewed: true,
    votes: 0,
    category: DAPP_CATEGORY.EXCHANGES,
    banner: ZerionBanner,
    icon: ZerionLogo
  },

}
