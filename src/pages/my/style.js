import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  header: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff' 
  },
  Avatar: {
    marginRight: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  LoginText: {
    color: '#333',
    fontSize: 22
  },
  items: {
    marginTop: 20
  },
  item: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  iconBox: {
    marginRight: 20,
    width: 40,
    height: 50,
    lineHeight: 50,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#f2f2f2'
  },
  itemText: {
    fontSize: 14,
    lineHeight: 50,
    color: '#333'
  },
  itemNum: {
    fontSize: 14,
    lineHeight: 50,
    color: '#8590A6'
  },
  layoutText: {
    fontSize: 16,
    lineHeight: 50,
    color: '#d81e06'
  }
});
