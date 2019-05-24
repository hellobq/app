import {
  CHANGE_LOADING_STATUS,
  CHANGE_ABOUTME_LIST,
  CHANGE_PAGE,
  CHANGE_REFRESHING
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

export const requestData = (id, title, page, num, isRefreshing = false) => async dispatch => {
  let url = '';
  switch (title) {
    case '我赞过的':
      url = getThumbsUpList.url; break;
    case '收藏集':
      url = getCollectionList.url; break;
    case '我阅读过的':
      url = getViewsList.url; break;
  }
  const { _bodyText } = await fetch(`${url}?name_id=${id}&page=${page}&num=${num}`);
  const { success, data } = JSON.parse(_bodyText);
  if (success) {
    dispatch(changeLoadingStatus(true));
    dispatch(
      changeList({
        data,
        loadingStatus: true,
        hasCompleted: data.length !== num,
        isRefreshing
      })
    );
  }
};

export const changePage = page => ({
  type: CHANGE_PAGE,
  page
});

const changeList = json => ({
  type: CHANGE_ABOUTME_LIST,
  value: json
});

export const changeRefreshingStatus = bool => ({
  type: CHANGE_REFRESHING,
  bool
});
