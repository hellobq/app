import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import {
  getUserNums,
  changeUserNums
} from './store/actionCreators';
import {
  changeMessage,
  clearTextInput
} from '../login/store/actionCreators';
import { is } from 'immutable';
import styles from './style';

class My extends Component {

  shouldComponentUpdate (nextProps) {
    const { data, message } = this.props;
    const { data: nextData, message: nextMsg } = nextProps;
    return !is(nextMsg, message) || !is(nextData, data);
  }

  render () {
    let { name, message, data } = this.props;
    const { collections, views, thumbs_ups, id } = data.toJS();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          activeOpacity={0.8}
          onPress={() => this.props.handleReg()}
        >
          <View style={styles.Avatar}>
            <Icon name={'user'} size={24} color={'#333'} />
          </View>
          <View>
            <Text style={styles.LoginText}>
              {
                message === 'ok' ? `${name}` : '点击登陆' 
              }
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.items}>
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.6}
            onPress={() => this.props.handleItemClick('我赞过的', id)}
          >
            <View style={styles.iconBox}>
              <Icon
                name={"thumbs-up"}
                size={20}
                color={"#39b939"}
              />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.itemText}>我赞过的</Text>
              <Text style={styles.itemNum}>{ thumbs_ups ? thumbs_ups.length : 0 }篇</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.6}
            onPress={() => this.props.handleItemClick('收藏集', id)}
          >
            <View style={styles.iconBox}>
              <Icon
                name={"star"}
                size={20}
                color={"#f0c26c"}
              />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.itemText}>收藏集</Text>
              <Text style={styles.itemNum}>{ collections ? collections.length : 0 }篇</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.6}
            onPress={() => this.props.handleItemClick('我阅读过的', id)}
          >
            <View style={styles.iconBox}>
              <Icon
                name={"eye"}
                size={20}
                color={"#8590A6"}
              />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.itemText}>阅读过的文章</Text>
              <Text style={styles.itemNum}>{ views ? views.length : 0 }篇</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.item,
              marginTop: 10,
              justifyContent: 'center'
            }}
            activeOpacity={0.6}
            onPress={() => this.props.handleLayout()}
          >
            <Text style={styles.layoutText}>退出当前帐号</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  componentDidUpdate () {
    const {
      name,
      message,
      handleLoginSuccess,
      data
    } = this.props;

    // 用户登陆后，要等到相关数据
    if (message === 'ok' && name && !data.toJS().comments) {
      handleLoginSuccess(name);
    }
  }
}

const mapState = state => ({
  name: state.getIn(['user', 'name']),
  message: state.getIn(['user', 'message']),
  data: state.getIn(['my', 'data'])
});

const mapDispatch = dispatch => ({
  handleLoginSuccess (name) {
    dispatch(getUserNums(name));
  },
  handleReg () {
    const { navigation, message } = this;
    if (message !== 'ok') {
      navigation.navigate('Login');
    }
  },
  handleClickSetting () {
    const { navigation } = this;
    navigation.navigate('Setting');
  },
  handleLayout () {
    const { message, data } = this;
    if (message === 'ok' && !data.toJS().comments) {
      dispatch(changeUserNums({}));
      dispatch(changeMessage(''));
      dispatch(clearTextInput('username'));
      dispatch(clearTextInput('password'));
    }
  },
  handleItemClick (title, id) {
    const { navigation } = this;
    console.log(title);
    navigation.navigate('AboutMe', {
      title,
      id
    })
  }
});

export default connect(mapState, mapDispatch)(My);
