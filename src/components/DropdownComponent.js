import React from 'react';
import PropTypes from 'prop-types';
import { View, Picker } from 'react-native';
import styles from '../Styles/GeneralStyles';
import ErrorMessage from './ErrorMessage';

export default class DropdownComponent extends React.Component {
  state = {
    isValid: false,
    focused: false,
    errorMessage: '',
  };

  setStyle() {
    const style = [styles.InputFieldDropdown];
    if (this.state.focused) {
      if (this.state.isValid) {
        style.push(styles.inputFieldValidStyle);
      } else {
        style.push(styles.inputFieldErrorStyle);
      }
    }
    return style;
  }

  validateDropdown = (checkedAttribute, fieldName, callback) => {
    const valid = (checkedAttribute !== '');

    if (this.state.isValid !== valid) {
      this.setState({ isValid: valid });
    }

    if (!valid) {
      this.state.errorMessage = 'Por favor, selecione um ';
      this.state.errorMessage += fieldName;
    }
    callback(checkedAttribute, valid);
  };

  render() {
    const {
      selectedValue, pickerBody, pickerTitle, fieldName, callback,
    } = this.props;

    return (
      <View>
        <View style={this.setStyle()}>
          <Picker
            onValueChange={checkedAttribute => this.validateDropdown(checkedAttribute, fieldName, callback)}
            selectedValue={selectedValue}
          >
            {pickerTitle}
            {pickerBody}
          </Picker>
        </View>

        <ErrorMessage valid={this.state.isValid} errorText={this.state.errorMessage} />
      </View>
    );
  }
}

DropdownComponent.propTypes = {
  fieldName: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  pickerTitle: PropTypes.element.isRequired,
  pickerBody: PropTypes.element.isRequired,
};
