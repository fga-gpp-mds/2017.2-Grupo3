import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import { backHandlerPop } from '../../NavigationFunctions';
import stylesList from '../../Styles/ListStyles';
import LoadingIndicator from '../../components/LoadingIndicator';
import Button from '../../components/Button';
import getManagerCounselorData from '../../services/extractDataCounselor';
import ScheduleCard from '../../components/ScheduleCard';

const buttonBoxGreen = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#4CD964',
    padding: 8,
    justifyContent: 'center',
    marginRight: 13,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

const buttonBoxRed = StyleSheet.create({
  design: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#FF3B30',
    padding: 8,
    justifyContent: 'center',
    marginRight: 13,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default class ManageNotAcceptedRegistersScreen extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPop);
  }

  componentDidMount() {
    this.getCounselorFromGroup();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPop);
  }

  getCounselorFromGroup() {
    console.log(this.props.counselor.profile.CAE);
    this.props.asyncGetCounselorFromGroup(this.props.counselor.profile.CAE,
      this.props.counselor.profile.cpf);
  }

  acceptCounselor(counselor) {
    const counselorWithpresidentChecked = counselor;
    counselorWithpresidentChecked.profile.presidentChecked = true;
    this.props.asyncAcceptCounselor(counselorWithpresidentChecked);

    this.getCounselorFromGroup();
  }

  disableCounselor(counselor, codGroup) {
    Alert.alert(
      'Desativar Conselheiro',
      'Você deseja realmente desassociar esse Conselheiro da Aplicação?',
      [
        { text: 'Cancelar' },
        {
          text: 'Desassociar',
          onPress: () => {
            this.props.disableCounselor(counselor, codGroup);
            this.getCounselorFromGroup();
          },
        },
      ]);
  }

  arrayRegistersList() {
    if (this.props.application === true) {
      return (
        LoadingIndicator
      );
    } else if (this.props.listOfNotCheckedCounselors.length === 0) {
      return (
        <View style={stylesList.noneScheduleTextBox}>
          <Text style={stylesList.noneScheduleText}>Nenhum Conselheiro Não Validado!</Text>
        </View>
      );
    }
    return (
      this.props.listOfNotCheckedCounselors.map(counselor => (
        <ScheduleCard
          data={getManagerCounselorData(counselor)}
          keyProp={`${counselor.nuvemCode}`}
        >
          <Button
            style={buttonBoxGreen}
            text="VALIDAR"
            enabled
            onPress={() => this.acceptCounselor(counselor)}
          />
          <Button
            style={buttonBoxRed}
            text="EXCLUIR"
            enabled
            onPress={() => this.disableCounselor(counselor,
              this.props.counselor.profile.codGroup)}
          />
        </ScheduleCard>
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

ManageNotAcceptedRegistersScreen.propTypes = {
  application: PropTypes.bool.isRequired,
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
      codGroup: number.isRequired,
      presidentChecked: bool.isRequired,
    }).isRequired,
  }).isRequired,
  listOfNotCheckedCounselors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    cpf: PropTypes.string,
    phone: PropTypes.string,
  })).isRequired,
  asyncGetCounselorFromGroup: PropTypes.func.isRequired,
  asyncAcceptCounselor: PropTypes.func.isRequired,
  disableCounselor: PropTypes.func.isRequired,
};
