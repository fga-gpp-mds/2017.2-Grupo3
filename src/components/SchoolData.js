import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BoldText } from './BoldText';

const styles = StyleSheet.create({
  listRegisters: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
  },
  title: {
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textBox: {
    paddingLeft: 5,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 15,
    paddingVertical: 5,
  },
});

const SchoolData = school => (

  <View style={styles.listRegisters}>
    <View style={styles.textBox}>
      <Text style={styles.title}>
        ESCOLA SELECIONADA
      </Text>
      <BoldText
        data={school.schoolName}
        label="Nome da escola: "
      />
      <BoldText
        data={school.schoolEmail}
        label="Email: "
      />
      <BoldText
        data={school.schoolPhone}
        label="Telefone: "
      />
    </View>
  </View>
);


export default SchoolData;
