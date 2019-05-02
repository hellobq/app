import { combineReducers } from 'redux-immutable';
import home from '../pages/home/store/reducer';
import user from '../pages/login/store/reducer';
import my from '../pages/my/store/reducer';
import detail from '../pages/detail/store/reducer';
import forget from '../pages/forget/store/reducer';
import aboutMe from '../pages/about-me/store/reducer';
import search from '../pages/search/store/reducer';

export default combineReducers({
  home,
  user,
  my,
  detail,
  forget,
  aboutMe,
  search
});
