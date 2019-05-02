import { fromJS } from 'immutable';
import {
  CHANGE_NUMS,
  CHANGE_THUMBSUP_STATE,
  CHNAGE_COLLECT_STATE,
  CHANGE_DATEIL_INFO,
  CHANGE_LOADING_STATUS
} from './actionTypes';

const defaultState = fromJS({
  loading: true,
  detailInfo: {},
  thumbsUpNum: 0,
  thumbsUpState: false,
  collections: 0,
  collectionState: false
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LOADING_STATUS:
      return state.set('loading', action.value);

    case CHANGE_DATEIL_INFO:
      return state.merge({
        loading: false,
        detailInfo: fromJS(action.value)
      });

    case CHANGE_NUMS:
      const { thumbsUps, collections, thumbsUped, collected } = action.value;
      return state.merge({
        thumbsUpNum: thumbsUps,
        collections,
        thumbsUpState: thumbsUped,
        collectionState: collected
      });

    case CHANGE_THUMBSUP_STATE:
      const prevState = state.get('thumbsUpState');
      const thumbsUpNum = state.get('thumbsUpNum');
      return state.merge({
        thumbsUpState: !prevState,
        thumbsUpNum: prevState ? thumbsUpNum - 1 : thumbsUpNum + 1
      });

    case CHNAGE_COLLECT_STATE:
      const prevCollectState = state.get('collectionState');
      const collectionNum = state.get('collections');
      return state.merge({
        collectionState: !prevCollectState,
        collections: prevCollectState ? collectionNum - 1 : collectionNum + 1
      });

    default:
      return state;
  }
};
