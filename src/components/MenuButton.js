import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../Styles';

const MenuButton = props => (
  <TouchableOpacity
    key={props.key}
    activeOpacity={0.7}
    onPress={() => props.onPress()}
  >

    <View style={styles.fieldStyle}>
      {props.isLogout &&
        (<MaterialCommunityIcons
          name={props.iconName}
          style={styles.icon}
          size={32}
          color="black"
        />)}
      {!props.isLogout &&
        (<MaterialIcons name={props.iconName} style={styles.icon} size={32} color="black" />)}
      <Text
        style={styles.item}
      >
        {props.text}
      </Text>
    </View>

  </TouchableOpacity>
);

MenuButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isLogout: PropTypes.bool,
  key: PropTypes.string.isRequired,
};

MenuButton.defaultProps = {
  isLogout: false,
};

export default MenuButton;
