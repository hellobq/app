import { 
  CHANGE_NUMS,
  CHANGE_THUMBSUP_STATE,
  CHNAGE_COLLECT_STATE,
  CHANGE_DATEIL_INFO
} from './actionTypes';
import {
  toogleThumbsUp,
  thumbsupAndStar,
  toogleCollection,
  detail
} from '../../api';

const changeThumbsUpState = () => ({
  type: CHANGE_THUMBSUP_STATE
});

const changeDetailInfo = data => ({
  type: CHANGE_DATEIL_INFO,
  value: data
});

export const getDeatilInfo = id => async dispatch => {
  console.log('get detail...', id)
  const { url } = detail;
  const { _bodyText } = await fetch(`${url}?_id=${id}`);
  const { success, data } = JSON.parse(_bodyText);
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

export const getThumbsupAndStar = (report_id, user_id) => async dispatch => {
  const { url } = thumbsupAndStar;
  try {
    const { _bodyText } = await fetch(`${url}?report_id=${report_id}&user_id=${user_id}`);
    const { success, thumbsUps, collections, thumbsUped, collected } = JSON.parse(_bodyText);

    if (success) {
      dispatch(changeNums(thumbsUps, collections, thumbsUped, collected))
    }
  } catch(e) {
    console.log('获取点赞数和收藏数出错...', e)
  }
  
};
