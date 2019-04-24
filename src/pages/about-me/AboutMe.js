import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import {
  requestData
} from './store/actionCreators';
import styles from './style';

class AboutMe extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.title,
  })

  componentDidMount () {
    const { status, navigation, handleComponentMount } = this.props;
    const { id = "5c8e0c19258ddc2b84435ee1" } = navigation.state.params;
    // if (id) {
      handleComponentMount(id);
    // }
  }

  render () {
    const { status, navigation, list } = this.props;
    const { id = "5c8e0c19258ddc2b84435ee1" } = navigation.state.params;
    console.log(status);
    const hasGetList = () => status
      ? <FlatList
          data={list}
          keyExtractor={this._keyExractor}
          renderItem={this._renderItem}
          // ListFooterComponent={this._listFootComponent}
          ItemSeparatorComponent={this._separatorComponent}
          onEndReached={this.handleEndReached}
          onEndReachedThreshold={.02}
        />
      : <View>
          <ActivityIndicator
            size="large"
            color='#8590A6'
          />
        </View>

    return (
      <View class={styles.container}>
        {
          !id ? <View><Text>未登录...</Text></View> : hasGetList()
        }
      </View>
    );
  }

  _keyExractor = ({_id}, idx) => _id + idx

  
  _renderItem = ({item: { report: {_id, title, description, image} }}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        // onPress={() => this.handlePress(_id)}
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

  _separatorComponent = () => (
    <View style={styles.separator} />
  )

  handleEndReached = () => {
    console.log('到底了...');
  }
};

const mapState = state => ({
  status: state.getIn(['aboutMe', 'status']),
  list: state.getIn(['aboutMe', 'list'])
});

const mapDispatch = dispatch => ({
  handleComponentMount (id) {
    dispatch(requestData(id));
  }
});

export default connect(mapState, mapDispatch)(AboutMe);
