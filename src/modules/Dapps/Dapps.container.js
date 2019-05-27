import { connect } from 'react-redux'
import Dapps from './Dapps'
// import selector from './Dapps.selector'
import { fetchByCategoryAction } from './Dapps.reducer'

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
)(Dapps)
