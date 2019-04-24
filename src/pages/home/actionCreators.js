import { SET_LIST } from './actionTypes';
import { list } from '../../api';

export const getList = (type, page, num) => async dispatch => {
  const { url } = list;
  console.log(type, page, num, `${url}?type=${type}&page=${page}&num=${num}`)
  try {
    const { _bodyText } = await fetch(`${url}?type=${type}&page=${page}&num=${num}`);
    const { success, data } = JSON.parse(_bodyText);
    if (success) {
      dispatch({
        type: SET_LIST,
        listType: type,
        value: data
      });
    }
  } catch(e) {
    console.log('请求出错...', e);
  }
}

