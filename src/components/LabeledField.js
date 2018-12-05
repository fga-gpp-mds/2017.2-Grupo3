import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const LabeledField = ({
  label, value, wrapperStyle, labelStyle,
}) => (
  <Text style={wrapperStyle}>
    <Text style={labelStyle}>
      { label }
:
      {' '}
    </Text>
    { value }
  </Text>
);

LabeledField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  wrapperStyle: PropTypes.StyleSheet.isRequired,
  labelStyle: PropTypes.StyleSheet.isRequired,
};

export default LabeledField;
