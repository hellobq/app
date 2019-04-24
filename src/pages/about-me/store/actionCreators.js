import {
  CHANGE_LOADING_STATUS,
  CHANGE_ABOUTME_LIST
} from './actionTypes';
import {
  getThumbsUpList
} from '../../../api';

export const changeLoadingStatus = bool => ({
  type: CHANGE_LOADING_STATUS,
  value: bool
});

export const requestData = (id) => async dispatch => {
  const { url } = getThumbsUpList;
  const { _bodyText } = await fetch(`${url}?name_id=${id}`);
  const { success, data } = JSON.parse(_bodyText);
  console.log(success, data);
  if (success) {
    dispatch(changeLoadingStatus(true));
    dispatch(changeList(data));
  }
};

const changeList = data => ({
  type: CHANGE_ABOUTME_LIST,
  value: data
});
