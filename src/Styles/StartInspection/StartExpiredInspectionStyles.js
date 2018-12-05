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
});

export const buttonBox = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#DEDEDE',
    padding: 8,
    justifyContent: 'center',
    marginRight: 13,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});
