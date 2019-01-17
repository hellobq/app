import { createStackNavigator, createAppContainer } from 'react-navigation'
import MainTabNavigator from './TabNavigator'
import DetailScreen from '../pages/detail/Detail'

const MainStack = createStackNavigator({
  Main: {
    screen: MainTabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  Detail: {
    screen: DetailScreen
  }
}, {
  initialRouteName: 'Main',
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
