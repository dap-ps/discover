import React from 'react'
import PropTypes from 'prop-types'
import ExchangesIcon from './ExhangesIcon'
import MarketplacesIcon from './MarketplacesIcon'
import GamesIcon from './GamesIcon'
import UtilitiesIcon from './UtilitiesIcon'
import OtherIcon from './OtherIcon'
import CollectiblesIcon from './CollectiblesIcon'
import SocialNetworksIcon from './SocialNetworksIcon'

const icons = {
  EXCHANGES: ExchangesIcon,
  MARKETPLACES: MarketplacesIcon,
  GAMES: GamesIcon,
  UTILITIES: UtilitiesIcon,
  OTHER: OtherIcon,
  COLLECTIBLES: CollectiblesIcon,
  SOCIAL_NETWORKS: SocialNetworksIcon,
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
