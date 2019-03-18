import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native'

class Toast extends Component {

  state = {
    opacityAnimate: new Animated.Value(1)
  }

  show () {
    Animated.timing(
      this.state.opacityAnimate,
      {
        toValue: 0,
        duration: 500
      },
    ).start()
  }

  render () {
    let { toastStyle, toastTextStyle } = this.props

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            ...toastStyle,
            opacity: this.state.opacityAnimate
          }}
        >
          <Text style={toastTextStyle}>toast</Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default Toast
