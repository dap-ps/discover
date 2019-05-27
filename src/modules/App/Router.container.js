import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Router from './Router'
import { fetchAllDappsAction } from '../Dapps/Dapps.reducer'

const mapDispatchToProps = dispatch => ({
  fetchAllDapps: () => dispatch(fetchAllDappsAction()),
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(Router),
)
