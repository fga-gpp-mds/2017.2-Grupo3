import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerBox: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FF9500',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bodyBox: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLogo: {
    flex: 1,
    paddingLeft: 48,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonInspect: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9500',
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default styles;
