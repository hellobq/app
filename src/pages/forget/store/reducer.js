import { fromJS } from 'immutable';
import {
  CHANGE_INPUT_TEXT,
  CHANGE_RESET_MESSAGE
} from './actionTypes';

const defaultState = fromJS({
  username: '',
  password: '',
  message: '',
  submitStatus: false
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_RESET_MESSAGE:
      return state.set('message', action.value);

    case CHANGE_INPUT_TEXT:
      const { text, flagStr } = action.value;
      return state.set(
        flagStr,
        text
      )

    default:
      return state;
  }
};
