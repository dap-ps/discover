import { connect } from 'react-redux'
import RecentlyAdded from './RecentlyAdded'

const mapStateToProps = state => ({
  dapps: state.dapps.recentlyAdded,
})

export default connect(mapStateToProps)(RecentlyAdded)
