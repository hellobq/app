import React, { Component, Fragment } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import styles from './style';
import { connect } from 'react-redux'
import {
  thumbsUp,
  collect,
  getThumbsupAndStar,
  getDeatilInfo
} from './actionCreators'

class Detail extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: '文章详情页',
  })

  render () {
    const { thumbsUpNum, collections, thumbsUpState, collectionState, detailInfo, loading } = this.props
    const { id, title, content, img_urls } = detailInfo.toJS();

    return (
      <View style={styles.containerBox}>
        {
          loading ?
          <ActivityIndicator
            size="large"
            color='#8590A6'
          /> :
          <Fragment>
            <ScrollView
              contentContainerStyle={{paddingTop: 10, paddingBottom: 10}}
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
                            onPress={() => {}}
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
          </Fragment>
        }
      </View>
    )
  }

  componentDidMount () {
    console.log('进入详情页 mounted...')
    const { navigation, getDeatil } = this.props;
    const { id } = navigation.state.params;
    getDeatil(id);
    // this.props.handleComponentMount();
  }
}

const mapState = state => ({
  user_id: state.getIn(['user', 'user_id']),
  thumbsUpNum: state.getIn(['detail', 'thumbsUpNum']),
  thumbsUpState: state.getIn(['detail', 'thumbsUpState']),
  collections: state.getIn(['detail', 'collections']),
  collectionState: state.getIn(['detail', 'collectionState']),
  inputText: state.getIn(['detail', 'inputText']),
  showInput: state.getIn(['detail', 'showInput']),
  detailInfo: state.getIn(['detail', 'detailInfo']),
  loading: state.getIn(['detail', 'loading'])
});

const mapDispatch = dispatch => ({
  getDeatil (id) {
    dispatch(getDeatilInfo(id))
  },
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
