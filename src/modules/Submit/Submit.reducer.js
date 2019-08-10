import submitInitialState from '../../common/data/submit'
import reducerUtil from '../../common/utils/reducer'
import {
  onReceiveTransactionInfoAction,
  checkTransactionStatusAction,
  onStartProgressAction,
  hideAction,
} from '../TransactionStatus/TransactionStatus.reducer'
import {
  TYPE_SUBMIT,
  TYPE_UPDATE,
} from '../TransactionStatus/TransactionStatus.utilities'
import { showAlertAction } from '../Alert/Alert.reducer'

import BlockchainSDK from '../../common/blockchain'

const SHOW_SUBMIT_AFTER_CHECK = 'SUBMIT_SHOW_SUBMIT_AFTER_CHECK'
const CLOSE_SUBMIT = 'SUBMIT_CLOSE_SUBMIT'
const ON_INPUT_EMAIL = 'SUBMIT_ON_INPUT_EMAIL'
const ON_INPUT_NAME = 'SUBMIT_ON_INPUT_NAME'
const ON_INPUT_DESC = 'SUBMIT_ON_INPUT_DESC'
const ON_INPUT_URL = 'SUBMIT_ON_INPUT_URL'
const ON_SELECT_CATEGORY = 'SUBMIT_ON_SELECT_CATEGORY'
const ON_IMG_READ = 'SUBMIT_ON_IMG_READ'
const ON_IMG_ZOOM = 'SUBMIT_ON_IMG_ZOOM'
const ON_IMG_MOVE_CONTROL = 'SUBMIT_ON_IMG_MOVE_CONTROL'
const ON_IMG_MOVE = 'SUBMIT_ON_IMG_MOVE'
const ON_IMG_CANCEL = 'SUBMIT_ON_IMG_CANCEL'
const ON_IMG_DONE = 'SUBMIT_ON_IMG_DONE'

const SWITCH_TO_RATING = 'SUBMIT_SWITCH_TO_RATING'
const ON_INPUT_SNT_VALUE = 'SUBMIT_ON_INPUT_SNT_VALUE'

const showSubmitAfterCheckAction = dapp => {
  window.location.hash = 'submit'
  return {
    type: SHOW_SUBMIT_AFTER_CHECK,
    payload: dapp,
  }
}

export const showSubmitAction = dapp => {
  return (dispatch, getState) => {
    const state = getState()
    if (
      state.transactionStatus.progress &&
      state.transactionStatus.dappTx !== ''
    ) {
      dispatch(
        showAlertAction(
          'There is an active transaction. Please wait for it to finish and then you could be able to create your Ðapp',
        ),
      )
    } else if (dapp !== undefined) {
      // convert dapp's image from url ot base64
      const toDataUrl = (url, callback) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
          const reader = new FileReader()
          reader.onloadend = () => {
            callback(reader.result)
          }
          reader.readAsDataURL(xhr.response)
        }
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.send()
      }
      toDataUrl(dapp.image, base64 => {
        dapp.image = base64
        dispatch(showSubmitAfterCheckAction(dapp))
      })
    } else dispatch(showSubmitAfterCheckAction(dapp))
  }
}

export const closeSubmitAction = () => {
  window.history.back()
  return {
    type: CLOSE_SUBMIT,
    payload: null,
  }
}

export const onInputEmailAction = email => ({
  type: ON_INPUT_EMAIL,
  payload: email,
})

export const onInputNameAction = name => ({
  type: ON_INPUT_NAME,
  payload: name,
})

export const onInputDescAction = desc => ({
  type: ON_INPUT_DESC,
  payload: desc.substring(0, 140),
})

export const onInputUrlAction = url => ({
  type: ON_INPUT_URL,
  payload: url,
})

export const onSelectCategoryAction = category => ({
  type: ON_SELECT_CATEGORY,
  payload: category,
})

export const onImgReadAction = imgBase64 => ({
  type: ON_IMG_READ,
  payload: imgBase64,
})

export const onImgZoomAction = zoom => ({
  type: ON_IMG_ZOOM,
  payload: zoom,
})

export const onImgMoveControlAction = move => ({
  type: ON_IMG_MOVE_CONTROL,
  payload: move,
})

export const onImgMoveAction = (x, y) => ({
  type: ON_IMG_MOVE,
  payload: { x, y },
})

export const onImgCancelAction = () => ({
  type: ON_IMG_CANCEL,
  payload: null,
})

export const onImgDoneAction = imgBase64 => ({
  type: ON_IMG_DONE,
  payload: imgBase64,
})

export const submitAction = (dapp, sntValue) => {
  return async dispatch => {
    dispatch(closeSubmitAction())
    dispatch(
      onStartProgressAction(
        dapp.name,
        dapp.image,
        dapp.description,
        TYPE_SUBMIT,
      ),
    )
    try {
      const blockchain = await BlockchainSDK.getInstance()
      const { tx, id } = await blockchain.DiscoverService.createDApp(
        sntValue,
        {
          name: dapp.name,
          url: dapp.url,
          description: dapp.description,
          category: dapp.category,
          image: dapp.image,
          dateAdded: dapp.dateAdded,
        },
        dapp.email,
      )
      if (sntValue === '0') {
        dispatch(checkTransactionStatusAction())
        return
      }
      dispatch(onReceiveTransactionInfoAction(id, tx))
      dispatch(checkTransactionStatusAction(tx))
    } catch (e) {
      dispatch(hideAction())
      dispatch(showAlertAction(e.message))
    }
  }
}

export const updateAction = (dappId, metadata, email) => {
  return async dispatch => {
    dispatch(closeSubmitAction())
    dispatch(
      onStartProgressAction(
        metadata.name,
        metadata.image,
        metadata.description,
        TYPE_UPDATE,
      ),
    )
    try {
      const blockchain = await BlockchainSDK.getInstance()
      const tx = await blockchain.DiscoverService.setMetadata(
        dappId,
        {
          name: metadata.name,
          url: metadata.url,
          description: metadata.description,
          category: metadata.category,
          image: metadata.image,
          dateAdded: metadata.dateAdded,
        },
        metadata.email,
      )
      dispatch(onReceiveTransactionInfoAction(dappId, tx))
      dispatch(checkTransactionStatusAction(tx))
    } catch (e) {
      dispatch(hideAction())
      dispatch(showAlertAction(e.message))
    }
  }
}

export const switchToRatingAction = () => ({
  type: SWITCH_TO_RATING,
  paylaod: null,
})

export const onInputSntValueAction = sntValue => ({
  type: ON_INPUT_SNT_VALUE,
  payload: sntValue,
})

const showSubmitAfterCheck = (state, dapp) => {
  return Object.assign({}, state, {
    visible_submit: true,
    visible_rating: false,
    id: dapp !== undefined ? dapp.id : '',
    email: dapp !== undefined ? dapp.email : '',
    name: dapp !== undefined ? dapp.name : '',
    desc: dapp !== undefined ? dapp.description : '',
    url: dapp !== undefined ? dapp.url : '',
    img: dapp !== undefined ? dapp.image : '',
    category: dapp !== undefined ? dapp.category : '',
    imgControl: false,
    imgControlZoom: 0,
    imgControlMove: false,
    imgControlX: 0,
    imgControlY: 0,
    sntValue: '0',
  })
}

const closeSubmit = state => {
  return Object.assign({}, state, {
    visible: false,
  })
}

const onInputEmail = (state, email) => {
  return Object.assign({}, state, {
    email,
  })
}

const onInputName = (state, name) => {
  return Object.assign({}, state, {
    name,
  })
}

const onInputDesc = (state, desc) => {
  return Object.assign({}, state, {
    desc,
  })
}

const onInputUrl = (state, url) => {
  return Object.assign({}, state, {
    url,
  })
}

const onSelectCategory = (state, category) => {
  return Object.assign({}, state, {
    category,
  })
}

const onImgRead = (state, imgBase64) => {
  return Object.assign({}, state, {
    img: imgBase64,
    imgControl: true,
    imgControlZoom: 0,
    imgControlMove: false,
    imgControlX: 0,
    imgControlY: 0,
  })
}

const onImgZoom = (state, zoom) => {
  return Object.assign({}, state, {
    imgControlZoom: zoom,
  })
}

const onImgMoveControl = (state, move) => {
  return Object.assign({}, state, {
    imgControlMove: move,
  })
}

const onImgMove = (state, payload) => {
  return Object.assign({}, state, {
    imgControlX: payload.x,
    imgControlY: payload.y,
  })
}

const onImgCancel = state => {
  return Object.assign({}, state, {
    img: '',
    imgControl: false,
  })
}

const onImgDone = (state, imgBase64) => {
  return Object.assign({}, state, {
    img: imgBase64,
    imgControl: false,
  })
}

const switchToRating = state => {
  return Object.assign({}, state, {
    visible_submit: false,
    visible_rating: true,
  })
}

const onInputSntValue = (state, sntValue) => {
  return Object.assign({}, state, {
    sntValue,
  })
}

const map = {
  [SHOW_SUBMIT_AFTER_CHECK]: showSubmitAfterCheck,
  [CLOSE_SUBMIT]: closeSubmit,
  [ON_INPUT_EMAIL]: onInputEmail,
  [ON_INPUT_NAME]: onInputName,
  [ON_INPUT_DESC]: onInputDesc,
  [ON_INPUT_URL]: onInputUrl,
  [ON_SELECT_CATEGORY]: onSelectCategory,
  [ON_IMG_READ]: onImgRead,
  [ON_IMG_ZOOM]: onImgZoom,
  [ON_IMG_MOVE_CONTROL]: onImgMoveControl,
  [ON_IMG_MOVE]: onImgMove,
  [ON_IMG_CANCEL]: onImgCancel,
  [ON_IMG_DONE]: onImgDone,
  [SWITCH_TO_RATING]: switchToRating,
  [ON_INPUT_SNT_VALUE]: onInputSntValue,
}

export default reducerUtil(map, submitInitialState)
