import { createStackNavigator, createAppContainer } from 'react-navigation'
import MainTabNavigator from './TabNavigator'
import DetailScreen from '../pages/detail/Detail'
import LoginScreen from '../pages/login/Login'
import RegisterScreen from '../pages/login/Register'
import ForgetScreen from '../pages/login/Forget'
import SettingScreen from '../pages/setting/Setting'
import AboutScreen from '../pages/setting/About'

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
  Register: {
    screen: RegisterScreen
  },
  Forget: {
    screen: ForgetScreen
  },
  Setting: {
    screen: SettingScreen
  },
  About: {
    screen: AboutScreen
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
