import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import styles from '../Styles/GeneralStyles';
import ErrorMessage from './ErrorMessage';

class PhoneField extends React.Component {
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

  validatePhone = (phone, phoneValidated) => {
    const validPhone = phone.replace(/[^0-9]/g, '');
    phoneValidated(validPhone);
    let valid = false;

    if (phone.length >= 8) valid = true;

    if (this.state.isValid !== valid) {
      this.setState({ isValid: valid });
    }

    if (!valid) {
      this.state.errorMessage = 'Telefone inválido.\n';
    }
  };

  render() {
    const { value, phoneValidated } = this.props;
    return (
      <View>
        <Text>Telefone</Text>
        <View style={this.setStyle()}>
          <MaterialIcons name="phone" style={styles.icon} size={26} color="black" />
          <TextInput
            style={styles.InputStyle}
            placeholder="Digite o seu telefone"
            placeholderTextColor="#95a5a6"
            underlineColorAndroid="transparent"
            returnKeyLabel="next"
            maxLength={11}
            keyboardType="phone-pad"
            onChangeText={phone => this.validatePhone(phone, phoneValidated)}
            value={value}
            onFocus={() => this.setState({ focused: true })}
          />
        </View>
        <ErrorMessage valid={this.state.isValid} errorText={this.state.errorMessage} />
      </View>
    );
  }
}

PhoneField.propTypes = {
  value: PropTypes.string.isRequired,
  phoneValidated: PropTypes.func.isRequired,
};

export default PhoneField;
