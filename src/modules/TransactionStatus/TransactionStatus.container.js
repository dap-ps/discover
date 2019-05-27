import { connect } from 'react-redux'
import TransactionStatus from './TransactionStatus'
import {
  hideAction,
  checkTransactionStatusAction,
} from './TransactionStatus.recuder'

const mapStateToProps = state => state.transactionStatus
const mapDispatchToProps = dispatch => ({
  hide: () => dispatch(hideAction()),
  checkTransactionStatus: hash => dispatch(checkTransactionStatusAction(hash)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionStatus)
