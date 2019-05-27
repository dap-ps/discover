import React from 'react'
import { DappListModel } from '../../common/utils/models'
import DappList from '../../common/components/DappList'
import styles from './HighestRanked.module.scss'

const HighestRanked = props => {
  const { dapps } = props

  return (
    <>
      <h1 id="highest-ranked" className={styles.headline}>
        Highest Ranked
      </h1>
      <div className={styles.grid}>
        <DappList dapps={dapps} isRanked showActionButtons />
      </div>
    </>
  )
}

HighestRanked.propTypes = {
  dapps: DappListModel.isRequired,
}

export default HighestRanked
