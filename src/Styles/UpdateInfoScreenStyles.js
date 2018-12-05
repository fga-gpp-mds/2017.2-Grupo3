import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {
    flex: 6,
    marginTop: 8,
    paddingHorizontal: 15,
  },

  buttonContainer: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  InputFieldStyle: {
    padding: 8,
    marginTop: 1,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },

  InputFieldDropdown: {
    marginTop: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
  },

  icon: {
    margin: 5,
  },

  InputStyle: {
    flex: 1,
  },
});

export default styles;
