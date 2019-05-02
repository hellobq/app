import { createStackNavigator, createAppContainer } from 'react-navigation';
import TabNavigator from './TabNavigator';
import DetailScreen from '../pages/detail/Detail';
import LoginScreen from '../pages/login/Login';
import ForgetScreen from '../pages/forget/Forget';
import AboutMeScreen from '../pages/about-me/AboutMe';
import SearchScreen from '../pages/search/Search';

const MainStack = createStackNavigator({
  Main: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      headerTitle: '文章详情页'
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: '',
      headerLeft: null,
      headerRightContainerStyle: {
        margin: 4,
        padding: 10,
        fontSize: 20
      },
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  },
  Forget: {
    screen: ForgetScreen,
    navigationOptions: {
      headerTitle: '',
      headerLeft: null,
      headerRightContainerStyle: {
        margin: 4,
        padding: 10,
        fontSize: 20
      },
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  },
  AboutMe: {
    screen: AboutMeScreen
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null,
    }
  }
}, {
  initialRouteName: 'Main',
  mode: 'card',
  headerMode: 'screen',
  defaultNavigationOptions: {
    gesturesEnabled: false,
    headerStyle: {
      height: 40,
      // borderBottomWidth: 0,
      // elevation: 0
    },
    headerTitleStyle: {
      fontWeight: '400'
    }
  }
});

export default createAppContainer(MainStack);
