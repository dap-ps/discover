import { connect } from 'react-redux'
import DesktopMenu from './DesktopMenu'
import { closeDesktopAction, showDesktopAction } from './DesktopMenu.reducer'

const mapStateToProps = state => state.desktopMenu
const mapDispatchToProps = dispatch => ({
  onClickShow: () => dispatch(showDesktopAction()),
  onClickClose: () => dispatch(closeDesktopAction()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DesktopMenu)
