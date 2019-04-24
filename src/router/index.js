import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainTabNavigator from './TabNavigator';
import DetailScreen from '../pages/detail/Detail';
import LoginScreen from '../pages/login/Login';
import ForgetScreen from '../pages/forget/Forget';
import AboutMeScreen from '../pages/about-me/AboutMe';

const MainStack = createStackNavigator({
  Main: {
    screen: MainTabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  Detail: {
    screen: DetailScreen
  },
  Login: {
    screen: LoginScreen
  },
  Forget: {
    screen: ForgetScreen
  },
  AboutMe: {
    screen: AboutMeScreen
  }
}, {
  initialRouteName: 'Main',
  mode: 'card',
  headerMode: 'screen',
  defaultNavigationOptions: {
    gesturesEnabled: false,
    headerStyle: {
      height: 40,
      borderBottomWidth: 0,
      elevation: 0
    },
    headerTitleStyle: {
      fontWeight: '400'
    }
  }
})

export default createAppContainer(MainStack)
