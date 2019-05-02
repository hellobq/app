import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Close from '../login/Close';
import styles from './style';
import {
  changeInputText,
  submitForgetForm,
  changeMessage
} from './store/actionCreators';

class Forget extends Component {

  static navigationOptions = ({navigation}) => ({
    headerRight: <Close name='x' size={24} color={'#ccc'} close={navigation.goBack} />
  })

  componentDidMount () {
    console.log('forget. mount...');
  }

  componentDidUpdate () {
    const { message, navigation, clearMessage } = this.props
    if (message) {
      // console.log()
      if (message === 'ok') {
        // 密码修改成功
        console.log('修改成功..');
        navigation.goBack();
      } else {
        // 有其他错误信息
        this.refs.toastWithStyle.show(message, DURATION.LENGTH_LONG);
        clearMessage('');
      }
    }
  }

  render () {
    const { username, password, submitStatus, handleChangeInputText, handleClearInputText, handleSubmit } = this.props;
  
    return (
      <View style={styles.wrapper}>

        {/* 头部 */}
        <View style={styles.header}>
          <Text style={styles.headerText}>忘记密码</Text>
        </View>

        {/* 帐号、密码 */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="请输入用户名"
            selectionColor="#d81e06"
            value={username}
            onChangeText={text => handleChangeInputText(text, 'username')}
          ></TextInput>
          {
            username.length > 0 && <Close name='x' size={20} color={'#333'} close={() => handleClearInputText('username')} />
          }
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="请输入新密码"
            selectionColor="#d81e06"
            style={styles.input}
            value={password}
            onChangeText={text => handleChangeInputText(text, 'password')}
          ></TextInput>
          {
            password.length > 0 && <Close name='x' size={20} color={'#333'} close={() => handleClearInputText('password')} />
          }
        </View>

        {/* 登陆按钮 */}
        <View>
          <TouchableOpacity
            style={{
              ...styles.forgetBtn,
              backgroundColor: username && password ? '#ec6149' : '#ffbaae'
            }}
            activeOpacity={.8}
            onPress={() => handleSubmit(username, password)}
          >
            {
              submitStatus &&
                <ActivityIndicator
                  size="small"
                  color='#fff'
                />
            }
            <Text style={styles.forgetText}>确认修改</Text>
          </TouchableOpacity>
        </View>
        
        {/* Toast */}
        <Toast ref="toastWithStyle" style={{backgroundColor:'red'}} position="bottom"/>
      </View>
    )
  }

  // handleForget = () => {
  //   const { text1, text2 } = this.state
  //   if (text1.replace(/\s+/g, '').length && text2.replace(/\s+/g, '').length) {
  //     this.setState(() => ({
  //       isForgeting: true
  //     }))
  //   }
  //   console.log('确认修改...')
  // }

  // handleClear = (idx) => {
  //   this[`textInput${idx}`].clear()
  //   this.setState(() => ({
  //     [`text${idx}`]: ''
  //   }))
  // }

  // handleChangeText = (text, idx) => {
  //   this.setState(() => ({
  //     [`text${idx}`]: text
  //   }))
  // }
}

const mapState = state => ({
  username: state.getIn(['forget', 'username']),
  password: state.getIn(['forget', 'password']),
  message: state.getIn(['forget', 'message']),
  submitStatus: state.getIn(['forget', 'submitStatus'])
});

const mapDispatch = dispatch => ({
  handleChangeInputText (text, flagStr) {
    dispatch(changeInputText(text, flagStr));
  },
  handleClearInputText (flagStr) {
    dispatch(changeInputText('', flagStr));
  },
  handleSubmit (username, password) {
    Keyboard.dismiss();
    dispatch(submitForgetForm(username, password));
  },
  clearMessage (msg) {
    dispatch(changeMessage(msg));
  }
});

export default connect(mapState, mapDispatch)(Forget);
