import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  initialBackgroundImage: {
    flex: 1,
    width: null,
  },

  initialScreen: {
    flex: 1,
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
  },

  loginButton: {
    width: 320,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9500',
    borderRadius: 10,
    marginBottom: 60,
  },

  buttonText: {
    fontSize: 20,
    color: 'white',
  },

  registerButton: {
    width: 320,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9500',
    borderRadius: 10,
  },

  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 140,
  },
});

export default styles;
