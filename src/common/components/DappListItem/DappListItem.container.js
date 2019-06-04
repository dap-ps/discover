import { connect } from 'react-redux'
import DappListItem from './DappListItem'
import {
  showDownVoteAction,
  showUpVoteAction,
  fetchVoteRatingAction,
} from '../../../modules/Vote/Vote.reducer'
import { toggleProfileModalAction } from '../../../modules/Profile/Profile.reducer'

const mapDispatchToProps = dispatch => ({
  onClickUpVote: dapp => {
    dispatch(showUpVoteAction(dapp))
    dispatch(fetchVoteRatingAction(dapp, true, 0))
  },
  onClickDownVote: dapp => {
    dispatch(showDownVoteAction(dapp))
    dispatch(fetchVoteRatingAction(dapp, false, 3244))
  },
  onToggleProfileModal: (dappId, data) =>
    dispatch(toggleProfileModalAction(dappId, data)),
})

export default connect(
  null,
  mapDispatchToProps,
)(DappListItem)
