import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import styles from '../Styles/GeneralStyles';
import ErrorMessage from './ErrorMessage';

export default class PasswordField extends React.Component {
  state = {
    isValid: false,
    focused: false,
    errorMessage: '',
  };

  changePasswordStyleAccordingToInput = (password) => {
    const passwordRegex = /^(?=.{6,})(?!.*\s).*$/g;

    if (password === '') {
      return styles.InputFieldStyle;
    } if (passwordRegex.test(password)) {
      return [styles.InputFieldStyle, { borderColor: '#80FF80', borderWidth: 2 }];
    }
    return [styles.InputFieldStyle, { borderColor: '#FF9999', borderWidth: 2 }];
  };

  changeStyleIfPasswordsMatch = (password, passwordCompared) => {
    if (passwordCompared === '') {
      return styles.InputFieldStyle;
    } if (password === passwordCompared) {
      return [styles.InputFieldStyle, { borderColor: '#80FF80', borderWidth: 2 }];
    }
    return [styles.InputFieldStyle, { borderColor: '#FF9999', borderWidth: 2 }];
  };

  validatePassword = (password, callback) => {
    const passwordRegex = /^(?=.{6,})(?!.*\s).*$/g;
    const valid = passwordRegex.test(password);

    if (this.state.isValid !== valid) {
      this.setState({ isValid: valid });
    }

    if (!valid) {
      this.setState({ errorMessage: 'Senha não deve ter espaços e deve ter no minimo 6 caracteres)' });
    }

    callback(password, valid);
  }

  render() {
    const {
      isPassword, password, passwordCompared, size, placeholder, focus, callback,
    } = this.props;

    return (
      <View>
        <View
          style={
            isPassword
              ? this.changePasswordStyleAccordingToInput(password)
              : this.changeStyleIfPasswordsMatch(password, passwordCompared)}
        >
          <MaterialIcons name="lock" style={styles.icon} size={size} color="black" />
          <TextInput
            style={styles.InputStyle}
            placeholder={placeholder}
            placeholderTextColor="#95a5a6"
            underlineColorAndroid="transparent"
            returnKeyLabel="next"
            maxLength={30}
            keyboardType="default"
            onChangeText={password => callback(password)}
            secureTextEntry
            focus={focus}
          />
        </View>

        <ErrorMessage valid={this.state.isValid} errorText={this.state.errorMessage} />
      </View>
    );
  }
}

PasswordField.propTypes = {
  callback: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordCompared: PropTypes.string,
  isPassword: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  focus: PropTypes.bool,
};

PasswordField.defaultProps = {
  passwordCompared: '',
  width: '',
  focus: false,
};
