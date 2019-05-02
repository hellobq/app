import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {
  changeUserInfo,
  gotoLogin,
  showLoginIcon,
  clearTextInput,
  changeMessage
} from './store/actionCreators';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Close from './Close';
import styles from './style';

class Login extends Component {

  static navigationOptions = ({navigation}) => ({
    headerRight: <Close name='x' size={24} color={'#ccc'} close={navigation.goBack}/>
  })

  componentDidMount () {
    console.log('login. mount...');
  }

  componentDidUpdate () {
    const { message, navigation, handleChangeMessage } = this.props
    if (message) {
      if (message === 'ok') {
        // 登陆成功
        console.log('login 成功');
        navigation.navigate('Main')
      } else {
        // 有其他错误信息
        this.refs.toastWithStyle.show(message, DURATION.LENGTH_LONG);
        handleChangeMessage('');
      }
    }
  }

  render () {
    const { name, pwd, isLogining, handleLogin, handleChangeText, handleClear } = this.props
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
            placeholder="用户名，没有会自动注册"
            selectionColor="#d81e06"
            value={name}
            underlineColorAndroid='transparent'
            spellCheck={false}
            ref={input => this.textInput1 = input}
            onChangeText={text => handleChangeText(text, 'username')}
          ></TextInput>
          {
            name.length > 0 && <Close name='x' size={20} color={'#333'} close={() => handleClear('username')} />
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
            onChangeText={text => handleChangeText(text, 'password')}
          ></TextInput>
          {
            pwd.length > 0 && <Close name='x' size={20} color={'#333'} close={() => handleClear('password')} />
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
            <Text style={styles.proBlemText}>已知用户名，忘记密码 ?</Text>
          </TouchableOpacity>
        </View>

        {/* Toast */}
        <Toast ref="toastWithStyle" style={{backgroundColor:'red'}} position="bottom"/>
      </View>
    )
  }

  handleForget = () => {
    const { navigation } = this.props
    navigation.navigate('Forget')
  }
}

const mapState = state => {
  return {
    name: state.getIn(['user', 'name']),
    pwd: state.getIn(['user', 'pwd']),
    isLogining: state.getIn(['user', 'isLogining']),
    message: state.getIn(['user', 'message'])
  }
}

const mapDispatch = dispatch => ({
  handleChangeText (text, flagStr) {
    dispatch(changeUserInfo(text, flagStr))
  },
  handleLogin (name, pwd) {
    if (name.replace(/\s+/g, '').length && pwd.replace(/\s+/g, '').length) {
      Keyboard.dismiss();
      dispatch(showLoginIcon(true))
      dispatch(gotoLogin(name, pwd))
    }
  },
  handleChangeMessage (msg) {
    dispatch(changeMessage(msg))
  },
  handleClear (flagStr) {
    dispatch(clearTextInput(flagStr))
  }
})

export default connect(mapState, mapDispatch)(Login)
