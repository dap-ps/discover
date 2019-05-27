import React from 'react'
import PropTypes from 'prop-types'
import styles from './Alert.module.scss'

class Alert extends React.Component {
  constructor(props) {
    super(props)
    this.onClickPositive = this.onClickPositive.bind(this)
    this.onClickNegative = this.onClickNegative.bind(this)
  }
  onClickPositive() {
    const { hideAlert, positiveListener } = this.props
    hideAlert()
    if (positiveListener !== null) positiveListener()
  }
  onClickNegative() {
    const { hideAlert, negativeListener } = this.props
    hideAlert()
    if (negativeListener !== null) negativeListener()
  }
  render() {
    const { visible, msg, positiveLabel, negativeLabel } = this.props
    const cssClassActive = visible ? styles.active : ''

    return (
      <div className={`${styles.alertWrapper} ${cssClassActive}`}>
        <div className={styles.alert}>
          <div className={styles.msg}>{msg}</div>
          <div className={styles.actions}>
            <div className={styles.textButton} onClick={this.onClickPositive}>
              {positiveLabel}
            </div>
            {negativeLabel !== '' && (
              <div className={styles.textButton} onClick={this.onClickNegative}>
                {negativeLabel}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

Alert.defaultProps = {
  negativeLabel: '',
  positiveListener: null,
  negativeListener: null,
}

Alert.propTypes = {
  visible: PropTypes.bool.isRequired,
  msg: PropTypes.string.isRequired,
  positiveLabel: PropTypes.string.isRequired,
  negativeLabel: PropTypes.string,
  positiveListener: PropTypes.func,
  negativeListener: PropTypes.func,
  hideAlert: PropTypes.func.isRequired,
}

export default Alert
