import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import styles from '../Styles/GeneralStyles';

const ButtonWithActivityIndicator = props => (
  <View>
    {props.isLoading ? (
      <ActivityIndicator
        style={props.activityIndicatorStyle}
        size="large"
        color="#FF9500"
      />
    )
      : (
        <TouchableOpacity
          onPress={() => props.onPress()}
          style={props.buttonStyle}
          activeOpacity={0.7}
          key={props.buttonKey}
        >
          <Text style={styles.buttonText}>{props.buttonText}</Text>
        </TouchableOpacity>
      )}
  </View>
);


// For some reason, the style elements are considered numbers.
ButtonWithActivityIndicator.propTypes = {
  activityIndicatorStyle: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonKey: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonStyle: PropTypes.number.isRequired,
};

export default ButtonWithActivityIndicator;
