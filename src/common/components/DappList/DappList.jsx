import React from 'react'
import PropTypes from 'prop-types'
import { DappListModel } from '../../utils/models'
import DappListItem from '../DappListItem'

const DappList = props => {
  const { dapps, isRanked, showActionButtons } = props
  return (
    dapps &&
    dapps.map((dapp, i) => (
      <DappListItem
        dapp={dapp}
        key={dapp.name}
        isRanked={isRanked}
        position={i + 1}
        showActionButtons={showActionButtons}
      />
    ))
  )
}

DappList.defaultProps = {
  showActionButtons: true,
}

DappList.propTypes = {
  dapps: DappListModel.isRequired,
  isRanked: PropTypes.bool,
  showActionButtons: PropTypes.bool,
}

export default DappList
