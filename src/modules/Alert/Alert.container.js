import { connect } from 'react-redux'
import Alert from './Alert'
import { hideAlertAction } from './Alert.reducer'
import { hideAction } from '../TransactionStatus/TransactionStatus.recuder'

const mapStateToProps = state => state.alert
const mapDispatchToProps = dispatch => ({
  hideAlert: () => dispatch(hideAlertAction()),
  hideTransaction: () => dispatch(hideAction()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alert)
