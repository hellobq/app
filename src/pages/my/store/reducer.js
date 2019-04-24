import { GET_USER_NUMS } from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  data: {}
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_NUMS:
      console.log(action.value);
      return state.set('data', fromJS(action.value));

    default:
      return state;
  }
}
