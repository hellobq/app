import { SET_LIST, CHANGE_REFRESHING } from './actionTypes';
import { list } from '../../../api';

export const getList = (type, page, num, flag) => async dispatch => {
  const { url } = list;
  console.log(type, page, num, `${url}?type=${type}&page=${page}&num=${num}`)
  try {
    const { _bodyText } = await fetch(`${url}?type=${type}&page=${page}&num=${num}`);
    const { success, data } = JSON.parse(_bodyText);
    console.log('首页请求数据成功...', success, data);
    if (success) {
      dispatch({
        type: SET_LIST,
        listType: type,
        value: data,
        flag
      });
    }
  } catch(e) {
    console.log('请求出错...', e);
  }
}

export const changeRefreshing = (type, bool) => ({
  type: CHANGE_REFRESHING,
  value: {
    type,
    bool
  }
});

