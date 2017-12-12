import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Picker,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
import {
  REGISTER_FAIL_TITLE,
  TITULAR_COUNSELOR,
  SURROGATE_COUNSELOR,
  MUNICIPAL_COUNSELOR_CAE,
  STATE_COUNSELOR_CAE,
  PRESIDENT_COUNSELOR,
  COMMON_COUNSELOR,
  EXECUTIVE_POWER,
  EDUCATION_WORKERS,
  STUDENT_PARENTS,
  CIVILIAN_ENTITIES,
} from '../constants/generalConstants';
import { logInfo } from '../../logConfig/loggers';
import brazilianStates from '../constants/brazilianStates';
import CpfField from '../components/CpfField';
import NameField from '../components/NameField';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import PhoneField from '../components/PhoneField';
import DropdownComponent from '../components/DropdownComponent';
import MunicipalDistrict from '../components/MunicipalDistrict';
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator';
import { backHandlerPop } from '../NavigationFunctions';

const FILE_NAME = 'RegisterScreen.js';

const styles = StyleSheet.create({

  principal: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {
    flex: 6,
    marginTop: 8,
  },

  footer: {
    flex: 0.5,
    borderTopColor: '#a9a9a9',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    marginRight: 6,
  },

  InputFieldStyle: {
    padding: 8,
    marginTop: 1,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },

  InputFieldDropdown: {
    marginTop: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
  },

  InputStyle: {
    flex: 1,
  },

  buttonContainer: {
    paddingVertical: 14,
    marginVertical: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#FF9500',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
  },

});

const UfInitials = (CAE_UF) => {
  if (CAE_UF !== '') {
    return CAE_UF.substr(0, 2);
  }

  return '';
};

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      profile: {
        cpf: '',
        phone: '',
        isPresident: '',
        presidentChecked: false,
        counselorType: '',
        segment: '',
        CAE_Type: '',
        CAE_UF: '',
        CAE_municipalDistrict: '',
        CAE: '',
      },
      passwordCompared: '',
    };

    this.register = this.register.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPop);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPop);
  }


  // Verify if there's a error in some field form.
  register() {
    const cpfRegex = /[0-9]{11}/g;
    const nameRegex = /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g;
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.{6,})(?!.*\s).*$/g;
    const phoneRegex1 = /[0-9]{11}/g;
    const phoneRegex2 = /[0-9]{10}/g;

    let error = false;
    let errorMessage = '';

    // Validating CPF.
    if (!cpfRegex.test(this.state.profile.cpf)) {
      error = true;
      errorMessage += 'CPF inválido.\n';
    }

    // Validating Name.
    if (!nameRegex.test(this.state.name) || this.state.name.trim() === '') {
      error = true;
      errorMessage += 'Nome inválido.\n';
    }

    // Validating Password.
    if (!passwordRegex.test(this.state.password)) {
      error = true;
      errorMessage += 'Senha Inválida (*Não deve ter espaços *Tamanho mínimo 6 caracteres).\n';
    }

    // Validating Match Password
    if (this.state.password !== this.state.passwordCompared) {
      error = true;
      errorMessage += 'Senhas digitadas devem ser iguais.\n';
    }

    // Validating Email.
    if (!emailRegex.test(this.state.email)) {
      error = true;
      errorMessage += 'Email inválido.\n';
    }

    // Validating Phone.
    if (!phoneRegex1.test(this.state.profile.phone) &&
      !phoneRegex2.test(this.state.profile.phone)) {
      error = true;
      errorMessage += 'Telefone inválido.\n';
    }

    // Validating is President.
    if (this.state.profile.isPresident === '') {
      error = true;
      errorMessage += 'Cargo não selecionado.\n';
    }

    // Validating Counselor Type.
    if (this.state.profile.counselorType === '') {
      error = true;
      errorMessage += 'Tipo de Conselheiro não selecionado\n';
    }

    // Validating Segment.
    if (this.state.profile.segment === '') {
      error = true;
      errorMessage += 'Segmento não selecionado.\n';
    }

    // Validating CAE type.
    if (this.state.profile.CAE_Type === '') {
      error = true;
      errorMessage += 'Tipo de CAE não selecionado.\n';
    }

    // Validating CAE UF.
    if (this.state.profile.CAE_UF === '') {
      error = true;
      errorMessage += 'UF não selecionada\n';
    }

    // Validating CAE municipal district.
    if (this.state.profile.CAE_Type === MUNICIPAL_COUNSELOR_CAE && this.state.profile.CAE_municipalDistrict === '') {
      error = true;
      errorMessage += 'Município não selecionado\n';
    }

    // Checking if was found a irregularity in register fields.
    if (error === false) {
      this.props.asyncRegisterCounselor(this.state);
    } else {
      Alert.alert(REGISTER_FAIL_TITLE, errorMessage);
    }
  }

  render() {
    logInfo(FILE_NAME, 'render()',
      `State of register page: ${JSON.stringify(this.state, null, 2)}`);

    return (
      <View style={styles.principal}>
        <Header />
        <KeyboardAvoidingView style={styles.content} behavior="padding">
          <ScrollView>
            <View style={{ paddingHorizontal: 15 }}>

              <Text>CPF</Text>
              <CpfField
                value={this.state.profile.cpf}
                callback={validCpf =>
                  this.setState({ profile: { ...this.state.profile, cpf: validCpf } })}
              />

              <Text>Nome</Text>
              <NameField
                value={this.state.name}
                callback={validName => this.setState({ name: validName })}
              />

              <Text>Email</Text>

              <EmailField
                value={this.state.email}
                callback={validEmail => this.setState({ email: validEmail })}
                placeholder="Digite o seu email"
                size={26}
              />

              <Text>Senha</Text>
              <PasswordField
                callback={validPassword => this.setState({ password: validPassword })}
                password={this.state.password}
                placeholder="Digite sua senha"
                isPassword
                size={26}
              />

              <Text>Confirmar Senha</Text>
              <PasswordField
                callback={validPassword => this.setState({ passwordCompared: validPassword })}
                password={this.state.password}
                passwordCompared={this.state.passwordCompared}
                placeholder="Digite sua senha novamente"
                isPassword={false}
                size={26}
              />

              <Text>Telefone</Text>
              <PhoneField
                value={this.state.profile.phone}
                callback={validPhone =>
                  this.setState({ profile: { ...this.state.profile, phone: validPhone } })}
              />


              <Text>Cargo</Text>
              <DropdownComponent
                selectedValue={this.state.profile.isPresident}
                callback={isPresidentChecked =>
                  this.setState(
                    { profile: { ...this.state.profile, isPresident: isPresidentChecked } },
                  )}
                pickerTitle={[
                  <Picker.Item value="" label="Escolha seu cargo" color="#95a5a6" />,
                ]}
                pickerBody={[
                  <Picker.Item value label={PRESIDENT_COUNSELOR} />,
                  <Picker.Item value={false} label={COMMON_COUNSELOR} />,
                ]}
              />

              <Text>Tipo de Conselheiro</Text>
              <DropdownComponent
                selectedValue={this.state.profile.counselorType}
                callback={counselorTypeChecked => this.setState(
                  { profile: { ...this.state.profile, counselorType: counselorTypeChecked } },
                )}
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
                selectedValue={this.state.profile.segment}
                callback={segmentChecked => this.setState({
                  profile: {
                    ...this.state.profile,
                    segment: segmentChecked,
                  },
                })}
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

              <Text>Tipo do CAE</Text>
              <DropdownComponent
                selectedValue={this.state.profile.CAE_Type}
                callback={caeType => (
                  caeType === STATE_COUNSELOR_CAE ?
                    this.setState({
                      profile: {
                        ...this.state.profile,
                        CAE_Type: caeType,
                        CAE_municipalDistrict: '',
                        CAE: `${UfInitials(this.state.profile.CAE_UF)}`.trim(),
                      },
                    })
                    :
                    this.setState({
                      profile: {
                        ...this.state.profile,
                        CAE_Type: caeType,
                        CAE: `${this.state.profile.CAE_municipalDistrict} ${UfInitials(this.state.profile.CAE_UF)}`.trim(),
                      },
                    })
                )}
                pickerTitle={[
                  <Picker.Item value="" label="Escolha o Tipo do seu CAE" color="#95a5a6" />,
                ]}
                pickerBody={[
                  <Picker.Item value={MUNICIPAL_COUNSELOR_CAE} label={MUNICIPAL_COUNSELOR_CAE} />,
                  <Picker.Item value={STATE_COUNSELOR_CAE} label={STATE_COUNSELOR_CAE} />,
                ]}
              />

              <Text>UF do CAE</Text>
              <DropdownComponent
                selectedValue={this.state.profile.CAE_UF}
                callback={checkedUf => this.setState({
                  profile: {
                    ...this.state.profile,
                    CAE_UF: checkedUf,
                    CAE_municipalDistrict: '',
                    CAE: `${this.state.profile.CAE_municipalDistrict} ${checkedUf.substr(0, 2)}`.trim(),
                  },
                })}
                pickerTitle={[
                  <Picker.Item value="" label="Escolha a UF do seu CAE" color="#95a5a6" />,
                ]}
                pickerBody={
                  brazilianStates.estados.map(
                    item => (<Picker.Item label={item} value={item} color="#000000" />))}
              />

              {this.state.profile.CAE_Type === MUNICIPAL_COUNSELOR_CAE && this.state.profile.CAE_UF !== '' && (
                <MunicipalDistrict
                  selectedValue={this.state.profile.CAE_municipalDistrict}
                  callback={checkedValue => this.setState({
                    profile: {
                      ...this.state.profile,
                      CAE_municipalDistrict: checkedValue,
                      CAE: `${checkedValue} ${UfInitials(this.state.profile.CAE_UF)}`.trim(),
                    },
                  })}
                  UfInitials={UfInitials(this.state.profile.CAE_UF)}
                />
              )}

              <Text>CAE</Text>
              <View style={[styles.InputFieldStyle, { justifyContent: 'center' }]}>
                <Text>
                  {this.state.profile.CAE_municipalDistrict} {UfInitials(this.state.profile.CAE_UF)}
                </Text>
              </View>

              <ButtonWithActivityIndicator
                activityIndicatorStyle={{ marginTop: 15, marginBottom: 15 }}
                onPress={() => {
                  Keyboard.dismiss();
                  this.register();
                }}
                isLoading={this.props.isLoading}
                buttonKey="userCreation"
                buttonText="Concluir"
                buttonStyle={styles.buttonContainer}
              />

            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => Actions.loginScreen()}
          >
            <Text>Já tem um cadastro?
              <Text style={{ color: 'blue' }}> Entrar</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

RegisterScreen.propTypes = {
  asyncRegisterCounselor: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
