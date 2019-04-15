import {
  CHANGE_USERINFO,
  CHANGE_LOGIN_ICON,
  CHANGE_MESSAGE,
  CHANGE_TEXT_INPUT
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
  dispatch(changeMessage(message, user_id))
  dispatch(showLoginIcon(false))
}

export const changeUserInfo = (text, idx) => ({
  type: CHANGE_USERINFO,
  value: {
    text,
    idx
  }
})

export const showLoginIcon = (value = true) => ({
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

export const clearTextInput = idx => ({
  type: CHANGE_TEXT_INPUT,
  value: idx
})
