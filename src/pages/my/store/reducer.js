import { GET_USER_NUMS, CHANGE_REFRESHING_STATUS } from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  data: {},
  refreshing: false
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_REFRESHING_STATUS:
      return state.set('refreshing', action.value);

    case GET_USER_NUMS:
      const { data, refreshing } = action.value;
      return state.merge({
        data: fromJS(data),
        refreshing: refreshing
      });

    default:
      return state;
  }
}
