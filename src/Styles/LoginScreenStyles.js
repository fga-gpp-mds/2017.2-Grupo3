import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {
    flex: 6,
    paddingHorizontal: 18,
    backgroundColor: 'white',
    marginTop: 120,
  },

  footer: {
    flex: 0.23,
    borderTopColor: '#a9a9a9',
    borderTopWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    margin: 0,
  },

  Inputemail: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 7,
  },

  InputPassword: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 7,
  },

  buttonLogin: {
    paddingVertical: 18,
    marginTop: 50,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#FF9500',
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
  },

  loading: {
    marginTop: 50,
    paddingVertical: 13,
  },
});

export default styles;
