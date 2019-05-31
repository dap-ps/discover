import { connect } from 'react-redux'
import Dapps from './Dapps'

const mapStateToProps = state => ({
  dappState: state.dapps,
})

export default connect(mapStateToProps)(Dapps)
