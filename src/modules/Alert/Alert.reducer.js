import alertInitialState from '../../common/data/alert'
import reducerUtil from '../../common/utils/reducer'

const SHOW_ALERT = 'SHOW_ALERT'
const HIDE_ALERT = 'HIDE_ALERT'

export const showAlertAction = (
  msg,
  positiveLabel,
  negativeLabel,
  positiveListener,
  negativeListener,
) => ({
  type: SHOW_ALERT,
  payload: {
    msg,
    positiveLabel,
    negativeLabel,
    positiveListener,
    negativeListener,
  },
})

export const hideAlertAction = () => ({
  type: HIDE_ALERT,
  payload: null,
})

const showAlert = (state, payload) => {
  const {
    msg,
    positiveLabel,
    negativeLabel,
    positiveListener,
    negativeListener,
  } = payload

  return Object.assign({}, state, {
    visible: true,
    msg,
    positiveLabel: positiveLabel !== undefined ? positiveLabel : 'OK',
    negativeLabel,
    positiveListener,
    negativeListener,
  })
}

const hideAlert = state => {
  return Object.assign({}, state, {
    visible: false,
  })
}

const map = {
  [SHOW_ALERT]: showAlert,
  [HIDE_ALERT]: hideAlert,
}

export default reducerUtil(map, alertInitialState)
