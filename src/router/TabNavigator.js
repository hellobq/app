import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Home from '../pages/home/Home'
import My from '../pages/my/My'

class MainTabNavigator extends Component {

  state = {
    tabs: [{
      tabTitle: '首页',
      icon: require("../assets/images/i_home.png"),
      selectedIcon: require("../assets/images/i_home_foc.png"),
      Component: Home
    }, {
      tabTitle: '我的',
      icon: require("../assets/images/i_mine.png"),
      selectedIcon: require("../assets/images/i_mine_foc.png"),
      Component: My
    }],
    selectedTabTitle: '我的'
  }

  render () {
    return (
      <TabNavigator
        tabBarStyle={styles.tabNavigator}
      >
        {
          this.state.tabs.map(({tabTitle, icon, selectedIcon, Component}) => (
            <TabNavigator.Item
              key={tabTitle}
              selected={this.state.selectedTabTitle === tabTitle}
              title={tabTitle}
              titleStyle={styles.tabText}
              selectedTitleStyle={styles.selectedTabText}
              renderIcon={() => <Image style={styles.imgIcon} source={icon} />}
              renderSelectedIcon={() => <Image style={styles.imgIcon} source={selectedIcon} />}
              onPress={() => this.setState({ selectedTabTitle: tabTitle })}
            >
              <Component navigation={ this.props.navigation } />
            </TabNavigator.Item>
          ))
        }
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
  tabNavigator: {
    backgroundColor: '#fff'
  },
  imgIcon: {
    width: 20,
    height: 20
  },
  tabText:{
    color:'#515151',
    fontSize:12
  },
  selectedTabText:{
    color:'#d81e06'
  }
})

export default MainTabNavigator
