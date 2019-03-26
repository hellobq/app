import { THUMBS_UP, CHANGE_NUMS, CHANGE_THUMBSUP_STATE } from './actionTypes';

const changeThumbsUpState = () => ({
  type: CHANGE_THUMBSUP_STATE
});

export const thumbsUp = (user_id, report_id) => async (dispatch) => {
  const { _bodyText } = await fetch('http://192.168.199.166:4321/api/toogleThumbsUp', {
    method: 'POST',
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

const changeNums = (thumbsUps, collections) => ({
  type: CHANGE_NUMS,
  value: {
    thumbsUps,
    collections
  }
});

export const getThumbsupAndStar = (report_id) => async dispatch => {
  const { _bodyText } = await fetch(`http://192.168.199.166:4321/api/getThumbsupAndStar?report_id=${report_id}`);
  const { success, thumbsUps, collections } = JSON.parse(_bodyText);

  if (success) {
    dispatch(changeNums(thumbsUps, collections))
  }
};
