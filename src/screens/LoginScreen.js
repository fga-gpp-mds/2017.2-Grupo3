import React from 'react';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Keyboard,
  BackHandler,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator';
import { backHandlerPop } from '../NavigationFunctions';
import styles from '../Styles/LoginScreenStyles';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      focus: false,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', backHandlerPop);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', backHandlerPop);
  }


  render() {
    return (
      <View style={styles.principal}>
        <Header />
        <ScrollView style={styles.content}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <EmailField
              value={this.state.email}
              callback={emailInput => this.setState({ email: emailInput })}
              placeholder="Email"
              onSubmitEditing={() => this.setState({ focus: true })}
              size={28}
            />

            <PasswordField
              callback={passwordInput => this.setState({ password: passwordInput })}
              password={this.state.password}
              placeholder="Digite sua senha"
              isPassword
              size={28}
              focus={this.state.focus}
            />

            <ButtonWithActivityIndicator
              activityIndicatorStyle={styles.loading}
              onPress={() => {
                Keyboard.dismiss();
                this.props.asyncLoginCounselor(this.state);
              }}
              isLoading={this.props.isLoading}
              buttonKey="LoginCounselor"
              buttonText="Entrar"
              buttonStyle={styles.buttonLogin}
            />
          </KeyboardAvoidingView>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => Actions.registerScreen()}
          >
            <Text>
Ainda não se cadastrou?
              <Text style={{ color: '#0000FF' }}> Cadastrar-se</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

LoginScreen.propTypes = {
  asyncLoginCounselor: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
