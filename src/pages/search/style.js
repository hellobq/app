import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  searchBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 40,
    alignItems: 'center'
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 15,
    borderColor: '#eee',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  searchCloseBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ddd',
    color: '#fff'
  },
  input: {
    marginHorizontal: 10,
    flex: 1,
    fontSize: 14,
    height: 40
  },
  searchResult: {
    paddingHorizontal: 10
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  searchResultItemText: {
    fontSize: 16,
    color: '#222'
  }
});
