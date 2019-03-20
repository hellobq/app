import React, { Component } from 'react'
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
import * as actionCreators from './actionCreators'

class Home extends Component {
  tabs = ['每日舆情', '舆情报告', '舆情热评', '舆情研究']
  num = 10
  tabTemps = ['daily-report', 'hot-report', 'hot-comment', 'yanjiu']

  state = {
    activeTab: 0
  }

  render () {
    const { listData } = this.props

    return (
      <View style={styles.HomeContainer}>
        {/* <StatusBar backgroundColor='#fff' barStyle='dark-content'/> */}
        <ScrollableTabView 
          renderTabBar={props => <TabBar {...props}/>} 
          onChangeTab={this.handleChangeTab}
        >
          {
            this.tabs.map((tab, index) => (
              <View
                style={styles.tabStyle}
                tabLabel={tab}
                key={tab}
              >
                <FlatList
                  data={listData[this.tabTemps[index]]}
                  keyExtractor={this._keyExractor}
                  renderItem={this._renderItem}
                  ListFooterComponent={this._listFootComponent}
                  ItemSeparatorComponent={this._separatorComponent}
                  onEndReached={this.handleEndReached}
                  onEndReachedThreshold={.02}
                />
              </View>
            ))
          }
        </ScrollableTabView>
        <View style={styles.search}>
          <Icon name={'search'} size={24} color={'#333'} />
        </View>
      </View>
    )
  }

  _separatorComponent = () => (
    <View style={styles.separator} />
  )

  _listFootComponent = () => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator
          size="small"
          color='#8590A6'
        />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    )
  }

  _renderItem = ({item: {_id, title, date, content, img_urls, description, image}}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.handlePress(_id, title, date, img_urls, content)}
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

  componentDidMount () {
    const { getList, dayNewsPage } = this.props
    const { activeTab } = this.state

    getList(this.tabTemps[activeTab], dayNewsPage, this.num)
  }

  handleChangeTab = ({ i }) => {
    const { listData, getList, dayNewsPage, reportsPage, commentsPage, stydiesPage } = this.props
    let currentPage, column = this.tabTemps[i]

    this.setState(() => ({
      activeTab: i
    }), () => {
      switch (i) {
        case 0:
          currentPage = dayNewsPage
          break
        case 1:
          currentPage = reportsPage
          break
        case 2:
          currentPage = commentsPage
          break
        case 3:
          currentPage = stydiesPage
          break
      }

      if (!listData[column].length) {
        getList(column, currentPage, this.num)
      }
    })
  }

  handleEndReached = () => {
    const { getList, dayNewsPage, reportsPage, commentsPage, stydiesPage } = this.props
    const { activeTab } = this.state
    let currentPage, column = this.tabTemps[activeTab]

    switch (activeTab) {
      case 0:
        currentPage = dayNewsPage
        break
      case 1:
        currentPage = reportsPage
        break
      case 2:
        currentPage = commentsPage
        break
      case 3:
        currentPage = stydiesPage
        break
    }

    getList(column, currentPage, this.num)
  }

  handlePress = (id, title, date, img_urls, content) => {
    const { navigation } = this.props
    navigation.navigate('Detail', {
      id: id + '',
      title,
      date,
      img_urls,
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

const mapState = state => {
  console.log(state.getIn(['home', 'listData']).toJS())
  return {
    listData: state.getIn(['home', 'listData']).toJS(),

    // 每类舆情的页码
    dayNewsPage: state.getIn(['home', 'dayNewsPage']),
    reportsPage: state.getIn(['home', 'reportsPage']),
    commentsPage: state.getIn(['home', 'commentsPage']),
    stydiesPage: state.getIn(['home', 'stydiesPage'])
  }
}

const mapDispatch = dispatch => ({
  getList (type, page, num) {
    dispatch(actionCreators.getList(type, page, num))
  }
})

export default connect(mapState, mapDispatch)(Home)
