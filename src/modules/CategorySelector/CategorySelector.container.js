import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import CategorySelector from './CategorySelector'
import { closeDesktopAction } from '../DesktopMenu/DesktopMenu.reducer'
import { showHowToSubmitAction } from '../HowToSubmit/HowToSubmit.reducer'
// import { selectCategory } from './CategorySelector.reducer'

// const mapStateToProps = state => ({ category: state.selectedCategory })
const mapDispatchToProps = dispatch => ({
  select: category => {
    dispatch(push(`/categories/${category}`))
    //dispatch(selectCategory(category))
  },
  onClickSubmit: () => dispatch(showHowToSubmitAction()),
  onClickCloseDesktopMenu: () => dispatch(closeDesktopAction()),
})

export default connect(
  null,
  mapDispatchToProps,
)(CategorySelector)
