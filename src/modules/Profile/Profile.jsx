import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactImageFallback from 'react-image-fallback'
import Modal from '../../common/components/Modal'
import styles from './Profile.module.scss'
import icon from '../../common/assets/images/icon.svg'
import { DappState } from '../../common/data/dapp'

const ProfileContent = ({
  name,
  url,
  description,
  image,
  category,
  highestRankedPosition,
  categoryPosition,
  editable,
  onClickWithdraw,
  onClickUpdateMetadata,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.banner}>
          <ReactImageFallback
            className={styles.image}
            src={image}
            fallbackImage={icon}
            alt="App icon"
          />
        </div>
        <div className={styles.information}>
          <h4 className={styles.header}>{name}</h4>
          <span className={styles.category}>
            {category.charAt(0).toUpperCase() +
              category
                .slice(1)
                .toLowerCase()
                .replace('_', ' ')}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Open
          </a>
        </div>
        <div className={styles.description}>
          <span className={styles.heading}>Description</span>
          <span className="wrapper">{description || 'Not available'}</span>
        </div>
        <div className={styles.url}>
          <span className={styles.heading}>URL</span>
          <span className="wrapper">
            <a href={url}>
              {url}
              &nbsp;&rarr;
            </a>
          </span>
        </div>
        <div className={styles.ranking}>
          <span className={styles.heading}>Ranking</span>
          <div className={styles.rank}>
            <div
              className={[styles.rank_position_1, styles[category]].join(' ')}
            >
              <span className={styles.rank_position_span}>
                {categoryPosition}
              </span>
            </div>
            <span className={styles.rank_position_text}>
              <span>№</span>
              {categoryPosition} in {category}
            </span>
          </div>
          <div className={styles.rank}>
            <span className={styles.rank_position_2}>
              <span className={styles.rank_position_span}>
                {highestRankedPosition}
              </span>
            </span>
            <span className={styles.rank_position_text}>
              <span>№</span>
              {highestRankedPosition} in highest ranked DApps
            </span>
          </div>
        </div>
        {editable && (
          <div className={styles.actions}>
            <div className={styles.button} onClick={onClickUpdateMetadata}>
              Edit
            </div>
            <div className={styles.button} onClick={onClickWithdraw}>
              Withdraw
            </div>
          </div>
        )}
      </div>
    </>
  )
}

class Profile extends Component {
  constructor(props) {
    super(props)
    this.onClickClose = this.onClickClose.bind(this)
  }

  onClickClose() {
    window.history.back()
  }

  onClickWithdraw(dapp) {
    const { onClickWithdraw } = this.props
    this.onClickClose()
    setTimeout(() => {
      onClickWithdraw(dapp)
    }, 1)
  }

  onClickUpdateMetadata(dapp) {
    const { onClickUpdateMetadata } = this.props
    this.onClickClose()
    setTimeout(() => {
      onClickUpdateMetadata(dapp)
    }, 1)
  }

  render() {
    const { match, dappState } = this.props
    const { dapps } = dappState
    const { params } = match
    const { dapp_name } = params
    let { editable } = this.props
    let dapp = null
    let highestRankedPosition = 1
    let categoryPosition = 1

    for (let i = 0; i < dapps.length; i += 1) {
      const item = dapps[i]
      if (item.name.toLowerCase() === dapp_name.toLowerCase()) {
        highestRankedPosition = i + 1
        dapp = item
        break
      }
    }

    if (dapp !== null) {
      const dappsInCategory = dappState.getDappsByCategory(dapp.category)
      for (let i = 0; i < dappsInCategory.length; i += 1) {
        const item = dappsInCategory[i]
        if (item.id === dapp.id) {
          categoryPosition = i + 1
          break
        }
      }

      editable = editable && dapp.isApproved()
    }

    return (
      <Modal
        visible={dapp !== null}
        windowClassName={styles.modalWindow}
        onClickClose={this.onClickClose}
      >
        <ProfileContent
          {...dapp}
          highestRankedPosition={highestRankedPosition}
          categoryPosition={categoryPosition}
          editable={editable}
          onClickWithdraw={this.onClickWithdraw.bind(this, dapp)}
          onClickUpdateMetadata={this.onClickUpdateMetadata.bind(this, dapp)}
        />
      </Modal>
    )
  }
}

Profile.propTypes = {
  dappState: PropTypes.instanceOf(DappState),
  editable: PropTypes.bool.isRequired,
  onClickWithdraw: PropTypes.func.isRequired,
  onClickUpdateMetadata: PropTypes.func.isRequired,
}

export default Profile
