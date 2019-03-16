import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import Close from './Close'


class Register extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: '',
    headerRight: <Close name='x' size={24} color={'#ccc'} close={navigation.goBack} />,
    headerLeft: null,
    headerRightContainerStyle: {
      margin: 4,
      padding: 10,
      fontSize: 20
    }
  })

  state = {
    text1: '',
    text2: '',
    isRegistering: false
  }

  render () {
    return (
      <View style={styles.wrapper}>

        {/* 头部 */}
        <View style={styles.header}>
          <Text style={styles.headerText}>用户注册</Text>
        </View>

        {/* 帐号、密码 */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="请输入用户名"
            selectionColor="#d81e06"
            ref={input => this.textInput1 = input}
            onChangeText={text => this.handleChangeText(text, 1)}
          ></TextInput>
          {
            !!this.state.text1 && <Close name='x' size={20} color={'#333'} close={() => this.handleClear(1)} />
          }
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="请输入密码"
            selectionColor="#d81e06"
            style={styles.input}
            ref={input => this.textInput2 = input}
            onChangeText={text => this.handleChangeText(text, 2)}
          ></TextInput>
          {
            !!this.state.text2 && <Close name='x' size={20} color={'#333'} close={() => this.handleClear(2)} />
          }
        </View>

        {/* 登陆按钮 */}
        <View>
          <TouchableOpacity
            style={{
              ...styles.registerBtn,
              backgroundColor: this.state.text1 && this.state.text2 ? '#ec6149' : '#ffbaae'
            }}
            activeOpacity={.8}
            onPress={this.handleRegister}
          >
            {
              this.state.isRegistering &&
                <ActivityIndicator
                  size="small"
                  color='#fff'
                />
            }
            <Text style={styles.registerText}>立即注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  handleRegister = () => {
    const { text1, text2 } = this.state
    if (text1.replace(/\s+/g, '').length && text2.replace(/\s+/g, '').length) {
      this.setState(() => ({
        isRegistering: true
      }))
    }
    console.log('立即注册...')
  }

  handleClear = (idx) => {
    this[`textInput${idx}`].clear()
    this.setState(() => ({
      [`text${idx}`]: ''
    }))
  }

  handleChangeText = (text, idx) => {
    this.setState(() => ({
      [`text${idx}`]: text
    }))
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  header: {
    height: 50,
    lineHeight: 50
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 1,
    color: '#333'
  },
  inputBox: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    marginRight: 20,
    color:'#333',
    fontSize: 16
  },
  registerBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    height: 48,
    lineHeight: 48,
    borderRadius: 24
  },
  registerText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 20,
    lineHeight: 48,
    textAlign: 'center'
  }
})

export default Register
