import React from 'react'
import PropTypes from 'prop-types'
import CategoryIcon from '../../common/components/CategoryIcon'
import ViewAll from '../../common/components/ViewAll'
import categories from '../../common/utils/categories'
import humanise from '../../common/utils/humanise'
import dropdownArrows from '../../common/assets/images/dropdown-arrows.svg'
import styles from './CategorySelector.module.scss'

class CategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.toggle = this.toggle.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
    this.container = React.createRef()
    this.onClickSubmit = this.onClickSubmit.bind(this)
    this.onClickHighestRanked = this.onClickHighestRanked.bind(this)
    this.onClickRecentlyAdded = this.onClickRecentlyAdded.bind(this)
  }

  componentDidMount() {
    this.closeOnBackgroundClick = this.closeOnBackgroundClick.bind(this)
    document.addEventListener('click', this.closeOnBackgroundClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeOnBackgroundClick)
  }

  onClickSubmit(e) {
    const { onClickSubmit, onClickCloseDesktopMenu } = this.props
    onClickCloseDesktopMenu()
    onClickSubmit()
    e.stopPropagation()
  }

  closeOnBackgroundClick(event) {
    if (this.container.current.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }

  onClickHighestRanked(e) {
    const { onClickCloseDesktopMenu } = this.props
    onClickCloseDesktopMenu()
    e.stopPropagation()
    window.location.hash = 'highest-ranked'
  }

  onClickRecentlyAdded(e) {
    const { onClickCloseDesktopMenu } = this.props
    onClickCloseDesktopMenu()
    e.stopPropagation()
    window.location.hash = 'recently-added'
  }

  updateCategory(event) {
    const { select } = this.props
    select(event.target.value)
    this.setState({ open: false })
  }

  toggle() {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    const {
      category,
      alwaysOpen,
      className,
      showLists,
      showSubmitDApp,
    } = this.props
    let { open } = this.state
    if (alwaysOpen === true) open = true

    return (
      <div ref={this.container} className={className}>
        <div
          style={open ? { visible: 'block' } : { display: 'none' }}
          className={styles.open}
        >
          <div className={styles.openHeader}>
            <h2>Categories</h2>
            <ViewAll size="small" />
          </div>
          {categories.map(c => (
            <button
              className={
                c.key === category
                  ? [styles.openButton, styles.selected].join(' ')
                  : styles.openButton
              }
              key={c.key}
              type="button"
              value={c.key}
              onClick={this.updateCategory}
            >
              <CategoryIcon category={c.key} />
              {c.value}
            </button>
          ))}

          {showLists && (
            <>
              <div className={`${styles.openHeader} ${styles.spacing}`}>
                <h2>Lists</h2>
              </div>
              <button
                className={styles.openButton}
                type="button"
                onClick={this.onClickHighestRanked}
              >
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.07764 0.702201C8.42034 -0.116037 9.57966 -0.116039 9.92236 0.7022L11.555 4.60017C11.6992 4.9444 12.023 5.1797 12.395 5.21045L16.6066 5.55862C17.4907 5.6317 17.849 6.73427 17.1767 7.31306L13.974 10.0703C13.6912 10.3138 13.5675 10.6945 13.6532 11.0578L14.6235 15.1709C14.8272 16.0343 13.8893 16.7157 13.1311 16.2552L9.51914 14.0613C9.20016 13.8676 8.79984 13.8676 8.48087 14.0613L4.86889 16.2552C4.11068 16.7157 3.17278 16.0343 3.37647 15.1709L4.34682 11.0578C4.43251 10.6945 4.30881 10.3138 4.02598 10.0703L0.823298 7.31306C0.15101 6.73427 0.509255 5.6317 1.39335 5.55862L5.60504 5.21045C5.97698 5.1797 6.30084 4.9444 6.44502 4.60017L8.07764 0.702201Z"
                    fill="black"
                  />
                </svg>
                {'Highest rated'}
              </button>
              <button
                className={styles.openButton}
                type="button"
                onClick={this.onClickRecentlyAdded}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9.75 3.375C9.75 2.75368 9.24632 2.25 8.625 2.25C8.00368 2.25 7.5 2.75368 7.5 3.375V8.00368C7.5 8.69987 7.77656 9.36755 8.26884 9.85983L11.2045 12.7955C11.6438 13.2348 12.3562 13.2348 12.7955 12.7955C13.2348 12.3562 13.2348 11.6438 12.7955 11.2045L9.85983 8.26884C9.78951 8.19852 9.75 8.10314 9.75 8.00368V3.375Z"
                    fill="black"
                  />
                </svg>
                {'Recently added'}
              </button>
            </>
          )}

          {showSubmitDApp && (
            <button
              className={`${styles.openButton} ${styles.submitDapp}`}
              type="button"
              onClick={this.onClickSubmit}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10 4C10.5523 4 11 4.44772 11 5V8.5C11 8.77614 11.2239 9 11.5 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H11.5C11.2239 11 11 11.2239 11 11.5V15C11 15.5523 10.5523 16 10 16C9.44771 16 9 15.5523 9 15V11.5C9 11.2239 8.77614 11 8.5 11H5C4.44771 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H8.5C8.77614 9 9 8.77614 9 8.5V5C9 4.44771 9.44772 4 10 4Z"
                  fill="black"
                />
              </svg>
              {'Submit a ÐApp'}
            </button>
          )}
        </div>

        <button
          style={open ? { visibility: 'hidden' } : { visibility: 'visible' }}
          className={[styles.closed, styles[category]].join(' ')}
          type="button"
          onClick={this.toggle}
        >
          <div className={styles.closedText}>
            {category && <CategoryIcon category={category} />}
            {category ? humanise(category) : 'Choose category'}
          </div>
          <img src={dropdownArrows} alt="Toggle category selector" />
        </button>
      </div>
    )
  }
}

CategorySelector.propTypes = {
  category: PropTypes.string,
  select: PropTypes.func.isRequired,
  alwaysOpen: PropTypes.bool,
  className: PropTypes.string,
  showLists: PropTypes.bool,
  showSubmitDApp: PropTypes.bool,
  onClickSubmit: PropTypes.func,
  onClickCloseDesktopMenu: PropTypes.func,
}

CategorySelector.defaultProps = {
  category: null,
  className: '',
  alwaysOpen: false,
  showLists: false,
  showSubmitDApp: false,
  onClickSubmit: null,
  onClickCloseDesktopMenu: null,
}

export default CategorySelector
