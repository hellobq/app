import {
  CHANGE_INPUT_TEXT,
  CHANGE_RESET_MESSAGE
} from './actionTypes';
import {
  resetPwd
} from '../../../api';

export const changeInputText = (text, flagStr) => ({
  type: CHANGE_INPUT_TEXT,
  value: {
    flagStr,
    text
  }
});

export const changeMessage = msg => ({
  type: CHANGE_RESET_MESSAGE,
  value: msg
});

export const submitForgetForm = (username, password) => async dispatch => {
  const { method, url } = resetPwd;
  const { _bodyText } = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `name=${username}&pwd=${password}`
  });
  
  const { success, message } = JSON.parse(_bodyText);
  console.log(success, message);
  dispatch(changeMessage(message));
  
  // dispatch(changeMessage(message, user_id))
  // dispatch(showLoginIcon(false))
};