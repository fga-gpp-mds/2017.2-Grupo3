import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../Styles/GeneralStyles';


class Button extends React.Component {
  defineStyle() {
    if (!this.props.style) {
      if (this.props.enabled) {
        return (
          styles.bigButton
        );
      }
      return (
        styles.disabledBigButton
      );
    }
    return (
      this.props.style.design
    );
  }

  defineTextStyle() {
    if (!this.props.style) {
      return styles.buttonText;
    }
    return this.props.style.text;
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          key={this.props.key}
          style={this.defineStyle()}
          disabled={!this.props.enabled}
          onPress={() => this.props.onPress()}
        >
          <Text style={this.defineTextStyle()}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const { string, bool, func, element } = PropTypes;

Button.propTypes = {
  key: string.isRequired,
  text: string.isRequired,
  enabled: bool.isRequired,
  onPress: func.isRequired,
  style: element,
};

Button.defaultProps = {
  style: undefined,
};

export default Button;
