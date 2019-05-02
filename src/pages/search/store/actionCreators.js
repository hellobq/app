import {
  CHANGE_SEARCH_TEXT,
  CHANGE_REQUEST_DATA
} from './actionType';
import {
  search
} from '../../../api';

export const requestData = text => async dispatch => {
  const { url } = search;
  const { _bodyText } = await fetch(`${url}?q=${text}`);
  const { success, data } = JSON.parse(_bodyText);
  console.log(success, data);
  if (success) {
    dispatch(changeRequestData(data))
  }
};

export const changeSearchText = text => ({
  type: CHANGE_SEARCH_TEXT,
  value: text
});

const changeRequestData = data => ({
  type: CHANGE_REQUEST_DATA,
  value: data
});
