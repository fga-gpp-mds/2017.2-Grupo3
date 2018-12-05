import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import {
  Text, ScrollView, View, BackHandler,
} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import { backHandlerPopToMain } from '../NavigationFunctions';
import PROFILE_FIELDS from '../constants/profileInformations';
import styles from '../Styles/ProfileStyles';

export default class ProfileInfoScreen extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPopToMain);
  }

  verifyCharge() {
    if (this.props.counselor.profile.isPresident) {
      return 'Presidente';
    }
    return 'Conselheiro';
  }

  render() {
    const informations = [
      this.props.counselor.name,
      this.props.counselor.profile.cpf,
      this.props.counselor.profile.phone,
      this.props.counselor.email,
      this.verifyCharge(),
      this.props.counselor.profile.counselorType,
      this.props.counselor.profile.segment,
      this.props.counselor.profile.CAE,
      this.props.counselor.profile.CAE_Type,
    ];

    return (
      <View style={styles.profileInfoScreen}>
        <Header
          title="PERFIL"
          onPress={() => Actions.popTo('mainScreen')}
        />
        <View style={styles.infoProfileBox}>
          <ScrollView>
            {
              PROFILE_FIELDS.map((item, index) => (
                <View style={styles.field}>
                  <MaterialIcons name={item.icon} style={styles.icon} size={32} color="black" />
                  <Text>
                    {item.label}
                    {' '}
                    {informations[index]}
                  </Text>
                </View>
              ))
            }
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
