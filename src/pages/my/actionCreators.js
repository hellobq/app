import { GET_USER_NUMS  } from './actionTypes'
import { user } from '../../api'

export const getUserNums = name => async dispatch => {
  const { url } = user
  const { _bodyText } = await fetch(`${url}?name=${name}`)
  
  const { success, data } = JSON.parse(_bodyText)
  if (success) {
    dispatch(changeUserNums(data))
  }
}

export const changeUserNums = data => ({
  type: GET_USER_NUMS,
  value: data
})
