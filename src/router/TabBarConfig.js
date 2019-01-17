import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { 
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer 
} from 'react-navigation'
import HomeScreen from '../pages/home/Home'
import DetailScreen from '../pages/detail/Detail'
import MyScreen from '../pages/my/My'

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
  },
  Detail: {
    screen: DetailScreen
  }
}, {
  initialRouteName: 'Home',
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

const MyStack = createStackNavigator({
  My: {
    screen: MyScreen,
    navigationOptions: {
      header: null,
    }
  }
})

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "首页",
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <Image
            source={ focused ? require("../assets/images/i_home_foc.png") : require("../assets/images/i_home.png") }
            style={styles.imgIcon}
          />
        )
      }
    },
  },
  My: {
    screen: MyStack,
    navigationOptions: {
      tabBarLabel:"我的",
      tabBarIcon: ({focused, tintColor}) => (
        <Image
          source={ focused ? require("../assets/images/i_mine_foc.png") : require("../assets/images/i_mine.png") }
          style={styles.imgIcon}
        />
      )
    },
  }
}, {
  lazy: true,
  initialRouteName: "Home",
  tabBarOptions: {
    inactiveTintColor: "#666",
    activeTintColor: "#d81e06",
    style: {
      height: 40,
      backgroundColor: '#fff',
      borderTopWidth: 0
    },
    labelStyle: {
      fontSize: 12
    }
  }
})

const styles = StyleSheet.create({
  imgIcon: {
    width: 20,
    height: 20
  }
})

export default createAppContainer(TabNavigator)
