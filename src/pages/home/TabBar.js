import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { hidden } from 'ansi-colors';

class TabBar extends Component {

  render () {
    const { tabs, activeTab, goToPage } = this.props
    return (
      <Fragment>
        <View style={styles.tabsContainer}>
          {
            tabs.map((tab, i) => (
              <TouchableOpacity
                key={tab}
                style={styles.tab}
                activeOpacity={1}
                onPress={() => goToPage(i)}
              >
                <View style={styles.tabItem}>
                  <Text style={activeTab == i ? styles.tabItemActiveText : styles.tabItemText}>
                    {tabs[i]}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </Fragment>
      
    )
  }
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    paddingLeft: 10,
    paddingRight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  tab: {
    width: '20%',
    justifyContent: 'center'
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  tabItemText: {
    color: '#666'
  },
  tabItemActiveText: {
    color: '#d81e06',
    fontWeight: '500'
  }
})


export default TabBar
