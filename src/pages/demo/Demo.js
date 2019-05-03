import {
  ScrollView,
  RefreshControl
} from 'react-native';
import React, { Component } from 'react';

class RefreshableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    // this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 10000);
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            colors={['#d81e06']}
          />
        }
      />
    );
  }
}

export default RefreshableList;
