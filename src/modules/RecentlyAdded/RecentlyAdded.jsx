import React from 'react'
import { DappListModel } from '../../common/utils/models'
import DappList from '../../common/components/DappList'
import styles from './RecentlyAdded.module.scss'

const RecentlyAdded = props => {
  const { dapps } = props

  return (
    <>
      <h1 id="recently-added" className={styles.headline}>
        Recently Added
      </h1>
      <div className={styles.grid}>
        <DappList dapps={dapps} />
      </div>
    </>
  )
}

RecentlyAdded.propTypes = {
  dapps: DappListModel.isRequired,
}

export default RecentlyAdded
