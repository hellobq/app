import { 
  CHANGE_NUMS,
  CHANGE_THUMBSUP_STATE,
  CHNAGE_COLLECT_STATE
} from './actionTypes';
import {
  toogleThumbsUp,
  thumbsupAndStar,
  toogleCollection
} from '../../api';

const changeThumbsUpState = () => ({
  type: CHANGE_THUMBSUP_STATE
});

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
