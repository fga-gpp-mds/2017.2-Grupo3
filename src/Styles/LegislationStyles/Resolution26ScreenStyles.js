import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    paddingBottom: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    justifyContent: 'center',
  },
  field: {
    backgroundColor: '#FAFAFA',
    padding: 6,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'gray',
    marginHorizontal: 15,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'flex-start',
  },
  buttonTexts: {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  fieldStyle: {
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
