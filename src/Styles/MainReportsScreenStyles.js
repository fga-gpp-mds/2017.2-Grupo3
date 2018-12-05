import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  buttonContainer: {
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 15,
    marginVertical: 13,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  content: {
    backgroundColor: 'white',
    flex: 1,
  },

  text: {
    flex: 1,
    width: width * 0.7,
    paddingLeft: 10,
    color: 'blue',
    fontSize: 20,
  },

  statusView: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  loading: {
    marginTop: 15,
    marginBottom: 25,
  },
});

export default styles;
