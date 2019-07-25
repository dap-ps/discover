import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import Submit from './Submit'

import {
  closeSubmitAction,
  onInputNameAction,
  onInputUrlAction,
  onInputDescAction,
  onImgReadAction,
  onImgZoomAction,
  onImgMoveControlAction,
  onImgMoveAction,
  onImgDoneAction,
  onImgCancelAction,
  submitAction,
  switchToRatingAction,
  onInputSntValueAction,
  updateAction,
  onInputEmailAction,
} from './Submit.reducer'
import { showAlertAction } from '../Alert/Alert.reducer';

const mapStateToProps = state =>
  Object.assign(state.submit, { dappState: state.dapps })
const mapDispatchToProps = dispatch => ({
  onClickClose: () => dispatch(closeSubmitAction()),
  onInputEmail: name => dispatch(onInputEmailAction(name)),
  onInputName: name => dispatch(onInputNameAction(name)),
  onInputDesc: name => dispatch(onInputDescAction(name)),
  onInputUrl: name => dispatch(onInputUrlAction(name)),
  onImgRead: imgBase64 => dispatch(onImgReadAction(imgBase64)),
  onImgZoom: zoom => dispatch(onImgZoomAction(zoom)),
  onImgMoveControl: move => dispatch(onImgMoveControlAction(move)),
  onImgMove: (x, y) => dispatch(onImgMoveAction(x, y)),
  onImgCancel: () => dispatch(onImgCancelAction()),
  onImgDone: imgBase64 => dispatch(onImgDoneAction(imgBase64)),
  onSubmit: (dapp, sntValue) => dispatch(submitAction(dapp, sntValue)),
  onUpdate: (dappId, metadata) => dispatch(updateAction(dappId, metadata)),
  onClickTerms: () => dispatch(push('/terms')),
  switchToRating: () => dispatch(switchToRatingAction()),
  onInputSntValue: sntValue => dispatch(onInputSntValueAction(sntValue)),
  showAlert: msg => dispatch(showAlertAction(msg)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Submit),
)
