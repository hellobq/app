// import axios from 'axios'
import { FETCH_LIST, SET_LIST } from './actionTypes'

export const getList = (type, page, num) => dispatch => {
  fetch(`http://192.168.199.166:4321/api/list?type=${type}&page=${page}&num=${num}`)
    .then(res => res.json())
    .then(({success, data}) => {
      dispatch({
        type: SET_LIST,
        listType: type,
        value: data
      })
    })
    .catch(() => {
      console.error(`请求出错，链接是：${`http://192.168.199.166:4321/api/list?type=${type}&page=${page}&num=${num}`}`)
    })
}

