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
    visible: false,
    startIndex: 0
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

  render () {
    const { title, date, img_urls, content} = this.props.navigation.state.params
    console.log(content, img_urls)

    return (
      <Fragment>
        <ScrollView
          contentContainerStyle={{paddingBottom: 10}}
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View>
            <Text style={styles.header}>{ title }</Text>
          </View>

          <View style={styles.content}>
            {
              content.map((item, idx) => (
                <View style={styles.contentItem} key={item + idx}>
                  {
                    /^http/.test(item)
                    ? <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.handleImageClick(item)}
                      >
                        <Image
                          style={{
                            marginHorizontal: 6,
                            width: '90%', 
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
                imageUrls={img_urls}
                index={this.state.startIndex}
                onClick={this.handleImageViewerClick}
              />
            </Modal>
        }
      </Fragment>
    )
  }

  handleImageViewerClick = () => {
    this.setState(() => ({
      visible: false
    }))
  }

  handleImageClick = (uri) => {
    const { img_urls } = this.props.navigation.state.params

    this.setState(() => ({
      visible: true,
      startIndex: img_urls.findIndex(({url}) => url === uri)
    }))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333'
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  contentItem: {
    marginTop: 10
  },
  contentFont: {
    fontSize: 17,
    // letterSpacing: 1,
    lineHeight: 28,
    color: '#4f4f4f'
  },
  strongContentFont: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#333'
  }
})

export default Detail
