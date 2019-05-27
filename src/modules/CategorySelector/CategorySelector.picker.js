import { connect } from 'react-redux'
import CategorySelector from './CategorySelector'
import { onSelectCategoryAction } from '../Submit/Submit.reducer'

const mapDispatchToProps = dispatch => ({
  select: category => dispatch(onSelectCategoryAction(category)),
})

export default connect(
  null,
  mapDispatchToProps,
)(CategorySelector)
