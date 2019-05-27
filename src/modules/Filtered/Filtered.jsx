import React from 'react'
import PropTypes from 'prop-types'
import CategorySelector from '../CategorySelector'
import DappList from '../../common/components/DappList'
import styles from './Filtered.module.scss'

const getScrollY =
  window.scrollY !== undefined
    ? () => {
        return window.scrollY
      }
    : () => {
        return document.documentElement.scrollTop
      }

class Filtered extends React.Component {
  constructor(props) {
    super(props)
    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount() {
    this.fetchDapps()
    document.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate() {
    this.fetchDapps()
  }

  onScroll() {
    this.fetchDapps()
  }

  getDappList() {
    const { dappsCategoryMap, match } = this.props
    const result =
      match !== undefined ? dappsCategoryMap.get(match.params.id).items : []
    return result
  }

  fetchDapps() {
    const { dappsCategoryMap, match, fetchByCategory } = this.props
    if (match === undefined) return

    const dappState = dappsCategoryMap.get(match.params.id)
    if (dappState.canFetch() === false) return

    const root = document.getElementById('root')
    const bottom = window.innerHeight + getScrollY()
    const isNearEnd = bottom + window.innerHeight > root.offsetHeight

    if (isNearEnd === false && dappState.items.length >= 10) return

    fetchByCategory(match.params.id)
  }

  render() {
    const { match } = this.props
    const result = this.getDappList()

    return (
      <>
        <CategorySelector
          category={match !== undefined ? match.params.id : undefined}
        />
        <div className={styles.list}>
          <DappList dapps={result} />
        </div>
      </>
    )
  }
}

Filtered.defaultProps = {
  match: undefined,
}

Filtered.propTypes = {
  dappsCategoryMap: PropTypes.instanceOf(Map).isRequired,
  fetchByCategory: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }),
}

export default Filtered
