import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  principal: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingTop: 6,
    backgroundColor: 'white',
  },

  listSchedule: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textBox: {
    flex: 4,
    paddingLeft: 4,
    justifyContent: 'flex-start',
    marginRight: 15,
  },

  text: {
    fontSize: 15,
    paddingVertical: 2,
  },

  buttonBox: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: '#4cd964',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  buttonInvitees: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  buttonText: {
    fontSize: 12,
    textAlign: 'center',
  },

  popUp: {
    marginBottom: 120,
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

  listRegisters: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 7,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
  },
});


export const buttonInviteesStyle = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export const buttonBoxStyle = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: '#4cd964',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export const buttonBoxStyleNotInvitee = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: '#ff3b30',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export const buttonBoxStyleNotConfirm = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    backgroundColor: '#ffcc00',
    padding: 8,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});
