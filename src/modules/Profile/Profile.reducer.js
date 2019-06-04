import profileState from '../../common/data/profile'
import reducerUtil from '../../common/utils/reducer'
import { history } from '../../common/redux/store'
import BlockchainSDK from '../../common/blockchain'

const PROFILE_NAVIGATE = 'PROFILE_NAVIGATE'

const profileNavigateAction = (name, editable) => ({
  type: PROFILE_NAVIGATE,
  payload: { name, editable },
})

export const toggleProfileModalAction = (dappId, dappName) => {
  return async dispatch => {
    history.push(`/${dappName.trim()}`, dappName)
    dispatch(profileNavigateAction(dappName, false))

    try {
      const blockchain = await BlockchainSDK.getInstance()
      const editable = await blockchain.DiscoverService.checkIfCreatorOfDApp(
        dappId,
      )
      dispatch(profileNavigateAction(dappName, editable))
    } catch (e) {}
  }
}

const profileNavigate = (state, payload) => {
  const { name, editable } = payload
  return Object.assign({}, state, {
    name,
    editable,
  })
}

const map = {
  [PROFILE_NAVIGATE]: profileNavigate,
}

export default reducerUtil(map, profileState)
