import howToSubmitInitialState from '../../common/data/how-to-submit'
import reducerUtil from '../../common/utils/reducer'

const SHOW = 'HOW_TO_SHOW'
const HIDE = 'HOW_TO_HIDE'
const SWITCH_TO_TERMS = 'HOW_SWITCH_TO_TERMS'

export const showHowToSubmitAction = () => {
  window.location.hash = 'how-to-submit'
  return {
    type: SHOW,
    payload: null,
  }
}

export const hideHowToSubmitAction = () => {
  window.history.back()
  return {
    type: HIDE,
    payload: null,
  }
}

export const switchToTermsAction = () => ({
  type: SWITCH_TO_TERMS,
  payload: null,
})

const show = state => {
  return Object.assign({}, state, {
    visible_how_to_submit: true,
    visible_terms: false,
  })
}

const hide = state => {
  return Object.assign({}, state, {
    visible_how_to_submit: false,
    visible_terms: false,
  })
}

const switchToTerms = state => {
  return Object.assign({}, state, {
    visible_how_to_submit: false,
    visible_terms: true,
  })
}

const map = {
  [SHOW]: show,
  [HIDE]: hide,
  [SWITCH_TO_TERMS]: switchToTerms,
}

export default reducerUtil(map, howToSubmitInitialState)
