import { connect } from 'react-redux'
import Filtered from './Filtered'
import { fetchByCategoryAction } from '../Dapps/Dapps.reducer'

const mapStateToProps = state => ({
  dappsCategoryMap: state.dapps.dappsCategoryMap,
})
const mapDispatchToProps = dispatch => ({
  fetchByCategory: category => {
    dispatch(fetchByCategoryAction(category))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filtered)
