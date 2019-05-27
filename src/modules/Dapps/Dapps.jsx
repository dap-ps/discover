import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'debounce'
import DappList from '../../common/components/DappList'
import CategoryHeader from '../CategoryHeader'
import styles from './Dapps.module.scss'
import { headerElements, getYPosition } from './Dapps.utils'

class Dapps extends React.Component {
  static scanHeaderPositions() {
    const headerPositions = headerElements().map(element => ({
      id: element.id,
      position: getYPosition(element),
    }))
    return headerPositions
  }

  constructor(props) {
    super(props)
    this.state = {
      currentCategoryIndex: 0,
    }
  }

  componentDidMount() {
    this.boundScroll = debounce(this.handleScroll.bind(this), 1)
    window.addEventListener('scroll', this.boundScroll)
    this.fetchDapps()
  }

  componentDidUpdate() {
    this.fetchDapps()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.boundScroll)
  }

  onFetchByCategory(category) {
    const { fetchByCategory } = this.props
    fetchByCategory(category)
  }

  getCategories() {
    const { dappsCategoryMap } = this.props
    return [...dappsCategoryMap.keys()]
  }

  fetchDapps() {
    const { dappsCategoryMap, fetchByCategory } = this.props

    dappsCategoryMap.forEach((dappState, category) => {
      if (dappState.canFetch() === false) return
      if (dappState.items.length >= 1) return
      fetchByCategory(category)
    })
  }

  handleScroll() {
    const currentHeader = document.getElementById(this.currentCategory())
    const headerPositions = Dapps.scanHeaderPositions()
    const categories = this.getCategories()

    const newHeader = [...headerPositions]
      .reverse()
      .find(header => header.position < window.scrollY)

    if (!newHeader) {
      return this.setState({ currentCategoryIndex: 0 })
    }

    if (newHeader.id === currentHeader.id) {
      return false
    }

    const newIndex = categories.indexOf(newHeader.id)

    return this.setState({ currentCategoryIndex: newIndex })
  }

  currentCategory() {
    const { currentCategoryIndex } = this.state
    const categories = this.getCategories()
    return categories[currentCategoryIndex]
  }

  isCurrentCategory(category) {
    return category === this.currentCategory()
  }

  render() {
    const { dappsCategoryMap } = this.props
    const categories = this.getCategories()

    return (
      <div className={styles.list}>
        {categories.map(category => (
          <div key={category}>
            <div id={category} className="category-header">
              <CategoryHeader
                text={category}
                active={this.isCurrentCategory(category)}
              />
            </div>
            <DappList dapps={dappsCategoryMap.get(category).items} />
            {dappsCategoryMap.get(category).canFetch() && (
              <div
                className={styles.loadMore}
                onClick={this.onFetchByCategory.bind(this, category)}
              >
                Load more dApps from {category}{' '}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
}

// Dapps.propTypes = {
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({ category: PropTypes.string, dapps: DappListModel }),
//   ).isRequired,
// }
Dapps.propTypes = {
  dappsCategoryMap: PropTypes.instanceOf(Map).isRequired,
  fetchByCategory: PropTypes.func.isRequired,
}

export default Dapps
