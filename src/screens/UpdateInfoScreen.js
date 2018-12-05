import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  Picker,
  ScrollView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  EDIT_SUCCEED,
} from '../constants/toastMessages';
import {
  EXECUTIVE_POWER,
  EDUCATION_WORKERS,
  STUDENT_PARENTS,
  CIVILIAN_ENTITIES,
  TITULAR_COUNSELOR,
  SURROGATE_COUNSELOR,
} from '../constants/counselorConstants';
import Header from '../components/Header';
import { logInfo } from '../../logConfig/loggers';
import DropdownComponent from '../components/DropdownComponent';
import NameField from '../components/NameField';
import PhoneField from '../components/PhoneField';
import ShowToast from '../components/Toast';
import { EDIT_ACCOUNT_ERROR, EDIT_PROFILE_ERROR } from '../constants/errorConstants';
import editConselorErrorHandler from '../customErrorTreatments/userProfileInLoginError';
import { backHandlerPop } from '../NavigationFunctions';
import styles from '../Styles/UpdateInfoScreenStyles';

const FILE_NAME = 'UpdateInfoScreen.js';

export default class UpdateInfoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.counselor.name,
      phone: this.props.counselor.profile.phone,
      counselorType: this.props.counselor.profile.counselorType,
      segment: this.props.counselor.profile.segment,
      error: false,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPop);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPop);
  }

  async updateInformation() {
    const nameRegex = /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g;
    const phoneRegex1 = /[0-9]{11}/g;
    const phoneRegex2 = /[0-9]{10}/g;
    this.state.error = false;
    let errorMessage = '';

    // Validating Counselor Name.
    if (!nameRegex.test(this.state.name) || this.state.name.trim() === '') {
      this.state.error = true;
      errorMessage += 'Nome inválido\n';
    }

    // Validating Counselor Phone.
    if (!phoneRegex1.test(this.state.phone) && !phoneRegex2.test(this.state.phone)) {
      this.state.error = true;
      errorMessage += 'Telefone inválido\n';
    }

    // Validating Counselor Type.
    if (this.state.counselorType === '') {
      this.state.error = true;
      errorMessage += 'Tipo de Conselheiro não selecionado\n';
    }

    // Validating Segment.
    if (this.state.segment === '') {
      this.state.error = true;
      errorMessage += 'Segmento não selecionado.\n';
    }

    // Checking if was found a irregularity in updateInformation fields.
    if (this.state.error === false) {
      logInfo(FILE_NAME, 'updateInformation', 'Trying to update counselor data.');
      try {
        await this.props.asyncEditCounselor(this.fetchCounselorData());
        logInfo(FILE_NAME, 'updateInformation', 'Successfully updated counselor data.');
        Actions.popTo('profileInfoScreen');
        ShowToast.Toast(EDIT_SUCCEED);
      } catch (error) {
        const errorJson = JSON.parse(error.message);
        switch (errorJson.name) {
          case EDIT_ACCOUNT_ERROR:
            editConselorErrorHandler(errorJson.status);
            break;
          case EDIT_PROFILE_ERROR:
            editConselorErrorHandler(errorJson.status);
            break;
          default:
            break;
        }
      }
    } else {
      Alert.alert('FALHA AO EDITAR DADOS', errorMessage);
    }
  }

  fetchCounselorData() {
    return {
      nuvemCode: this.props.counselor.nuvemCode,
      name: this.state.name,
      token: this.props.counselor.token,
      userName: this.props.counselor.userName,
      profile: {
        cpf: this.props.counselor.profile.cpf,
        phone: this.state.phone,
        isPresident: this.props.counselor.profile.isPresident,
        counselorType: this.state.counselorType,
        segment: this.state.segment,
        CAE_Type: this.props.counselor.profile.CAE_Type,
        CAE_UF: this.props.counselor.profile.CAE_UF,
        CAE_municipalDistrict: this.props.counselor.profile.CAE_municipalDistrict,
        CAE: this.props.counselor.profile.CAE,
      },
    };
  }

  render() {
    logInfo(FILE_NAME, 'render()',
      `State of update info page: ${JSON.stringify(this.state, null, 2)}`);
    let activityIndicatorOrScreen = null;
    if (this.props.application === true) {
      activityIndicatorOrScreen = (
        <ActivityIndicator
          style={{ marginTop: 50, justifyContent: 'center' }}
          size="large"
          color="#FF9500"
        />
      );
    } else {
      activityIndicatorOrScreen = (
        <View>
          <ScrollView>
            <View style={styles.content}>

              <Text>Nome</Text>
              <NameField
                value={this.state.name}
                callback={validName => this.setState({ name: validName })}
              />

              <Text>Telefone</Text>
              <PhoneField
                value={this.state.phone}
                callback={validPhone => this.setState({ phone: validPhone })}
              />

              <Text>Tipo de Conselheiro</Text>
              <DropdownComponent
                selectedValue={this.state.counselorType}
                callback={counselorTypeChecked => this.setState({ counselorType: counselorTypeChecked })}
                pickerTitle={[
                  <Picker.Item value="" label="Escolha seu cargo" color="#95a5a6" />,
                ]}
                pickerBody={[
                  <Picker.Item value={TITULAR_COUNSELOR} label={TITULAR_COUNSELOR} />,
                  <Picker.Item value={SURROGATE_COUNSELOR} label={SURROGATE_COUNSELOR} />,
                ]}
              />

              <Text>Segmento</Text>
              <DropdownComponent
                selectedValue={this.state.segment}
                callback={segmentChecked => this.setState({ segment: segmentChecked })}
                pickerTitle={[
                  <Picker.Item value="" label="Escolha seu segmento" color="#95a5a6" />,
                ]}
                pickerBody={[
                  <Picker.Item value={EXECUTIVE_POWER} label={EXECUTIVE_POWER} />,
                  <Picker.Item value={EDUCATION_WORKERS} label={EDUCATION_WORKERS} />,
                  <Picker.Item value={STUDENT_PARENTS} label={STUDENT_PARENTS} />,
                  <Picker.Item value={CIVILIAN_ENTITIES} label={CIVILIAN_ENTITIES} />,
                ]}
              />

            </View>
          </ScrollView>
          <TouchableOpacity
            key="infoUpdate"
            style={styles.buttonContainer}
            onPress={() => this.updateInformation()}
          >
            <Text style={styles.buttonText}>Concluir</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (

      <View style={styles.principal}>
        <Header
          title="Editar Informações"
        />

        {activityIndicatorOrScreen}

      </View>
    );
  }
}

const {
  shape, string, number, bool,
} = PropTypes;

UpdateInfoScreen.propTypes = {
  asyncEditCounselor: PropTypes.func.isRequired,
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
    }).isRequired,
  }).isRequired,
};
