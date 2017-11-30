import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';

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
  textBox: {
    paddingLeft: 2,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 15,
    paddingVertical: 5,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  greenBox: {
    backgroundColor: '#4CD964',
    padding: 8,
    borderRadius: 3,
    marginRight: 20,

  },
  redBox: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 3,
    marginRight: 10,
  },
});

export default class ManageAcceptedRegistersScreen extends React.Component {
  disableCounselor(counselor, codGroup) {
    Alert.alert(
      'Desativar Conselheiro',
      'Você deseja realmente desassociar esse Conselheiro da Aplicação?',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelar') },
        { text: 'Desassociar', onPress: () => this.props.disableCounselor(counselor, codGroup) },
      ]);
  }


  arrayRegistersList() {
    if (this.props.listOfCheckedCounselors.length === 0) {
      return (
        <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#FF9500" />
      );
    }
    return (
      this.props.listOfCheckedCounselors.map(counselor => (
        <View style={styles.listRegisters} key={(counselor.nuvemCode).toString()}>
          <View style={styles.textBox}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Nome: </Text>
              {counselor.name}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>CPF: </Text>
              {counselor.profile.cpf}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Telefone: </Text>
              {counselor.profile.phone}
            </Text>
          </View>
          <View style={styles.buttonBox}>
            <TouchableOpacity
              onPress={() => this.disableCounselor(counselor,
                this.props.counselor.profile.codGroup)}
            >
              <View style={styles.redBox}>
                <Text>EXCLUIR</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView>
          {this.arrayRegistersList()}
        </ScrollView>
      </View>
    );
  }
}

const { shape, string, number, bool } = PropTypes;

ManageAcceptedRegistersScreen.propTypes = {
  counselor: shape({
    name: string.isRequired,
    nuvemCode: number.isRequired,
    token: string.isRequired,
    userName: string.isRequired,
    profile: shape({
      cpf: string.isRequired,
      phone: string.isRequired,
      isPresident: bool.isRequired,
      counselorType: string.isRequired,
      segment: string.isRequired,
      CAE_Type: string.isRequired,
      CAE_UF: string.isRequired,
      CAE_municipalDistrict: string.isRequired,
      CAE: string.isRequired,
      codGroup: string.isRequired,
      presidentChecked: bool.isRequired,
    }).isRequired,
  }).isRequired,
  listOfCheckedCounselors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    cpf: PropTypes.string,
    phone: PropTypes.string,
  })).isRequired,
  disableCounselor: PropTypes.func.isRequired,
};