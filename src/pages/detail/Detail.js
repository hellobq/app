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
import Icon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import {
  thumbsUp,
  getThumbsupAndStar
} from './actionCreators'

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
    const { thumbsUpNum, collections, handleCollection, thumbsUpState, collectionState } = this.props

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
          <Text style={styles.leftViewText}>输入评论...</Text>
          <View style={styles.iconBoxGroup}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.handleLeftBtn}
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
              onPress={handleCollection}
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
    const { handleComponentMount } = this.props;
    const { id: report_id } = this.props.navigation.state.params;

    handleComponentMount(report_id);
  }

  handleLeftBtn = () => {
    const { user_id, navigation, handleThumbsUp } = this.props;
    console.log(user_id)
    if (!user_id) {
      console.log('未登陆');
      navigation.navigate('Login');
    } else {
      console.log('登陆了...', this.props.navigation.state.params);
      const { id: report_id } = this.props.navigation.state.params;
      handleThumbsUp(user_id, report_id);
    }
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
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderStyle: 'solid',
    borderTopWidth: 1
  },
  leftViewText: {
    width: '50%',
    paddingLeft: 20,
    marginRight: 20,
    height: 30,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: '#f2f2f2',
    color: '#8590A6',
    borderRadius: 15
  },
  iconBoxGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  collectionState: state.getIn(['detail', 'collectionState'])
});

const mapDispatch = dispatch => ({
  handleComponentMount (report_id) {
    dispatch(getThumbsupAndStar(report_id))
  },
  handleCollection () {
    console.log('收藏')
    console.log(this)
  },

  handleThumbsUp (user_id, report_id) {
    dispatch(thumbsUp(user_id, report_id));
  }
});

export default connect(mapState, mapDispatch)(Detail);
