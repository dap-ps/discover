import voteInitialState from '../../common/data/vote'
import reducerUtil from '../../common/utils/reducer'
import BlockchainSDK from '../../common/blockchain'

import { showAlertAction } from '../Alert/Alert.reducer'
import {
  onStartProgressAction,
  onReceiveTransactionInfoAction,
  checkTransactionStatusAction,
} from '../TransactionStatus/TransactionStatus.recuder'
import {
  TYPE_UPVOTE,
  TYPE_DOWNVOTE,
} from '../TransactionStatus/TransactionStatus.utilities'

const SHOW_UP_VOTE_AFTER_CHECK = 'VOTE_SHOW_UP_VOTE_AFTER_CHECK'
const SHOW_DOWN_VOTE_AFTER_CHEECK = 'VOTE_SHOW_DOWN_VOTE_AFTER_CHEECK'
const CLOSE_VOTE = 'VOTE_CLOSE_VOTE'
const SWITCH_TO_UPVOTE = 'VOTE_SWITCH_TO_UPVOTE'
const SWITCH_TO_DOWNVOTE = 'VOTE_SWITCH_TO_DOWNVOTE'
const ON_INPUT_SNT_VALUE = 'VOTE_ON_INPUT_SNT_VALUE'
const UPDATE_AFTER_UP_VOTING_VALUES = 'VOTE_UPDATE_AFTER_UP_VOTING_VALUES'
const UPDATE_AFTER_DOWN_VOTING_VALUES = 'VOTE_UPDATE_AFTER_DOWN_VOTING_VALUES'

export const showUpVoteActionAfterCheck = dapp => {
  window.location.hash = 'vote'
  return {
    type: SHOW_UP_VOTE_AFTER_CHECK,
    payload: dapp,
  }
}

export const showDownVoteActionAfterCheck = dapp => {
  window.location.hash = 'vote'
  return {
    type: SHOW_DOWN_VOTE_AFTER_CHEECK,
    payload: dapp,
  }
}

export const showUpVoteAction = dapp => {
  return (dispatch, getState) => {
    const state = getState()
    if (state.transactionStatus.progress) {
      dispatch(
        showAlertAction(
          'There is an active transaction. Please wait for it to finish and then you could be able to vote',
        ),
      )
    } else dispatch(showUpVoteActionAfterCheck(dapp))
  }
}

export const showDownVoteAction = dapp => {
  return (dispatch, getState) => {
    const state = getState()
    if (state.transactionStatus.progress) {
      dispatch(
        showAlertAction(
          'There is an active transaction. Please wait for it to finish and then you could be able to vote',
        ),
      )
    } else dispatch(showDownVoteActionAfterCheck(dapp))
  }
}

export const switchToUpvoteAction = () => ({
  type: SWITCH_TO_UPVOTE,
  payload: null,
})

export const switchToUpDownvoteAction = () => ({
  type: SWITCH_TO_DOWNVOTE,
  payload: null,
})

export const closeVoteAction = () => {
  window.history.back()
  return {
    type: CLOSE_VOTE,
    payload: null,
  }
}

export const onInputSntValueAction = sntValue => ({
  type: ON_INPUT_SNT_VALUE,
  payload: sntValue,
})

export const updateAfterUpVotingValuesAction = rating => ({
  type: UPDATE_AFTER_UP_VOTING_VALUES,
  payload: rating,
})

export const updateAfterDownVotingValuesAction = (rating, sntValue) => ({
  type: UPDATE_AFTER_DOWN_VOTING_VALUES,
  payload: { rating, sntValue },
})

export const fetchVoteRatingAction = (dapp, isUpvote, sntValue) => {
  return async (dispatch, getState) => {
    let rating
    let downVoteSntValue = 0
    if (isUpvote === true) {
      try {
        const blockchain = await BlockchainSDK.getInstance()
        rating = await blockchain.DiscoverService.upVoteEffect(
          dapp.id,
          sntValue,
        )
        rating = parseInt(rating, 10)
      } catch (e) {
        return
      }
    } else {
      // rating = parseInt(dapp.sntValue * 0.99, 10)
      try {
        const blockchain = await BlockchainSDK.getInstance()
        const downVoteEffect = await blockchain.DiscoverService.downVoteCost(
          dapp.id,
        )
        // balanceDownBy, votesRequired, cost
        rating = parseInt(downVoteEffect.vR, 10)
        downVoteSntValue = downVoteEffect.c
      } catch (e) {
        return
      }
    }

    const state = getState()
    const voteState = state.vote
    if (voteState.dapp !== dapp) return
    if (voteState.isUpvote !== isUpvote) return
    if (isUpvote) {
      if (voteState.sntValue !== sntValue.toString()) return
      if (sntValue === 0) return
      dispatch(updateAfterUpVotingValuesAction(rating))
    } else {
      dispatch(updateAfterDownVotingValuesAction(rating, downVoteSntValue))
    }
  }
}

export const upVoteAction = (dapp, amount) => {
  return async dispatch => {
    dispatch(closeVoteAction())
    dispatch(
      onStartProgressAction(
        dapp.name,
        dapp.image,
        `↑ Upvote by ${amount} SNT`,
        TYPE_UPVOTE,
      ),
    )
    try {
      const blockchain = await BlockchainSDK.getInstance()
      const tx = await blockchain.DiscoverService.upVote(dapp.id, amount)
      dispatch(onReceiveTransactionInfoAction(dapp.id, tx))
      dispatch(checkTransactionStatusAction(tx))
    } catch (e) {
      dispatch(showAlertAction(e.message))
    }
  }
}

export const downVoteAction = (dapp, amount) => {
  return async dispatch => {
    const msg = amount !== '0' ? ` by ${amount} SNT` : ''

    dispatch(closeVoteAction())
    dispatch(
      onStartProgressAction(
        dapp.name,
        dapp.image,
        `↓ Downvote${msg}`,
        TYPE_DOWNVOTE,
      ),
    )
    try {
      const blockchain = await BlockchainSDK.getInstance()
      const tx = await blockchain.DiscoverService.downVote(dapp.id)
      dispatch(onReceiveTransactionInfoAction(dapp.id, tx))
      dispatch(checkTransactionStatusAction(tx))
    } catch (e) {
      dispatch(showAlertAction(e.message))
    }
  }
}

const showUpVoteAfterCheck = (state, dapp) => {
  return Object.assign({}, state, {
    visible: true,
    dapp,
    sntValue: '0',
    isUpvote: true,
    afterVoteRating: null,
  })
}

const showDownVoteAfterCheck = (state, dapp) => {
  return Object.assign({}, state, {
    visible: true,
    dapp,
    sntValue: '0',
    isUpvote: false,
    afterVoteRating: null,
  })
}

const closeVote = state => {
  return Object.assign({}, state, {
    visible: false,
    dapp: null,
  })
}

const switchToUpvote = state => {
  return Object.assign({}, state, {
    isUpvote: true,
    sntValue: '0',
    afterVoteRating: null,
  })
}

const switchToDownvote = state => {
  return Object.assign({}, state, {
    isUpvote: false,
    sntValue: '0',
    afterVoteRating: null,
  })
}

const onInputSntValue = (state, sntValue) => {
  return Object.assign({}, state, {
    sntValue,
  })
}

const updateAfterUpVotingValues = (state, rating) => {
  return Object.assign({}, state, {
    afterVoteRating: rating,
  })
}

const updateAfterDownVotingValues = (state, payload) => {
  const { rating, sntValue } = payload
  return Object.assign({}, state, {
    afterVoteRating: rating,
    sntValue,
  })
}

const map = {
  [SHOW_UP_VOTE_AFTER_CHECK]: showUpVoteAfterCheck,
  [SHOW_DOWN_VOTE_AFTER_CHEECK]: showDownVoteAfterCheck,
  [CLOSE_VOTE]: closeVote,
  [SWITCH_TO_UPVOTE]: switchToUpvote,
  [SWITCH_TO_DOWNVOTE]: switchToDownvote,
  [ON_INPUT_SNT_VALUE]: onInputSntValue,
  [UPDATE_AFTER_UP_VOTING_VALUES]: updateAfterUpVotingValues,
  [UPDATE_AFTER_DOWN_VOTING_VALUES]: updateAfterDownVotingValues,
}

export default reducerUtil(map, voteInitialState)
