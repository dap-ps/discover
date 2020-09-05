// No clue why the IDE complains about the pathing but it works
// @ts-ignore
import SablierBanner from '../../images/featured/sablier_banner.png';
// @ts-ignore
import SablierLogo from '../../images/featured/sablier_logo.png';
// @ts-ignore
import OasisBanner from '../../images/featured/oasis_banner.png';
// @ts-ignore
import OasisLogo from '../../images/featured/oasis_logo.png';
// @ts-ignore
import ZerionBanner from '../../images/featured/zerion_banner.png';
// @ts-ignore
import ZerionLogo from '../../images/featured/zerion_logo.png';
import { DAPP_CATEGORY, DAPP_STATUS } from 'utils/constants';
import { IDapp } from './types';
import { AddressZero } from 'ethers/constants';

export const FEATURED_DAPPS = ['sablier', 'oasis', 'zerion'];

export const DAPPS: {
  [key: string]: IDapp;
} = {
  sablier: {
    email: '',
    id: '10',
    uploader: AddressZero,
    sntValue: 0,
    ipfsHash: 'asdasdasdasd',
    name: 'Sablier',
    desc: 'Stream money, just like you stream music or videos',
    url: 'https://pay.sablier.finance',
    ranking: [],
    status: DAPP_STATUS.APPROVED,
    votes: 0,
    available: 2,
    dateAdded: 1582043136071.0,
    category: DAPP_CATEGORY.EXCHANGES,
    image: SablierBanner,
    icon: SablierLogo,
  },
  oasis: {
    email: '',
    uploader: AddressZero,
    id: '11',
    ipfsHash: 'asdasdas3456789dasd',
    name: 'Oasis',
    desc: 'Trade tokens, borrow Dai, and earn savings — all in one place',
    url: 'https://oasis.app',
    ranking: [],
    status: DAPP_STATUS.APPROVED,
    votes: 10,
    available: 2,
    dateAdded: 1582043136051.0,
    category: DAPP_CATEGORY.EXCHANGES,
    image: OasisBanner,
    icon: OasisLogo,
  },
  zerion: {
    email: '',
    uploader: AddressZero,
    id: '12',
    ipfsHash: 'asdasd10101010101asdasd',
    name: 'Zerion',
    desc:
      'Zerion is the simplest way to invest in DeFi from anywhere in the world',
    url: 'https://app.zerion.io',
    ranking: [],
    status: DAPP_STATUS.APPROVED,
    votes: 20,
    available: 2,
    dateAdded: 1582043136061.0,
    category: DAPP_CATEGORY.EXCHANGES,
    image: ZerionBanner,
    icon: ZerionLogo,
    downvoteCost: 526,
  },
};
