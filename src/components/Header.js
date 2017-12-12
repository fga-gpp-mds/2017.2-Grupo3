import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create(
  {
    button: {
      color: 'black',
      fontSize: 30,
      marginLeft: 30,
    },
    buttonWrapper: {
    },
    wrapper: {
      height: 100,
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#FF9500',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      alignItems: 'center',
    },
    textLogo: {
      // Font size 30 looks nice on 360 width phone.
      // (x * widthYourPhone = fontSize) where x is the proportion used in fontSize above.
      fontSize: width * 0.08,
      color: 'white',
      fontWeight: 'bold',
      marginTop: 10,
    },

    textSubTitle: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },

    textWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },

    icon: {
      marginLeft: 20,
    },
  },
);

const Header = props => (
  <View style={styles.wrapper}>
    <View style={styles.buttonWrapper}>
      <TouchableOpacity onPress={props.onPress} >
        <Ionicons name="ios-arrow-back-outline" style={styles.icon} size={45} color="black" />
      </TouchableOpacity>
    </View>
    <View style={styles.textWrapper}>
      <Text style={styles.textLogo}>{props.title}</Text>
      <Text style={styles.textSubTitle}>{props.subTitle}</Text>
    </View>
  </View>
);

Header.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onPress: PropTypes.func,
};

Header.defaultProps = {
  title: 'Merenda +',
  subTitle: '',
  backButton: false,
  onPress: () => Actions.pop(),
};

export default Header;
