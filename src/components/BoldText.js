import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    paddingVertical: 2,
  },
});

const BoldText = ({ data, label }) => (
  <View>
    <Text style={styles.text}>
      <Text style={{ fontWeight: 'bold' }}>
        {label}
:
      </Text>
      {data}
    </Text>
  </View>
);

const { string } = PropTypes;

BoldText.propTypes = {
  data: string.isRequired,
  label: string.isRequired,
};

export default BoldText;
