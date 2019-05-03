import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import styles from './style';
import {
  changeSearchText,
  requestData,
  changeRequestData
} from './store/actionCreators';
import { is } from 'immutable';

class Demo extends Component {

  shouldComponentUpdate ({value: newVal, data: newData}) {
    const { value: oldVal, data: oldData } = this.props;
    return Platform.OS !== 'ios' || newVal !== oldVal || !is(newData, oldData);
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
              keyboardType='default'
              selectionColor="#d81e06"
              underlineColorAndroid='transparent'
              spellCheck={false}
              value={value}
              defaultValue=''
              autoFocus={true}
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
        </View>
        <View style={styles.searchResult}>
          {
            data.length > 0 && data.map(({ _id, title }) => (
              <TouchableOpacity
                key={_id}
                activeOpacity={0.8}
                onPress={() => this.props.handleItemClick(_id)}
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

  componentWillUnmount () {
    const { handleClearSearchText, handleClearSearchData } = this.props;
    handleClearSearchText();
    handleClearSearchData();
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
  },
  handleClearSearchData () {
    dispatch(changeRequestData([]));
  },
  handleItemClick (id) {
    const { navigation } = this;
    navigation.navigate('Detail', {
      id: id + ''
    })
  }
});

export default connect(mapState, mapDispatch)(Demo);
