import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

class My extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>My page!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default My
