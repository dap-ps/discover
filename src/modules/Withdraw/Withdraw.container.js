import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Withdraw from './Withdraw'

import {
  closeWithdrawAction,
  onInputSntValueAction,
  withdrawAction,
} from './Withdraw.reducer'

const mapStateToProps = state =>
  Object.assign(state.withdraw, { dappState: state.dapps })
const mapDispatchToProps = dispatch => ({
  onClickClose: () => dispatch(closeWithdrawAction()),
  onInputSntValue: sntValue => dispatch(onInputSntValueAction(sntValue)),
  onWithdraw: (dapp, sntValue) => dispatch(withdrawAction(dapp, sntValue)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Withdraw),
)
