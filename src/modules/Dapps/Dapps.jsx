import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'debounce'
import DappList from '../../common/components/DappList'
import CategoryHeader from '../CategoryHeader'
import styles from './Dapps.module.scss'
import { headerElements, getYPosition } from './Dapps.utils'
import { DappState } from '../../common/data/dapp'

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
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.boundScroll)
  }

  getCategories() {
    const { dappState } = this.props
    return [...dappState.categoryMap.keys()]
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
    const { dappState } = this.props
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
            <DappList dapps={dappState.getDappsByCategory(category)} />
          </div>
        ))}
      </div>
    )
  }
}

Dapps.propTypes = {
  dappState: PropTypes.instanceOf(DappState).isRequired,
}

export default Dapps
