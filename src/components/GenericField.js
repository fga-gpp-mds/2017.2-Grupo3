import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput } from 'react-native';
import styles from '../Styles/GeneralStyles';

export default class GenericField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styleInUse: styles.InputFieldStyle,
      errorTextArea: <Text />,
      text: '',
      validValue: -1,
    };
  }

  handleInput(newText) {
    this.setState({ text: newText.trim() }, () => {
      this.validateText(this.state.text, this.props.validorRegex);
    });
  }

  handleUpdate() {
    if (this.state.validValue) {
      this.setState({ errorTextArea: <Text /> });
      this.setState({ styleInUse: [styles.InputFieldStyle, { borderColor: '#80FF80', borderWidth: 2 }] });
    } else {
      this.setState({ errorTextArea: <Text>{this.props.errorMessage}</Text> });
      this.setState({ styleInUse: [styles.InputFieldStyle, { borderColor: '#FF9999', borderWidth: 2 }] });
    }
  }

  validateText(text, regexTest) {
    if (regexTest.global) {
      console.warn('validateText()', 'Regexp using global flag! The results may be wrong.');
    } else {
      // Do nothing
    }

    const isValid = regexTest.test(text);

    if (isValid) {
      console.warn('Valido');
      this.setState({ validValue: true }, () => {
        this.handleUpdate();
      });
    } else {
      console.warn('Invalido');
      this.setState({ validValue: false }, () => {
        this.handleUpdate();
      });
    }
  }

  render() {
    return (
      <View>
        <Text>
          {' '}
          {this.props.header.toUpperCase()}
          {' '}
        </Text>
        <TextInput
          style={this.state.styleInUse}
          placeholder={this.props.message}
          value={this.state.test}
          onChangeText={text => this.handleInput(text)}
        />

        {this.state.errorTextArea}

      </View>
    );
  }
}

GenericField.propTypes = {
  header: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  validorRegex: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

// export default GenericField;
