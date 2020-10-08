import inchBanner from '../assets/images/featured/inch_banner.jpg'
import inchLogo from '../assets/images/featured/inch_logo.png'
import GitcoinBanner from '../assets/images/featured/gitcoin_banner.png'
import GitcoinLogo from '../assets/images/featured/gitcoin_logo.png'
import ZerionBanner from '../assets/images/featured/zerion_banner.png'
import ZerionLogo from '../assets/images/featured/zerion_logo.png'

const featuredDapps = [
  {
    name: 'Gitcoin Grants',
    description:
      'Gitcoin Grants helps creators grow and sustain their open source projects.',
    url: 'https://gitcoin.co/grants',
    banner: GitcoinBanner,
    icon: GitcoinLogo,
  },
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
    description: 'Buy, sell and track DeFi assets',
    url: 'https://app.zerion.io/?utm_source={dap.ps}',
    banner: ZerionBanner,
    icon: ZerionLogo,
  },
]

export default featuredDapps
