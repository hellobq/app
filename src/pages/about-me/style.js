import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  noLoginBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noLoginText: {
    fontSize: 18,
    color: '#d81e06'
  },
  statusBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // 每一项的样式
  item: {
    padding: 10
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    color: '#444444'
  },
  descImg: {
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  description: {
    marginRight: 20,
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical:'center',
    fontSize: 14,
    lineHeight: 24
  },
  renderItemImg: {
    width: 100,
    height: 70
  },
  date: {
    fontSize: 12,
    lineHeight: 20,
    color: '#8590A6'
  },
  footer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loadingText: {
    marginLeft: 10
  },
  separator: {
    height: 10,
    backgroundColor: '#F6F6F6'
  }
})
