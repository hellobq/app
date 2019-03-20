import { GET_USER_NUMS  } from './actionTypes'

export const getUserNums = name => async dispatch => {
  const { _bodyText } = await fetch(`http://192.168.199.166:4321/api/user?name=${name}`)
  
  const { success, data } = JSON.parse(_bodyText)
  if (success) {
    dispatch(changeUserNums(data))
  }
}

export const changeUserNums = data => ({
  type: GET_USER_NUMS,
  value: data
})
