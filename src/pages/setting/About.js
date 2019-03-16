import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

class About extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '关于',
    headerStyle: {
      height: 50
    }
  })

  render () {
    return (
      <View styles={styles.container}>
        <Text style={styles.text}>毕设：舆情分析系统 APP</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  text: {
    padding: 10,
    fontSize: 16,
    color: '#8590A6',
    letterSpacing: 1
  }
})

export default About
