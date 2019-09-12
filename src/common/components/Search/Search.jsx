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
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { value } = e.target
    const { dappState } = this.props
    if (value.length > 1) {
      const dapps = dappState.dapps.filter(dapp => dapp.name.startsWith(value))
      this.setState({ dapps, isSearching: true })
    } else if (value === '') {
      this.setState({
        isSearching: false,
        dapps: [],
      })
    }
  }

  render() {
    const { searchStyle, searchResultStyle } = this.props
    const { dapps, isSearching } = this.state
    return (
      <div className={styles.search_container}>
        <img src={searchIcon} alt="Search Icon" width="16" height="16" />
        <input
          type="text"
          onChange={e => this.handleChange(e)}
          className={[styles.search, searchStyle].join(' ')}
          placeholder="Search Dapps"
        />
        {isSearching && (
          <div className={[styles.searchResults, searchResultStyle].join(' ')}>
            <SearchResultItem showActionButtons={false} dapps={dapps} />
          </div>
        )}
      </div>
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
