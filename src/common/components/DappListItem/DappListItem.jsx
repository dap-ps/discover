import React from 'react'
import PropTypes from 'prop-types'
import ReactImageFallback from 'react-image-fallback'
import { DappModel } from '../../utils/models'
import styles from './DappListItem.module.scss'
import icon from '../../assets/images/icon.svg'
import sntIcon from '../../assets/images/SNT.svg'
import upvoteArrowIcon from '../../assets/images/upvote-arrow.svg'
import downvoteArrowIcon from '../../assets/images/downvote-arrow.svg'

const DappListItem = props => {
  const {
    dapp,
    onClickUpVote,
    onClickDownVote,
    isRanked,
    position,
    visible,
    showActionButtons,
    onToggleProfileModal,
  } = props

  const { name, description, image } = dapp

  const handleUpVote = () => {
    onClickUpVote(dapp)
  }

  const handleDownVote = () => {
    onClickDownVote(dapp)
  }

  return (
    <div
      className={`${styles.dappListItem} ${
        isRanked ? styles.rankedListItem : styles.listItem
      } ${visible ? '' : styles.transparent}`}
    >
      {isRanked && (
        <div className={position ? styles.position : null}>{position}</div>
      )}
      <div
        className={styles.imgWrapper}
        onClick={() => onToggleProfileModal(dapp.id, name)}
      >
        <ReactImageFallback
          className={styles.image}
          src={image}
          fallbackImage={icon}
          alt="App icon"
        />
      </div>
      <div className={styles.column}>
        <div onClick={() => onToggleProfileModal(dapp.id, name)}>
          <h2 className={styles.header}>{name}</h2>
          <p
            className={styles.description}
            style={{ WebkitBoxOrient: 'vertical' }}
          >
            {description}
          </p>
        </div>
        {showActionButtons && (
          <div className={styles.actionArea}>
            <span className={styles.sntAmount}>
              <img src={sntIcon} alt="SNT" width="16" height="16" />
              {dapp.sntValue}
            </span>
            {dapp.sntValue > 0 && (
              <div className={styles.voteTriggers}>
                <span className={styles.vote} onClick={handleUpVote}>
                  <img src={upvoteArrowIcon} alt="" />
                  Upvote
                </span>
                <span className={styles.vote} onClick={handleDownVote}>
                  <img src={downvoteArrowIcon} alt="" />
                  Downvote
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

DappListItem.defaultProps = {
  isRanked: false,
  showActionButtons: false,
  visible: true,
}

DappListItem.propTypes = {
  dapp: PropTypes.shape(DappModel).isRequired,
  isRanked: PropTypes.bool,
  showActionButtons: PropTypes.bool,
  visible: PropTypes.bool,
  position: PropTypes.number.isRequired,
  onClickUpVote: PropTypes.func.isRequired,
  onClickDownVote: PropTypes.func.isRequired,
}

export default DappListItem
