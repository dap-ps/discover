import desktopMenuState from '../../common/data/desktop-menu'
import reducerUtil from '../../common/utils/reducer'

const SHOW_DESKTOP_MENU = 'SHOW_DESKTOP_MENU'
const CLOSE_DESKTOP_MENU = 'CLOSE_DESKTOP_MENU'

export const showDesktopAction = () => ({
  type: SHOW_DESKTOP_MENU,
  payload: null,
})

export const closeDesktopAction = () => ({
  type: CLOSE_DESKTOP_MENU,
  payload: null,
})

const showDesktopMenu = state => {
  return Object.assign({}, state, {
    visible: true,
  })
}

const hideDesktopMenu = state => {
  return Object.assign({}, state, {
    visible: false,
  })
}

const map = {
  [SHOW_DESKTOP_MENU]: showDesktopMenu,
  [CLOSE_DESKTOP_MENU]: hideDesktopMenu,
}

export default reducerUtil(map, desktopMenuState)
