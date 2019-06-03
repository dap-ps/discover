import profileState from '../../common/data/profile'
import reducerUtil from '../../common/utils/reducer'
import { history } from '../../common/redux/store'

const PROFILE_NAVIGATE = 'PROFILE_NAVIGATE'

export const toggleProfileModalAction = dapp => {
  history.push(`/${dapp.trim()}`, dapp)
  return {
    type: PROFILE_NAVIGATE,
    payload: null,
  }
}

const map = {}

export default reducerUtil(map, profileState)
