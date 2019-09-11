import React from 'react'
import PropTypes from 'prop-types'
import { DappListModel } from '../../../utils/models'
import SearchResultItem from '../SearchResultItem'

const SearchResultList = ({ dapps }) =>
  dapps &&
  dapps.map((dapp, i) => (
    <SearchResultItem dapp={dapp} key={dapp.id} position={i + 1} />
  ))

SearchResultList.propTypes = {
  dapps: DappListModel.isRequired,
}

export default SearchResultList
