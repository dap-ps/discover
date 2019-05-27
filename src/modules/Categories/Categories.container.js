import { connect } from 'react-redux'
import { push } from 'connected-react-router'
// import { selectCategory } from '../CategorySelector/CategorySelector.reducer'
import Categories from './Categories'

const mapDispatchToProps = dispatch => ({
  select: category => {
    dispatch(push(`/categories/${category}`))
    // dispatch(selectCategory(category))
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(Categories)
