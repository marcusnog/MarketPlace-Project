// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import partners from '@src/views/apps/partner/store/reducer'
import user from '@src/views/apps/user/store/reducer'
import campaign from '@src/views/apps/campaign/store/reducer'
import participant from '@src/views/apps/participant/store/reducer'
import client from '@src/views/apps/clients/store/reducer'
import promotions from '@src/views/apps/promotions/store/reducer'
import pointsPurchaseReducer from '../../views/apps/extratoPontos/store/reducer'

const appReducer = combineReducers({
  auth,
  navbar,
  layout,
  partners,
  user,
  campaign,
  participant,
  client,
  promotions,
  pointsPurchaseReducer
})

const rootReducer = (state, action) => {
  // When logout action is dispatched  reset the action.
  if (action.type === 'LOGOUT') {
    state = undefined // or to initial state if {} you want any data without session 
   }
   return appReducer(state, action)
  }
export default rootReducer
