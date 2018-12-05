import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../Styles/GeneralStyles';

const MenuButton = props => (
  <TouchableOpacity
    key="menuButton"
    activeOpacity={0.7}
    onPress={() => props.onPress()}
  >

    <View style={styles.fieldStyle}>
      {props.isLogout
        && (
        <MaterialCommunityIcons
          name={props.iconName}
          style={styles.icon}
          size={32}
          color="black"
        />
        )}
      {!props.isLogout
        && (<MaterialIcons name={props.iconName} style={styles.icon} size={32} color="black" />)}
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
};

MenuButton.defaultProps = {
  isLogout: false,
};

export default MenuButton;
