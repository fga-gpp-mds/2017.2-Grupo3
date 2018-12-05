import React from 'react';
import { View, StyleSheet } from 'react-native';
import BoldText from './BoldText';

const styles = StyleSheet.create({
  listRegisters: {
    marginVertical: 5,
    backgroundColor: 'white',
    paddingLeft: 5,
    justifyContent: 'flex-start',
  },
});

const InvitedCounselorsData = counselor => (
  <View style={styles.listRegisters}>
    <BoldText
      label="Nome"
      data={counselor.name}
    />
    <BoldText
      label="CPF"
      data={counselor.profile.cpf}
    />
    <BoldText
      label="Telefone"
      data={counselor.profile.phone}
    />
  </View>
);

export default InvitedCounselorsData;
