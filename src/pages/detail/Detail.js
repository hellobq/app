import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions
} from 'react-native'
import HeaderRight from './HeaderRight'

const screenWidth = Dimensions.get('window').width

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
    const { title, date } = this.props.navigation.state.params
    console.log(this.state.content)
    return (
      <ScrollView
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View>
          <Text style={styles.header}>{ title }</Text>
          <View style={styles.currentInfo}>
            <Text>{ date }</Text>
          </View>
        </View>

        <View>
          {
            this.state.content.map((item, idx) => (
              <View style={styles.contentItem} key={item + idx}>
                {
                  /^http/.test(item)
                  ? <Image
                      style={{
                        width: '100%', 
                        height: 120
                      }}
                      source={{uri: item}}
                      resizeMode='contain'
                    />
                    : <View>
                        {
                          /strong/.test(item) 
                            ? <Text style={styles.strongContentFont}>{ item.replace(/<strong>|<\/strong>/g, '') }</Text>
                            : <Text style={styles.contentFont}>{ item }</Text>
                        }
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
    contentStr.replace(/((?<=src=")[^"]+)|(?<=<p>).+?(?=<\/p>)|(?<=<h\d>).+?(?=<\/h\d>)/g, str => {
      if (!/鹰眼舆情观察室|蚁坊软件|\(|更多舆情热点请关注|&nbsp;/.test(str)) {
        if (/img/.test(str)) {
          str = str.match(/(?<=src=")[^"]+/g)[0]
        }

        this.setState(({content}) => {
          return {
            content: [...content, str]
          }
        })
      }
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
    height: 200
  },
  contentFont: {
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 24,
    color: '#4f4f4f'
  },
  strongContentFont: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#333'
  }
})

export default Detail
