import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchSchoolScreen: {
    flex: 1,
    backgroundColor: 'white',
  },

  bodyBox: {
    flex: 10,
    alignItems: 'center',
  },
  content: {
    flex: 6,
    marginTop: 8,
  },

  icon: {
    margin: 8,
  },

  buttonSearchAnabled: {
    paddingHorizontal: 117,
    paddingVertical: 15,
    marginTop: 50,
    marginBottom: 0,
    backgroundColor: '#FF9500',
    borderRadius: 8,
    borderWidth: 1,
  },

  buttonSearchDisabled: {
    paddingHorizontal: 117,
    paddingVertical: 15,
    marginTop: 50,
    marginBottom: 0,
    backgroundColor: '#DEDEDE',
    borderRadius: 8,
    borderWidth: 1,
  },

  listSchools: {
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 60,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
    height: 400,
  },

  item: {
    flex: 1,
    width: null,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderRadius: 7,
  },

  buttonArea: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  InputDropdown: {
    marginTop: 15,
    paddingLeft: 2,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,

  },

  Input: {
    marginTop: 20,
    paddingLeft: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 7,
  },
});

export default styles;
