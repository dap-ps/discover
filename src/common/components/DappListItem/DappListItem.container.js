import { connect } from 'react-redux'
import DappListItem from './DappListItem'
import {
  showDownVoteAction,
  showUpVoteAction,
  fetchVoteRatingAction,
} from '../../../modules/Vote/Vote.reducer'
import { toggleProfileModalAction } from '../../../modules/Profile/Profile.reducer'

const mapDispatchToProps = dispatch => ({
  onClickUpVote: () => dispatch(showUpVoteAction()),
  onClickDownVote: () => dispatch(showDownVoteAction()),
  onClickUpVote: dapp => {
    dispatch(showUpVoteAction(dapp))
    dispatch(fetchVoteRatingAction(dapp, true, 0))
  },
  onClickDownVote: dapp => {
    dispatch(showDownVoteAction(dapp))
    dispatch(fetchVoteRatingAction(dapp, false, 3244))
  },
  onToggleProfileModal: data => dispatch(toggleProfileModalAction(data)),
})

export default connect(
  null,
  mapDispatchToProps,
)(DappListItem)
