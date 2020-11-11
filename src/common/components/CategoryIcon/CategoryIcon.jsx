import React from 'react'
import PropTypes from 'prop-types'
import ExchangesIcon from './ExhangesIcon'
import DeFiIcon from './DeFiIcon'
import MarketplacesIcon from './MarketplacesIcon'
import GamesIcon from './GamesIcon'
import UtilitiesIcon from './UtilitiesIcon'
import OtherIcon from './OtherIcon'
import CollectiblesIcon from './CollectiblesIcon'
import SocialNetworksIcon from './SocialNetworksIcon'
import OnrampIcon from './OnrampIcon'

const icons = {
  EXCHANGES: ExchangesIcon,
  DEFI: DeFiIcon,
  MARKETPLACES: MarketplacesIcon,
  GAMES: GamesIcon,
  UTILITIES: UtilitiesIcon,
  OTHER: OtherIcon,
  COLLECTIBLES: CollectiblesIcon,
  SOCIAL_NETWORKS: SocialNetworksIcon,
  CRYPTO_ONRAMPS: OnrampIcon,
  MEDIA: GamesIcon, // TODO: Need to get this asset from design
}

const CategoryIcon = props => {
  const { category } = props
  const Icon = icons[category]
  return <Icon />
}

CategoryIcon.propTypes = {
  category: PropTypes.string.isRequired,
}

export default CategoryIcon
