import { connect } from 'react-redux'
import Filtered from './Filtered'

const mapStateToProps = state => ({
  dappState: state.dapps,
})

export default connect(mapStateToProps)(Filtered)
