import {
  CHANGE_LOADING_STATUS,
  CHANGE_ABOUTME_LIST
} from './actionTypes';
import {
  getThumbsUpList,
  getCollectionList,
  getViewsList
} from '../../../api';

export const changeLoadingStatus = bool => ({
  type: CHANGE_LOADING_STATUS,
  value: bool
});

export const requestData = (id, title, page, num) => async dispatch => {
  let url = '';
  switch (title) {
    case '我赞过的':
      url = getThumbsUpList.url; break;
    case '收藏集':
      url = getCollectionList.url; break;
    case '我阅读过的':
      url = getViewsList.url; break;
  }
  console.log(url, title, page, num);
  const { _bodyText } = await fetch(`${url}?name_id=${id}&page=${page}&num=${num}`);
  const { success, data } = JSON.parse(_bodyText);
  console.log(`${url}?name_id=${id}&page=${page}&num=${num}`, success, data);
  if (success) {
    dispatch(changeLoadingStatus(true));
    dispatch(
      changeList({
        data,
        loadingStatus: true,
        hasCompleted: data.length !== num
      })
    );
  }
};

const changeList = json => ({
  type: CHANGE_ABOUTME_LIST,
  value: json
});
