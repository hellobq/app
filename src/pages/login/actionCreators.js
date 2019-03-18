import {
  CHANGE_USERINFO,
  CHANGE_LOGIN_ICON,
  CHANGE_MESSAGE,
  CHANGE_TEXT_INPUT
} from './actionTypes'

export const gotoLogin = (name, pwd) => async dispatch => {
  const { _bodyText } = await fetch('http://192.168.199.166:4321/api/login', {
    method: 'POST',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `name=${name}&pwd=${pwd}`
  })
  
  const { success, message } = JSON.parse(_bodyText)
  dispatch(changeMessage(message))
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

export const changeMessage = (message) => ({
  type: CHANGE_MESSAGE,
  value: message
})

export const clearTextInput = idx => ({
  type: CHANGE_TEXT_INPUT,
  value: idx
})
