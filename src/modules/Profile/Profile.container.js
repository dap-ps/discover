import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Profile from './Profile'
import { showWithdrawAction } from '../Withdraw/Withdraw.reducer'

const mapStateToProps = state => ({ dappState: state.dapps })

const mapDispatchToProps = dispatch => ({
  onClickWithdraw: dapp => dispatch(showWithdrawAction(dapp)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Profile),
)
