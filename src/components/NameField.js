import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../Styles/GeneralStyles';
import ErrorMessage from './ErrorMessage';

class NameField extends React.Component {
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

  validateName = (name, nameValidated) => {
    const validName = name.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, '');
    nameValidated(validName);
    let valid = false;

    if (name.length > 3) valid = true;

    if (this.state.isValid !== valid) {
      this.setState({ isValid: valid });
    }

    if (!valid) {
      this.state.errorMessage = 'Nome inválido.\n';
    }
  };

  render() {
    const { value, nameValidated } = this.props;
    return (
      <View>
        <Text>Nome</Text>
        <View style={this.setStyle()}>
          <MaterialIcons name="face" style={styles.icon} size={26} color="black" />
          <TextInput
            style={styles.InputStyle}
            placeholder="Digite o seu nome completo"
            placeholderTextColor="#95a5a6"
            underlineColorAndroid="transparent"
            returnKeyLabel="next"
            maxLength={60}
            keyboardType="default"
            autoCapitalize="words"
            onChangeText={name => this.validateName(name, nameValidated)}
            value={value}
            onFocus={() => this.setState({ focused: true })}
          />
        </View>
        <ErrorMessage valid={this.state.isValid} errorText={this.state.errorMessage} />
      </View>
    );
  }
}

NameField.propTypes = {
  value: PropTypes.string.isRequired,
  nameValidated: PropTypes.func.isRequired,
};

export default NameField;
