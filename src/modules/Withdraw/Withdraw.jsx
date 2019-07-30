import React from 'react'
import PropTypes from 'prop-types'
import ReactImageFallback from 'react-image-fallback'
import styles from './Withdraw.module.scss'
import Modal from '../../common/components/Modal'
import CategoriesUtils from '../Categories/Categories.utils'
import Categories from '../../common/utils/categories'
import icon from '../../common/assets/images/icon.svg'
import sntIcon from '../../common/assets/images/SNT.svg'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import DappModel from '../../common/data/dapp'

const getCategoryName = category =>
  Categories.find(x => x.key === category).value

class Withdraw extends React.Component {
  constructor(props) {
    super(props)
    this.onWithdraw = this.onWithdraw.bind(this)
    this.handleSNTChange = this.handleSNTChange.bind(this)
  }

  onWithdraw() {
    const { dapp, sntValue, onWithdraw } = this.props
    onWithdraw(dapp, parseInt(sntValue, 10))
  }

  handleSNTChange(e) {
    const { withdrawMax } = this.props
    const { value } = e.target
    if (value !== '' && /^[1-9][0-9]*$/.test(value) === false) return

    const intValue = value === '' ? 0 : parseInt(value, 10)
    if (intValue > 1571296) return
    if (intValue > withdrawMax) return

    const { onInputSntValue } = this.props
    onInputSntValue(value)
  }

  render() {
    const {
      dappState,
      dapp,
      visible,
      onClickClose,
      sntValue,
      withdrawMax,
    } = this.props

    if (dapp === null)
      return <Modal visible={false} onClickClose={onClickClose} />

    const currentSNTamount = dapp.sntValue
    const dappsByCategory = dappState.getDappsByCategory(dapp.category)
    const afterVoteRating = sntValue !== '' ? parseInt(sntValue, 10) : 0

    let catPosition = dappsByCategory.length
    for (let i = 0; i < dappsByCategory.length; ++i) {
      if (dapp.id === dappsByCategory[i].id) {
        catPosition = i + 1
        break
      }
    }

    let afterVoteCategoryPosition = 1
    for (let i = 0; i < dappsByCategory.length; ++i) {
      if (dappsByCategory[i].id === dapp.id) continue
      if (dappsByCategory[i].sntValue < afterVoteRating) break
      afterVoteCategoryPosition++
    }

    return (
      <Modal
        visible={visible && window.location.hash === '#withdraw'}
        onClickClose={onClickClose}
        windowClassName={styles.modalWindow}
      >
        <div className={styles.title}>Withdraw</div>
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
            {afterVoteRating !== null && afterVoteRating !== 0 && (
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
            {afterVoteCategoryPosition !== null &&
              afterVoteCategoryPosition !== catPosition && (
                <span className={styles.redBadge}>
                  {`№${afterVoteCategoryPosition} ↓`}
                </span>
              )}
          </div>
        </div>
        <div className={`${styles.inputArea} ${styles.inputAreaBorder}`}>
          <input
            type="text"
            value={!sntValue && sntValue !== 0 ? withdrawMax : sntValue}
            onChange={this.handleSNTChange}
            style={{ width: `${21 * Math.max(1, sntValue.length)}px` }}
          />
        </div>
        <div className={styles.footer}>
          <p className={styles.disclaimer}>
            SNT you spend to rank your DApp is locked in the store. You can earn
            back through votes, or withdraw, the majority of this SNT at any
            time.
          </p>
          <button
            type="submit"
            disabled={!sntValue || sntValue === '0'}
            onClick={this.onWithdraw}
          >
            Withdraw
          </button>
        </div>
      </Modal>
    )
  }
}

Withdraw.defaultProps = {
  dapp: null,
}

Withdraw.propTypes = {
  visible: PropTypes.bool.isRequired,
  dapp: PropTypes.instanceOf(DappModel),
  sntValue: PropTypes.string.isRequired,
  withdrawMax: PropTypes.number.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  onInputSntValue: PropTypes.func.isRequired,
}

export default Withdraw
