import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet
} from 'react-native';
import React, { Component } from 'react';

class Demo extends Component {

  state = {
    marginLeft: new Animated.Value(0),
    fontSize: new Animated.Value(30)
  }

  componentDidMount () {
    const { marginLeft, fontSize } = this.state;

    Animated.stagger(2000, [
      Animated.timing(
        marginLeft,
        {
          toValue: 100,
          easing: Easing.ease,
          duration: 1000
        }
      ),

      Animated.spring(
        fontSize,
        {
          toValue: 16,
          riction: 2,   //弹跳系数
          tension: 10,   // 控制速度
        }
      )
    ]).start();
  }

  render () {
    const { marginLeft, fontSize } = this.state;
    const marginLeftTeamp = marginLeft.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 100, 50]
    })

    return (
      <View style={styles.container}>
        <Animated.View style={{
          marginLeft: marginLeftTeamp
        }}>
          <Text>demo</Text>
        </Animated.View>

        <Animated.Text style={{
          fontSize
        }}>demo</Animated.Text>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#333'
  }
})

export default Demo;
