import { connect } from 'react-redux'
import Footer from './Footer'
import { showHowToSubmitAction } from '../HowToSubmit/HowToSubmit.reducer'

const mapDispatchToProps = dispatch => ({
  onClickSubmit: () => dispatch(showHowToSubmitAction()),
})

export default connect(
  null,
  mapDispatchToProps,
)(Footer)
