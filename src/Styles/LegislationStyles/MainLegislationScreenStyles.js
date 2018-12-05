import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  legislationScreen: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
    paddingLeft: 20,
    paddingTop: 5,
    color: 'blue',
    fontSize: 20,
    paddingRight: 10,
  },
  buttonTexts: {
    padding: 5,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon: {
    marginHorizontal: 10,
    // justifyContent: 'flex-end',
  },
  fieldStyle: {
    padding: 15,
    margin: 6,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 3,
    justifyContent: 'space-between',
  },
});

export default styles;
