import { fromJS } from 'immutable'
import {
  CHANGE_USERINFO,
  CHANGE_LOGIN_ICON,
  CHANGE_MESSAGE,
  CLEAR_TEXT_INPUT
} from './actionTypes'

const userInfo = fromJS({
  user_id: '',
  name: '',
  pwd: '',
  isLogining: false,
  message: ''
})

export default (state = userInfo, action) => {
  switch (action.type) {

    case CHANGE_USERINFO:
      const { text, flagStr } = action.value
      return state.set(
        flagStr === 'username' ? 'name' : 'pwd',
        text 
      )
    
    case CHANGE_LOGIN_ICON: 
      return state.set('isLogining', action.value)

    case CHANGE_MESSAGE:
      const { message, user_id } = action.value;
      console.log(message, user_id);
      return state.merge({
        message,
        user_id
      });

    case CLEAR_TEXT_INPUT:
      return state.set(
        action.flagStr === 'username' ? 'name' : 'pwd',
        ''
      )

    default:
      return state
  }
}
