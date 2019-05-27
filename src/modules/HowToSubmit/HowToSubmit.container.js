import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HowToSubmit from './HowToSubmit'
import {
  hideHowToSubmitAction,
  switchToTermsAction,
} from './HowToSubmit.reducer'
import { showSubmitAction } from '../Submit/Submit.reducer'

const mapStateToProps = state => state.howToSubmit
const mapDispatchToProps = dispatch => ({
  onClickClose: () => dispatch(hideHowToSubmitAction()),
  onClickContinue: () => dispatch(switchToTermsAction()),
  onClickGetStarted: () => {
    dispatch(hideHowToSubmitAction())
    setTimeout(() => {
      dispatch(showSubmitAction())
    }, 0)
  },
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HowToSubmit),
)
