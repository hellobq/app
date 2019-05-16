import { 
  CHANGE_NUMS,
  CHANGE_THUMBSUP_STATE,
  CHNAGE_COLLECT_STATE,
  CHANGE_DATEIL_INFO,
  CHANGE_LOADING_STATUS,
  CHANGE_RECOMMEND_DATA
} from './actionTypes';
import {
  toogleThumbsUp,
  thumbsupAndStar,
  toogleCollection,
  detail,
  updateView,
  recommend
} from '../../../api';

const changeRecommendData = (data) => ({
  type: CHANGE_RECOMMEND_DATA,
  value: data
});

export const handleRecommendReq = report_id => async dispatch => {
  const { url } = recommend;
  const { _bodyText } = await fetch(`${url}?report_id=${report_id}`);
  const { success, data } = JSON.parse(_bodyText);
  console.log('data..........', data);
  if (success) {
    dispatch(changeRecommendData(data))
  }
};

const changeThumbsUpState = () => ({
  type: CHANGE_THUMBSUP_STATE
});

const changeDetailInfo = data => ({
  type: CHANGE_DATEIL_INFO,
  value: data
});

export const getDetailInfo = report_id => async dispatch => {
  const { url } = detail;
  const { _bodyText } = await fetch(`${url}?report_id=${report_id}`);
  const { success, data } = JSON.parse(_bodyText);
  console.log(report_id, success, data);
  if (success) {
    dispatch(changeDetailInfo(data))
  }
};

export const thumbsUp = (user_id, report_id) => async (dispatch) => {
  const { method, url } = toogleThumbsUp;
  const { _bodyText } = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `name_id=${user_id}&report_id=${report_id}`
  });

  const { success } = JSON.parse(_bodyText);
  if (success) {
    dispatch(changeThumbsUpState());
  }
};

const changeNums = (thumbsUps, collections, thumbsUped, collected) => ({
  type: CHANGE_NUMS,
  value: {
    thumbsUps,
    collections,
    thumbsUped,
    collected
  }
});

const changeCollectState = () => ({
  type: CHNAGE_COLLECT_STATE
});

export const collect = (user_id, report_id) => async dispatch => {
  const { method, url } = toogleCollection;
  const { _bodyText } = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `name_id=${user_id}&report_id=${report_id}`
  });

  const { success } = JSON.parse(_bodyText);
  if (success) {
    dispatch(changeCollectState());
  }
};

export const changeLoadingStatus = bool => ({
  type: CHANGE_LOADING_STATUS,
  value: bool
});

export const getThumbsupAndStarNum = (report_id, user_id) => async dispatch => {
  const { url } = thumbsupAndStar;
  const { _bodyText } = await fetch(`${url}?report_id=${report_id}&user_id=${user_id}`);
  const { success, thumbsUps, collections, thumbsUped, collected } = JSON.parse(_bodyText);

  if (success) {
    console.log('获取的点赞和收藏的数据：....', thumbsUps, collections, thumbsUped, collected);
    dispatch(
      changeNums(
        thumbsUps,
        collections,
        thumbsUped,
        collected
      )
    )
  }
};

export const handleViewArticle = (report_id, user_id) => async (dispatch) => {
  const { method, url } = updateView;
  const { _bodyText } = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `user_id=${user_id}&report_id=${report_id}`
  });

  const { success } = JSON.parse(_bodyText);
  console.log(success);
  if (success) {
    console.log('成功更新用户查看该文章的时间...');
  }
};
