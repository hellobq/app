/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Navigator from './src/router/TabBarConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './src/store'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}

export default App 
