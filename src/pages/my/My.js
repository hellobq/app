import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

class My extends Component {
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          activeOpacity={0.8}
          onPress={() => this.handleReg()}
        >
          <View style={styles.iconBox}>
            <Icon name={'user'} size={24} color={'#333'} />
          </View>
          <View>
            <Text style={styles.regText}>点击登陆</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  handleReg = () => {
    const { navigation } = this.props  
    navigation.navigate('Registry', {
      haha: 'lala'
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc'
  },
  header: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff' 
  },
  iconBox: {
    marginRight: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  regText: {
    color: '#333',
    fontSize: 22
  }
})

export default My
