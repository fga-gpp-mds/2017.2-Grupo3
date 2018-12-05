import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = {

  genericViewSection: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginTop: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  genericInputBox: {
    marginBotom: 10,
  },
  bigButton: {
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },
  disabledBigButton: {
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#DEDEDE',
    justifyContent: 'flex-end',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },
  item: {
    fontSize: 16,
    fontWeight: '300',
    padding: 5,
  },
  fieldStyle: {
    padding: 15,
    backgroundColor: '#FF9500',
    flexDirection: 'row',
    borderColor: '#e68a00',
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  flatListButton: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatListItem: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderRadius: 7,
  },
  flatListIcon: {
    margin: 8,
  },
  InputFieldStyle: {
    padding: 0,
    marginTop: 1,
    paddingLeft: 6,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
    borderWidth: 1,
  },
  InputFieldDropdown: {
    marginTop: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
  },
  InputFieldIcon: {
    margin: 0,
  },
  InputStyle: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    paddingVertical: 2,
  },
  checklist: {
    principal: {
      flex: 1,
      backgroundColor: 'white',
    },
    buttonContainer: {
      paddingVertical: 15,
      borderWidth: 1,
      borderRadius: 7,
      marginHorizontal: 15,
      marginVertical: 30,
      backgroundColor: '#FF9500',
      alignItems: 'center',
    },
    buttonText: {
      textAlign: 'center',
      color: '#FFF',
      fontSize: 15,
    },
    content: {
      flex: 1,
      flexDirection: 'column',
    },
    checkBoxStyle: {
      height: 25,
      width: 25,
      borderWidth: 2,
      margin: 10,
      borderColor: 'black',
      borderRadius: 2,
      flexWrap: 'wrap',
    },
    text: {
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'darkgrey',
    },
    label: {
      fontSize: 15,
      flex: 1,
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
      paddingTop: 30,
      paddingHorizontal: 15,
    },
    optionStyle: {
      fontWeight: 'bold',
      paddingTop: 5,
      paddingHorizontal: 9.25,
    },
    observationText: {
      marginTop: 15,
      marginLeft: 15,
      fontSize: 15,
    },
    observationBox: {
      marginTop: 5,
      marginHorizontal: 10,
    },
  },

  inputFieldErrorStyle: {
    flex: 1,
    borderColor: 'red',
  },

  inputFieldValidStyle: {
    borderColor: 'green',
  },

  textMessageError: {
    color: 'red',
  },
};

export default styles;
