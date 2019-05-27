import { connect } from 'react-redux'

import Profile from './Profile'
import { toggleProfileModalAction } from './Profile.reducer'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  openModal: dapp => dispatch(toggleProfileModalAction(dapp)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
