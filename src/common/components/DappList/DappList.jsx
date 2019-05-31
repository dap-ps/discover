import React from 'react'
import PropTypes from 'prop-types'
import { DappListModel } from '../../utils/models'
import DappListItem from '../DappListItem'

class DappList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {'dappIdsMap': new Set(), 'mounted': false}
  }

  componentDidMount() {
    const { dapps } = this.props
    const { dappIdsMap } = this.state
    dapps.forEach(dapp => dappIdsMap.add(dapp.id))
    this.setState({ dappIdsMap, mounted: true})
  }

  componentDidUpdate() {
    const { dapps } = this.props
    const { dappIdsMap } = this.state

    let update = false
    for (let i = 0; i < dapps.length; i += 1) {
      if (dappIdsMap.has(dapps[i].id) === false) update = true
    }
    if (!update) return

    for (let i = 0; i < dapps.length; i += 1)
      dappIdsMap.add(dapps[i].id)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({ dappIdsMap })
      })
    })
  }

  animate() {
    
  }

  render() {
    const { dapps, isRanked, showActionButtons } = this.props
    const { dappIdsMap, mounted } = this.state
    return (
      dapps &&
      dapps.map((dapp, i) => (
        <DappListItem
          dapp={dapp}
          key={dapp.id}
          isRanked={isRanked}
          position={i + 1}
          visible={!mounted || dappIdsMap.has(dapp.id)}
          showActionButtons={showActionButtons}
        />
      ))
    )  
  }
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
