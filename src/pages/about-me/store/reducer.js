import {
  CHANGE_LOADING_STATUS,
  CHANGE_ABOUTME_LIST
} from './actionTypes';
import { fromJS } from 'immutable';

const aboutMeState = fromJS({
  list: [],
  status: false,
  page: 1,
  num: 10,
  hasCompleted: false
});

export default (state = aboutMeState, action) => {
  switch (action.type) {
    case CHANGE_LOADING_STATUS:
      return state.set('status', action.value);

    case CHANGE_ABOUTME_LIST:
      const { data, loadingStatus, hasCompleted }=  action.value;
      return state.merge({
        list: data,
        status: loadingStatus,
        hasCompleted,
        page: !hasCompleted && ++page
      });

    default:
      return state;
  }
};
