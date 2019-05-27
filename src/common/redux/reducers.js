import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import dapps from '../../modules/Dapps/Dapps.reducer'
// import selectedCategory from '../../modules/CategorySelector/CategorySelector.reducer'
import vote from '../../modules/Vote/Vote.reducer'
import profile from '../../modules/Profile/Profile.reducer'
import submit from '../../modules/Submit/Submit.reducer'
import desktopMenu from '../../modules/DesktopMenu/DesktopMenu.reducer'
import transactionStatus from '../../modules/TransactionStatus/TransactionStatus.recuder'
import alert from '../../modules/Alert/Alert.reducer'
import howToSubmit from '../../modules/HowToSubmit/HowToSubmit.reducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    dapps,
    // selectedCategory,
    vote,
    profile,
    submit,
    desktopMenu,
    transactionStatus,
    alert,
    howToSubmit,
  })
