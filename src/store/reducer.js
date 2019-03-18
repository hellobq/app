import { combineReducers } from 'redux-immutable'
import home from '../pages/home/reducer'
import user from '../pages/login/reducer'
import my from '../pages/my/reducer'

export default combineReducers({
  home,
  user,
  my
})
