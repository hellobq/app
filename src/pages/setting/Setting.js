import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

class Setting extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: '设置',
    headerStyle: {
      height: 50
    }
  })

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={this.handleAbout}
        >
          <View style={styles.item}>
            <Text style={styles.aboutText}>关于</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
        >
          <View style={{
            ...styles.item,
            borderTopWidth: 9
          }}>
            <Text style={styles.layoutText}>退出当前帐号</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  handleAbout = () => {
    const { navigation } = this.props
    navigation.navigate('About')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  item: {
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    borderStyle: 'solid',
    backgroundColor: '#fff'
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 50,
    color: '#333'
  },
  layoutText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 50,
    color: '#d81e06'
  }
})

export default Setting
