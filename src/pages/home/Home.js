import React, { Component, Fragment } from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import TabBar from './TabBar'
import { handleNum } from '../../utils'
import * as actionCreators from './actionCreators'
import { SET_LIST } from './actionTypes'

class Home extends Component {
  tabs = ['每日舆情', '舆情报告', '舆情热评', '舆情研究']
  tabTemps = ['daily-report', 'hot-report', 'hot-comment', 'yanjiu']

  state = {
    loading: false,
    activeTab: 0,
    currentPage: 1,
    page: 1,
    num: 10
  }

  componentDidMount () {
    const {activeTab, page, num } = this.state
    this.props.getList(this.tabTemps[activeTab], page, num)
  }

  render () {
    const { HomeContainer, tabStyle, search } = styles
    const { loading } = this.state
    const { dayNews, reports, comments, stydies } = this.props

    return (
      <View style={HomeContainer}>
        <StatusBar backgroundColor='#fff' barStyle='dark-content'/>
        <ScrollableTabView renderTabBar={props => <TabBar {...props}/>} >
          {
            this.tabs.map((tab, index) => (
              <View
                style={loading && tabStyle}
                tabLabel={tab}
                key={tab}
              >
                <FlatList
                  data={index == 0 ? dayNews : (index === 1 ? reports : (index === 2 ? comments : stydies))}
                  keyExtractor={this._keyExractor}
                  renderItem={this._renderItem}
                  ListEmptyComponent={this._listEmptyComponent}
                  ListFooterComponent={this._listFootComponent}
                  ItemSeparatorComponent={this._separatorComponent}
                  onEndReached={() => this.handleEndReached(index)}
                  onEndReachedThreshold={.02}
                />
              </View>
            ))
          }
        </ScrollableTabView>
        <View style={search}>
          <Icon name={'search'} size={24} color={'#333'} />
        </View>
      </View>
    )
  }

  handleEndReached = (index) => {
    console.log(`这是第${index}个列表`)
    if (this.state.currentPage < this.state.maxPage) {
      this.setState(state => ({
        currentPage: state.currentPage + 1
      }), () => {
        this.getData()
      })
    }
  }

  _separatorComponent = () => (
    <View style={styles.separator}/>
  )

  _listFootComponent = () => {
    return (
      <View style={styles.footer}>
        <Fragment>
          <ActivityIndicator
            size="small"
            color='#8590A6'
          />
          <Text style={styles.loadingText}>加载中...</Text>
        </Fragment>
      </View>
    )
  }

  _renderItem = ({item: {_id, title, date, description, content, image}}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => { this.handlePress(_id, title, date, content) }}
      >
        <View style={styles.item}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.descImg}>
            <Text
              style={styles.description}
              numberOfLines={3}
              ellipsizeMode='tail'
            >{description}</Text>
            <Image
              style={styles.renderItemImg}
              source={{uri: image}}
            />
          </View>
          <View>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _keyExractor = ({title}, idx) => title + idx

  _listEmptyComponent = () => (
    <ActivityIndicator
      size='small'
      color='#333'
    />
  )

  handlePress = (id, title, date, content) => {
    const { navigation } = this.props
    navigation.navigate('Detail', {
      id: id + '',
      title,
      date,
      content
    })
  }
}

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tabStyle: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 40,
    color: '#000',
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // 每一项的样式
  item: {
    padding: 10
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    color: '#444444'
  },
  descImg: {
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  description: {
    marginRight: 20,
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical:'center',
    fontSize: 14,
    lineHeight: 24
  },
  renderItemImg: {
    width: 100,
    height: 70
  },
  date: {
    fontSize: 12,
    lineHeight: 20,
    color: '#8590A6'
  },
  footer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loadingText: {
    marginLeft: 10
  },
  separator: {
    height: 10,
    backgroundColor: '#F6F6F6'
  }
})

const mapState = state => ({
  dayNews: state.getIn(['home', 'dayNews']).toJS(),
  dayNewsPage: state.getIn()['home', 'dayNewsPage'],

  reports: state.getIn(['home', 'reports']).toJS(),
  reportsPage: state.getIn()['home', 'reportsPage'],
  
  comments: state.getIn(['home', 'comments']).toJS(),
  commentsPage: state.getIn()['home', 'commentsPage'],
  
  stydies: state.getIn(['home', 'stydies']).toJS(),
  stydiesPage: state.getIn()['home', 'stydiesPage']
})

const mapDispatch = dispatch => ({
  getList (type, page, num) {
    dispatch(actionCreators.getList(type, page, num))
  }
})

export default connect(mapState, mapDispatch)(Home)
