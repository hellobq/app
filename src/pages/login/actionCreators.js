import {
  CHANGE_USERINFO,
  CHANGE_LOGIN_ICON,
  CHANGE_MESSAGE,
  CLEAR_TEXT_INPUT
} from './actionTypes'
import { login } from '../../api'

export const gotoLogin = (name, pwd) => async dispatch => {
  const { method, url } = login
  const { _bodyText } = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `name=${name}&pwd=${pwd}`
  })
  
  const { success, message, user_id } = JSON.parse(_bodyText)
  console.log(success, message, user_id);
  
  dispatch(changeMessage(message, user_id))
  dispatch(showLoginIcon(false))
}

export const changeUserInfo = (text, flagStr) => ({
  type: CHANGE_USERINFO,
  value: {
    text,
    flagStr
  }
})

export const showLoginIcon = (value) => ({
  type: CHANGE_LOGIN_ICON,
  value
})

export const changeMessage = (message, user_id) => ({
  type: CHANGE_MESSAGE,
  value: {
    message,
    user_id
  }
})

export const clearTextInput = flagStr => ({
  type: CLEAR_TEXT_INPUT,
  flagStr
})
