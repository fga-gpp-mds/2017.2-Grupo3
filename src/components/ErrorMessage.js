import { Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles/GeneralStyles';

const ErrorMessage = props => (
  <View style={{ opacity: props.valid ? 0 : 100 }}>
    <Text style={styles.textMessageError}>{props.errorText}</Text>
  </View>
);

ErrorMessage.propTypes = {
  valid: PropTypes.boolean,
  errorText: PropTypes.string,
};

ErrorMessage.defaultProps = {
  valid: false,
  errorText: '',
};

export default ErrorMessage;
