import exchanges from '../../common/assets/images/categories/exchanges.svg'
import marketplaces from '../../common/assets/images/categories/marketplaces.svg'
import other from '../../common/assets/images/categories/other.svg'
import games from '../../common/assets/images/categories/games.svg'
import collectibles from '../../common/assets/images/categories/collectibles.svg'
import socialNetworks from '../../common/assets/images/categories/social-networks.svg'
import utilities from '../../common/assets/images/categories/utilities.svg'

const imageMap = {
  EXCHANGES: exchanges,
  MARKETPLACES: marketplaces,
  OTHER: other,
  MEDIA: other, // TODO: fix with icon from design
  GAMES: games,
  COLLECTIBLES: collectibles,
  SOCIAL_NETWORKS: socialNetworks,
  UTILITIES: utilities,
}

export default category => imageMap[category]
