import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import {
  requestData,
  changeLoadingStatus,
  changePage,
  changeRefreshingStatus
} from './store/actionCreators';
import styles from './style';

class AboutMe extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.title,
  })

  componentDidMount () {
    const { status, navigation, handleComponentMount, page, num, resetPage } = this.props;
    const { id, title } = navigation.state.params;
    console.log('mount', id, title);
    if (id) {
      resetPage();
      handleComponentMount(id, title, page, num);
    }
  }

  componentWillUnmount () {
    const { handleWillUnmount } = this.props;
    handleWillUnmount();
  }

  render () {
    let { status, navigation, list, refreshing } = this.props;
    list = list.toJS();
    const { id, title } = navigation.state.params;

    const judgeList = () => list.length > 0 ? 
      <FlatList
        data={list}
        keyExtractor={({_id}) => _id}
        renderItem={this._renderItem}
        ListFooterComponent={this._listFootComponent}
        ItemSeparatorComponent={this._separatorComponent}
        onEndReached={this.handleEndReached}
        onEndReachedThreshold={.02}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => this.props.handleRefresh()}
            colors={['#d81e06']}
          />
        }
      />
    :
      <View style={styles.noLoginBox}>
        <Text style={styles.noLoginText}>空空如也...</Text>
      </View>;

    const hasGetList = () => status
      ? judgeList()
      : <View style={styles.statusBox}>
          <ActivityIndicator
            size="large"
            color='#8590A6'
          />
        </View>

    return (
      <View style={styles.container}>
        {
          !id
            ? <View style={styles.noLoginBox}>
                <Text style={styles.noLoginText}>暂未登录...</Text>
              </View>
            : hasGetList()
        }
      </View>
    );
  }

  _listFootComponent = () => {
    const { status, hasCompleted } = this.props;
    return (
      status && !hasCompleted ?
      <View style={styles.footer}>
        <ActivityIndicator
          size="small"
          color='#8590A6'
        />
        <Text style={styles.loadingText}>加载中...</Text>
      </View> : null
    )
  }

  _renderItem = ({item: { date, report: {_id, title, description, image} }}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.props.handlePress(_id)}
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

  _separatorComponent = () => (
    <View style={styles.separator} />
  )

  handleEndReached = () => {
    const { handleComponentMount, hasCompleted, navigation, page, num } = this.props;
    const { id, title } = navigation.state.params;
    if (!hasCompleted) {
      handleComponentMount(id, title, page, num);
    }
  }
};

const mapState = state => ({
  status: state.getIn(['aboutMe', 'status']),
  list: state.getIn(['aboutMe', 'list']),
  page: state.getIn(['aboutMe', 'page']),
  num: state.getIn(['aboutMe', 'num']),
  hasCompleted: state.getIn(['aboutMe', 'hasCompleted']),
  refreshing: state.getIn(['aboutMe', 'refreshing'])
});

const mapDispatch = dispatch => ({
  resetPage () {
    dispatch(changePage(1));
  },
  handleComponentMount (id, title, page, num) {
    dispatch(requestData(id, title, page, num));
  },
  handleWillUnmount () {
    dispatch(changeLoadingStatus(false));
  },
  handlePress (id) {
    const { navigation } = this;
    navigation.navigate('Detail', {
      id: id + ''
    })
  },
  handleRefresh () {
    dispatch(changeRefreshingStatus(true));

    const { navigation, num } = this;
    const { id, title } = navigation.state.params;
    dispatch(requestData(id, title, 1, num, true));
  }
});

export default connect(mapState, mapDispatch)(AboutMe);
