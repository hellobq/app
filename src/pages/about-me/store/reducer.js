import {
  CHANGE_LOADING_STATUS,
  CHANGE_ABOUTME_LIST,
  CHANGE_PAGE,
  CHANGE_REFRESHING
} from './actionTypes';
import { fromJS } from 'immutable';

const aboutMeState = fromJS({
  list: [],
  status: false,
  page: 1,
  num: 10,
  hasCompleted: false,
  refreshing: false
});

export default (state = aboutMeState, action) => {
  switch (action.type) {
    case CHANGE_REFRESHING:
      return state.merge({
        refreshing: action.bool,
        page: 1
      });

    case CHANGE_PAGE:
      return state.merge({
        page: action.page,
        list: fromJS([])
      });

    case CHANGE_LOADING_STATUS:
      return state.set('status', action.value);

    case CHANGE_ABOUTME_LIST:
      const { data, loadingStatus, hasCompleted, isRefreshing } = action.value;
      return state.merge({
        list: isRefreshing ? fromJS(data) : state.get('list').concat(fromJS(data)),
        status: loadingStatus,
        hasCompleted,
        page: !hasCompleted && state.get('page') + 1,
        refreshing: false
      });

    default:
      return state;
  }
};
