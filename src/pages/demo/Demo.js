import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import styles from './style';
import {
  changeSearchText,
  requestData
} from './store/actionCreators';

class Demo extends Component {

  static navigationOptions = {
    header: null,
  }

  render () {
    const { value, data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => this.props.handleGoBack()}
          >
            <Icon name={'chevron-left'} size={24} color={'#333'}/>
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <Icon name={'search'} size={18} color={'#eee'}/>
            <TextInput
              style={styles.input}
              placeholder="请输入密码"
              selectionColor="#d81e06"
              underlineColorAndroid='transparent'
              spellCheck={false}
              value={value}
              onChangeText={text => this.props.handleSearchText(text)}
            ></TextInput>
            {
              value.length > 0 && 
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => this.props.handleClearSearchText()}
                  style={styles.searchCloseBox}
                >
                  <Icon name={'x'} size={14} color={'#fff'}/>
                </TouchableOpacity>
            }
          </View>
          <Text style={styles.searchText}>搜索</Text>
        </View>
        <View style={styles.searchResult}>
          {
            data.length > 0 && data.map(({ _id, title }) => (
              <TouchableOpacity
                key={_id}
                activeOpacity={0.2}
                onPress={() => {}}
                style={styles.searchResultItem}
              >
                <Text style={styles.searchResultItemText}>{title}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
}

const mapState = state => ({
  value: state.getIn(['search', 'value']),
  data: state.getIn(['search', 'data']).toJS()
});

const mapDispatch = dispatch => ({
  handleGoBack () {
    const { navigation } = this;
    navigation.goBack();
  },
  handleSearchText (text) {
    dispatch(changeSearchText(text));
    if (text.length > 0) {
      dispatch(requestData(text));
    }
  },
  handleClearSearchText () {
    dispatch(changeSearchText(''));
  }
});

export default connect(mapState, mapDispatch)(Demo);
