import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.module.scss'

const Modal = props => {
  const {
    visible,
    children,
    modalClassName,
    windowClassName,
    contentClassName,
    onClickClose,
  } = props

  return (
    <div
      className={`${modalClassName} ${styles.wrapper} ${
        visible ? styles.active : ''
      }`}
    >
      <div className={`${styles.window} ${windowClassName}`}>
        <div className={styles.close} onClick={onClickClose}>
          +
        </div>
        <div className={contentClassName}>{visible && children}</div>
      </div>
    </div>
  )
}

Modal.defaultProps = {
  modalClassName: '',
  windowClassName: '',
  contentClassName: '',
  children: null,
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  modalClassName: PropTypes.string,
  windowClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClickClose: PropTypes.func.isRequired,
}

export default Modal
