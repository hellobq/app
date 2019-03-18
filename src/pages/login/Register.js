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
import Toast from '../components/toast'

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
    name: '',
    pwd: '',
    isRegistering: false,
    message: ''
  }

  render () {
    const { name, pwd, isRegistering, message } = this.state
    return (
      <View style={styles.wrapper}>

        {/* 注册头部 */}
        <View style={styles.header}>
          <Text style={styles.headerText}>用户注册</Text>
        </View>

        {/* 帐号、密码 */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="请输入用户名"
            selectionColor="#d81e06"
            value={name}
            onChangeText={text => this.handleChangeText(text, 1)}
          ></TextInput>
          {
            name.length > 0 && <Close name='x' size={20} color={'#333'} close={() => this.handleClear(1)} />
          }
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="请输入密码"
            selectionColor="#d81e06"
            style={styles.input}
            value={pwd}
            onChangeText={text => this.handleChangeText(text, 2)}
          ></TextInput>
          {
            pwd.length > 0 && <Close name='x' size={20} color={'#333'} close={() => this.handleClear(2)} />
          }
        </View>

        {/* 注册按钮 */}
        <View>
          <TouchableOpacity
            style={{
              ...styles.registerBtn,
              backgroundColor: name && pwd ? '#ec6149' : '#ffbaae'
            }}
            activeOpacity={.8}
            onPress={this.handleRegister}
          >
            {
              isRegistering &&
                <ActivityIndicator
                  size="small"
                  color='#fff'
                />
            }
            <Text style={styles.registerText}>
              {
                message === 'ok'
                  ? '注册成功'
                  : '立即注册'
              }
            </Text>
          </TouchableOpacity>
        </View>

        <Toast
          ref={toast => this.toast = toast}
          toastStyle={{
            width: '40%',
            backgroundColor: '#f2f2f2',
            borderRadius: 4
          }}
          toastTextStyle={{
            fontSize: 18,
            textAlign: 'center',
            lineHeight: 40,
            color: '#333'
          }}
        />
      </View>
    )
  }

  handleRegister = async () => {
    const { name, pwd } = this.state
    if (name.replace(/\s+/g, '').length && pwd.replace(/\s+/g, '').length) {
      this.setState(() => ({
        isRegistering: true
      }))
      
      const { _bodyText } = await fetch('http://192.168.199.166:4321/api/registry', {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `name=${name}&pwd=${pwd}`
      })
      
      const { success, message } = JSON.parse(_bodyText)
      if (success && message === 'ok') {
        this.setState(() => ({
          isRegistering: false,
          message
        }), () => {
          this.toast.show()
          this.props.navigation.goBack()
        })
      }
    }
  }

  handleClear = (idx) => {
    this.setState(() => ({
      [idx === 1 ? 'name' : 'pwd']: ''
    }))
  }

  handleChangeText = (text, idx) => {
    this.setState(() => ({
      [idx === 1 ? 'name' : 'pwd']: text
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
