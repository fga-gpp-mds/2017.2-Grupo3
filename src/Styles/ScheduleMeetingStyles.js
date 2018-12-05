import { StyleSheet, Dimensions } from 'react-native';


const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  principal: {
    flex: 1,
    backgroundColor: 'white',
  },

  icon: {
    marginRight: 15,
  },

  button: {
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: 10,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  content: {
    marginBottom: 9,
    flex: 6,
    flexDirection: 'column',
  },

  Container: {
    marginTop: 15,
    marginHorizontal: 20,
  },

  Picker: {
    marginHorizontal: 15,
    width: '95%',
  },

  popUp: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },

  popUpText: {
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 20,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    height: height * 0.25,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: width * 0.05,
    textAlignVertical: 'top',
  },

  textBox: {
    margin: 1.5,
    paddingLeft: 2,
    justifyContent: 'flex-start',
  },

  text: {
    fontSize: 15,
    paddingVertical: 3,
  },

  textBoxDescription: {
    marginTop: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
  },

  textDescription: {
    marginTop: 20,
    marginLeft: 25,
    fontSize: 15,
  },

  listRegisters: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 7,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
  },

  invitedList: {
    borderColor: 'black',
    height: 250,
    borderWidth: 1.5,
    padding: 1,
    marginHorizontal: 20,
    borderRadius: 5,
  },

  dialogButtonStyle: {
    marginVertical: -16,
  },

  footerPopUp: {
    backgroundColor: '#F9F9FB',
    borderColor: '#DAD9DC',
    borderTopWidth: 0.5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  TopListText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
  },

  InputFieldStyle: {
    marginHorizontal: 65,
    marginLeft: 35,
    paddingVertical: 8,
    marginTop: 1,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  textLogo: {
    fontSize: width * 0.08,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 60,
  },
  wrapper: {
    height: 100,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FF9500',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  icon_header: {
    marginLeft: 20,
  },
  loading: {
    marginTop: 50,
    paddingVertical: 13,
  },

});

export default styles;
