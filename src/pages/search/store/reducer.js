import { fromJS } from 'immutable';
import {
  CHANGE_SEARCH_TEXT,
  CHANGE_REQUEST_DATA
} from './actionType';

const defaultSearchState = fromJS({
  value: '',
  data: []
});

export default (state = defaultSearchState, action) => {
  switch (action.type) {
    case CHANGE_REQUEST_DATA:
      return state.set('data', fromJS(action.value));

    case CHANGE_SEARCH_TEXT:
      return state.set('value', action.value);

    default:
      return state;
  }
};
