import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  },
  recommend: {
    
  },
  recommendText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    color: '#333',
    textAlign: 'center'
  },
  recommendBox: {
    marginBottom: 10,
    height: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 4
  },
  title: {
    marginRight: 10,
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    color: '#444'
  },
  renderImg: {
    width: 100,
    height: 100
  }
});
