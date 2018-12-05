import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  schoolInfoScreen: {
    flex: 1,

    backgroundColor: 'white',
  },

  buttonContainer: {
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  listInfo: {
    flex: 4,
    marginHorizontal: 10,
    padding: 10,
    width: 340,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
  },

  text: {
    color: '#95a5a6',
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 5,
  },

  textInfotmation: {
    paddingVertical: 2,
    color: '#95a5a6',
    fontSize: 20,
  },

  textResponse: {
    fontSize: 19,
  },

});

export default styles;
