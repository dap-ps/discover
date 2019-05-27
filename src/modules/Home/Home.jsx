import React from 'react'
import PropTypes from 'prop-types'
import RecentlyAdded from '../RecentlyAdded'
import HighestRanked from '../HighestRanked'
import Categories from '../Categories'
import FeaturedDapps from '../../common/components/FeatureDapps'
import Footer from '../Footer'
import LoadingHome from '../LoadingHome'
import featured from '../../common/data/featured'
import styles from './Home.module.scss'
import DesktopMenu from '../DesktopMenu/DesktopMenu.container'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { dapps } = this.props
    const loaded =
      dapps.highestRankedFetched === true && dapps.recentlyAddedFetched === true

    return (
      <>
        {loaded && (
          <>
            <div className={styles.header}>
              <h2 className={styles.headline}>Discover</h2>
            </div>
            <DesktopMenu />
            <FeaturedDapps featured={featured} />
            <Categories />
            <HighestRanked />
            <RecentlyAdded />
            <Footer />
          </>
        )}

        {!loaded && <LoadingHome />}
      </>
    )
  }
}

Home.defaultProps = {
  dapps: {
    highestRankedFetched: null,
    recentlyAddedFetched: null,
  },
}

Home.propTypes = {
  dapps: PropTypes.shape({
    highestRankedFetched: PropTypes.bool,
    recentlyAddedFetched: PropTypes.bool,
  }),
}

export default Home
