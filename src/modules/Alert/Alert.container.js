import { connect } from 'react-redux'
import Alert from './Alert'
import { hideAlertAction } from './Alert.reducer'

const mapStateToProps = state => state.alert
const mapDispatchToProps = dispatch => ({
  hideAlert: () => dispatch(hideAlertAction()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alert)
