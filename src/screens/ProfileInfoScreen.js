import React from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { StyleSheet, Text, ScrollView, View, BackHandler } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import { backHandlerPopToMain } from '../NavigationFunctions';

const styles = StyleSheet.create({
  field: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'gray',
    marginHorizontal: 15,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'flex-start',
    paddingLeft: 2,
    paddingRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileInfoScreen: {
    flex: 1,
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
    textAlign: 'center',
    color: '#FFF',
  },

  infoProfileBox: {
    backgroundColor: 'white',
    marginBottom: 9,
    flex: 6,
    flexDirection: 'column',
  },

  icon: {
    margin: 7,
  },
});

export default class ProfileInfoScreen extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  verifyCharge() {
    if (this.props.counselor.profile.isPresident) {
      return (
        <View key="is_president" style={styles.field}>
          <FontAwesome name="suitcase" style={styles.icon} size={32} color="black" />
          <Text>Cargo: Presidente</Text>
        </View>
      );
    }

    return (
      <View key="is_counselor" style={styles.field}>
        <FontAwesome name="suitcase" style={styles.icon} size={32} color="black" />
        <Text>Cargo: Conselheiro </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.profileInfoScreen}>
        <Header
          title={'PERFIL'}
          onPress={() => Actions.popTo('mainScreen')}
        />
        <View style={styles.infoProfileBox}>
          <ScrollView>
            <View style={styles.field}>
              <MaterialIcons name="face" style={styles.icon} size={32} color="black" />
              <Text>Nome: {this.props.counselor.name}</Text>
            </View>
            <View style={styles.field}>
              <FontAwesome name="user-circle" style={styles.icon} size={32} color="black" />
              <Text>CPF: {this.props.counselor.profile.cpf}</Text>
            </View>
            <View style={styles.field}>
              <MaterialIcons name="phone" style={styles.icon} size={32} color="black" />
              <Text>Telefone: {this.props.counselor.profile.phone}</Text>
            </View>
            <View style={styles.field}>
              <MaterialIcons name="email" style={styles.icon} size={32} color="black" />
              <Text>Email: {this.props.counselor.email}</Text>
            </View>
            {this.verifyCharge()}
            <View style={styles.field}>
              <MaterialIcons
                name="supervisor-account"
                style={styles.icon}
                size={32}
                color="black"
              />
              <Text>Tipo do Conselheiro: {this.props.counselor.profile.counselorType}</Text>
            </View>
            <View style={styles.field}>
              <MaterialIcons name="people" style={styles.icon} size={32} color="black" />
              <Text>Segmento: {this.props.counselor.profile.segment}</Text>
            </View>
            <View style={styles.field}>
              <MaterialIcons name="location-city" style={styles.icon} size={32} color="black" />
              <Text>CAE: {this.props.counselor.profile.CAE}</Text>
            </View>
            <View style={styles.field}>
              <MaterialIcons name="domain" style={styles.icon} size={32} color="black" />
              <Text>Tipo do CAE: {this.props.counselor.profile.CAE_Type}</Text>
            </View>
          </ScrollView>
          <Button
            key="updateInfoButton"
            text="Editar Dados de Cadastro"
            enabled
            onPress={() => Actions.updateInfoScreen()}
          />
        </View>
      </View>
    );
  }
}

const { shape, string, bool } = PropTypes;

ProfileInfoScreen.propTypes = {
  counselor: shape({
    name: string.isRequired,
    email: string.isRequired,
    profile: shape({
      cpf: string.isRequired,
      phone: string.isRequired,
      isPresident: bool.isRequired,
      segment: string.isRequired,
      CAE: string.isRequired,
      CAE_Type: string,
    }).isRequired,
  }).isRequired,
};
