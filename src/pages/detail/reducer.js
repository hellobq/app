import { fromJS } from 'immutable';
import { CHANGE_NUMS, CHANGE_THUMBSUP_STATE } from './actionTypes';

const defaultState = fromJS({
  thumbsUpNum: 0,
  thumbsUpState: false,
  collections: 0,
  collectionState: false
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_NUMS:
      const { thumbsUps, collections } = action.value;
      return state.merge({
        thumbsUpNum: thumbsUps,
        collections
      });

    case CHANGE_THUMBSUP_STATE:
      const prevState = state.get('thumbsUpState');
      return state.set('thumbsUpState', !prevState);

    default:
      return state;
  }
};
