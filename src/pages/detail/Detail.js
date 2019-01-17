import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native'
import HeaderRight from './HeaderRight'

class Detail extends Component {

  state = {
    content: []
  }

  static navigationOptions = ({navigation}) => ({
    headerTitle: '',
    headerRight: <HeaderRight />,
    headerRightContainerStyle: {
      margin: 4,
      paddingHorizontal: 20,
      fontSize: 20,
      color: '#fff',
      backgroundColor: 'red',
    }
  })

  componentDidMount () {
    const { content } = this.props.navigation.state.params
    this.handleContent(content)
  }

  render () {
    return (
      <ScrollView
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View>
          <Text style={styles.header}>{ this.props.navigation.state.params.title }</Text>
          <View style={styles.currentInfo}>
            <Text>阅读数 { this.props.navigation.state.params.see_count }</Text>
            <Text>{ this.props.navigation.state.params.date }</Text>
          </View>
        </View>

        <View>
          {
            this.state.content.map((item, idx) => (
              <View style={styles.contentItem} key={item}>
                {
                  /^http/.test(item)
                    ? <Image style={styles.contentImage} source={{uri: item}}/>
                    : <View>
                        <Text style={styles.contentFont}>{ item }</Text>
                      </View>
                }
              </View>
            ))
          }
        </View>
      </ScrollView>
    )
  }

  handleContent = contentStr => {
    let content_temp = []
    contentStr.replace(/((?<==")[^"]+)|((?<=<p>)[^<]+)/g, str => {
      this.setState(({content}) => {
        content_temp = [...content]
        content_temp.push(str)
        return {
          content: content_temp
        }
      })
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333'
  },
  currentInfo: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12
  },
  contentItem: {
    marginTop: 10,
    marginBottom: 10
  },
  contentImage: {
    width: '100%',
    height: 100
  },
  contentFont: {
    lineHeight: 24
  }
})

export default Detail
