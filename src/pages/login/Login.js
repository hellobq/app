import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { changeUserInfo, gotoLogin, showLoginIcon, clearTextInput } from './actionCreators'
import Icon from 'react-native-vector-icons/Feather'
import Close from './Close'


class Login extends Component {

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

  componentDidUpdate () {
    const { message, navigation } = this.props
    if (message === 'ok') {
      navigation.goBack()
    }
  }

  render () {
    const { name, pwd, isLogining, handleLogin, message, handleChangeText, handleClear } = this.props
    return (
      <View style={styles.wrapper}>

        {/* 头部 */}
        <View style={styles.header}>
          <Text style={styles.headerText}>帐号密码登陆</Text>
        </View>

        {/* 帐号、密码 */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="请输入用户名"
            selectionColor="#d81e06"
            value={name}
            underlineColorAndroid='transparent'
            spellCheck={false}
            ref={input => this.textInput1 = input}
            onChangeText={text => handleChangeText(text, 1)}
          ></TextInput>
          {
            name.length > 0 && <Close name='x' size={20} color={'#333'} close={() => handleClear(1)} />
          }
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="请输入密码"
            selectionColor="#d81e06"
            underlineColorAndroid='transparent'
            spellCheck={false}
            value={pwd}
            style={styles.input}
            ref={input => this.textInput2 = input}
            onChangeText={text => handleChangeText(text, 2)}
          ></TextInput>
          {
            pwd.length > 0 && <Close name='x' size={20} color={'#333'} close={() => handleClear(2)} />
          }
        </View>

        {/* 登陆按钮 */}
        <View>
          <TouchableOpacity
            style={{
              ...styles.loginBtn,
              backgroundColor: name && pwd ? '#ec6149' : '#ffbaae'
            }}
            activeOpacity={.8}
            onPress={() => handleLogin(name, pwd)}
          >
            {
              isLogining &&
                <ActivityIndicator
                  size="small"
                  color='#fff'
                />
            }
            <Text style={styles.loginText}>登陆</Text>
          </TouchableOpacity>
        </View>

        {/* 忘记密码、用户注册 */}
        <View style={styles.problems}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.handleForget}
          >
            <Text style={styles.proBlemText}>忘记密码 ?</Text>
          </TouchableOpacity>
          <View style={styles.separator}></View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.handleRegister}
          >
            <Text style={styles.proBlemText}>用户注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  handleRegister = () => {
    const { navigation } = this.props
    navigation.navigate('Register')
  }

  handleForget = () => {
    const { navigation } = this.props
    navigation.navigate('Forget')
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
  loginBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    height: 48,
    lineHeight: 48,
    borderRadius: 24
  },
  loginText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 20,
    lineHeight: 48,
    textAlign: 'center'
  },
  problems: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  proBlemText: {
    color: '#3194d0',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
    lineHeight: 20
  },
  separator: {
    marginHorizontal: 10,
    height: 14,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    borderStyle: 'solid'
  }
})

const mapState = state => {
  return {
    name: state.getIn(['user', 'name']),
    pwd: state.getIn(['user', 'pwd']),
    isLogining: state.getIn(['user', 'isLogining']),
    message: state.getIn(['user', 'message'])
  }
}

const mapDispatch = dispatch => ({
  handleChangeText (text, idx) {
    dispatch(changeUserInfo(text, idx))
  },
  handleLogin (name, pwd) {
    if (name.replace(/\s+/g, '').length && pwd.replace(/\s+/g, '').length) {
      dispatch(showLoginIcon())
      dispatch(gotoLogin(name, pwd))
    }
  },
  
  handleClear (idx) {
    dispatch(clearTextInput(idx))
  }
})

export default connect(mapState, mapDispatch)(Login)
