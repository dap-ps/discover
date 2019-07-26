import React from 'react'
import styles from './Network.module.scss'
import networkIcon from '../../assets/images/network.svg'

const Network = props => {
  return (
    <div className={styles.networkAlert}>
      <div className={styles.networkIcon}>
        <img src={networkIcon} alt="Network Alert Icon" />
      </div>
      <div className={styles.networkInfo}>
        <div className={styles.network}>You're on a test network.</div>
        <div className={styles.switch}>Switch your network to Mainnet.</div>
      </div>
    </div>
  )
}

export default Network
