import React from 'react'
import PropTypes from 'prop-types'
import ReactImageFallback from 'react-image-fallback'
import styles from './TransactionStatus.module.scss'
import icon from '../../common/assets/images/icon.svg'
import loadingSpinner from '../../common/assets/images/loading-spinner.svg'

class TransactionStatus extends React.Component {
  componentDidMount() {
    this.checkTransactionHash()
  }

  checkTransactionHash() {
    const { dappTx, progress, checkTransactionStatus } = this.props
    if (dappTx !== '' && progress === true) checkTransactionStatus(dappTx)
  }

  render() {
    const {
      dappName,
      dappTx,
      dappImg,
      txDesc,
      published,
      publishedEmpty,
      progress,
      message,
      failed,
      hide,
    } = this.props

    return (
      <div className={`${styles.cnt} ${dappName !== '' ? styles.active : ''}`}>
        <ReactImageFallback
          className={styles.image}
          src={dappImg}
          fallbackImage={icon}
          alt="App icon"
        />
        <div className={styles.data}>
          <div className={styles.name}>
            <div className={styles.nameItself}>{dappName}</div>
            {/* {!progress && ( */}
            <div className={styles.close} onClick={hide}>
              +
            </div>
            {/* )} */}
          </div>
          <div className={styles.info}>{txDesc}</div>
          {publishedEmpty && (
            <div className={styles.status}>
              ✓ Thank you for submitting. Your dapp will be reviewed soon.
            </div>
          )}
          {published && <div className={styles.status}>✓ {message}</div>}
          {progress && (
            <div className={styles.status}>
              <img src={loadingSpinner} alt="Loading..." />
              Waiting for confirmation from Ethereum...
            </div>
          )}
          {failed && (
            <div className={`${styles.status} ${styles.red} ${styles.column}`}>
              Transaction failed. Please check EtherScan for tx:{' '}
              <span>{dappTx}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
}

TransactionStatus.propTypes = {
  dappTx: PropTypes.string.isRequired,
  dappName: PropTypes.string.isRequired,
  dappImg: PropTypes.string.isRequired,
  txDesc: PropTypes.string.isRequired,
  progress: PropTypes.bool.isRequired,
  published: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  publishedEmpty: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  checkTransactionStatus: PropTypes.func.isRequired,
}

export default TransactionStatus
