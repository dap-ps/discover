import React from 'react'
import PropTypes from 'prop-types'
import styles from './HowToSubmit.module.scss'
import Modal from '../../common/components/Modal'
import Terms from '../Terms/Terms'

class HowToSubmit extends React.Component {
  constructor(props) {
    super(props)
    this.wrapper = React.createRef()
    this.onClickNext = this.onClickNext.bind(this)
  }

  onClickNext() {
    const {
      visible_how_to_submit,
      onClickContinue,
      onClickGetStarted,
    } = this.props
    if (visible_how_to_submit) {
      this.wrapper.current.parentNode.parentNode.scrollTop = 0
      onClickContinue()
    } else onClickGetStarted()
  }

  render() {
    const { visible_how_to_submit, visible_terms, onClickClose } = this.props
    const visible = visible_how_to_submit || visible_terms

    return (
      <Modal
        visible={visible && window.location.hash === '#how-to-submit'}
        onClickClose={onClickClose}
        windowClassName={styles.modalWindow}
      >
        <div ref={this.wrapper} className={styles.cnt}>
          {visible_how_to_submit && (
            <>
              <div className={styles.title}>How to submit a ÐApp</div>
              <div className={styles.frame}>
                <div className={styles.frameTitle}>Submit your ÐApp</div>
                <ol>
                  <li>
                    Upload a name, url, description, category and image for your
                    DApp in the next step compulsory.
                  </li>
                  <li>
                    Stake the amount of SNT you want to rank your DApp optional.
                  </li>
                  <li>Hit “submit”.</li>
                  <li>
                    Our team will ensure that your DApp works well on mobile
                    devices and will then include it on the live site using the
                    information you provided in Step 1.
                  </li>
                </ol>
              </div>
              <div className={styles.frame}>
                <div className={styles.frameTitle}>Staking</div>
                <p>
                  You need not stake anything to be included - your DApp just
                  won’t appear in the “Highest Ranked” section. If you do stake
                  SNT, your DApp will appear in that section immediately. The
                  DApp with the highest effective balance (that is, SNT staked
                  plus/minus votes cast for/against) ranks highest.
                </p>
                <p>
                  SNT you stake is locked in the Discover contract. You can, at
                  any time, withdraw a percentage of what you have staked. The
                  more you stake, the lower the percentage you can withdraw.
                  Withdrawals must be made from the same wallet as you submitted
                  with, so PLEASE SECURE THIS ADDRESS.
                </p>
              </div>
              <div className={`${styles.frame} ${styles.withBorder}`}>
                <ol>
                  <li>
                    Staking <strong>10 000 SNT</strong> returns a rate of{' '}
                    <strong>99.5%</strong>, so you can withdraw up to{' '}
                    <strong>9 950 SNT.</strong>
                  </li>
                  <li>
                    Staking <strong>1 000 000 SNT</strong> returns a rate of
                    50.99%, so you can withdraw up to{' '}
                    <strong>509 958 SNT.</strong>
                  </li>
                </ol>
              </div>
              <div className={styles.frame}>
                <p>
                  Furthermore, the operators of{' '}
                  <a href="https://dap.ps">https://dap.ps</a> reserve the right
                  to remove any DApp from the UI for reasons including, but not
                  limited to:
                </p>
              </div>
              <div className={`${styles.frame} ${styles.withBorder}`}>
                <ol>
                  <li>Malicious code injection</li>
                  <li>
                    Violation of <a>Status' principles</a>
                  </li>
                  <li>Lack of usability (especially on mobile)</li>
                  <li>Vote manipulation.</li>
                </ol>
              </div>
              <div className={styles.frame}>
                <p>
                  Anyone is welcome to fork the software and implement different
                  UI choices for the same underlying contract. Note that
                  Discover is not affiliated with Status directly, we have
                  simply chosen to use SNT as a token of value, to abide by{' '}
                  <a>Status’ principles</a>, and to take a mobile-first approach
                  to development.
                </p>
              </div>
            </>
          )}
          {visible_terms && <Terms />}
          <div className={styles.footerActions}>
            <button
              className={styles.submitButton}
              type="submit"
              onClick={this.onClickNext}
            >
              {visible_how_to_submit ? 'Continue' : 'Get started'}
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

HowToSubmit.propTypes = {
  visible_how_to_submit: PropTypes.bool.isRequired,
  visible_terms: PropTypes.bool.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onClickContinue: PropTypes.func.isRequired,
  onClickGetStarted: PropTypes.func.isRequired,
}

export default HowToSubmit
