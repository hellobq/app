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
                  <Text style={{color: activeTab == i ? '#d81e06' : '#666'}}>
                    {tabs[i]}
                  </Text>
                </View>
                {
                  activeTab == i && <View style={styles.underline} />
                }
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
    position: 'relative',
    width: '20%',
    justifyContent: 'center'
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  underline: {
    position: 'absolute',
    left: '25%',
    top: 34,
    width: '50%',
    height: 3,
    backgroundColor: '#d81e06',
    borderRadius: 2
  }
})


export default TabBar
