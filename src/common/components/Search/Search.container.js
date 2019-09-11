import { connect } from 'react-redux'
import Search from './Search'

const mapStateToProps = state => ({
  dappState: state.dapps,
})

export default connect(mapStateToProps)(Search)
