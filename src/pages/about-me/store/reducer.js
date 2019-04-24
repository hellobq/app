import {
  CHANGE_LOADING_STATUS,
  CHANGE_ABOUTME_LIST
} from './actionTypes';
import { fromJS } from 'immutable';

const aboutMeState = fromJS({
  list: [],
  status: false
});

export default (state = aboutMeState, action) => {
  switch (action.type) {
    case CHANGE_LOADING_STATUS:
      return state.set('status', action.value);

    case CHANGE_ABOUTME_LIST:
      return state.set('list', action.value);

    default:
      return state;
  }
};
