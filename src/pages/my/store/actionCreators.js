import { GET_USER_NUMS, CHANGE_REFRESHING_STATUS } from './actionTypes';
import { viewCollectionThumbUps } from '../../../api';

export const getUserNums = name => async dispatch => {
  const { url } = viewCollectionThumbUps;
  const { _bodyText } = await fetch(`${url}?name=${name}`);
  
  const { success, data } = JSON.parse(_bodyText);
  if (success) {
    dispatch(changeUserNums(data));
  }
}

export const changeUserNums = data => ({
  type: GET_USER_NUMS,
  value: {
    data,
    refreshing: false
  }
});

export const changeRefreshStatus = bool => ({
  type: CHANGE_REFRESHING_STATUS,
  value: bool
});
