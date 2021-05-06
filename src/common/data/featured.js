import inchBanner from '../assets/images/featured/inch_banner.png'
import inchLogo from '../assets/images/featured/inch_logo.png'
import GitcoinBanner from '../assets/images/featured/gitcoin_banner.png'
import GitcoinLogo from '../assets/images/featured/gitcoin_logo.png'
import MatchaBanner from '../assets/images/featured/matcha_banner.png'
import MatchaLogo from '../assets/images/featured/matcha_logo.png'

const featuredDapps = [
  {
    name: '1inch.exchange',
    description:
      'The most efficient DeFi / DEX aggregator with the best exchange rates accross Ethereum and Binance Smart Chain.',
    url: 'https://1inch.exchange/',
    banner: inchBanner,
    icon: inchLogo,
  },
  {
    name: 'Matcha',
    description:
      'Your new favorite DEX aggregator. Find the best prices across exchange networks. Powered by 0x Labs.',
    url: 'https://matcha.xyz/?utm_source=statusnetwork&utm_medium=dappportal',
    banner: MatchaBanner,
    icon: MatchaLogo,
  },
  {
    name: 'Gitcoin Grants',
    description:
      'Gitcoin Grants helps creators grow and sustain their open source projects.',
    url: 'https://gitcoin.co/grants',
    banner: GitcoinBanner,
    icon: GitcoinLogo,
  },
]

export default featuredDapps
