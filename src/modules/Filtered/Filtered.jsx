import React from 'react'
import PropTypes from 'prop-types'
import CategorySelector from '../CategorySelector'
import DappList from '../../common/components/DappList'
import styles from './Filtered.module.scss'
import { DappState } from '../../common/data/dapp'

class Filtered extends React.Component {
  render() {
    const { match, dappState } = this.props
    const category = match !== undefined ? match.params.id : undefined

    return (
      <>
        <CategorySelector category={category} />
        <div className={styles.list}>
          <DappList dapps={dappState.getDappsByCategory(category)} />
        </div>
      </>
    )
  }
}

Filtered.defaultProps = {
  match: undefined,
}

Filtered.propTypes = {
  dappState: PropTypes.instanceOf(DappState).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }),
}

export default Filtered
