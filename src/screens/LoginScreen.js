import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Keyboard,
  BackHandler,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator';
import { backHandlerPop } from '../NavigationFunctions';

const styles = StyleSheet.create({
  principal: {
    flex: 1,
  },

  content: {
    flex: 6,
    paddingHorizontal: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  footer: {
    flex: 0.5,
    borderTopColor: '#a9a9a9',
    borderTopWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    margin: 5,
  },

  Inputemail: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 7,
  },

  InputPassword: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 7,
  },

  buttonLogin: {
    paddingVertical: 18,
    marginTop: 50,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#FF9500',
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
  },

  loading: {
    marginTop: 50,
    paddingVertical: 13,
  },
});

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
        <KeyboardAvoidingView style={styles.content} behavior="padding">
          <EmailField
            callback={emailInput => this.setState({ email: emailInput })}
            placeholder="Email"
            onSubmitEditing={() => this.setState({ focus: true })}
            value={this.state.email}
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

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => Actions.registerScreen()}
          >
            <Text>Ainda não se cadastrou?
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
