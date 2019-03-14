import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

class Close extends Component {
  render () {
    const { name, size, color } = this.props
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.gotoClose}
        style={styles.btn}
      >
        <Icon
          name={name}
          size={size}
          color={color}
        />
      </TouchableOpacity>
    )
  }

  gotoClose = () => {
    this.props.close()
  }
}

const styles = StyleSheet.create({
  btn: {
    padding: 10
  }
})

export default Close
