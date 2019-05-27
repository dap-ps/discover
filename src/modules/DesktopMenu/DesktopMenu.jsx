import React from 'react'
import PropTypes from 'prop-types'
import styles from './DesktopMenu.module.scss'
import CategorySelector from '../CategorySelector/CategorySelector.container'

class DesktopMenu extends React.Component {
  constructor(props) {
    super(props)
    this.nodes = { root: React.createRef() }
    this.onClickBody = this.onClickBody.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickBody)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickBody)
  }

  onClickBody(e) {
    if (this.nodes.root.current.contains(e.target) === true) return

    const { onClickClose } = this.props
    onClickClose()
  }

  render() {
    const { visible, onClickShow } = this.props
    const cssClassVisible = visible ? styles.visible : ''
    const cssClassNameVisibleDim = visible ? styles.dimVisible : ''

    return (
      <>
        <div className={`${styles.dim} ${cssClassNameVisibleDim}`} />
        <div ref={this.nodes.root} className={styles.cnt} onClick={onClickShow}>
          <div className={`${styles.dropDown} ${cssClassVisible}`}>
            <CategorySelector
              className={styles.categorySelector}
              alwaysOpen
              showLists
              showSubmitDApp
            />
          </div>
        </div>
      </>
    )
  }
}

DesktopMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClickShow: PropTypes.func.isRequired,
  onClickClose: PropTypes.func.isRequired,
}

export default DesktopMenu
