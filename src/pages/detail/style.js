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
  }
});
