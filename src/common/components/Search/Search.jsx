import React from 'react'
import PropTypes from 'prop-types'
import searchIcon from '../../assets/images/search.svg'
import SearchResultItem from './SearchResultList'
import { DappState } from '../../data/dapp'
import styles from './Search.module.scss'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dapps: [],
      isSearching: false,
    }
    this.nodes = React.createRef()
    this.handleChange = this.handleChange.bind(this)
    this.applyClass = this.applyClass.bind(this)
    this.closeSearchBox = this.closeSearchBox.bind(this)
    this.onClickBody = this.onClickBody.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickBody)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickBody)
  }

  onClickBody(e) {
    if (this.nodes && this.nodes.current.contains(e.target) === true) return

    this.setState({
      isSearching: false,
      dapps: [],
    })
  }

  closeSearchBox() {}

  applyClass(e) {
    e.preventDefault()
    this.setState({
      isSearching: true,
    })
  }

  handleChange(e) {
    const { value } = e.target
    const { dappState } = this.props
    this.setState({ isSearching: true })
    if (value.length > 1) {
      const searchExp = new RegExp(value, 'i')
      const dapps = dappState.dapps.filter(dapp => {
        if (dapp.name.search(searchExp) != -1) {
          return dapp
        }
        return null
      })
      this.setState({ dapps })
    } else {
      this.setState({
        dapps: [],
      })
    }
  }

  render() {
    const { searchStyle, searchResultStyle } = this.props
    const { dapps, isSearching } = this.state
    const cssClassVisible = isSearching ? styles.isOpen : ''
    return (
      <>
        <div className={`${styles.dim}`} />
        <div
          ref={this.nodes}
          className={[styles.search_container, cssClassVisible].join(' ')}
          onClick={e => this.applyClass(e)}
        >
          <img src={searchIcon} alt="Search Icon" width="16" height="16" />
          <input
            type="text"
            onChange={e => this.handleChange(e)}
            className={[styles.search, searchStyle].join(' ')}
            placeholder="Search Dapps"
          />
          {isSearching && (
            <div
              className={[styles.searchResults, searchResultStyle].join(' ')}
            >
              <SearchResultItem showActionButtons={false} dapps={dapps} />
            </div>
          )}
        </div>
      </>
    )
  }
}

Search.propTypes = {
  searchStyle: PropTypes.string,
  searchResultStyle: PropTypes.string,
  dappState: PropTypes.instanceOf(DappState).isRequired,
}

Search.defaultProps = {
  searchStyle: null,
  searchResultStyle: null,
}

export default Search
