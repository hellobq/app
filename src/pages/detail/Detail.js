import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native'
import HeaderRight from './HeaderRight'
import ImageViewer from 'react-native-image-zoom-viewer'

class Detail extends Component {

  state = {
    content: [],
    visible: false,
    startIndex: 0
  }

  images = []

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
    return (
      <Fragment>
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
                    ? <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.handleImageClick(item)}
                      >
                        <Image
                          style={{
                            width: '100%', 
                            height: 200
                          }}
                          source={{uri: item}}
                          resizeMode='contain'
                        />
                      </TouchableOpacity>
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

        {
          this.state.visible &&
            <Modal
              visible={this.state.visible}
              transparent={true}
              onRequestClose={this.handleImageViewerClick}
            >
              <ImageViewer
                imageUrls={this.images}
                index={this.state.startIndex}
                onClick={this.handleImageViewerClick}
              />
            </Modal>
        }
      </Fragment>
    )
  }

  handleImageViewerClick = () => {
    this.setState(({visible}) => ({
      visible: false
    }))
  }

  handleImageClick = (uri) => {
    this.setState(({visible, startIndex}) => ({
      visible: true,
      startIndex: this.images.findIndex(({url}) => url === uri)
    }))
  }

  handleContent = contentStr => {
    contentStr.replace(/((?<=src=")[^"]+)|(?<=<p>).+?(?=<\/p>)|(?<=<h\d>).+?(?=<\/h\d>)/g, str => {
      if (!/鹰眼舆情观察室|蚁坊软件|\(|更多舆情热点请关注|&nbsp;/.test(str)) {
        /^http/.test(str) && this.images.push({url: str})

        if (/img/.test(str)) {
          str = str.match(/(?<=src=")[^"]+/g)[0]
          this.images.push({url: str})
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
  imgBox: {
    // width: '100%',
    // height: 200
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
