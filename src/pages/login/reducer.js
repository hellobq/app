import { fromJS } from 'immutable'
import {
  CHANGE_USERINFO,
  CHANGE_LOGIN_ICON,
  CHANGE_MESSAGE,
  CHANGE_TEXT_INPUT
} from './actionTypes'

const userInfo = fromJS({
  name: '',
  pwd: '',
  isLogining: false,
  message: ''
})

export default (state = userInfo, action) => {
  switch (action.type) {
    case CHANGE_USERINFO:
      const { text, idx } = action.value
      return state.set(
        idx === 1 ? 'name' : 'pwd',
        text 
      )
    
    case CHANGE_LOGIN_ICON: 
      return state.set('isLogining', action.value)

    case CHANGE_MESSAGE:
      return state.set('message', action.value)

    case CHANGE_TEXT_INPUT:
      console.log('clear....', action.value)
      return state.set(
        action.value === 1 ? 'name' : 'pwd',
        ''
      )

    default:
      return state
  }
}
