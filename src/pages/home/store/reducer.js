import { fromJS, Map } from 'immutable';
import { SET_LIST, CHANGE_REFRESHING } from './actionTypes';

const defaultState = fromJS({
  listData: {
    'daily-report': {
      list: [],
      currentPage: 1,
      hasNoData: false,
      refreshing: false
    },
    'hot-report': {
      list: [],
      currentPage: 1,
      hasNoData: false,
      refreshing: false
    },
    'hot-comment': {
      list: [],
      currentPage: 1,
      hasNoData: false,
      refreshing: false
    },
    'yanjiu': {
      list: [],
      currentPage: 13,
      hasNoData: false,
      refreshing: false
    }
  }
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_LIST:
      const { listType, value, flag } = action;
      let currentPage = state.getIn(['listData', listType, 'currentPage']);
      let oldColumnReportList = state.getIn(['listData', listType]).toJS().list;
      if (oldColumnReportList.length >= 20) {
        oldColumnReportList.splice(0, 20);
      }
      const newColumnReport = Map({
        currentPage: flag == 'prev' ? currentPage - 1 : currentPage + 1,
        list: oldColumnReportList.concat(value),
        hasNoData: value.length !== 20,
        refreshing: false
      });
      return state.setIn(['listData', listType], newColumnReport);
      
    case CHANGE_REFRESHING:
      const { type, bool } = action.value;
      return state.setIn(['listData', type, 'refreshing'], bool);

    default: 
      return state
  }
}
