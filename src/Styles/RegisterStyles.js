import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  principal: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {
    flex: 6,
    marginTop: 8,
  },

  footer: {
    flex: 0.08,
    borderTopColor: '#a9a9a9',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    marginRight: 6,
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

  InputStyle: {
    flex: 1,
  },

  buttonContainer: {
    paddingVertical: 14,
    marginVertical: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#FF9500',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
  },

});

export default styles;
