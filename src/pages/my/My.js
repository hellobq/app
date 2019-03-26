import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import { getUserNums } from './actionCreators'
import { is } from 'immutable'

class My extends Component {

  shouldComponentUpdate (nextProps) {
    const { data, message } = this.props
    const { data: nextData, name, message: nextMsg } = nextProps

    return name && (!is(nextMsg, message) || !is(nextData, data))
  }

  render () {
    let { name, message, data } = this.props
    data = data.toJS()

    console.log('My 渲染了...')
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          activeOpacity={0.8}
          onPress={() => this.handleReg()}
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
              <Text style={styles.itemNum}>0篇</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.6}
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
              <Text style={styles.itemNum}>{ data.collections ? data.collections.length : 0 }篇</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.6}
          >
            <View style={styles.iconBox}>
              <Icon
                name={"message-square"}
                size={20}
                color={"#5959f0"}
              />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.itemText}>我的评论</Text>
              <Text style={styles.itemNum}>{ data.comments ? data.comments.length : 0 }篇</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.6}
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
              <Text style={styles.itemNum}>{ data.views ? data.views.length : 0 }篇</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.item,
              marginTop: 10
            }}
            activeOpacity={0.6}
            onPress={this.handleClickSetting}
          >
            <View style={styles.iconBox}>
              <Icon
                name={"settings"}
                size={20}
                color={"#8590A6"}
              />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.itemText}>设置</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // 用户登陆后
  componentDidUpdate () {
    const {
      name,
      message,
      handleLoginSuccess,
      data
    } = this.props

    if (message === 'ok' && !data.toJS().name) {
      handleLoginSuccess(name)
    }
  }

  handleReg = () => {
    const { navigation } = this.props  
    navigation.navigate('Login', {
      haha: 'lala'
    })
  }

  handleClickSetting = () => {
    const { navigation } = this.props  
    navigation.navigate('Setting')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  header: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff' 
  },
  Avatar: {
    marginRight: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  LoginText: {
    color: '#333',
    fontSize: 22
  },
  items: {
    marginTop: 20
  },
  item: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  iconBox: {
    marginRight: 20,
    width: 40,
    height: 50,
    lineHeight: 50,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#f2f2f2'
  },
  itemText: {
    fontSize: 14,
    lineHeight: 50,
    color: '#333'
  },
  itemNum: {
    fontSize: 14,
    lineHeight: 50,
    color: '#8590A6'
  }
})

const mapState = state => ({
  name: state.getIn(['user', 'name']),
  message: state.getIn(['user', 'message']),
  data: state.getIn(['my', 'data'])
})

const mapDispatch = dispatch => ({
  handleLoginSuccess (name) {
    dispatch(getUserNums(name))
  }
})

export default connect(mapState, mapDispatch)(My)
