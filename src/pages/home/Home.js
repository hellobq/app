import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import Icon from 'react-native-vector-icons/Feather';
import TabBar from './TabBar';
import { is } from 'immutable';
import * as actionCreators from './store/actionCreators';

class Home extends Component {
  tabs = ['每日舆情', '舆情报告', '舆情热评', '舆情研究']
  num = 40
  tabTemps = ['daily-report', 'hot-report', 'hot-comment', 'yanjiu']

  state = {
    activeTab: 0
  }

  shouldComponentUpdate (nextProps) {
    const { listData: oldListData } = this.props;
    const { listData: newListData } = nextProps;
    return !is(newListData, oldListData) || 
      this.props.dayNewsPage !== nextProps.dayNewsPage ||
      this.props.reportsPage !== nextProps.reportsPage || 
      this.props.commentsPage !== nextProps.commentsPage ||
      this.props.stydiesPage !== nextProps.stydiesPage
  }

  componentDidUpdate () {
    console.log('已更新...');
    let { listData } = this.props;
    const { activeTab } = this.state
    listData = listData.toJS();
    console.log(listData[this.tabTemps[activeTab]].length);
    listData[this.tabTemps[activeTab]].length && this.flatList.scrollToIndex({
      index: 0,
      viewPosition: 0
    })
  }

  render () {
    let { listData } = this.props;
    listData = listData.toJS();
    console.log('home 渲染了...')
    return (
      <View style={styles.HomeContainer}>
        <StatusBar backgroundColor='#fff' barStyle='dark-content'/>
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
                  onEndReachedThreshold={0.01}
                  ref={flatList => this.flatList = flatList}
                  onScrollToIndexFailed={()=>{}}
                />
              </View>
            ))
          }
        </ScrollableTabView>
        <View style={styles.search}>
          <TouchableOpacity
            style={styles.topRightBtn}
            activeOpacity={0.2}
            onPress={() => this.props.handleTopRightBtn()}
          >
            <Icon name={'search'} size={24} color={'#333'}/>
          </TouchableOpacity>
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

  _renderItem = ({item: {_id, title, description, image}}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.handlePress(_id)}
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
    let { listData, getList, dayNewsPage, reportsPage, commentsPage, stydiesPage } = this.props
    let currentPage, column = this.tabTemps[i];
    listData = listData.toJS();

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

  handleEndReached = ({distanceFromEnd}) => {
    console.log('达到最底部...', distanceFromEnd);
    // if (distanceFromEnd < 0) {
    //   return;
    // }
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

  handlePress = id => {
    const { navigation } = this.props;
    navigation.navigate('Detail', {
      id: id + ''
    })
  }
}

const mapState = state => ({
  listData: state.getIn(['home', 'listData']),
  // 每类舆情的页码
  dayNewsPage: state.getIn(['home', 'dayNewsPage']),
  reportsPage: state.getIn(['home', 'reportsPage']),
  commentsPage: state.getIn(['home', 'commentsPage']),
  stydiesPage: state.getIn(['home', 'stydiesPage'])
});

const mapDispatch = dispatch => ({
  getList (type, page, num) {
    dispatch(actionCreators.getList(type, page, num))
  },
  handleTopRightBtn () {
    console.log('搜索...');
    const { navigation } = this;
    navigation.navigate('Search');
  }
})

export default connect(mapState, mapDispatch)(Home)
