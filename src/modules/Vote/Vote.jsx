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
import { DappState } from '../../common/data/dapp'

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
      dappState,
      sntValue,
      afterVoteRating,
      learnMoreUpVote,
      learnMoreDownVote,
      onClickLearnMoreUpVote,
      onClickLearnMoreDownVote,
      onClickCloseLearnMore,
    } = this.props

    if (dapp === null) {
      return <Modal visible={false} onClickClose={onClickClose} />
    }

    //const catPosition = dapp.categoryPosition
    // const upvoteSNTcost = currentSNTamount + parseInt(sntValue, 10)
    const currentSNTamount = dapp.sntValue
    const dappsByCategory = dappState.getDappsByCategory(dapp.category)

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
        {!learnMoreUpVote && !learnMoreDownVote && (
          <>
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
            <div className={styles.content}>
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
                  {isUpvote &&
                    afterVoteRating !== null &&
                    afterVoteRating > 0 && (
                      <span className={styles.greenBadge}>
                        {`${afterVoteRating.toLocaleString()} ↑`}
                      </span>
                    )}
                  {!isUpvote &&
                    afterVoteRating !== null &&
                    afterVoteRating > 0 && (
                      <span className={styles.redBadge}>
                        {`${afterVoteRating.toLocaleString()} ↓`}
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
                  // style={{ opacity: sntValue !== '0' ? 1 : 0 }}
                >
                  <span>{sntValue}</span>
                </div>
              )}
              {isUpvote && (
                <div
                  className={`${styles.inputArea} ${styles.inputAreaBorder}`}
                >
                  <input
                    type="text"
                    value={sntValue}
                    onChange={this.handleChange}
                    style={{ width: `${21 * Math.max(1, sntValue.length)}px` }}
                  />
                </div>
              )}
              {isUpvote && (
                <p className={styles.disclaimer}>
                  SNT you spend to upvote is locked in the contract and
                  contributes directly to {dapp.name}'s ranking.{' '}
                  <a onClick={onClickLearnMoreUpVote}>Learn more↗</a>
                </p>
              )}
              {!isUpvote && (
                <p className={styles.disclaimer}>
                  SNT you spend to downvote goes directly back to {dapp.name}.
                  Downvoting moves their DApp down by 1% of the current ranking.
                  The cost is fixed by our unique bonded curve.{' '}
                  <a onClick={onClickLearnMoreDownVote}>Learn more↗</a>
                </p>
              )}
            </div>

            <div className={styles.footer}>
              <button
                type="submit"
                disabled={(!sntValue || sntValue === '0') && isUpvote}
                onClick={this.onClickVote}
              >
                {isUpvote ? 'Upvote' : 'Downvote'}
              </button>
            </div>
          </>
        )}
        {learnMoreUpVote && (
          <div className={styles.learnMoreCnt}>
            <div className={styles.title}>How to submit a ÐApp</div>
            <div className={styles.spacing}>
              <img src="/images/learn-more-curve.png" />
              <p>
                This is what the curve you're using really looks like. The more
                SNT staked on a DApp, the cheaper it becomes for anyone to
                downvote it.
              </p>
              <p>
                However, you can upvote this DApp by any amount of SNT you wish.
                SNT you spend is sent directly to the contract and locked up
                there. It does not
              </p>
              <p>
                go to Status, the developer of the DApp, or any other middleman.
                There are no fees, but once the SNT is spent, you cannot get it
                back.
              </p>
              <p>
                What you spend is added directly to the DApp's balance, and the
                effect this will have on it's ranking is shown in the previous
                screen.
              </p>
              <p>Welcome to the future of decentralised curation!</p>
            </div>
            <div className={styles.backButtonCnt}>
              <button
                type="submit"
                onClick={onClickCloseLearnMore}
                className={styles.backButton}
              >
                Back
              </button>
            </div>
          </div>
        )}
        {learnMoreDownVote && (
          <div className={styles.learnMoreCnt}>
            <div className={styles.title}>How to submit a ÐApp</div>
            <div className={styles.spacing}>
              <img src="/images/learn-more-curve.png" />
              <p>
                This is what the curve you're using really looks like. The more
                SNT staked on a DApp, the cheaper it becomes for anyone to
                downvote it.
              </p>
              <p>
                You can downvote this DApp, and each downvote will move it 1% of
                its current value down the rankings.{' '}
              </p>
              <p>
                SNT you spend is sent directly to the developer of the DApp, so
                we can be sure you aren't just trolling them and that, even if
                you are, you are required to pay for the privilege. It does not
                go to Status or any other middleman. There are no fees, but once
                the SNT is spent, you cannot get it back.
              </p>
              <p>
                What you spend is dictated by how much SNT the DApp has already
                staked, and the exact numerical effect of moving 1% down in the
                rankings is shown in the previous screen.
              </p>
              <p>Welcome to the future of decentralised curation!</p>
            </div>
            <div className={styles.backButtonCnt}>
              <button
                type="submit"
                onClick={onClickCloseLearnMore}
                className={styles.backButton}
              >
                Back
              </button>
            </div>
          </div>
        )}
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
  learnMoreDownVote: PropTypes.bool.isRequired,
  learnMoreUpVote: PropTypes.bool.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onClickUpvote: PropTypes.func.isRequired,
  onClickDownvote: PropTypes.func.isRequired,
  onInputSntValue: PropTypes.func.isRequired,
  fetchVoteRating: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  dappState: PropTypes.instanceOf(DappState).isRequired,
  onClickLearnMoreUpVote: PropTypes.func.isRequired,
  onClickLearnMoreDownVote: PropTypes.func.isRequired,
  onClickCloseLearnMore: PropTypes.func.isRequired,
}

export default Vote
