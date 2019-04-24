import { combineReducers } from 'redux-immutable';
import home from '../pages/home/reducer';
import user from '../pages/login/reducer';
import my from '../pages/my/store/reducer';
import detail from '../pages/detail/reducer';
import forget from '../pages/forget/store/reducer';

export default combineReducers({
  home,
  user,
  my,
  detail,
  forget
});
