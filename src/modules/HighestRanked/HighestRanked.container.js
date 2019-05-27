import { connect } from 'react-redux'
import HighestRanked from './HighestRanked'

const mapStateToProps = state => ({
  dapps: state.dapps.highestRanked,
})

export default connect(mapStateToProps)(HighestRanked)
