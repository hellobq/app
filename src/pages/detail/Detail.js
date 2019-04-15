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
import ImageViewer from 'react-native-image-zoom-viewer'
import Icon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import {
  thumbsUp,
  collect,
  getThumbsupAndStar
} from './actionCreators'

class Detail extends Component {

  state = {
    visible: false,
    startIndex: 0
  }

  static navigationOptions = ({navigation}) => ({
    headerTitle: '文章详情页',
  })

  render () {
    const { title, date, img_urls, content} = this.props.navigation.state.params
    const { thumbsUpNum, collections, thumbsUpState, collectionState } = this.props

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

        <View style={styles.bottomBar}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.props.handleThumbsUp()}
            style={styles.iconBox}
          >
            <Icon
              name={"thumbs-up"}
              size={18}
              color={thumbsUpState ? '#ff0000' : "#8590A6"}
            />
            <Text style={{
              ...styles.iconText,
              color: thumbsUpState ? '#ff0000' : '#8590A6'
            }}>
              { thumbsUpNum }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => this.props.handleCollect()}
            style={styles.iconBox}
          >
            <Icon
              name={"star"}
              size={18}
              color={collectionState ? '#ff0000' : "#8590A6"}
            />
            <Text style={{
              ...styles.iconText,
              color: collectionState ? '#ff0000' : '#8590A6'
            }}>
              { collections }
            </Text>
          </TouchableOpacity>
        </View>

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
      </Fragment>
    )
  }

  componentDidMount () {
    console.log('进入详情页 mounted...')
    this.props.handleComponentMount();
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
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopColor: '#f2f2f2',
    borderStyle: 'solid',
    borderTopWidth: 1
  },
  iconBox: {
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 14,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    marginLeft: 6
  }
})

const mapState = state => ({
  user_id: state.getIn(['user', 'user_id']),
  thumbsUpNum: state.getIn(['detail', 'thumbsUpNum']),
  thumbsUpState: state.getIn(['detail', 'thumbsUpState']),
  collections: state.getIn(['detail', 'collections']),
  collectionState: state.getIn(['detail', 'collectionState']),
  inputText: state.getIn(['detail', 'inputText']),
  showInput: state.getIn(['detail', 'showInput'])
});

const mapDispatch = dispatch => ({
  handleComponentMount () {
    const { navigation, user_id } = this;
    const { id: report_id } = navigation.state.params;

    dispatch(getThumbsupAndStar(report_id, user_id))
  },
  handleThumbsUp () {
    const { user_id, navigation } = this;
    const { id: report_id } = navigation.state.params;
    if (!user_id) {
      navigation.navigate('Login');
    } else {
      dispatch(thumbsUp(user_id, report_id));
    }
  },
  handleCollect () {
    const { user_id, navigation } = this;
    const { id: report_id } = navigation.state.params;
    if (!user_id) {
      navigation.navigate('Login');
    } else {
      dispatch(collect(user_id, report_id));
    }
  }
});

export default connect(mapState, mapDispatch)(Detail);
