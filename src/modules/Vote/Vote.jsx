import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactImageFallback from 'react-image-fallback'
import styles from './Vote.module.scss'
import sntIcon from '../../common/assets/images/SNT.svg'
import CategoriesUtils from '../Categories/Categories.utils'
import Categories from '../../common/utils/categories'
import icon from '../../common/assets/images/icon.svg'
import Modal from '../../common/components/Modal'
import { DappModel } from '../../common/utils/models'

const getCategoryName = category =>
  Categories.find(x => x.key === category).value

class Vote extends Component {
  constructor(props) {
    super(props)
    this.onClickUpvote = this.onClickUpvote.bind(this)
    this.onClickDownvote = this.onClickDownvote.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onClickVote = this.onClickVote.bind(this)
  }

  onClickUpvote() {
    const { dapp, onClickUpvote, fetchVoteRating } = this.props
    let { sntValue } = this.props
    if (sntValue === '') sntValue = 0
    onClickUpvote()
    fetchVoteRating(dapp, true, parseInt(sntValue, 10))
  }

  onClickDownvote() {
    const { dapp, onClickDownvote, fetchVoteRating } = this.props
    onClickDownvote()
    fetchVoteRating(dapp, false)
  }

  handleChange(e) {
    const { value } = e.target
    if (value !== '' && /^[1-9][0-9]*$/.test(value) === false) return

    const intValue = value === '' ? 0 : parseInt(value, 10)
    if (intValue > 1571296) return

    const { dapp, onInputSntValue, fetchVoteRating } = this.props
    onInputSntValue(value)
    fetchVoteRating(dapp, true, intValue)
  }

  onClickVote() {
    const { dapp, sntValue, isUpvote, upVote, downVote } = this.props
    if (isUpvote) upVote(dapp, parseInt(sntValue, 10))
    else downVote(dapp, sntValue)
  }

  render() {
    const {
      visible,
      onClickClose,
      isUpvote,
      dapp,
      dapps,
      sntValue,
      afterVoteRating,
    } = this.props

    if (dapp === null) {
      return <Modal visible={false} onClickClose={onClickClose} />
    }

    //const catPosition = dapp.categoryPosition
    // const upvoteSNTcost = currentSNTamount + parseInt(sntValue, 10)
    const currentSNTamount = dapp.sntValue
    const dappsByCategory = dapps.filter(
      dapp_ => dapp_.category === dapp.category,
    )

    let catPosition = dappsByCategory.length
    for (let i = 0; i < dappsByCategory.length; ++i) {
      if (dapp.id === dappsByCategory[i].id) {
        catPosition = i + 1
        break
      }
    }

    let afterVoteCategoryPosition = null
    if (afterVoteRating !== null) {
      afterVoteCategoryPosition = 1
      for (let i = 0; i < dappsByCategory.length; ++i) {
        if (dappsByCategory[i].id === dapp.id) continue
        if (dappsByCategory[i].sntValue < dapp.sntValue + afterVoteRating) break
        afterVoteCategoryPosition++
      }
    }

    return (
      <Modal
        visible={visible && window.location.hash === '#vote'}
        onClickClose={onClickClose}
        windowClassName={styles.modalWindow}
        contentClassName={styles.modalContent}
      >
        <div className={styles.tabs}>
          <button
            className={isUpvote ? styles.active : ''}
            type="button"
            onClick={this.onClickUpvote}
          >
            ↑ UPVOTE
          </button>
          <button
            className={!isUpvote ? styles.active : ''}
            type="button"
            onClick={this.onClickDownvote}
          >
            ↓ DOWNVOTE
          </button>
        </div>
        <div className={styles.dapp}>
          <ReactImageFallback
            className={styles.image}
            src={dapp.image}
            fallbackImage={icon}
            alt="App icon"
            width={24}
            height={24}
          />
          {dapp.name}
        </div>
        <div className={styles.items}>
          <div className={styles.itemRow}>
            <span className={styles.item}>
              <img src={sntIcon} alt="SNT" width="24" height="24" />
              {currentSNTamount.toLocaleString()}
            </span>
            {isUpvote && afterVoteRating !== null && (
              <span className={styles.greenBadge}>
                {`${(dapp.sntValue + afterVoteRating).toLocaleString()} ↑`}
              </span>
            )}
            {!isUpvote && afterVoteRating !== null && (
              <span className={styles.redBadge}>
                {`${(dapp.sntValue - afterVoteRating).toLocaleString()} ↓`}
              </span>
            )}
          </div>
          <div className={styles.itemRow}>
            <span className={styles.item}>
              <img
                src={CategoriesUtils(dapp.category)}
                alt={getCategoryName(dapp.category)}
                width="24"
                height="24"
              />
              {`${getCategoryName(dapp.category)} №${catPosition}`}
            </span>
            {isUpvote &&
              afterVoteCategoryPosition !== null &&
              afterVoteCategoryPosition !== catPosition && (
                <span className={styles.greenBadge}>
                  {`№${afterVoteCategoryPosition} ↑`}
                </span>
              )}
            {!isUpvote &&
              afterVoteCategoryPosition !== null &&
              afterVoteCategoryPosition !== catPosition && (
                <span className={styles.redBadge}>
                  {`№${afterVoteCategoryPosition} ↓`}
                </span>
              )}
          </div>
        </div>
        {!isUpvote && (
          <div
            className={styles.inputArea}
            style={{ opacity: sntValue !== '0' ? 1 : 0 }}
          >
            <span>{sntValue}</span>
          </div>
        )}
        {isUpvote && (
          <div className={`${styles.inputArea} ${styles.inputAreaBorder}`}>
            <input
              type="text"
              value={sntValue}
              onChange={this.handleChange}
              style={{ width: `${21 * Math.max(1, sntValue.length)}px` }}
            />
          </div>
        )}

        <div className={styles.footer}>
          {isUpvote && (
            <p className={styles.disclaimer}>
              SNT you spend to upvote is locked in the contract and contributes
              directly to {dapp.name}'s ranking.{' '}
              <a href="#" target="_blank">
                Learn more↗
              </a>
            </p>
          )}
          {!isUpvote && (
            <p className={styles.disclaimer}>
              SNT you spend to downvote goes directly back to {dapp.name}.
              Downvoting moves their DApp down by 1% of the current ranking. The
              cost is fixed by our unique bonded curve.{' '}
              <a href="#" target="_blank">
                Learn more↗
              </a>
            </p>
          )}
          <button
            type="submit"
            disabled={(!sntValue || sntValue === '0') && isUpvote}
            onClick={this.onClickVote}
          >
            {isUpvote ? 'Upvote' : 'Downvote'}
          </button>
        </div>
      </Modal>
    )
  }
}

Vote.defaultProps = {
  dapp: null,
  afterVoteRating: null,
}

Vote.propTypes = {
  dapp: PropTypes.shape(DappModel),
  isUpvote: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  sntValue: PropTypes.string.isRequired,
  afterVoteRating: PropTypes.number,
  onClickClose: PropTypes.func.isRequired,
  onClickUpvote: PropTypes.func.isRequired,
  onClickDownvote: PropTypes.func.isRequired,
  onInputSntValue: PropTypes.func.isRequired,
  fetchVoteRating: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
}

export default Vote
