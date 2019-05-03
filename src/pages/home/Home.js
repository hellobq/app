import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import Icon from 'react-native-vector-icons/Feather';
import TabBar from './TabBar';
import { is } from 'immutable';
import * as actionCreators from './store/actionCreators';

class Home extends Component {
  tabs = ['每日舆情', '舆情报告', '舆情热评', '舆情研究']
  num = 20
  tabTemps = ['daily-report', 'hot-report', 'hot-comment', 'yanjiu']

  state = {
    activeTab: 0
  }

  shouldComponentUpdate (nextProps) {
    return !is(nextProps.listData, this.props.listData);
  }

  componentDidUpdate () {
    let
      { listData } = this.props,
      { activeTab } = this.state,
      column = this.tabTemps[activeTab];

    listData.getIn([column, 'list']).length && this.flatList.scrollToIndex({
      animated: false,
      index: 0,
      viewPosition: 0
    })
  }

  render () {
    let { listData } = this.props;
    listData = listData.toJS();
    console.log('首页listData....', listData);
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
                  data={listData[this.tabTemps[index]].list}
                  keyExtractor={this._keyExractor}
                  renderItem={this._renderItem}
                  ListFooterComponent={this._listFootComponent}
                  ItemSeparatorComponent={this._separatorComponent}
                  onEndReached={this.handleEndReached}
                  onEndReachedThreshold={0.01}
                  ref={flatList => this.flatList = flatList}
                  onScrollToIndexFailed={()=>{}}
                  refreshControl={
                    <RefreshControl
                      refreshing={listData[this.tabTemps[index]].refreshing}
                      onRefresh={this.handleRefresh}
                      colors={['#d81e06']}
                    />
                  }
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
    console.log('footer....', this);
    let { listData } = this.props;
    const { activeTab } = this.state;
    let column = this.tabTemps[activeTab];
    let hasNoData = listData.getIn([column, 'hasNoData']);
    console.log(hasNoData);

    return (
      <View style={styles.footer}>
        {
          hasNoData ? null :
          <ActivityIndicator
            size="small"
            color='#8590A6'
          />
        }
        <Text style={styles.loadingText}>
          {
            hasNoData ? '已加载完成' : '加载中...'
          }
        </Text>
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
    const { getList, listData } = this.props;
    const { activeTab } = this.state;
    let column = this.tabTemps[activeTab];

    getList(column, listData.getIn([column, 'currentPage']), this.num);
  }

  handleChangeTab = ({ i }) => {
    let { listData, getList } = this.props;
    let column = this.tabTemps[i];

    this.setState(() => ({
      activeTab: i
    }), () => {
      if (!listData.getIn([column, 'list']).length) {
        getList(column, listData.getIn([column, 'currentPage']), this.num);
      }
    })
  }

  handleRefresh = () => {
    console.log('请求上一页...');
    const { getList, listData, handleChangeRefreshing } = this.props;
    const { activeTab } = this.state;
    let column = this.tabTemps[activeTab];

    if (listData.getIn([column, 'currentPage']) > 2) {
      handleChangeRefreshing(column, true);
      getList(column, listData.getIn([column, 'currentPage']) - 2, this.num, 'prev')
    } else {
      // setTimeout()
      console.log('这是第一页...');
    }
  }

  handleEndReached = () => {
    console.log('达到最底部...');
    const { getList, listData } = this.props
    const { activeTab } = this.state
    let column = this.tabTemps[activeTab]

    if (!listData.getIn([column, 'hasNoData'])) {
      getList(column, listData.getIn([column, 'currentPage']), this.num)
    }
  }

  handlePress = id => {
    const { navigation } = this.props;
    navigation.navigate('Detail', {
      id: id + ''
    })
  }
}

const mapState = state => {
  console.log(state.getIn(['home', 'listData']))
  return {
    listData: state.getIn(['home', 'listData'])
  }
};

const mapDispatch = dispatch => ({
  getList (type, page, num, flag = 'next') {
    dispatch(actionCreators.getList(type, page, num, flag))
  },
  handleTopRightBtn () {
    console.log('搜索...');
    const { navigation } = this;
    navigation.navigate('Search');
  },
  handleChangeRefreshing (type, bool) {
    dispatch(actionCreators.changeRefreshing(type, bool));
  }
})

export default connect(mapState, mapDispatch)(Home)
