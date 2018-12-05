import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import styles from '../Styles/GeneralStyles';
import ErrorMessage from './ErrorMessage';

export default class EmailField extends React.Component {
  state = {
    isValid: false,
    focused: false,
    errorMessage: '',
  };

  setStyle() {
    const style = [styles.InputFieldStyle];
    if (this.state.focused) {
      if (this.state.isValid) {
        style.push(styles.inputFieldValidStyle);
      } else {
        style.push(styles.inputFieldErrorStyle);
      }
    }
    return style;
  }

  validateEmail = (email, callback) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const valid = emailRegex.test(email);
    if (this.state.isValid !== valid) {
      this.setState({ isValid: valid });
    }

    if (!valid) {
      this.state.errorMessage = 'Email deve ser no formato exemplo@exemplo.com\n';
    }
    callback(email, valid);
  };

  render() {
    const {
      size, value, placeholder, onSubmitEditing, callback,
    } = this.props;
    return (
      <View>
        <View style={this.setStyle()}>
          <MaterialIcons name="email" style={styles.icon} size={size} color="black" />
          <TextInput
            width={300}
            style={styles.InputStyle}
            placeholder={placeholder}
            placeholderTextColor="#95a5a6"
            underlineColorAndroid="transparent"
            returnKeyLabel="next"
            maxLength={50}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={email => this.validateEmail(email, callback)}
            value={value}
            onSubmitEditing={() => onSubmitEditing()}
            onFocus={() => this.setState({ focused: true })}
          />
        </View>

        <ErrorMessage valid={this.state.isValid} errorText={this.state.errorMessage} />
      </View>
    );
  }
}


EmailField.propTypes = {
  value: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSubmitEditing: PropTypes.func,
  size: PropTypes.number.isRequired,
};

EmailField.defaultProps = {
  width: null,
  onSubmitEditing: () => (() => ({})),
};
