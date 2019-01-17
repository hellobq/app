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
import { handleNum } from '../../utils'
// import * as actions from './actions'

class Home extends Component {
  state = {
    tabs: ['每日舆情', '舆情报告', '舆情热评', '舆情研究'],
    loading: false
  }

  render () {
    return (
      <View style={styles.HomeContainer}>
        <StatusBar backgroundColor='#fff' barStyle='dark-content'/>
        <ScrollableTabView renderTabBar={props => <TabBar {...props}/>} >
          {
            this.state.tabs.map(tab => (
              <View
                style={this.state.loading && styles.tab}
                tabLabel={tab}
                key={tab}
              >
                <FlatList
                  data={this.props.data}
                  keyExtractor={this._keyExractor}
                  renderItem={this._renderItem}
                  ListEmptyComponent={this._listEmptyComponent}
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

  _renderItem = ({item: {id, title, date, content = '', imgUrl, see_count, msg_count, love_count}}) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => { this.handlePress(id, title, date, see_count, content) }}
    >
      <View style={styles.renderItem}>
        <View style={styles.renderItemLeft}>
          <Text style={styles.renderItemTitle}>{title}</Text>
          <View style={styles.renderItemInfo}>
            <View style={styles.renderItemISpecificnfo}>
              <Icon name='eye' size={14} color={'#999'}/>
              <Text style={styles.infoCount}>{handleNum(see_count)}</Text>
            </View>
            <View style={styles.renderItemISpecificnfo}>
              <Icon name='edit' size={14} color={'#999'}/>
              <Text style={styles.infoCount}>{msg_count}</Text>
            </View>
            <View style={styles.renderItemISpecificnfo}>
              <Icon name='heart' size={14} color={'#999'}/>
              <Text style={styles.infoCount}>{love_count}</Text>
            </View>
          </View>
        </View>
        <Image
          style={styles.renderItemImg}
          source={{uri: imgUrl}}
        />
      </View>
    </TouchableOpacity>
  )

  _keyExractor = ({title}, idx) => title + idx

  _listEmptyComponent = () => (
    <ActivityIndicator
      size='small'
      color='#333'
    />
  )

  handlePress = (id, title, date, see_count, content) => {
    console.log(1)
    const { navigation } = this.props
    navigation.navigate('Detail', {
      id: id + '',
      title,
      date,
      see_count,
      content
    })
  }
}

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tab: {
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
  renderItem: {
    padding: 10,
    flexDirection: 'row'
  },
  renderItemLeft: {
    flex: 1,
    marginRight: 20,
    justifyContent: 'space-between'
  },
  renderItemTitle: {
    fontSize: 16,
    lineHeight: 30,
    color: '#333'
  },
  renderItemInfo: {
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  renderItemISpecificnfo: {
    marginRight: 10,
    lineHeight: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  infoCount: {
    marginLeft: 2,
    marginTop: -2
  },
  renderItemImg: {
    width: 100,
    height: 90
  },
  loadingBox: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  }
})

const mapState = state => ({
  data: state.getIn(['home', 'everyDay']).toJS()
})

const mapDispatch = dispatch => ({

})

export default connect(mapState, mapDispatch)(Home)
