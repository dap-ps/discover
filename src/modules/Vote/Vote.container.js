import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Vote from './Vote'
import {
  closeVoteAction,
  switchToUpvoteAction,
  switchToUpDownvoteAction,
  onInputSntValueAction,
  fetchVoteRatingAction,
  upVoteAction,
  downVoteAction,
} from './Vote.reducer'

const mapStateToProps = state =>
  Object.assign(state.vote, { dapps: state.dapps.dapps })
const mapDispatchToProps = dispatch => ({
  onClickClose: () => dispatch(closeVoteAction()),
  onClickUpvote: () => dispatch(switchToUpvoteAction()),
  onClickDownvote: () => dispatch(switchToUpDownvoteAction()),
  onInputSntValue: sntValue => dispatch(onInputSntValueAction(sntValue)),
  fetchVoteRating: (dapp, isUpvote, sntValue) => {
    dispatch(fetchVoteRatingAction(dapp, isUpvote, sntValue))
  },
  upVote: (dapp, amount) => dispatch(upVoteAction(dapp, amount)),
  downVote: (dapp, amount) => dispatch(downVoteAction(dapp, amount)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Vote),
)
