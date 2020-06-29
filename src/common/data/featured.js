import inchBanner from '../assets/images/featured/inch_banner.jpg'
import inchLogo from '../assets/images/featured/inch_logo.png'
import OasisBanner from '../assets/images/featured/oasis_banner.png'
import OasisLogo from '../assets/images/featured/oasis_logo.png'
import ZerionBanner from '../assets/images/featured/zerion_banner.png'
import ZerionLogo from '../assets/images/featured/zerion_logo.png'

const featuredDapps = [
  {
    name: '1inch.exchange',
    description:
      'The decentralized exchange aggregator with the best prices on the market',
    url: 'https://1inch.exchange/',
    banner: inchBanner,
    icon: inchLogo,
  },
  {
    name: 'Zerion',
    description:
      'Zerion is the simplest way to invest in DeFi from anywhere in the world',
    url: 'https://app.zerion.io',
    banner: ZerionBanner,
    icon: ZerionLogo,
  },
  {
    name: 'Oasis',
    description:
      'Trade tokens, borrow Dai, and earn savings — all in one place',
    url: 'https://oasis.app',
    banner: OasisBanner,
    icon: OasisLogo,
  },
]

export default featuredDapps
